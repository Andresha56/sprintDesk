import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
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
    />
  );
}