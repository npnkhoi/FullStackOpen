const TextInput = ({value, setValue}) => {
  return (
    <input
      type='text'
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        console.log(value);
      }}
    />
  )
}

export default TextInput