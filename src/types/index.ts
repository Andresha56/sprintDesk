export enum Status {
  Backlog = 'backlog',
  InProgress = 'progress',
  Review = 'review',
  Done = 'done',
}
export enum Priority {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}
export type user ={
  id: number,
	name: string,
	email: string,
	avatar: string,
}
export type Task = {
  id: string
  assigneeId:number
  title: string
  description: string
  status: Status
  priority: Priority
  assignee: user | null
  dueDate: string
  comments: string[]
  updatedAt: string
}

export type Notice = {
  id: number
  title: string
  body: string
  read: boolean
  createdAt: string
}

export  interface TaskFormData  {
  title: string;
  priority: Priority;
  assignee: string;
  dueDate: string;
  description: string;
  status: Status;
};
