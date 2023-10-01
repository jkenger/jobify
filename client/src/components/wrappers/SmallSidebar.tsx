function SmallSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:hidden fixed w-[80%] h-full z-10 bg-secondary">
      {children}
    </div>
  );
}

export default SmallSidebar;
