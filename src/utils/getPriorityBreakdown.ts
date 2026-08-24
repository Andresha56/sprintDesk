import { Priority, Status, type Task } from '../types';

export interface PriorityData {
  name: Priority;
  Backlog: number;
  'In progress': number;
  Review: number;
  Done: number;
}

export const getPriorityData = (
  tasks: Task[],
): PriorityData[] => {
  return [Priority.High, Priority.Medium, Priority.Low].map(
    (priority) => ({
      name: priority,
      Backlog: tasks.filter(
        (task) =>
          task.priority === priority &&
          task.status === Status.Backlog,
      ).length,

      'In progress': tasks.filter(
        (task) =>
          task.priority === priority &&
          task.status === Status.InProgress,
      ).length,

      Review: tasks.filter(
        (task) =>
          task.priority === priority &&
          task.status === Status.Review,
      ).length,

      Done: tasks.filter(
        (task) =>
          task.priority === priority &&
          task.status === Status.Done,
      ).length,
    }),
  );
};