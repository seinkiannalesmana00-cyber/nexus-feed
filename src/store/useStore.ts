import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FeedSource } from '@/config/feeds';

export interface BookmarkedArticle {
  id: string; // url as id
  title: string;
  link: string;
  pubDate: string;
  sourceName: string;
  contentSnippet?: string;
  thumbnail?: string;
  savedAt: number;
}

export type BookmarkItem = BookmarkedArticle;

export interface NexusState {
  customFeeds: FeedSource[];
  bookmarks: BookmarkedArticle[];
  favorites: BookmarkItem[];
  addCustomFeed: (feed: FeedSource) => void;
  removeCustomFeed: (id: string) => void;
  addBookmark: (article: Omit<BookmarkedArticle, 'savedAt'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  addFavorite: (item: BookmarkItem) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export type AppState = NexusState;

export const useStore = create<NexusState>()(
  persist(
    (set, get) => ({
      customFeeds: [],
      bookmarks: [],
      favorites: [],
      addCustomFeed: (feed) => set((state) => ({ customFeeds: [...state.customFeeds, feed] })),
      removeCustomFeed: (id) => set((state) => ({ customFeeds: state.customFeeds.filter((f) => f.id !== id) })),
      addBookmark: (article) => set((state) => {
        if (state.bookmarks.some((b) => b.id === article.id)) return state;
        return { bookmarks: [...state.bookmarks, { ...article, savedAt: Date.now() }] };
      }),
      removeBookmark: (id) => set((state) => ({ bookmarks: state.bookmarks.filter((b) => b.id !== id) })),
      isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),
      addFavorite: (item) =>
        set((state) => {
          if (!state.favorites.find((f) => f.id === item.id)) {
            return { favorites: [...state.favorites, item] };
          }
          return state;
        }),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((f) => f.id === id),
    }),
    {
      name: 'nexusfeed-storage', // name of item in local storage
    }
  )
);
