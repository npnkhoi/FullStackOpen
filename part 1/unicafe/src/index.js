import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => <button onClick={onClick}> {text} </button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // const updateClicks = (val, setVal) => setVal(val + 1);

  return (
    <div>
      <h1> give feedback </h1>

      <div>
        <Button onClick={() => setGood(good + 1)} text="good"/>
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
        <Button onClick={() => setBad(bad + 1)} text="bad"/>
      </div>

      <div>
        <h1>satistics</h1>
        <div> good: {good} </div>
        <div> neutral: {neutral} </div>
        <div> bad: {bad} </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)