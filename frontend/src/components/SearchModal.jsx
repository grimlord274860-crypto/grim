import React, { useEffect, useRef, useState } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiSearch } from '../api';

const SearchModal = ({ open, onClose }) => {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    if (!open) {
      setQ('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const id = setTimeout(async () => {
      try {
        const r = await apiSearch(q);
        if (!cancelled) setResults(r.data.results || []);
      } catch (e) {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [q, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-[#13151b] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b border-white/10">
          <Search className="w-5 h-5 text-white/60" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search indicators, plans, FAQs, pages..."
            className="flex-1 bg-transparent text-white placeholder-white/40 py-4 focus:outline-none"
          />
          <button onClick={onClose} className="text-white/60 hover:text-white p-2" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {loading && <div className="px-5 py-6 text-white/60 text-sm">Searching...</div>}
          {!loading && q.length >= 2 && results.length === 0 && (
            <div className="px-5 py-6 text-white/60 text-sm">No results for “{q}”</div>
          )}
          {!loading && q.length < 2 && (
            <div className="px-5 py-6 text-white/40 text-sm">Type at least 2 characters...</div>
          )}
          {results.map((r, i) => (
            <Link
              key={i}
              to={r.url}
              onClick={onClose}
              className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/5 border-b border-white/5 last:border-b-0 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                <Tag className="w-4 h-4 text-[#00d4ff]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#00d4ff] font-bold">{r.kind}</span>
                </div>
                <p className="text-white text-sm font-semibold mt-0.5 truncate">{r.title}</p>
                {r.subtitle && <p className="text-white/55 text-xs mt-0.5 truncate">{r.subtitle}</p>}
              </div>
              <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#00d4ff] mt-2" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
