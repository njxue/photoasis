const FormContainer = ({ children }) => {
  return (
    <div className="flex flex-col w-[95%] xs:w-[400px] border rounded border-zinc-200 bg-white p-8 shadow-md">
      {children}
    </div>
  );
};

export default FormContainer;
