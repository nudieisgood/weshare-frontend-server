const FormInput = ({
  type,
  name,
  labelText,
  placeHolder,
  des,
  classValue = "text-2xl",
  defaultValue,
  value,
  onChange,
  noTitle,
}) => {
  return (
    <div>
      {!noTitle && (
        <label className={`capitalize ${classValue} mb-2`} htmlFor={name}>
          {labelText || name}
        </label>
      )}

      <p className="text-sm text-gray-400 mb-1">{des}</p>
      <input
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
