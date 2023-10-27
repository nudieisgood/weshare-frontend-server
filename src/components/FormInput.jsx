const FormInput = ({
  type,
  name,
  labelText,
  placeHolder,
  des,
  classValue,
  defaultValue,
  value,
  onChange,
  noTitle,
  inputError,
  required = true,
}) => {
  return (
    <div>
      {!noTitle && (
        <label
          className={`capitalize ${classValue ? classValue : "text-2xl"} mb-2`}
          htmlFor={name}
        >
          {labelText || name}
        </label>
      )}

      <p className="text-sm text-gray-400 mb-1">{des}</p>
      <input
        required={required}
        className={inputError ? "border-primary" : ""}
        type={type}
        name={name}
        id={name}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
