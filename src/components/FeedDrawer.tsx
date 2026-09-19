"use client";

import { X, ExternalLink, Bookmark, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { useStore } from '@/store/useStore';
import { useEffect } from 'react';

interface FeedDrawerProps {
  article: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedDrawer({ article, isOpen, onClose }: FeedDrawerProps) {
  const isBookmarked = useStore((state) => article ? state.isBookmarked(article.link) : false);
  const addBookmark = useStore((state) => state.addBookmark);
  const removeBookmark = useStore((state) => state.removeBookmark);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !article) return null;

  const toggleBookmark = () => {
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

  const getRelativeTime = (dateStr: string) => {
    try {
      return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: id });
    } catch {
      return 'Beberapa waktu lalu';
    }
  };

  // Basic HTML sanitization or just injecting it safely for this prototype
  const contentMarkup = { __html: article.content || article.contentSnippet || 'Tidak ada konten detail.' };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-2xl bg-gray-950 shadow-2xl border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-gray-800 px-2.5 py-1 text-xs font-semibold text-indigo-400">
              {article.sourceName}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {getRelativeTime(article.pubDate)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleBookmark}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              title={isBookmarked ? "Hapus dari Idea Bank" : "Simpan ke Idea Bank"}
            >
              <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
            </button>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              title="Buka di tab baru"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors ml-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-6 leading-tight">
            {article.title}
          </h1>

          {article.thumbnail && (
            <div className="w-full rounded-xl overflow-hidden mb-8 border border-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.thumbnail} alt={article.title} className="w-full h-auto object-cover" />
            </div>
          )}

          <div 
            className="prose prose-invert prose-indigo max-w-none 
              prose-headings:font-bold prose-headings:text-gray-100 
              prose-p:text-gray-300 prose-p:leading-relaxed 
              prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline 
              prose-img:rounded-lg prose-img:mx-auto prose-img:border prose-img:border-gray-800
              prose-ul:text-gray-300 prose-li:marker:text-indigo-500"
            dangerouslySetInnerHTML={contentMarkup}
          />
          
          <div className="mt-12 pt-6 border-t border-gray-800 flex justify-center">
             <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors"
            >
              Baca Artikel Lengkap di Sumber <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
