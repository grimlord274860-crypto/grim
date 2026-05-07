import React from 'react';
import { Section, Card, Field, ColorField, ListEditor } from '../components/Fields';
import { useDraft } from '../DraftContext';

const HeaderEditor = () => {
  const { draft, updateDraft } = useDraft();
  const h = draft.header || {};
  const set = (k, v) => updateDraft((d) => ({ ...d, header: { ...d.header, [k]: v } }));

  return (
    <Section title="Header" description="The top promo bar and main navigation.">
      <Card>
        <h3 className="text-lg font-bold mb-4">Promo bar</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <Field label="Promo text" value={h.promoText} onChange={(v) => set('promoText', v)} />
          </div>
          <ColorField label="Background" value={h.promoBg} onChange={(v) => set('promoBg', v)} />
          <ColorField label="Text color" value={h.promoTextColor} onChange={(v) => set('promoTextColor', v)} />
        </div>
      </Card>
      <Card>
        <h3 className="text-lg font-bold mb-2">Navigation links</h3>
        <p className="text-white/55 text-xs mb-4">Use "/path" for internal pages, "#hash" or full URL for external.</p>
        <ListEditor
          items={h.navLinks || []}
          onChange={(items) => set('navLinks', items)}
          newItem={{ label: 'New Link', href: '#' }}
          addLabel="Add nav link"
          renderItem={(item, update) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Label" value={item.label} onChange={(v) => update({ ...item, label: v })} />
              <Field label="Href / URL" value={item.href} onChange={(v) => update({ ...item, href: v })} />
            </div>
          )}
        />
      </Card>
    </Section>
  );
};

export default HeaderEditor;
