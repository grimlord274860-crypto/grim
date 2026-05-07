import React from 'react';
import { Section, Card, Field, ListEditor, SelectField } from '../components/Fields';
import { useDraft } from '../DraftContext';

const SOCIAL_ICONS = ['Twitter', 'Youtube', 'MessageCircle', 'Mail', 'Send'];

const FooterEditor = () => {
  const { draft, updateDraft } = useDraft();
  const f = draft.footer || {};
  const set = (k, v) => updateDraft((d) => ({ ...d, footer: { ...d.footer, [k]: v } }));

  return (
    <Section title="Footer" description="Description, socials, link columns and legal text.">
      <Card>
        <h3 className="text-lg font-bold mb-4">Top section</h3>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Description" value={f.description} onChange={(v) => set('description', v)} multiline />
          <Field label="Copyright suffix" value={f.copyright} onChange={(v) => set('copyright', v)} placeholder="All rights reserved." />
          <Field label="Disclaimer" value={f.disclaimer} onChange={(v) => set('disclaimer', v)} multiline />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold mb-2">Social links</h3>
        <ListEditor
          items={f.socials || []}
          onChange={(socials) => set('socials', socials)}
          newItem={() => ({ icon: 'Twitter', href: '#' })}
          addLabel="Add social"
          renderItem={(it, update) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SelectField label="Icon" value={it.icon} onChange={(v) => update({ ...it, icon: v })} options={SOCIAL_ICONS} />
              <Field label="Link" value={it.href} onChange={(v) => update({ ...it, href: v })} />
            </div>
          )}
        />
      </Card>

      <Card>
        <h3 className="text-lg font-bold mb-2">Footer columns</h3>
        <p className="text-white/55 text-xs mb-4">Add or remove columns and links inside each column.</p>
        <ListEditor
          items={f.columns || []}
          onChange={(columns) => set('columns', columns)}
          newItem={() => ({ title: 'New column', links: [] })}
          addLabel="Add column"
          renderItem={(col, update) => (
            <div className="space-y-3">
              <Field label="Column title" value={col.title} onChange={(v) => update({ ...col, title: v })} />
              <ListEditor
                items={col.links || []}
                onChange={(links) => update({ ...col, links })}
                newItem={() => ({ label: 'New link', href: '#' })}
                addLabel="Add link"
                renderItem={(it, upd) => (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Field label="Label" value={it.label} onChange={(v) => upd({ ...it, label: v })} />
                    <Field label="URL" value={it.href} onChange={(v) => upd({ ...it, href: v })} />
                  </div>
                )}
              />
            </div>
          )}
        />
      </Card>
    </Section>
  );
};

export default FooterEditor;
