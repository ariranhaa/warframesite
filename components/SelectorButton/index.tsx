type SelectorButtonProps = {
  children?: React.ReactNode;
};

export function SelectorButton({ children }: SelectorButtonProps) {
  return (
    <div className="flex justify-center">
      <div className="relative inline-block group">
        <button
          className="
    px-6 py-3
    rounded-lg
    bg-zinc-800
    text-white
    font-bold
    hover:bg-zinc-700
    transition
  "
        >
          Builds
        </button>

        <div
          className="
    absolute left-0 top-full
    mt-2
    w-52
    rounded-lg
    bg-zinc-900
    border border-zinc-700
    shadow-xl
    opacity-0 invisible
    group-hover:opacity-100
    group-hover:visible
    transition-all duration-200
    z-50
  "
        >
          <button className="block w-full px-4 py-3 text-left text-white hover:bg-zinc-800">
            Warframes
          </button>

          <button className="block w-full px-4 py-3 text-left text-white hover:bg-zinc-800">
            Primárias
          </button>

          <button className="block w-full px-4 py-3 text-left text-white hover:bg-zinc-800">
            Secundárias
          </button>

          <button className="block w-full px-4 py-3 text-left text-white hover:bg-zinc-800">
            Melee
          </button>

          <button className="block w-full px-4 py-3 text-left text-white hover:bg-zinc-800">
            Companheiros
          </button>
        </div>
      </div>
    </div>
  );
}
