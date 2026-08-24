type ActivityProps = {
  icon: string;
  color: 'green' | 'coral' | 'gold';
  text: string;
  time: string;
};

const colorStyles = {
  green: 'bg-green/10 text-green',
  coral: 'bg-coral/10 text-coral',
  gold: 'bg-gold/10 text-gold',
};

export function Activity({
  icon,
  color,
  text,
  time,
}: ActivityProps) {
  return (
    <div className="flex items-start gap-3 border-t border-line px-6 py-4 first:border-t-0 max-[650px]:px-[17px]">
      <span
        className={`
          grid h-7 w-7 flex-none
          place-items-center rounded-full
          font-mono text-[10px] font-medium
          ${colorStyles[color]}
        `}
      >
        {icon}
      </span>

      <p className="min-w-0 text-[11px] leading-relaxed text-ink">
        {text}

        <small className="mt-1 block font-mono text-[9px] text-muted">
          {time}
        </small>
      </p>
    </div>
  );
}