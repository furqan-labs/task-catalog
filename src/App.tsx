import { useBoardStore } from './store/useBoardStore';
import { useTheme } from './store/useTheme';
import { Board } from './components/Board';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const { state, dispatch } = useBoardStore();
  const { theme, toggleTheme } = useTheme();

  const totalCards = state.tasks.length;

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-6xl px-6 pt-10 pb-6 sm:px-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted dark:text-muted-dark">
              Card Catalog · {totalCards} {totalCards === 1 ? 'entry' : 'entries'} filed
            </p>
            <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-ink dark:text-ink-dark sm:text-5xl">
              Task Catalog
            </h1>
            <p className="mt-2 max-w-md text-sm text-muted dark:text-muted-dark">
              A little drawer system for work in progress. Drag cards between drawers,
              file new ones, and everything stays put in this browser.
            </p>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 sm:px-10">
        <Board state={state} dispatch={dispatch} />
      </main>

      <footer className="mx-auto max-w-6xl px-6 pb-10 pt-4 sm:px-10">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted dark:text-muted-dark">
          Data lives only in this browser's local storage — nothing is sent anywhere.
        </p>
      </footer>
    </div>
  );
}

export default App;
