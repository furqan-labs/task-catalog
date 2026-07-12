import type { BoardState, BoardAction, Task } from '../types';

export const DEFAULT_COLUMNS = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

export function createInitialState(): BoardState {
  return {
    columns: DEFAULT_COLUMNS,
    tasks: [],
    nextIndex: 1,
  };
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'ADD_TASK': {
      const { columnId, title, description, priority } = action.payload;
      const trimmedTitle = title.trim();
      if (!trimmedTitle) return state;

      const newTask: Task = {
        id: makeId(),
        index: state.nextIndex,
        title: trimmedTitle,
        description: description.trim(),
        priority,
        columnId,
        createdAt: new Date().toISOString(),
      };

      return {
        ...state,
        tasks: [...state.tasks, newTask],
        nextIndex: state.nextIndex + 1,
      };
    }

    case 'EDIT_TASK': {
      const { id, title, description, priority } = action.payload;
      const trimmedTitle = title.trim();
      if (!trimmedTitle) return state;

      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, title: trimmedTitle, description: description.trim(), priority } : t
        ),
      };
    }

    case 'DELETE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.id),
      };
    }

    case 'MOVE_TASK': {
      const { id, toColumnId } = action.payload;
      const columnExists = state.columns.some((c) => c.id === toColumnId);
      if (!columnExists) return state;

      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, columnId: toColumnId } : t)),
      };
    }

    case 'ADD_COLUMN': {
      const trimmedTitle = action.payload.title.trim();
      if (!trimmedTitle) return state;

      const id = trimmedTitle.toLowerCase().replace(/\s+/g, '-') + '-' + makeId().slice(0, 4);

      return {
        ...state,
        columns: [...state.columns, { id, title: trimmedTitle }],
      };
    }

    case 'DELETE_COLUMN': {
      const { id } = action.payload;
      return {
        ...state,
        columns: state.columns.filter((c) => c.id !== id),
        tasks: state.tasks.filter((t) => t.columnId !== id),
      };
    }

    case 'RENAME_COLUMN': {
      const trimmedTitle = action.payload.title.trim();
      if (!trimmedTitle) return state;

      return {
        ...state,
        columns: state.columns.map((c) =>
          c.id === action.payload.id ? { ...c, title: trimmedTitle } : c
        ),
      };
    }

    case 'LOAD_STATE': {
      return action.payload;
    }

    default:
      return state;
  }
}
