import React from 'react';
import { Section, Card, Field, ListEditor, StyleEditor, SelectField, ColorField } from '../components/Fields';
import { useDraft } from '../DraftContext';

const ICONS = ['TrendingUp', 'Zap', 'Globe', 'BadgeCheck', 'ShieldCheck', 'Cpu', 'Star', 'Gift', 'Users', 'Sparkles'];

const HomeEditor = () => {
  const { draft, updateDraft } = useDraft();

  const setSection = (key, value) => updateDraft((d) => ({ ...d, [key]: typeof value === 'function' ? value(d[key]) : value }));

  const hero = draft.hero || {};
  const features = draft.features || { items: [] };
  const trusted = draft.trustedLogos || { items: [] };
  const proof = draft.proof || { images: [] };
  const profits = draft.profits || { images: [] };
  const reviewsSec = draft.reviewsSection || { items: [] };
  const faqs = draft.faqs || [];
  const cta = draft.cta || {};

  return (
    <Section title="Home Page" description="Edit every section of the homepage. Each item supports per-row style overrides.">
      {/* HERO */}
      <Card>
        <h3 className="text-lg font-bold mb-4">Hero</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Badge text" value={hero.badgeText} onChange={(v) => setSection('hero', { ...hero, badgeText: v })} />
          <Field label="Image URL" value={hero.image} onChange={(v) => setSection('hero', { ...hero, image: v })} />
          <Field label="Title" value={hero.title} onChange={(v) => setSection('hero', { ...hero, title: v })} />
          <Field label="Title accent (highlighted line)" value={hero.titleAccent} onChange={(v) => setSection('hero', { ...hero, titleAccent: v })} />
          <div className="md:col-span-2">
            <Field label="Subtitle" value={hero.subtitle} onChange={(v) => setSection('hero', { ...hero, subtitle: v })} multiline />
          </div>
          <Field label="Primary CTA label" value={hero.primaryCta?.label} onChange={(v) => setSection('hero', { ...hero, primaryCta: { ...(hero.primaryCta || {}), label: v } })} />
          <Field label="Primary CTA link" value={hero.primaryCta?.href} onChange={(v) => setSection('hero', { ...hero, primaryCta: { ...(hero.primaryCta || {}), href: v } })} />
          <Field label="Secondary CTA label" value={hero.secondaryCta?.label} onChange={(v) => setSection('hero', { ...hero, secondaryCta: { ...(hero.secondaryCta || {}), label: v } })} />
          <Field label="Secondary CTA link" value={hero.secondaryCta?.href} onChange={(v) => setSection('hero', { ...hero, secondaryCta: { ...(hero.secondaryCta || {}), href: v } })} />
        </div>
        <StyleEditor value={hero.style} onChange={(v) => setSection('hero', { ...hero, style: v })} />
      </Card>

      {/* FEATURES */}
      <Card>
        <h3 className="text-lg font-bold mb-2">Features</h3>
        <Field label="Section title" value={features.title} onChange={(v) => setSection('features', { ...features, title: v })} />
        <div className="mt-4">
          <ListEditor
            items={features.items || []}
            onChange={(items) => setSection('features', { ...features, items })}
            newItem={() => ({ title: 'New feature', icon: 'Star', description: '', style: { bg: '#13151b', text: '#ffffff', accent: '#00d4ff', border: '#ffffff1a', radius: '12px' } })}
            addLabel="Add feature"
            renderItem={(it, update) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Title" value={it.title} onChange={(v) => update({ ...it, title: v })} />
                <SelectField label="Icon" value={it.icon} onChange={(v) => update({ ...it, icon: v })} options={ICONS} />
                <div className="md:col-span-2">
                  <Field label="Description" value={it.description} onChange={(v) => update({ ...it, description: v })} multiline />
                </div>
                <div className="md:col-span-2">
                  <StyleEditor value={it.style} onChange={(v) => update({ ...it, style: v })} />
                </div>
              </div>
            )}
          />
        </div>
      </Card>

      {/* TRUSTED LOGOS */}
      <Card>
        <h3 className="text-lg font-bold mb-2">Trusted by</h3>
        <Field label="Section title" value={trusted.title} onChange={(v) => setSection('trustedLogos', { ...trusted, title: v })} />
        <div className="mt-4">
          <ListEditor
            items={trusted.items || []}
            onChange={(items) => setSection('trustedLogos', { ...trusted, items })}
            newItem={{ name: 'New brand', src: '' }}
            addLabel="Add logo"
            renderItem={(it, update) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Name" value={it.name} onChange={(v) => update({ ...it, name: v })} />
                <Field label="Image URL" value={it.src} onChange={(v) => update({ ...it, src: v })} />
              </div>
            )}
          />
        </div>
      </Card>

      {/* PROOF */}
      <Card>
        <h3 className="text-lg font-bold mb-2">Proof section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Title" value={proof.title} onChange={(v) => setSection('proof', { ...proof, title: v })} />
          <Field label="Subtitle" value={proof.subtitle} onChange={(v) => setSection('proof', { ...proof, subtitle: v })} />
          <div className="md:col-span-2">
            <Field label="Highlight line" value={proof.highlight} onChange={(v) => setSection('proof', { ...proof, highlight: v })} multiline />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Images</p>
          <ListEditor
            items={proof.images || []}
            onChange={(images) => setSection('proof', { ...proof, images })}
            newItem={() => ''}
            addLabel="Add image"
            renderItem={(url, update) => (
              <Field label="Image URL" value={url} onChange={(v) => update(v)} />
            )}
          />
        </div>
      </Card>

      {/* PROFITS */}
      <Card>
        <h3 className="text-lg font-bold mb-2">Profits carousel</h3>
        <Field label="Title" value={profits.title} onChange={(v) => setSection('profits', { ...profits, title: v })} />
        <div className="mt-4">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Images</p>
          <ListEditor
            items={profits.images || []}
            onChange={(images) => setSection('profits', { ...profits, images })}
            newItem={() => ''}
            addLabel="Add image"
            renderItem={(url, update) => <Field label="Image URL" value={url} onChange={(v) => update(v)} />}
          />
        </div>
      </Card>

      {/* REVIEWS */}
      <Card>
        <h3 className="text-lg font-bold mb-2">Reviews section</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Field label="Title" value={reviewsSec.title} onChange={(v) => setSection('reviewsSection', { ...reviewsSec, title: v })} />
          <Field label="Average rating" type="number" step="0.1" min={0} max={5} value={reviewsSec.averageRating} onChange={(v) => setSection('reviewsSection', { ...reviewsSec, averageRating: v })} />
          <Field label="Total reviews" type="number" min={0} value={reviewsSec.totalReviews} onChange={(v) => setSection('reviewsSection', { ...reviewsSec, totalReviews: v })} />
        </div>
        <div className="mt-4">
          <ListEditor
            items={reviewsSec.items || []}
            onChange={(items) => setSection('reviewsSection', { ...reviewsSec, items })}
            newItem={() => ({ name: 'New customer', date: 'Jan 1, 2026', rating: 5, text: '' })}
            addLabel="Add review"
            renderItem={(it, update) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field label="Name" value={it.name} onChange={(v) => update({ ...it, name: v })} />
                <Field label="Date" value={it.date} onChange={(v) => update({ ...it, date: v })} />
                <Field label="Rating" type="number" min={0} max={5} value={it.rating} onChange={(v) => update({ ...it, rating: v })} />
                <div className="md:col-span-3">
                  <Field label="Text" value={it.text} onChange={(v) => update({ ...it, text: v })} multiline />
                </div>
              </div>
            )}
          />
        </div>
      </Card>

      {/* FAQs */}
      <Card>
        <h3 className="text-lg font-bold mb-2">FAQs</h3>
        <ListEditor
          items={faqs}
          onChange={(items) => updateDraft((d) => ({ ...d, faqs: items }))}
          newItem={{ question: 'New question?', answer: '' }}
          addLabel="Add FAQ"
          renderItem={(it, update) => (
            <div className="space-y-3">
              <Field label="Question" value={it.question} onChange={(v) => update({ ...it, question: v })} />
              <Field label="Answer" value={it.answer} onChange={(v) => update({ ...it, answer: v })} multiline />
            </div>
          )}
        />
      </Card>

      {/* CTA */}
      <Card>
        <h3 className="text-lg font-bold mb-4">Final CTA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Title" value={cta.title} onChange={(v) => updateDraft((d) => ({ ...d, cta: { ...cta, title: v } }))} />
          <Field label="Subtitle" value={cta.subtitle} onChange={(v) => updateDraft((d) => ({ ...d, cta: { ...cta, subtitle: v } }))} />
          <Field label="Primary CTA label" value={cta.primaryCta?.label} onChange={(v) => updateDraft((d) => ({ ...d, cta: { ...cta, primaryCta: { ...(cta.primaryCta || {}), label: v } } }))} />
          <Field label="Primary CTA link" value={cta.primaryCta?.href} onChange={(v) => updateDraft((d) => ({ ...d, cta: { ...cta, primaryCta: { ...(cta.primaryCta || {}), href: v } } }))} />
          <Field label="Secondary CTA label" value={cta.secondaryCta?.label} onChange={(v) => updateDraft((d) => ({ ...d, cta: { ...cta, secondaryCta: { ...(cta.secondaryCta || {}), label: v } } }))} />
          <Field label="Secondary CTA link" value={cta.secondaryCta?.href} onChange={(v) => updateDraft((d) => ({ ...d, cta: { ...cta, secondaryCta: { ...(cta.secondaryCta || {}), href: v } } }))} />
        </div>
      </Card>
    </Section>
  );
};

export default HomeEditor;
