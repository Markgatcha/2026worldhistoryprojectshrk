export default function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold text-parchment md:text-4xl">{title}</h2>
      {body && <p className="mt-4 text-lg text-parchment/70">{body}</p>}
    </div>
  );
}
