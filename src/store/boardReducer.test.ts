import { describe, it, expect } from 'vitest';
import { boardReducer, createInitialState } from './boardReducer';

describe('boardReducer', () => {
  it('starts with default columns and no tasks', () => {
    const state = createInitialState();
    expect(state.columns).toHaveLength(4);
    expect(state.tasks).toHaveLength(0);
  });

  it('adds a task to the correct column with an incrementing catalog index', () => {
    let state = createInitialState();
    state = boardReducer(state, {
      type: 'ADD_TASK',
      payload: { columnId: 'backlog', title: 'Design landing page', description: '', priority: 'medium' },
    });
    state = boardReducer(state, {
      type: 'ADD_TASK',
      payload: { columnId: 'backlog', title: 'Write API docs', description: 'Cover all endpoints', priority: 'low' },
    });

    expect(state.tasks).toHaveLength(2);
    expect(state.tasks[0].index).toBe(1);
    expect(state.tasks[1].index).toBe(2);
    expect(state.tasks[0].columnId).toBe('backlog');
  });

  it('ignores adding a task with an empty title', () => {
    let state = createInitialState();
    state = boardReducer(state, {
      type: 'ADD_TASK',
      payload: { columnId: 'backlog', title: '   ', description: '', priority: 'low' },
    });
    expect(state.tasks).toHaveLength(0);
  });

  it('moves a task to another column', () => {
    let state = createInitialState();
    state = boardReducer(state, {
      type: 'ADD_TASK',
      payload: { columnId: 'backlog', title: 'Fix bug', description: '', priority: 'high' },
    });
    const taskId = state.tasks[0].id;

    state = boardReducer(state, {
      type: 'MOVE_TASK',
      payload: { id: taskId, toColumnId: 'done' },
    });

    expect(state.tasks[0].columnId).toBe('done');
  });

  it('does not move a task to a non-existent column', () => {
    let state = createInitialState();
    state = boardReducer(state, {
      type: 'ADD_TASK',
      payload: { columnId: 'backlog', title: 'Fix bug', description: '', priority: 'high' },
    });
    const taskId = state.tasks[0].id;

    state = boardReducer(state, {
      type: 'MOVE_TASK',
      payload: { id: taskId, toColumnId: 'nonexistent' },
    });

    expect(state.tasks[0].columnId).toBe('backlog');
  });

  it('edits a task', () => {
    let state = createInitialState();
    state = boardReducer(state, {
      type: 'ADD_TASK',
      payload: { columnId: 'backlog', title: 'Old title', description: 'Old desc', priority: 'low' },
    });
    const taskId = state.tasks[0].id;

    state = boardReducer(state, {
      type: 'EDIT_TASK',
      payload: { id: taskId, title: 'New title', description: 'New desc', priority: 'high' },
    });

    expect(state.tasks[0].title).toBe('New title');
    expect(state.tasks[0].priority).toBe('high');
  });

  it('deletes a task', () => {
    let state = createInitialState();
    state = boardReducer(state, {
      type: 'ADD_TASK',
      payload: { columnId: 'backlog', title: 'Temp task', description: '', priority: 'low' },
    });
    const taskId = state.tasks[0].id;

    state = boardReducer(state, { type: 'DELETE_TASK', payload: { id: taskId } });

    expect(state.tasks).toHaveLength(0);
  });

  it('adds a new column', () => {
    let state = createInitialState();
    state = boardReducer(state, { type: 'ADD_COLUMN', payload: { title: 'Blocked' } });

    expect(state.columns).toHaveLength(5);
    expect(state.columns[4].title).toBe('Blocked');
  });

  it('deletes a column and its tasks', () => {
    let state = createInitialState();
    state = boardReducer(state, { type: 'ADD_COLUMN', payload: { title: 'Temp Column' } });
    const newColumnId = state.columns[4].id;

    state = boardReducer(state, {
      type: 'ADD_TASK',
      payload: { columnId: newColumnId, title: 'Orphan task', description: '', priority: 'low' },
    });

    state = boardReducer(state, { type: 'DELETE_COLUMN', payload: { id: newColumnId } });

    expect(state.columns).toHaveLength(4);
    expect(state.tasks.find((t) => t.columnId === newColumnId)).toBeUndefined();
  });

  it('renames a column', () => {
    let state = createInitialState();
    state = boardReducer(state, {
      type: 'RENAME_COLUMN',
      payload: { id: 'backlog', title: 'Ideas' },
    });

    expect(state.columns.find((c) => c.id === 'backlog')?.title).toBe('Ideas');
  });
});
