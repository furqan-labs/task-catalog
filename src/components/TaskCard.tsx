import { useState } from 'react';
import type { Task, Priority } from '../types';
import { PRIORITY_DOT_CLASSES, PRIORITY_LABELS, formatCatalogNumber, formatDate } from '../utils/format';
import { TaskForm } from './TaskForm';

interface TaskCardProps {
  task: Task;
  onEdit: (id: string, title: string, description: string, priority: Priority) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export function TaskCard({ task, onEdit, onDelete, onDragStart }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  if (isEditing) {
    return (
      <TaskForm
        initialTitle={task.title}
        initialDescription={task.description}
        initialPriority={task.priority}
        submitLabel="Save changes"
        onSubmit={(title, description, priority) => {
          onEdit(task.id, title, description, priority);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="group cursor-grab active:cursor-grabbing rounded-sm border border-line dark:border-line-dark
                 bg-card dark:bg-card-dark p-3 shadow-[2px_2px_0_0_rgba(31,42,58,0.06)]
                 dark:shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]
                 transition-transform hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[11px] tracking-wide text-muted dark:text-muted-dark">
          {formatCatalogNumber(task.index)}
        </span>
        <span
          className={`mt-1 h-2 w-2 shrink-0 rounded-full ${PRIORITY_DOT_CLASSES[task.priority]}`}
          title={`${PRIORITY_LABELS[task.priority]} priority`}
        />
      </div>

      <h3 className="mt-1 font-display text-[15px] font-medium leading-snug text-ink dark:text-ink-dark">
        {task.title}
      </h3>

      {task.description && (
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted dark:text-muted-dark">
          {task.description}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-line dark:border-line-dark pt-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted dark:text-muted-dark">
          {formatDate(task.createdAt)}
        </span>

        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          {confirmingDelete ? (
            <>
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className="rounded px-1.5 py-0.5 font-mono text-[10px] uppercase text-rust hover:underline"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="rounded px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted dark:text-muted-dark hover:underline"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                aria-label={`Edit ${task.title}`}
                className="rounded px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:underline"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                aria-label={`Delete ${task.title}`}
                className="rounded px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted dark:text-muted-dark hover:text-rust hover:underline"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
