import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

import { TaskCard } from '../../components/board/TaskCard';
import { TaskDrawer } from '../../components/board/TaskDrawer';
import { TaskModal } from '../../components/board/TaskModal';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/reuseable-components/button';
import { columns } from '../../constants/board';
import { useBoardStore } from '../../store/useBoardStore';
import type { Task } from '../../types';

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export function BoardPage() {
  const tasks = useBoardStore((state) => state.tasks);
  const addTask = useBoardStore((state) => state.addTask);

  const [selected, setSelected] = useState<Task | null>(null);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState('');

  const visibleTasks = filter
    ? tasks.filter(
        (task) =>
          task.priority.toLowerCase() === filter.toLowerCase(),
      )
    : tasks;

  const members = [
    ...new Set(tasks.map((task) => task.assignee)),
  ];

  return (
    <>
      <PageHeader
        eyebrow={formatDate(new Date().toISOString())}
        title="Sprint board"
      >
        <div className="flex items-center gap-1.5 border border-line bg-panel px-2.5 py-2 text-muted">
          <Search size={15} />

          <input
            className="w-[135px] border-0 bg-transparent text-[11px] text-ink outline-none"
            placeholder="Filter by priority..."
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </div>

        <Button
          variant="primary"
          onClick={() => setAdding(true)}
        >
          <Plus size={16} />
          Add task
        </Button>
      </PageHeader>

      <div className="mb-[23px] flex flex-wrap items-center gap-[25px] font-mono text-[10px] text-muted">
        <span>
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          <b className="mx-1 text-line">·</b>
          Updated just now
        </span>

        {members && (
          <div className="ml-auto flex">
            {members.map((member) => (
              <img
                key={member?.id}
                src={member?.avatar}
                alt={member?.name}
                className="h-5 w-5 rounded-full object-cover"
              />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3.5 overflow-x-auto max-[650px]:mr-[-18px] max-[650px]:grid-cols-[repeat(4,minmax(230px,1fr))]">
        {columns.map((column) => {
          const columnTasks = visibleTasks.filter(
            (task) => task.status === column.id,
          );

          return (
            <section
              className="min-w-[230px]"
              key={column.id}
            >
              <div className="flex justify-between px-[3px] pb-3 font-mono text-xs font-medium">
                <span className="flex items-center gap-2">
                  <i
                    className="h-[7px] w-[7px] rounded-full"
                    style={{ background: column.color }}
                  />
                  {column.label}
                </span>

                <b className="font-normal text-muted">
                  {columnTasks.length}
                </b>
              </div>

              <div className="flex flex-col gap-2">
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => setSelected(task)}
                  />
                ))}

                {column.id === 'backlog' && (
                  <Button
                    variant="secondary"
                    className="justify-center border-dashed text-[11px] text-muted hover:border-coral hover:text-ink"
                    onClick={() => setAdding(true)}
                  >
                    <Plus size={15} />
                    Add task
                  </Button>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {selected && (
        <TaskDrawer
          task={
            tasks.find((task) => task.id === selected.id) ?? selected
          }
          onClose={() => setSelected(null)}
        />
      )}

      {adding && (
        <TaskModal
          onClose={() => setAdding(false)}
          onAdd={(task) => {
            addTask(task);
            setAdding(false);
          }}
        />
      )}
    </>
  );
}
