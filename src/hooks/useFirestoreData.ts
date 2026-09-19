'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FeedSource } from '@/config/feeds';

export interface BookmarkedArticle {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  sourceName: string;
  contentSnippet?: string;
  thumbnail?: string | null;
  savedAt: number;
}

export type BookmarkItem = BookmarkedArticle;

export function useFirestoreData(userId: string) {
  const [feeds, setFeeds] = useState<FeedSource[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);
  const [favorites, setFavorites] = useState<BookmarkItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!userId) return;

    let feedsLoaded = false;
    let bookmarksLoaded = false;
    let favoritesLoaded = false;

    const checkAllLoaded = () => {
      if (feedsLoaded && bookmarksLoaded && favoritesLoaded) {
        setIsLoaded(true);
      }
    };

    // Listen to feeds
    const feedsRef = collection(db, 'users', userId, 'feeds');
    const unsubFeeds = onSnapshot(feedsRef, (snap) => {
      const data = snap.docs.map((d) => d.data() as FeedSource);
      setFeeds(data);
      feedsLoaded = true;
      checkAllLoaded();
    });

    // Listen to bookmarks
    const bookmarksRef = collection(db, 'users', userId, 'bookmarks');
    const unsubBookmarks = onSnapshot(query(bookmarksRef, orderBy('savedAt', 'desc')), (snap) => {
      const data = snap.docs.map((d) => d.data() as BookmarkedArticle);
      setBookmarks(data);
      bookmarksLoaded = true;
      checkAllLoaded();
    });

    // Listen to favorites
    const favoritesRef = collection(db, 'users', userId, 'favorites');
    const unsubFavorites = onSnapshot(query(favoritesRef, orderBy('savedAt', 'desc')), (snap) => {
      const data = snap.docs.map((d) => d.data() as BookmarkItem);
      setFavorites(data);
      favoritesLoaded = true;
      checkAllLoaded();
    });

    return () => {
      unsubFeeds();
      unsubBookmarks();
      unsubFavorites();
    };
  }, [userId]);

  // Feed actions
  const addFeed = useCallback(async (feed: FeedSource) => {
    const ref = doc(db, 'users', userId, 'feeds', feed.id);
    await setDoc(ref, feed);
  }, [userId]);

  const removeFeed = useCallback(async (feedId: string) => {
    const ref = doc(db, 'users', userId, 'feeds', feedId);
    await deleteDoc(ref);
  }, [userId]);

  const updateFeed = useCallback(async (feedId: string, updates: Partial<FeedSource>) => {
    const ref = doc(db, 'users', userId, 'feeds', feedId);
    await setDoc(ref, updates, { merge: true });
  }, [userId]);

  // Bookmark actions
  const addBookmark = useCallback(async (article: Omit<BookmarkedArticle, 'savedAt'>) => {
    const safeId = encodeURIComponent(article.id);
    const ref = doc(db, 'users', userId, 'bookmarks', safeId);
    await setDoc(ref, { ...article, savedAt: Date.now() });
  }, [userId]);

  const removeBookmark = useCallback(async (id: string) => {
    const safeId = encodeURIComponent(id);
    const ref = doc(db, 'users', userId, 'bookmarks', safeId);
    await deleteDoc(ref);
  }, [userId]);

  const isBookmarked = useCallback((id: string) => {
    return bookmarks.some((b) => b.id === id);
  }, [bookmarks]);

  // Favorite actions
  const addFavorite = useCallback(async (item: BookmarkItem) => {
    const safeId = encodeURIComponent(item.id);
    const ref = doc(db, 'users', userId, 'favorites', safeId);
    await setDoc(ref, item);
  }, [userId]);

  const removeFavorite = useCallback(async (id: string) => {
    const safeId = encodeURIComponent(id);
    const ref = doc(db, 'users', userId, 'favorites', safeId);
    await deleteDoc(ref);
  }, [userId]);

  const isFavorite = useCallback((id: string) => {
    return favorites.some((f) => f.id === id);
  }, [favorites]);

  return {
    feeds,
    bookmarks,
    favorites,
    isLoaded,
    addFeed,
    removeFeed,
    updateFeed,
    addBookmark,
    removeBookmark,
    isBookmarked,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
