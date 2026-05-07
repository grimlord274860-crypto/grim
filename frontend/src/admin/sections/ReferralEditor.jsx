import React from 'react';
import { Section, Card, Field, ListEditor, SelectField } from '../components/Fields';
import { useDraft } from '../DraftContext';

const ICONS = ['Gift', 'Users', 'Star', 'Send', 'MessageCircle'];

const ReferralEditor = () => {
  const { draft, updateDraft } = useDraft();
  const page = draft.referralPage || {};
  const set = (k, v) => updateDraft((d) => ({ ...d, referralPage: { ...d.referralPage, [k]: v } }));

  return (
    <Section title="Referral Page" description="Edit the referral page hero, perks and Telegram links.">
      <Card>
        <h3 className="text-lg font-bold mb-4">Hero</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Badge" value={page.badge} onChange={(v) => set('badge', v)} />
          <Field label="Title accent" value={page.titleAccent} onChange={(v) => set('titleAccent', v)} />
          <div className="md:col-span-2">
            <Field label="Title" value={page.title} onChange={(v) => set('title', v)} />
          </div>
          <div className="md:col-span-2">
            <Field label="Subtitle" value={page.subtitle} onChange={(v) => set('subtitle', v)} multiline />
          </div>
        </div>
      </Card>
      <Card>
        <h3 className="text-lg font-bold mb-4">Telegram links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Join VIP Telegram URL" value={page.telegramUrl} onChange={(v) => set('telegramUrl', v)} placeholder="https://t.me/your-channel" />
          <Field label="Telegram share URL" value={page.telegramShareUrl} onChange={(v) => set('telegramShareUrl', v)} placeholder="https://t.me/share/url" />
        </div>
      </Card>
      <Card>
        <h3 className="text-lg font-bold mb-2">Perks</h3>
        <ListEditor
          items={page.perks || []}
          onChange={(perks) => set('perks', perks)}
          newItem={() => ({ icon: 'Gift', title: '', text: '' })}
          addLabel="Add perk"
          renderItem={(it, update) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <SelectField label="Icon" value={it.icon} onChange={(v) => update({ ...it, icon: v })} options={ICONS} />
              <Field label="Title" value={it.title} onChange={(v) => update({ ...it, title: v })} />
              <div className="md:col-span-3">
                <Field label="Text" value={it.text} onChange={(v) => update({ ...it, text: v })} multiline />
              </div>
            </div>
          )}
        />
      </Card>
    </Section>
  );
};

export default ReferralEditor;
