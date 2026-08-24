import { useQuery } from '@tanstack/react-query';
import { Priority, Status, type Task, type user } from '../types';

type ApiUser = user;

type ApiSprint = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
};

type ApiTask = Omit<Task, 'id' | 'assignee' | 'comments' | 'status'> & {
  id: number;
  status: 'backlog' | 'in-progress' | 'review' | 'done';
  sprintId: number;
};

type ApiComment = {
  taskId: number;
  message: string;
};

type DashboardResponse = {
  users: ApiUser[];
  sprints: ApiSprint[];
  tasks: ApiTask[];
  comments: ApiComment[];
};

const STATUS_MAP: Record<ApiTask['status'], Status> = {
  backlog: Status.Backlog,
  'in-progress': Status.InProgress,
  review: Status.Review,
  done: Status.Done,
};

// --- Single source fetch --------------------------------------------------

const fetchDashboardData = async (): Promise<DashboardResponse> => {
  const response = await fetch('/data.json');

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  return response.json() as Promise<DashboardResponse>;
};

export const dashboardQueryKey = ['dashboard'] as const;

const useDashboardQuery = <T,>(select: (data: DashboardResponse) => T) =>
  useQuery({
    queryKey: dashboardQueryKey,
    queryFn: fetchDashboardData,
    select,
  });

// --- Tasks -----------------------------------------------------------------

const toTasks = (data: DashboardResponse): Task[] => {
  const assignees = new Map(data.users.map((user) => [user.id, user]));

  return data.tasks.map((task) => ({
    id: String(task.id),
    assigneeId: task.assigneeId,
    sprintId: task.sprintId,
    title: task.title,
    description: task.description,
    status: STATUS_MAP[task.status],
    priority: task.priority as Priority,
    assignee: assignees.get(task.assigneeId) ?? null,
    dueDate: task.dueDate,
    updatedAt: task.updatedAt,
    comments: data.comments
      .filter((comment) => comment.taskId === task.id)
      .map((comment) => comment.message),
  }));
};

export const useTasksQuery = () => useDashboardQuery(toTasks);

// --- Sprints (raw list, e.g. for a filter dropdown) -------------------------

const toSprints = (data: DashboardResponse): ApiSprint[] => data.sprints;

export const useSprintsQuery = () => useDashboardQuery(toSprints);

// --- Sprint velocity: completed task count per sprint -----------------------

export type SprintVelocity = {
  name: string;
  value: number;
};

const toSprintVelocity = (data: DashboardResponse): SprintVelocity[] => {
  const completedCountBySprintId = new Map<number, number>();

  for (const task of data.tasks) {
    if (task.status !== 'done') continue;
    completedCountBySprintId.set(
      task.sprintId,
      (completedCountBySprintId.get(task.sprintId) ?? 0) + 1
    );
  }

  return data.sprints.map((sprint) => ({
    name: sprint.name,
    value: completedCountBySprintId.get(sprint.id) ?? 0,
  }));
};

export const useSprintVelocityQuery = () => useDashboardQuery(toSprintVelocity);