import { useState } from 'react';
import type { BoardState, Priority } from '../types';
import type { BoardAction } from '../types';
import { Column } from './Column';

interface BoardProps {
  state: BoardState;
  dispatch: React.Dispatch<BoardAction>;
}

export function Board({ state, dispatch }: BoardProps) {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dropTargetColumnId, setDropTargetColumnId] = useState<string | null>(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  function handleDragStart(e: React.DragEvent, taskId: string) {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e: React.DragEvent, columnId: string) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dropTargetColumnId !== columnId) setDropTargetColumnId(columnId);
  }

  function handleDragLeave() {
    setDropTargetColumnId(null);
  }

  function handleDrop(e: React.DragEvent, columnId: string) {
    e.preventDefault();
    if (draggedTaskId) {
      dispatch({ type: 'MOVE_TASK', payload: { id: draggedTaskId, toColumnId: columnId } });
    }
    setDraggedTaskId(null);
    setDropTargetColumnId(null);
  }

  function handleAddColumnSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newColumnTitle.trim()) {
      dispatch({ type: 'ADD_COLUMN', payload: { title: newColumnTitle } });
      setNewColumnTitle('');
    }
    setIsAddingColumn(false);
  }

  return (
    <div className="flex gap-5 overflow-x-auto pb-6 pt-1">
      {state.columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          tasks={state.tasks.filter((t) => t.columnId === column.id)}
          isDropTarget={dropTargetColumnId === column.id}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          canDeleteColumn={state.columns.length > 1}
          onAddTask={(columnId, title, description, priority: Priority) =>
            dispatch({ type: 'ADD_TASK', payload: { columnId, title, description, priority } })
          }
          onEditTask={(id, title, description, priority) =>
            dispatch({ type: 'EDIT_TASK', payload: { id, title, description, priority } })
          }
          onDeleteTask={(id) => dispatch({ type: 'DELETE_TASK', payload: { id } })}
          onRenameColumn={(id, title) => dispatch({ type: 'RENAME_COLUMN', payload: { id, title } })}
          onDeleteColumn={(id) => dispatch({ type: 'DELETE_COLUMN', payload: { id } })}
        />
      ))}

      <div className="w-72 shrink-0">
        {isAddingColumn ? (
          <form
            onSubmit={handleAddColumnSubmit}
            className="rounded-sm border border-dashed border-line dark:border-line-dark p-3"
          >
            <input
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              onBlur={() => !newColumnTitle.trim() && setIsAddingColumn(false)}
              placeholder="Drawer label"
              className="w-full bg-transparent font-mono text-xs uppercase tracking-wider text-ink dark:text-ink-dark
                         placeholder:text-muted dark:placeholder:text-muted-dark focus:outline-none"
            />
            <button
              type="submit"
              className="mt-2 font-mono text-[10px] uppercase tracking-wider text-rust hover:underline"
            >
              Add drawer
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setIsAddingColumn(true)}
            className="h-full min-h-[6rem] w-full rounded-sm border border-dashed border-line dark:border-line-dark
                       font-mono text-xs uppercase tracking-wide text-muted dark:text-muted-dark
                       transition-colors hover:border-ink dark:hover:border-ink-dark hover:text-ink dark:hover:text-ink-dark"
          >
            + New drawer
          </button>
        )}
      </div>
    </div>
  );
}
