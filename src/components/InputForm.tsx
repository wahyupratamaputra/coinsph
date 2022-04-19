type InputFormProps = {
  type: string,
  errorMessage: string,
  id: string,
  onInputChange: Function
}

const InputForm = ({ type, errorMessage, id, onInputChange }: InputFormProps) => {
  return (
    <input
      type={type}
      className={`form-control ${errorMessage ? "is-invalid" : ""}`}
      id={id}
      onChange={(e) => onInputChange(e)}
    />
  )
}

export default InputForm