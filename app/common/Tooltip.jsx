const Tooltip = ({ tooltip, children }) => {
  return (
    <div className="relative group cursor-pointer inline-block">
      {children}
      <div className="bg-black text-white text-center text-xs font-semibold absolute opacity-0 group-hover:opacity-80 transition-all px-3 py-1 rounded-md left-1/2 top-0 -translate-x-1/2 -translate-y-full w-[150%]">
        {tooltip}
      </div>
    </div>
  );
};

export default Tooltip;
