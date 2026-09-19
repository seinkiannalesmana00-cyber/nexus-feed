"use client";

import { Bookmark, Star, Calendar } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatDistanceToNow } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

interface FeedCardProps {
  article: {
    title: string;
    link: string;
    pubDate: string;
    sourceName: string;
    contentSnippet?: string;
    thumbnail?: string;
  };
  onReadQuick: () => void;
  isSelected?: boolean;
}

export default function FeedCard({ article, onReadQuick, isSelected }: FeedCardProps) {
  const isBookmarked = useStore((state) => state.isBookmarked(article.link));
  const addBookmark = useStore((state) => state.addBookmark);
  const removeBookmark = useStore((state) => state.removeBookmark);

  const isFavorite = useStore((state) => state.isFavorite(article.link));
  const addFavorite = useStore((state) => state.addFavorite);
  const removeFavorite = useStore((state) => state.removeFavorite);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBookmarked) {
      removeBookmark(article.link);
    } else {
      addBookmark({
        id: article.link,
        title: article.title,
        link: article.link,
        pubDate: article.pubDate,
        sourceName: article.sourceName,
        contentSnippet: article.contentSnippet,
        thumbnail: article.thumbnail,
      });
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(article.link);
    } else {
      addFavorite({
        id: article.link,
        title: article.title,
        link: article.link,
        pubDate: article.pubDate,
        sourceName: article.sourceName,
        contentSnippet: article.contentSnippet,
        thumbnail: article.thumbnail,
        savedAt: Date.now(),
      });
    }
  };

  const formattedDate = formatDistanceToNow(new Date(article.pubDate), { 
    addSuffix: true,
    locale: localeId 
  });

  return (
    <div 
      className={`group relative flex flex-col bg-white border rounded-xl overflow-hidden cursor-pointer transition-colors ${
        isSelected ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/30' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }`}
      onClick={onReadQuick}
    >
      {/* Thumbnail */}
      {article.thumbnail ? (
        <div className="w-full h-40 bg-slate-100 overflow-hidden border-b border-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={article.thumbnail} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ) : (
        <div className="w-full h-2 bg-indigo-500/10"></div>
      )}

      {/* Content */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            {article.sourceName}
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={handleFavorite}
              className={`p-1.5 rounded-md transition-colors ${
                isFavorite 
                  ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' 
                  : 'text-slate-300 hover:text-amber-500 hover:bg-slate-50'
              }`}
              title={isFavorite ? "Hapus dari Favorit" : "Tambahkan ke Favorit"}
            >
              <Star className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={handleBookmark}
              className={`p-1.5 rounded-md transition-colors ${
                isBookmarked 
                  ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' 
                  : 'text-slate-300 hover:text-indigo-600 hover:bg-slate-50'
              }`}
              title={isBookmarked ? "Hapus dari Idea Bank" : "Simpan ke Idea Bank"}
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <h3 className="font-bold text-slate-900 text-base md:text-lg leading-tight mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        {article.contentSnippet && (
          <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
            {article.contentSnippet}
          </p>
        )}

        <div className="flex items-center text-xs font-medium text-slate-400 mt-auto pt-4 border-t border-slate-100/60">
          <Calendar className="w-3.5 h-3.5 mr-1.5" />
          {formattedDate}
        </div>
      </div>
    </div>
  );
}
