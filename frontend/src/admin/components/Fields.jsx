import React from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export const Section = ({ title, description, children, actions }) => (
  <div className="max-w-4xl mx-auto px-6 py-8">
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && <p className="text-white/60 text-sm mt-1 max-w-2xl">{description}</p>}
      </div>
      {actions}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

export const Card = ({ children, className = '' }) => (
  <div className={`bg-[#13151b] border border-white/10 rounded-xl p-5 ${className}`}>{children}</div>
);

export const Field = ({ label, value, onChange, type = 'text', placeholder, hint, multiline, min, max, step }) => (
  <label className="block">
    {label && <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">{label}</span>}
    {multiline ? (
      <textarea value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3}
        className="mt-1.5 w-full bg-[#0a0b0f] border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00d4ff] transition-colors" />
    ) : (
      <input type={type} value={value ?? ''} onChange={(e) => onChange(type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)}
        placeholder={placeholder} min={min} max={max} step={step}
        className="mt-1.5 w-full bg-[#0a0b0f] border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00d4ff] transition-colors" />
    )}
    {hint && <span className="text-[11px] text-white/40 mt-1 block">{hint}</span>}
  </label>
);

export const ColorField = ({ label, value, onChange }) => (
  <label className="block">
    {label && <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">{label}</span>}
    <div className="mt-1.5 flex items-center gap-2 bg-[#0a0b0f] border border-white/15 rounded-lg px-2 py-1.5 focus-within:border-[#00d4ff] transition-colors">
      <input type="color" value={value || '#000000'} onChange={(e) => onChange(e.target.value)} className="w-10 h-8 rounded cursor-pointer bg-transparent border border-white/10" />
      <input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="#000000" className="flex-1 bg-transparent py-1 text-sm text-white focus:outline-none font-mono" />
    </div>
  </label>
);

export const SelectField = ({ label, value, onChange, options }) => (
  <label className="block">
    {label && <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">{label}</span>}
    <select value={value || ''} onChange={(e) => onChange(e.target.value)}
      className="mt-1.5 w-full bg-[#0a0b0f] border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d4ff] transition-colors">
      {options.map((o) => (
        <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
          {typeof o === 'string' ? o : o.label}
        </option>
      ))}
    </select>
  </label>
);

export const ToggleField = ({ label, value, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none py-2">
    <button type="button" onClick={() => onChange(!value)} className={`w-10 h-6 rounded-full transition-colors flex items-center ${value ? 'bg-[#00d4ff] justify-end' : 'bg-white/15 justify-start'}`}>
      <span className="w-5 h-5 bg-white rounded-full mx-0.5 shadow" />
    </button>
    <span className="text-sm text-white/85">{label}</span>
  </label>
);

// Simple style editor for an item style block { bg, text, accent, border, radius }
export const StyleEditor = ({ value, onChange }) => {
  const v = value || {};
  const set = (k, val) => onChange({ ...v, [k]: val });
  return (
    <details className="mt-3 border border-white/10 rounded-lg overflow-hidden">
      <summary className="px-4 py-2.5 text-xs font-semibold text-white/70 uppercase tracking-wider cursor-pointer hover:bg-white/5">
        Style overrides
      </summary>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3 bg-[#0a0b0f]">
        <ColorField label="Background" value={v.bg} onChange={(x) => set('bg', x)} />
        <ColorField label="Text" value={v.text} onChange={(x) => set('text', x)} />
        <ColorField label="Accent" value={v.accent} onChange={(x) => set('accent', x)} />
        <ColorField label="Border" value={v.border} onChange={(x) => set('border', x)} />
        <Field label="Radius" value={v.radius} onChange={(x) => set('radius', x)} placeholder="12px" />
      </div>
    </details>
  );
};

// List editor with add / remove / reorder
export const ListEditor = ({ items, onChange, renderItem, newItem, addLabel = 'Add row', allowReorder = true }) => {
  const remove = (i) => {
    const next = [...items];
    next.splice(i, 1);
    onChange(next);
  };
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = () => onChange([...(items || []), typeof newItem === 'function' ? newItem() : { ...newItem }]);
  const update = (i, val) => {
    const next = [...items];
    next[i] = val;
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {(items || []).map((item, i) => (
        <div key={i} className="bg-[#13151b] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">#{i + 1}</span>
            <div className="flex items-center gap-1">
              {allowReorder && (
                <>
                  <button onClick={() => move(i, -1)} className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white" title="Move up"><ArrowUp className="w-4 h-4" /></button>
                  <button onClick={() => move(i, 1)} className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white" title="Move down"><ArrowDown className="w-4 h-4" /></button>
                </>
              )}
              <button onClick={() => remove(i)} className="p-1.5 rounded hover:bg-red-500/20 text-red-400" title="Delete"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
          {renderItem(item, (val) => update(i, val), i)}
        </div>
      ))}
      <button onClick={add} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/20 hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 text-white/70 hover:text-[#00d4ff] transition-colors text-sm">
        <Plus className="w-4 h-4" /> {addLabel}
      </button>
    </div>
  );
};
