export const ModalBody = ({ children, style }) => {
  return (
    <div className="h-full w-full relative" style={style}>
      {children}
    </div>
  );
};
