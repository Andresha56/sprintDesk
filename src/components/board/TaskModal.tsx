import { useState, type ChangeEvent, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { Priority,Status,type TaskFormData } from '../../types';
import { Button } from '../reuseable-components/button';
import { Input } from '../input';
import { Select } from '../select';
import { LabelInfo } from '../label';

type TaskModalProps = {
  onClose: () => void;
  onAdd: (task: TaskFormData) => void;
};

const assigneeOptions = [
  'Maya Chen',
  'Ari Singh',
  'Jon Bell',
  'Leo Park',
];

const initialForm: TaskFormData = {
  title: '',
  priority: Priority.Medium,
  assignee: 'Maya Chen',
  dueDate: '',
  description: '',
  status: Status.Backlog,
};

export function TaskModal({
  onClose,
  onAdd,
}: TaskModalProps) {
  const [form, setForm] = useState<TaskFormData>(initialForm);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title: form.title.trim(),
      description: 'New task added to the current sprint.',
      status: Status.Backlog,
      priority: form.priority,
      assignee: form.assignee,
      dueDate: form.dueDate,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#191a1688] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      <form
        className="w-full max-w-[500px] border border-line bg-panel p-7 max-[650px]:p-5"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[.1em] text-muted">
              NEW WORK ITEM
            </p>

            <h2
              id="task-modal-title"
              className="mt-2 text-[26px] text-ink"
            >
              Add a task
            </h2>
          </div>

          <Button
            type="button"
            variant="transparent"
            className="p-1"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </Button>
        </div>

        <LabelInfo htmlFor="title">Title</LabelInfo>

        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="What needs to get done?"
          autoFocus
        />

        <LabelInfo htmlFor="priority">Priority</LabelInfo>

        <Select
          id="priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
          options={[Priority.High, Priority.Medium, Priority.Low]}
        />

        <LabelInfo htmlFor="assignee">Assignee</LabelInfo>

        <Select
          id="assignee"
          name="assignee"
          value={form.assignee}
          onChange={handleChange}
          options={assigneeOptions}
        />

        <LabelInfo htmlFor="dueDate">Due date</LabelInfo>

        <Input
          id="dueDate"
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
        />

        <div className="mt-7 flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit" variant="primary">
            Create task
            <span>↗</span>
          </Button>
        </div>
      </form>
    </div>
  );
}