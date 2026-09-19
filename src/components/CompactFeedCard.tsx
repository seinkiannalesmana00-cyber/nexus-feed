"use client";

import { Bookmark, Star, Calendar } from 'lucide-react';
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
  isBookmarked?: boolean;
  isFavorite?: boolean;
  onToggleBookmark?: (e: React.MouseEvent) => void;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

export default function CompactFeedCard({ 
  article, 
  onReadQuick, 
  isSelected,
  isBookmarked,
  isFavorite,
  onToggleBookmark,
  onToggleFavorite
}: FeedCardProps) {
  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleBookmark) onToggleBookmark(e);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(e);
  };

  const formattedDate = formatDistanceToNow(new Date(article.pubDate), { 
    addSuffix: true,
    locale: localeId 
  });

  return (
    <div 
      className={`group flex items-stretch bg-white border rounded-xl overflow-hidden cursor-pointer transition-colors ${
        isSelected ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/30' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }`}
      onClick={onReadQuick}
    >
      {/* Thumbnail Container */}
      <div className="w-28 sm:w-40 shrink-0 bg-slate-100 border-r border-slate-100 hidden sm:block relative">
        {article.thumbnail ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={article.thumbnail} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-slate-200 uppercase">{article.sourceName.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-indigo-600 uppercase tracking-wider truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
            <span className="truncate">{article.sourceName}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 shrink-0">
            <button 
              onClick={handleFavorite}
              className={`p-1.5 rounded-md transition-colors ${
                isFavorite 
                  ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' 
                  : 'text-slate-300 hover:text-amber-500 hover:bg-slate-50'
              }`}
              title={isFavorite ? "Hapus dari Favorit" : "Tambahkan ke Favorit"}
            >
              <Star className="w-3.5 h-3.5" fill={isFavorite ? "currentColor" : "none"} />
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
              <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        {article.contentSnippet && (
          <p className="text-xs text-slate-500 line-clamp-2 sm:line-clamp-2 mb-2">
            {article.contentSnippet}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center text-[10px] sm:text-xs font-medium text-slate-400">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
            {formattedDate}
          </div>
          
          <div className="flex sm:hidden items-center gap-1 shrink-0">
            <button 
              onClick={handleFavorite}
              className={`p-1.5 rounded-md transition-colors ${
                isFavorite 
                  ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' 
                  : 'text-slate-300 hover:text-amber-500 hover:bg-slate-50'
              }`}
            >
              <Star className="w-3.5 h-3.5" fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={handleBookmark}
              className={`p-1 rounded-md transition-colors ${
                isBookmarked 
                  ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' 
                  : 'text-slate-300 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
