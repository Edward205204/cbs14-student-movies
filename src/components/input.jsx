export default function Input({
  id,
  name,
  type = "text",
  onChange,
  value,
  className = "",
  error,
  ...rest
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${
          error ? "border-red-500" : ""
        }`}
        {...rest}
      />
      {error && <div className="mt-1 text-red-500 text-sm">{error}</div>}
    </div>
  );
}
