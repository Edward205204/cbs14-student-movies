export default function Input({
  id = "student-id",
  name = "student-id",
  type = "text",
  onChange,
  className,
  value,
  classNameInput = "p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm",
  classNameError = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
  error,
  errorMessage,
  ...rest
}) {
  return (
    <div className={"relative " + className}>
      <input
        type={type}
        id={id}
        autoComplete="off"
        className={classNameInput}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />

      <div className={classNameError}>{error || errorMessage}</div>
    </div>
  );
}
