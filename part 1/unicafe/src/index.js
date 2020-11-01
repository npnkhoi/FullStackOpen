import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => <button onClick={onClick}> {text} </button>

const Statistic = ({text, value}) => <div>{text} : {value}</div>

const Statistics = ({good, bad, neutral}) => {
  const total = () => good + neutral + bad;
  if (total() === 0) {
    return (
      <div>
        <h1>satistics</h1>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <h1>satistics</h1>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="total" value={total()}/>
        <Statistic text="average score" value={(good - bad) / total()}/>
        <Statistic text="positive percentage" value={(good / total() * 100).toString() + '%'}/>
      </div>
    )
  }
}

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

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)