interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group flex items-center gap-2 rounded-full border border-line dark:border-line-dark
                 bg-card dark:bg-card-dark px-3 py-1.5 font-mono text-xs uppercase tracking-wider
                 text-muted dark:text-muted-dark transition-colors hover:text-ink dark:hover:text-ink-dark"
    >
      <span
        className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors
          ${isDark ? 'bg-ink-dark' : 'bg-ink'}`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-paper dark:bg-paper-dark transition-transform
            ${isDark ? 'translate-x-4' : 'translate-x-0.5'}`}
        />
      </span>
      {isDark ? 'Night' : 'Day'}
    </button>
  );
}
