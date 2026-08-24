import { useEffect } from 'react'
import { AppRouter } from './app/AppRouter'
import { useTasksQuery } from './query'
import { useBoardStore } from './store/useBoardStore'

function TaskCacheSync() {
  const { data: tasks } = useTasksQuery()
  const setTasks = useBoardStore((state) => state.setTasks)

  useEffect(() => {
    if (tasks) {
      setTasks(tasks)
    }
  }, [setTasks, tasks])

  return null
}

export default function App() {
  return <>
    <TaskCacheSync />
    <AppRouter />
  </>
} 
