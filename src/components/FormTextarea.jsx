const FormTextarea = ({ name, des, rows = 5, labelText, defaultValue }) => {
  return (
    <div>
      <label htmlFor={name} className="text-2xl capitalize">
        {labelText || name}
      </label>
      <p className="text-sm text-gray-400">{des}</p>
      <textarea
        defaultValue={defaultValue}
        name={name}
        id={name}
        rows={rows}
      ></textarea>
    </div>
  );
};
export default FormTextarea;
