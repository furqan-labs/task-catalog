import type { Priority } from '../types';

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const PRIORITY_DOT_CLASSES: Record<Priority, string> = {
  low: 'bg-sage',
  medium: 'bg-mustard',
  high: 'bg-rust',
};

export function formatCatalogNumber(index: number): string {
  return `No. ${String(index).padStart(3, '0')}`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
