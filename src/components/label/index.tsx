import type { LabelHTMLAttributes, ReactNode } from 'react';

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export function LabelInfo({
  children,
  className = '',
  ...props
}: FormLabelProps) {
  return (
    <label
      className={`my-[13px] block text-[11px] text-muted ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}