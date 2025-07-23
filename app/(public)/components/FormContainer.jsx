const FormContainer = ({ children }) => {
  return (
    <section className="flex flex-col w-[95%] xs:w-[400px] border rounded border-zinc-200 bg-white p-8 shadow-md">
      {children}
    </section>
  );
};

export default FormContainer;
