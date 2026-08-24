import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export function Select({
  className = '',
  options,
  ...props
}: SelectProps) {
  return (
    <select
      className={`
        mt-1.5 block w-full
        border border-line
        bg-paper
        p-2.5
        text-xs text-ink
        outline-coral
        ${className}
      `}
      {...props}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}