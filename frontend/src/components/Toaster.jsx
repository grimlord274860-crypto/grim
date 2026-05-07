import React, { useEffect, useState } from 'react';
import { CheckCircle2, X, AlertCircle } from 'lucide-react';

let pushFn = null;

export const toast = (msg, type = 'success') => {
  if (pushFn) pushFn({ msg, type });
};

const Toaster = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    pushFn = (item) => {
      const id = Date.now() + Math.random();
      setItems((arr) => [...arr, { ...item, id }]);
      setTimeout(() => setItems((arr) => arr.filter((x) => x.id !== id)), 3000);
    };
    return () => { pushFn = null; };
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
      {items.map((it) => (
        <div
          key={it.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl text-sm font-semibold animate-slide-in"
          style={it.type === 'error' ? { background: '#ef4444', color: '#fff' } : { background: '#10b981', color: '#000' }}
        >
          {it.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>{it.msg}</span>
          <button onClick={() => setItems((arr) => arr.filter((x) => x.id !== it.id))} className="opacity-60 hover:opacity-100">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toaster;
