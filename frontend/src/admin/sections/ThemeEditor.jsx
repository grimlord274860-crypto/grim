import React from 'react';
import { Section, Card, Field, ColorField, SelectField } from '../components/Fields';
import { useDraft } from '../DraftContext';

const FONTS = ['Inter', 'Poppins', 'Roboto', 'Manrope', 'Plus Jakarta Sans', 'Space Grotesk'];
const LOGO_ICONS = ['Boxes', 'BarChart3', 'TrendingUp', 'Cpu', 'Zap', 'Star'];

const ThemeEditor = () => {
  const { draft, updateDraft } = useDraft();
  const setTheme = (k, v) => updateDraft((d) => ({ ...d, theme: { ...d.theme, [k]: v } }));
  const setBrand = (k, v) => updateDraft((d) => ({ ...d, brand: { ...d.brand, [k]: v } }));
  const t = draft.theme || {};
  const b = draft.brand || {};

  return (
    <Section title="Theme & Brand" description="Site-wide defaults. Per-section overrides are inside each section's editor.">
      <Card>
        <h3 className="text-lg font-bold mb-4">Brand</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Brand name" value={b.name} onChange={(v) => setBrand('name', v)} />
          <SelectField label="Logo icon" value={b.logoIcon} onChange={(v) => setBrand('logoIcon', v)} options={LOGO_ICONS} />
          <div className="md:col-span-2">
            <Field label="Tagline" value={b.tagline} onChange={(v) => setBrand('tagline', v)} multiline />
          </div>
        </div>
      </Card>
      <Card>
        <h3 className="text-lg font-bold mb-4">Default colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ColorField label="Primary (neon)" value={t.primaryColor} onChange={(v) => setTheme('primaryColor', v)} />
          <ColorField label="Background" value={t.backgroundColor} onChange={(v) => setTheme('backgroundColor', v)} />
          <ColorField label="Card surface" value={t.surfaceColor} onChange={(v) => setTheme('surfaceColor', v)} />
          <ColorField label="Text" value={t.textColor} onChange={(v) => setTheme('textColor', v)} />
          <ColorField label="Muted text" value={t.mutedTextColor} onChange={(v) => setTheme('mutedTextColor', v)} />
          <ColorField label="Border" value={t.borderColor} onChange={(v) => setTheme('borderColor', v)} />
        </div>
      </Card>
      <Card>
        <h3 className="text-lg font-bold mb-4">Shape & Typography</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Card radius" value={t.radius} onChange={(v) => setTheme('radius', v)} placeholder="12px" />
          <Field label="Button radius" value={t.buttonRadius} onChange={(v) => setTheme('buttonRadius', v)} placeholder="8px" />
          <SelectField label="Font family" value={t.font} onChange={(v) => setTheme('font', v)} options={FONTS} />
        </div>
      </Card>
    </Section>
  );
};

export default ThemeEditor;
