import type { Task } from '../../types';
type TaskCardProps = {
  task: Task;
  onClick: () => void;
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  const priorityStyles = {
    "high": 'bg-[#fae1da] text-[#c25540]',
    "medium": 'bg-[#f8edcf] text-[#997526]',
    "low": 'bg-[#e8e7e2] text-[#77756e]',
  };
  return (
    <button
      className="min-h-[158px] cursor-pointer border border-line bg-panel p-[15px] text-left text-ink hover:-translate-y-px hover:border-coral"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span
          className={`rounded-sm px-1.5 py-1 font-mono text-[9px] ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>

       
      </div>

      <h4 className="mb-1.5 mt-[15px] text-sm">
        {task.title}
      </h4>

      <p className="min-h-8 text-[11px] leading-snug text-muted">
        {task.description}
      </p>

      <div className="mt-4 flex items-center gap-1.5 font-mono text-[9px] text-muted">
        <span className="grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-[#557a87] font-mono text-[8px] text-white">
         <img src={task?.assignee?.avatar} alt={task?.assignee?.name} className="h-5 w-5 rounded-full object-cover"/>
        </span>

        <span>{task?.assignee?.name}</span>

        <span className="ml-auto">
          {task?.dueDate.slice(5).replace('-', '/')}
        </span>
      </div>
    </button>
  );
}