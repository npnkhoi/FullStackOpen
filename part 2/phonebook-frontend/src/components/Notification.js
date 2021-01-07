const Notification = ({message, type}) => {
  const colorCode = {
    SUCCESS: 'green',
    ERROR: 'red',
    NEUTRAL: 'black'
  }
  const notificationStyle = {
    color: colorCode[type]
  }

  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification