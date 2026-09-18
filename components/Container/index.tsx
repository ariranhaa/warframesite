type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <div className="max-w-screen-lg mx-auto px-8 flex flex-col">
        {children}
      </div>
    </div>
  );
}
