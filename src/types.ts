export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  index: number; // sequential catalog number, e.g. 1, 2, 3...
  title: string;
  description: string;
  priority: Priority;
  columnId: string;
  createdAt: string; // ISO date string
}

export interface Column {
  id: string;
  title: string;
}

export interface BoardState {
  columns: Column[];
  tasks: Task[];
  nextIndex: number;
}

export type BoardAction =
  | { type: 'ADD_TASK'; payload: { columnId: string; title: string; description: string; priority: Priority } }
  | { type: 'EDIT_TASK'; payload: { id: string; title: string; description: string; priority: Priority } }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'MOVE_TASK'; payload: { id: string; toColumnId: string; toIndexInColumn?: number } }
  | { type: 'ADD_COLUMN'; payload: { title: string } }
  | { type: 'DELETE_COLUMN'; payload: { id: string } }
  | { type: 'RENAME_COLUMN'; payload: { id: string; title: string } }
  | { type: 'LOAD_STATE'; payload: BoardState };
