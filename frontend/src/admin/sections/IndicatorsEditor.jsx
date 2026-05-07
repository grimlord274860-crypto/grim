import React from 'react';
import { Section, Card, Field, ListEditor, StyleEditor } from '../components/Fields';
import { useDraft } from '../DraftContext';

const slugify = (s) => (s || '').toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const IndicatorsEditor = () => {
  const { draft, updateDraft } = useDraft();
  const page = draft.indicatorsPage || {};
  const items = draft.indicators || [];

  const setPage = (k, v) => updateDraft((d) => ({ ...d, indicatorsPage: { ...d.indicatorsPage, [k]: v } }));
  const setItems = (next) => updateDraft((d) => ({ ...d, indicators: next }));

  return (
    <Section title="Indicators" description="Page header and individual indicator cards. Each indicator has its own page with images, video, price, features and reviews.">
      <Card>
        <h3 className="text-lg font-bold mb-4">Page header</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Badge" value={page.badge} onChange={(v) => setPage('badge', v)} />
          <Field label="Title accent" value={page.titleAccent} onChange={(v) => setPage('titleAccent', v)} />
          <Field label="Title (full)" value={page.title} onChange={(v) => setPage('title', v)} />
          <Field label="Subtitle" value={page.subtitle} onChange={(v) => setPage('subtitle', v)} multiline />
        </div>
      </Card>

      <ListEditor
        items={items}
        onChange={setItems}
        newItem={() => ({
          id: `no-${items.length + 1}`,
          slug: `no-${items.length + 1}`,
          number: items.length + 1,
          name: `Indicator No. ${items.length + 1}`,
          tagline: '',
          description: '',
          longDescription: '',
          price: 29.95,
          originalPrice: 99.95,
          discount: '70%',
          rating: 5,
          reviewCount: 0,
          images: [''],
          videoId: '',
          features: [''],
          reviews: [],
          style: { bg: '#13151b', text: '#ffffff', accent: '#00d4ff', border: '#ffffff1a', radius: '12px' },
        })}
        addLabel="Add indicator"
        renderItem={(ind, update) => (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Number" type="number" value={ind.number} onChange={(v) => update({ ...ind, number: v })} />
              <Field label="Name" value={ind.name} onChange={(v) => update({ ...ind, name: v, slug: ind.slug || slugify(v) })} />
              <Field label="Slug (URL)" value={ind.slug} onChange={(v) => update({ ...ind, slug: slugify(v), id: slugify(v) })} hint="e.g. no-1, scalp-pro" />
              <div className="md:col-span-3">
                <Field label="Tagline (short headline)" value={ind.tagline} onChange={(v) => update({ ...ind, tagline: v })} />
              </div>
              <div className="md:col-span-3">
                <Field label="Short description (card preview)" value={ind.description} onChange={(v) => update({ ...ind, description: v })} multiline />
              </div>
              <div className="md:col-span-3">
                <Field label="Long description (detail page)" value={ind.longDescription} onChange={(v) => update({ ...ind, longDescription: v })} multiline />
              </div>
              <Field label="Price ($)" type="number" step="0.01" min={0} value={ind.price} onChange={(v) => update({ ...ind, price: v })} />
              <Field label="Original price ($)" type="number" step="0.01" min={0} value={ind.originalPrice} onChange={(v) => update({ ...ind, originalPrice: v })} />
              <Field label="Discount label" value={ind.discount} onChange={(v) => update({ ...ind, discount: v })} placeholder="80%" />
              <Field label="Rating (0-5)" type="number" step="0.1" min={0} max={5} value={ind.rating} onChange={(v) => update({ ...ind, rating: v })} />
              <Field label="Review count" type="number" min={0} value={ind.reviewCount} onChange={(v) => update({ ...ind, reviewCount: v })} />
              <Field label="YouTube Video ID" value={ind.videoId} onChange={(v) => update({ ...ind, videoId: v })} placeholder="e.g. FSS_VBSm-vs" />
            </div>

            <div>
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Images (URLs)</p>
              <ListEditor
                items={ind.images || []}
                onChange={(images) => update({ ...ind, images })}
                newItem={() => ''}
                addLabel="Add image"
                renderItem={(url, upd) => <Field label="URL" value={url} onChange={(v) => upd(v)} />}
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Features (bullet points)</p>
              <ListEditor
                items={ind.features || []}
                onChange={(features) => update({ ...ind, features })}
                newItem={() => ''}
                addLabel="Add feature"
                renderItem={(t, upd) => <Field label="Feature" value={t} onChange={(v) => upd(v)} />}
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Reviews (on detail page)</p>
              <ListEditor
                items={ind.reviews || []}
                onChange={(reviews) => update({ ...ind, reviews })}
                newItem={() => ({ name: '', date: '', rating: 5, text: '' })}
                addLabel="Add review"
                renderItem={(r, upd) => (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Field label="Name" value={r.name} onChange={(v) => upd({ ...r, name: v })} />
                    <Field label="Date" value={r.date} onChange={(v) => upd({ ...r, date: v })} />
                    <Field label="Rating" type="number" min={0} max={5} value={r.rating} onChange={(v) => upd({ ...r, rating: v })} />
                    <div className="md:col-span-3">
                      <Field label="Text" value={r.text} onChange={(v) => upd({ ...r, text: v })} multiline />
                    </div>
                  </div>
                )}
              />
            </div>

            <StyleEditor value={ind.style} onChange={(v) => update({ ...ind, style: v })} />
          </div>
        )}
      />
    </Section>
  );
};

export default IndicatorsEditor;
