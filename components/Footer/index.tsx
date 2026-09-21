import Link from "next/link";

export function Footer() {
  return (
    <footer className="pb-3 text-center mt-6 bg-slate-900">
      <p>
        <span>Copyright &copy; {new Date().getFullYear()} - </span>
        <Link href="/">Warframe Builder</Link>
      </p>
    </footer>
  );
}
