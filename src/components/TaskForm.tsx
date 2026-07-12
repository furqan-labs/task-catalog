import { useState } from 'react';
import type { Priority } from '../types';
import { PRIORITY_LABELS } from '../utils/format';

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialPriority?: Priority;
  submitLabel: string;
  onSubmit: (title: string, description: string, priority: Priority) => void;
  onCancel: () => void;
}

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

export function TaskForm({
  initialTitle = '',
  initialDescription = '',
  initialPriority = 'medium',
  submitLabel,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState<Priority>(initialPriority);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, description, priority);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-line dark:border-line-dark bg-card dark:bg-card-dark p-3
                 shadow-[2px_2px_0_0_rgba(31,42,58,0.06)] dark:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]"
    >
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Card title"
        className="w-full bg-transparent font-display text-[15px] font-medium text-ink dark:text-ink-dark
                   placeholder:text-muted dark:placeholder:text-muted-dark focus:outline-none"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Notes (optional)"
        rows={2}
        className="mt-1.5 w-full resize-none bg-transparent text-[13px] leading-relaxed text-ink dark:text-ink-dark
                   placeholder:text-muted dark:placeholder:text-muted-dark focus:outline-none"
      />

      <div className="mt-2 flex items-center justify-between border-t border-dashed border-line dark:border-line-dark pt-2">
        <div className="flex gap-1">
          {PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide transition-colors
                ${
                  priority === p
                    ? 'border-ink dark:border-ink-dark text-ink dark:text-ink-dark'
                    : 'border-line dark:border-line-dark text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark'
                }`}
            >
              {PRIORITY_LABELS[p]}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="font-mono text-[10px] uppercase tracking-wider text-muted dark:text-muted-dark hover:underline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="font-mono text-[10px] uppercase tracking-wider text-rust hover:underline"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
