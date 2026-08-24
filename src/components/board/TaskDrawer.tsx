import {
  CalendarDays,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { columns } from '../../constants/board';
import { useBoardStore } from '../../store/useBoardStore';
import type { Status, Task } from '../../types';
import { Button } from '../reuseable-components/button';

type TaskDrawerProps = {
  task: Task;
  onClose: () => void;
};

export function TaskDrawer({
  task,
  onClose,
}: TaskDrawerProps) {
  const [comment, setComment] = useState('');

  const [status, setStatus] = useState<Status>(task.status);

  const addComment = useBoardStore((state) => state.addComment);
  const updateTask = useBoardStore((state) => state.updateTask);

  const priorityStyles = {
    high: 'bg-[#fae1da] text-[#c25540]',
    medium: 'bg-[#f8edcf] text-[#997526]',
    low: 'bg-[#e8e7e2] text-[#77756e]',
  };


  const field =
    'mt-1.5 block w-full border border-line bg-paper p-2.5 text-xs text-ink outline-coral';

  const handleSave = () => {
    updateTask(task.id, {
      status,
    });

    onClose();
  };

  const hasChanges = status !== task.status;

  return (
    <div
      className="fixed inset-0 z-10 bg-[#191a1688]"
      onClick={onClose}
    >
      <aside
        className="absolute bottom-0 right-0 top-0 w-[min(440px,100%)] overflow-auto bg-panel px-[30px] py-[27px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <span
            className={`rounded-sm px-1.5 py-1 font-mono text-[9px] ${priorityStyles[task.priority]}`}
          >
            {task.priority} priority
          </span>

          <Button variant="transparent" className="p-1" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>

        <p className="font-mono text-[10px] font-medium uppercase tracking-[.1em] text-muted">
          {task.id}
        </p>

        <h2 className="my-[13px] text-[26px]">
          {task.title}
        </h2>

        <p className="mb-6 text-[13px] leading-relaxed text-muted">
          {task.description}
        </p>

        <label className="my-[13px] block text-[11px] text-muted">
          Status

          <select
            className={field}
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as Status)
            }
          >
            {columns.map((column) => (
              <option
                key={column.id}
                value={column.id}
              >
                {column.label}
              </option>
            ))}
          </select>
        </label>

        <div className="my-[23px] grid grid-cols-2 border-y border-line py-[19px]">
          <div>
            <small className="mb-2 block font-mono text-[9px] text-muted">
              ASSIGNEE
            </small>

            <b className="flex items-center gap-1.5 text-[11px]">
              <span className="grid h-[22px] w-[22px] flex-none place-items-center overflow-hidden rounded-full bg-[#557a87]">
                <img
                  src={task.assignee?.avatar}
                  alt={task.assignee?.name}
                  className="h-full w-full object-cover"
                />
              </span>

              {task.assignee?.name}
            </b>
          </div>

          <div>
            <small className="mb-2 block font-mono text-[9px] text-muted">
              DUE DATE
            </small>

            <b className="flex items-center gap-1.5 text-[11px]">
              <CalendarDays size={15} />
              {task.dueDate}
            </b>
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between px-6 pb-[17px] pt-6">
            <h3 className="text-[15px]">
              Comments{' '}
              <span className="ml-1 font-mono text-[10px] text-muted">
                {task.comments.length}
              </span>
            </h3>
          </div>

          {task.comments.map((item) => (
            <p
              className="my-2 bg-wash p-2.5 text-[11px] leading-relaxed"
              key={item}
            >
              {item}
            </p>
          ))}

          <form
            className="flex gap-1.5"
            onSubmit={(event) => {
              event.preventDefault();

              if (comment.trim()) {
                addComment(
                  task.id,
                  `Maya: ${comment.trim()}`,
                );

                setComment('');
              }
            }}
          >
            <input
              className={`${field} m-0`}
              value={comment}
              onChange={(event) =>
                setComment(event.target.value)
              }
              placeholder="Add a comment..."
            />

           <Button variant="transparent" type="submit">
            <Plus size={15} />
           </Button>
          </form>
        </div>

        <div className="mt-[30px] flex items-center justify-between">  
          <Button variant="secondary" >
            <Trash2 size={15} />
            Delete task
          </Button>

            <Button variant="primary" onClick={handleSave} disabled={!hasChanges}>
             <Trash2 size={15} />
            Save changes
          </Button>

        </div>
      </aside>
    </div>
  );
}
