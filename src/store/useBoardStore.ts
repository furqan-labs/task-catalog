import { useEffect, useReducer } from 'react';
import { boardReducer, createInitialState } from './boardReducer';
import type { BoardState } from '../types';

const STORAGE_KEY = 'task-catalog-board-v1';

function loadFromStorage(): BoardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw) as BoardState;
    // Basic shape validation so corrupted/old data doesn't crash the app
    if (!parsed.columns || !parsed.tasks || typeof parsed.nextIndex !== 'number') {
      return createInitialState();
    }
    return parsed;
  } catch {
    return createInitialState();
  }
}

export function useBoardStore() {
  const [state, dispatch] = useReducer(boardReducer, undefined, loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage may be unavailable (private browsing, quota exceeded, etc).
      // The board still works in-memory for the session.
    }
  }, [state]);

  return { state, dispatch };
}
