import { Status } from '../types'

export const columns: { id: Status; label: string; color: string }[] = [
  { id: Status.Backlog, label: 'Backlog', color: '#a6a29b' },
  { id: Status.InProgress, label: 'In progress', color: '#ef765d' },
  { id: Status.Review, label: 'Review', color: '#d8ad4a' },
  { id: Status.Done, label: 'Done', color: '#54a886' },
]

export const initials = (name: string) => name?.split(' ').map((part) => part[0]).join('')
