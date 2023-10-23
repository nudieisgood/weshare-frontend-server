const FormSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
  labelClass,
}) => {
  return (
    <div className="mb-1 flex items-center">
      <label className={labelClass || "text-2xl"} htmlFor={name}>
        {labelText || name}
      </label>
      <select
        onChange={(e) => {
          onChange(e.target.value);
        }}
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="ml-2 border py-2 px-4 rounded-md"
      >
        {list.map((item) => {
          if (Object.entries(item)[0][0] === "fe")
            return (
              <option value={item.be} key={item.fe}>
                {item.fe}
              </option>
            );

          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
