import { X, Trash2, Rss } from 'lucide-react';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

interface ManageFeedsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManageFeedsModal({ isOpen, onClose }: ManageFeedsModalProps) {
  const customFeeds = useStore((state) => state.customFeeds);
  const removeCustomFeed = useStore((state) => state.removeCustomFeed);

  if (!isOpen) return null;

  const handleDelete = (id: string, name: string) => {
    removeCustomFeed(id);
    toast.success(`Feed "${name}" berhasil dihapus.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-slate-900">
            <Rss className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-semibold">Manajemen Custom Feeds</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 custom-scrollbar bg-slate-50/30">
          {customFeeds.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                <Rss className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">Belum ada custom feed</p>
              <p className="text-slate-400 text-sm mt-1">Gunakan tombol "Tambah Feed" untuk menambahkan sumber berita Anda sendiri.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {customFeeds.map((feed) => (
                <div key={feed.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-slate-300 transition-colors">
                  <div className="flex flex-col min-w-0 pr-4">
                    <h3 className="font-semibold text-slate-900 truncate">{feed.name}</h3>
                    <a href={feed.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 hover:underline truncate max-w-[250px] md:max-w-[300px] mt-0.5 block">
                      {feed.url}
                    </a>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {feed.platform}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {feed.scope}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(feed.id, feed.name)}
                    className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100 shrink-0"
                    title="Hapus Feed"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
