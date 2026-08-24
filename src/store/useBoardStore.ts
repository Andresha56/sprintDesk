import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Notice,
  Status,
  Task,
  TaskFormData,
} from '../types';

interface BoardState {
  tasks: Task[];
  notices: Notice[];
  theme: 'light' | 'dark';

  setTasks: (tasks: Task[]) => void;

  setTheme: (theme: 'light' | 'dark') => void;
  addTask: (task: TaskFormData) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: Status) => void;
  addComment: (id: string, comment: string) => void;

  markRead: (id: number) => void;
  markAllRead: () => void;
  addNotice: (notice: Notice) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      tasks: [],
      notices: [],

      theme: 'light',

      setTasks: (tasks) => set({ tasks }),
      setTheme: (theme) => set({ theme }),

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: `SD-${110 + state.tasks.length}`,
              assigneeId: 0,
              assignee: {
                id: 0,
                name: task.assignee,
                email: '',
                avatar: '',
              },
              comments: [],
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateTask: (id, patch) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...patch,
                }
              : task,
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter(
            (task) => task.id !== id,
          ),
        })),

      moveTask: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status,
                }
              : task,
          ),
        })),

      addComment: (id, comment) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  comments: [...task.comments, comment],
                }
              : task,
          ),
        })),

      markRead: (id) =>
        set((state) => ({
          notices: state.notices.map((notice) =>
            notice.id === id
              ? {
                  ...notice,
                  read: true,
                }
              : notice,
          ),
        })),

      markAllRead: () =>
        set((state) => ({
          notices: state.notices.map((notice) => ({
            ...notice,
            read: true,
          })),
        })),

      addNotice: (notice) =>
        set((state) => ({
          notices: [
            notice,
            ...state.notices.filter(
              (item) => item.id !== notice.id,
            ),
          ],
        })),
    }),

    {
      name: 'sprintdesk-preferences',

      partialize: (state) => ({
        theme: state.theme,
        notices: state.notices,
      }),
    },
  ),
);
