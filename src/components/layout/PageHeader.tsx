import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  children,
}: PageHeaderProps) {
  return (
    <div
      className="
        mb-[37px] flex items-end justify-between
        max-[650px]:mb-[27px]
        max-[650px]:flex-col
        max-[650px]:items-start
        max-[650px]:gap-4
      "
    >
      <div>
        <p className="font-mono text-[10px] font-medium uppercase tracking-[.1em] text-muted">
          {eyebrow}
        </p>

        <h1 className="mt-2.5 text-[38px] leading-tight max-[650px]:text-[31px]">
          {title}
        </h1>
      </div>

      <div
        className="
          flex items-center gap-2.5
          max-[650px]:w-full
          max-[650px]:overflow-auto
        "
      >
        {children}
      </div>
    </div>
  );
}