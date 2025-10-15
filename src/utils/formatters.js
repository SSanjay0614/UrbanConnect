export function formatDate(dateInput) {
  const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatNumber(n, options = {}) {
  return new Intl.NumberFormat(undefined, options).format(n);
}

export function truncate(text, max = 120) {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

