export const ModalBody = ({ children, style }) => {
  return (
    <div className="h-full relative" style={style}>
      {children}
    </div>
  );
};
