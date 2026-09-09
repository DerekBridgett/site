export default function Stars({ n }: { n: number }) {
  return <span aria-label={`${n} out of 5 stars`} className="text-green tracking-tight">{"★".repeat(n)}<span className="text-line">{"★".repeat(5 - n)}</span></span>;
}
