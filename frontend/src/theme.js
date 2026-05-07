// Theme helper — applies content.theme to CSS variables on root element
// so all components can read --cr-primary etc.
export const applyTheme = (theme) => {
  if (!theme || typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--cr-primary', theme.primaryColor || '#00d4ff');
  root.style.setProperty('--cr-bg', theme.backgroundColor || '#0a0b0f');
  root.style.setProperty('--cr-surface', theme.surfaceColor || '#13151b');
  root.style.setProperty('--cr-text', theme.textColor || '#ffffff');
  root.style.setProperty('--cr-muted', theme.mutedTextColor || '#ffffffb3');
  root.style.setProperty('--cr-border', theme.borderColor || '#ffffff1a');
  root.style.setProperty('--cr-radius', theme.radius || '12px');
  root.style.setProperty('--cr-button-radius', theme.buttonRadius || '8px');
  if (theme.font) root.style.setProperty('--cr-font', theme.font);
};

// helpers to convert color hex → rgba/alpha or pass-through.
export const withOpacity = (color, alpha = 0.1) => {
  if (!color) return color;
  if (color.startsWith('rgba') || color.startsWith('hsl')) return color;
  // Hex with alpha already?
  if (/^#([0-9a-f]{8})$/i.test(color)) return color;
  // Convert hex to rgba.
  const m = color.match(/^#([0-9a-f]{6})$/i);
  if (!m) return color;
  const r = parseInt(m[1].slice(0, 2), 16);
  const g = parseInt(m[1].slice(2, 4), 16);
  const b = parseInt(m[1].slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
