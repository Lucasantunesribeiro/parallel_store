interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.4em] text-accent">{eyebrow}</p>
        )}
        <h2 className="mt-2 text-3xl font-bold uppercase tracking-[0.4em]">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-accent">{description}</p>}
      </div>
      {action}
    </div>
  );
}
