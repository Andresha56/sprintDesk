import type { FC } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'transparent';
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  type = 'button',
  variant = 'transparent',
    disabled = false,
}) => {
  const baseStyles =
    'inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-sm border px-[15px] py-2.5 text-xs font-semibold';

  const variantStyles = {
    primary:
      'border-transparent bg-coral text-white hover:bg-[#d95f49]',

    secondary:
      'border-line bg-panel text-ink hover:bg-[#f0ede5]',

    transparent:
      'border-transparent bg-transparent text-ink hover:bg-[#f0ede5]',
  };

  return (
    <button
      type={type}
        disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};