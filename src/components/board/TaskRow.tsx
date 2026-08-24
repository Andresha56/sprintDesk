import { Link } from 'react-router-dom';
import { Status, type Task } from '../../types';

type TaskRowProps = {
  task: Task;
};

export function TaskRow({ task }: TaskRowProps) {
  const priorityStyles = {
    high: 'bg-coral',
    medium: 'bg-gold',
    low: 'bg-[#a6a29b]',
  };

  return (
    <Link
      to={`/board?task=${task.id}`}
      className="grid grid-cols-[10px_1fr_auto_20px] items-center gap-[13px] border-t border-line px-6 py-3.5 text-xs hover:bg-wash"
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${priorityStyles[task.priority]}`}
      />

      <div>
        <b className="block">{task.title}</b>

        <small className="mt-1.5 block font-mono text-[10px] text-muted">
          {task.assignee?.name}
        </small>
      </div>

      <span className="font-mono text-[10px] text-muted">
        {task.status === Status.InProgress ? 'In progress' : task.status}
      </span>

      <span className="text-muted">↗</span>
    </Link>
  );
}
