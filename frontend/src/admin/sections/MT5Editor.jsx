import React from 'react';
import { Section, Card, Field, ListEditor, StyleEditor, ToggleField, SelectField } from '../components/Fields';
import { useDraft } from '../DraftContext';

const ICONS = ['Cpu', 'Zap', 'Shield', 'Sparkles'];

const MT5Editor = () => {
  const { draft, updateDraft } = useDraft();
  const page = draft.mt5Page || {};
  const plans = draft.mt5Plans || [];
  const setPage = (k, v) => updateDraft((d) => ({ ...d, mt5Page: { ...d.mt5Page, [k]: v } }));
  const setPlans = (next) => updateDraft((d) => ({ ...d, mt5Plans: next }));

  return (
    <Section title="MT5 Integration" description="Page hero, how-it-works steps, pricing plans and stats.">
      <Card>
        <h3 className="text-lg font-bold mb-4">Page hero</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Badge" value={page.badge} onChange={(v) => setPage('badge', v)} />
          <Field label="Title accent" value={page.titleAccent} onChange={(v) => setPage('titleAccent', v)} />
          <div className="md:col-span-2">
            <Field label="Title" value={page.title} onChange={(v) => setPage('title', v)} />
          </div>
          <div className="md:col-span-2">
            <Field label="Subtitle" value={page.subtitle} onChange={(v) => setPage('subtitle', v)} multiline />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold mb-2">How it works</h3>
        <ListEditor
          items={page.howItWorks || []}
          onChange={(items) => setPage('howItWorks', items)}
          newItem={() => ({ icon: 'Cpu', title: '', text: '' })}
          addLabel="Add step"
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

      <Card>
        <h3 className="text-lg font-bold mb-2">Stats strip</h3>
        <ListEditor
          items={page.stats || []}
          onChange={(items) => setPage('stats', items)}
          newItem={() => ({ value: '', label: '' })}
          addLabel="Add stat"
          renderItem={(it, update) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Value" value={it.value} onChange={(v) => update({ ...it, value: v })} />
              <Field label="Label" value={it.label} onChange={(v) => update({ ...it, label: v })} />
            </div>
          )}
        />
      </Card>

      <Card>
        <h3 className="text-lg font-bold mb-2">Pricing plans</h3>
        <ListEditor
          items={plans}
          onChange={setPlans}
          newItem={() => ({
            id: 'plan-' + Date.now(),
            name: 'New Plan',
            signalsPerDay: 3,
            price: 99,
            period: 'month',
            description: '',
            features: [],
            popular: false,
            style: { bg: '#13151b', text: '#ffffff', accent: '#00d4ff', border: '#ffffff1a', radius: '16px' },
          })}
          addLabel="Add plan"
          renderItem={(plan, update) => (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field label="Plan name" value={plan.name} onChange={(v) => update({ ...plan, name: v })} />
                <Field label="Signals / day" type="number" min={0} value={plan.signalsPerDay} onChange={(v) => update({ ...plan, signalsPerDay: v })} />
                <Field label="ID (slug)" value={plan.id} onChange={(v) => update({ ...plan, id: v })} />
                <Field label="Price ($)" type="number" min={0} value={plan.price} onChange={(v) => update({ ...plan, price: v })} />
                <Field label="Period" value={plan.period} onChange={(v) => update({ ...plan, period: v })} placeholder="month" />
                <ToggleField label="Mark as Most Popular" value={!!plan.popular} onChange={(v) => update({ ...plan, popular: v })} />
                <div className="md:col-span-3">
                  <Field label="Description" value={plan.description} onChange={(v) => update({ ...plan, description: v })} multiline />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Features</p>
                <ListEditor
                  items={plan.features || []}
                  onChange={(features) => update({ ...plan, features })}
                  newItem={() => ''}
                  addLabel="Add feature"
                  renderItem={(t, upd) => <Field label="Feature" value={t} onChange={(v) => upd(v)} />}
                />
              </div>
              <StyleEditor value={plan.style} onChange={(v) => update({ ...plan, style: v })} />
            </div>
          )}
        />
      </Card>
    </Section>
  );
};

export default MT5Editor;
