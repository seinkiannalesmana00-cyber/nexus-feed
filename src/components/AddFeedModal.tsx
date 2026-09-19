import { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { FeedSource } from '@/config/feeds';
import toast from 'react-hot-toast';

interface AddFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFeed: (feed: FeedSource) => Promise<void>;
}

export default function AddFeedModal({ isOpen, onClose, onAddFeed }: AddFeedModalProps) {

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<FeedSource['platform']>('web_forum');
  const [scope, setScope] = useState<FeedSource['scope']>('lokal');
  const [pillar, setPillar] = useState<FeedSource['pillar']>('intersection');
  
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<'success' | 'error' | null>(null);

  if (!isOpen) return null;

  const validateFeed = async () => {
    if (!url) return;
    setIsValidating(true);
    setValidationResult(null);
    try {
      const res = await fetch(`/api/feed?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (res.ok && data.items && !data.error) {
        setValidationResult('success');
        toast.success('URL Valid! Siap ditambahkan.');
      } else {
        setValidationResult('error');
        toast.error('Gagal memuat atau mem-parsing XML feed.');
      }
    } catch (e) {
      setValidationResult('error');
      toast.error('Gagal menghubungi server.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;

    const newFeed: FeedSource = {
      id: `custom-${Date.now()}`,
      name,
      url,
      platform,
      scope,
      pillar,
      categoryLabel: 'Custom Feed',
      isCustom: true,
    };

    await onAddFeed(newFeed);
    toast.success('Sumber Feed Berhasil Ditambahkan!');
    onClose();
    
    // Reset form
    setName('');
    setUrl('');
    setPlatform('web_forum');
    setScope('lokal');
    setPillar('intersection');
    setValidationResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Tambah Feed Baru</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto flex flex-col gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Nama Sumber</label>
            <input
              type="text"
              required
              placeholder="e.g. IGN Southeast Asia"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-shadow"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">URL RSS Feed</label>
            <div className="flex gap-2">
              <input
                type="url"
                required
                placeholder="https://example.com/rss"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setValidationResult(null); }}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-shadow"
              />
              <button
                type="button"
                onClick={validateFeed}
                disabled={isValidating || !url}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors disabled:opacity-50"
              >
                {isValidating ? 'Cek...' : 'Cek URL'}
              </button>
            </div>
            {validationResult === 'success' && (
              <p className="text-emerald-600 text-xs flex items-center gap-1 mt-1 font-medium"><CheckCircle className="h-3.5 w-3.5" /> Feed valid & dapat diakses!</p>
            )}
            {validationResult === 'error' && (
              <p className="text-rose-600 text-xs flex items-center gap-1 mt-1 font-medium"><AlertCircle className="h-3.5 w-3.5" /> Gagal memuat feed. Periksa URL.</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Kategori Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="web_forum">Web Editorial & Forum</option>
              <option value="reddit">Reddit (.rss)</option>
              <option value="social">Media Sosial (X, Facebook, Threads)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Cakupan Wilayah</label>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="lokal">Lokal (Indonesia)</option>
              <option value="global">Global (Internasional)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Fokus Pilar Topik</label>
            <select
              value={pillar}
              onChange={(e) => setPillar(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="intersection">Irisan Gaming & Budaya Internet</option>
              <option value="gaming">Fokus Gaming & Industri</option>
              <option value="internet_culture">Fokus Budaya Internet & Meme</option>
            </select>
          </div>

          <div className="pt-5 mt-2 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-transparent rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
            >
              Simpan Feed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
