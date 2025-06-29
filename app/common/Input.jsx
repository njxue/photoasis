const Input = ({
  type,
  name,
  defaultValue,
  value,
  error,
  placeholder,
  label,
  className,
}) => {
  return (
    <div>
      {label && <label for={name}>{label}</label>}
      <input
        type={type}
        className={`p-2 h-[33px] w-full border border-gray-300 rounded ${
          className ?? ""
        }`}
        aria-label="password"
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      <p className="text-red-600 text-sm h-[24px] mt-1">{error ?? ""}</p>
    </div>
  );
};

export default Input;
