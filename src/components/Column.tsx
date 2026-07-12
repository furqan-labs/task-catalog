import { useState } from 'react';
import type { Column as ColumnType, Task, Priority } from '../types';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  isDropTarget: boolean;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent, columnId: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  onAddTask: (columnId: string, title: string, description: string, priority: Priority) => void;
  onEditTask: (id: string, title: string, description: string, priority: Priority) => void;
  onDeleteTask: (id: string) => void;
  onRenameColumn: (id: string, title: string) => void;
  onDeleteColumn: (id: string) => void;
  canDeleteColumn: boolean;
}

export function Column({
  column,
  tasks,
  isDropTarget,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onRenameColumn,
  onDeleteColumn,
  canDeleteColumn,
}: ColumnProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(column.title);

  function submitRename() {
    if (renameValue.trim()) {
      onRenameColumn(column.id, renameValue);
    } else {
      setRenameValue(column.title);
    }
    setIsRenaming(false);
  }

  return (
    <div className="flex w-72 shrink-0 flex-col">
      {/* Drawer tab label */}
      <div className="drawer-tab -mb-px w-fit min-w-[7rem] max-w-full bg-ink dark:bg-card-dark px-4 pb-2 pt-1.5">
        {isRenaming ? (
          <input
            autoFocus
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={submitRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitRename();
              if (e.key === 'Escape') {
                setRenameValue(column.title);
                setIsRenaming(false);
              }
            }}
            className="w-full bg-transparent font-mono text-xs font-medium uppercase tracking-wider
                       text-paper dark:text-ink-dark focus:outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsRenaming(true)}
            className="font-mono text-xs font-medium uppercase tracking-wider text-paper dark:text-ink-dark"
          >
            {column.title}
          </button>
        )}
      </div>

      {/* Drawer body */}
      <div
        onDragOver={(e) => onDragOver(e, column.id)}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, column.id)}
        className={`paper-texture flex min-h-[16rem] flex-1 flex-col gap-2 rounded-b-sm rounded-tr-sm
          border border-ink dark:border-line-dark bg-card/40 dark:bg-card-dark/40 p-2.5 transition-colors
          ${isDropTarget ? 'bg-mustard/10 dark:bg-mustard/10 border-mustard' : ''}`}
      >
        <div className="flex items-center justify-between px-0.5">
          <span className="font-mono text-[10px] text-muted dark:text-muted-dark">
            {tasks.length} {tasks.length === 1 ? 'card' : 'cards'}
          </span>
          {canDeleteColumn && (
            <button
              type="button"
              onClick={() => onDeleteColumn(column.id)}
              aria-label={`Delete ${column.title} drawer`}
              className="font-mono text-[10px] uppercase text-muted dark:text-muted-dark hover:text-rust hover:underline"
            >
              Remove
            </button>
          )}
        </div>

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onDragStart={onDragStart}
          />
        ))}

        {tasks.length === 0 && !isAdding && (
          <p className="px-0.5 py-1 font-mono text-[11px] italic text-muted dark:text-muted-dark">
            Empty drawer — file a card to get started.
          </p>
        )}

        {isAdding ? (
          <TaskForm
            submitLabel="Add card"
            onSubmit={(title, description, priority) => {
              onAddTask(column.id, title, description, priority);
              setIsAdding(false);
            }}
            onCancel={() => setIsAdding(false)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="mt-auto rounded-sm border border-dashed border-line dark:border-line-dark py-2
                       font-mono text-[11px] uppercase tracking-wide text-muted dark:text-muted-dark
                       transition-colors hover:border-ink dark:hover:border-ink-dark hover:text-ink dark:hover:text-ink-dark"
          >
            + New card
          </button>
        )}
      </div>
    </div>
  );
}
