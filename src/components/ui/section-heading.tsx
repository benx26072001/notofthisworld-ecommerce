import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className,
      )}
    >
      <p className="text-kicker">{label}</p>
      <h2 className="font-display text-3xl uppercase tracking-[0.14em] text-balance text-white/92 md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm leading-7 text-white/62 md:text-base">{description}</p>
      ) : null}
    </div>
  );
}
