import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  const rounded=props.val.toFixed(2)
  return (
    <tr>
      <td>{props.text}</td>
      <td>
        {rounded}
        {props.symbol}
      </td>
    </tr>
  );
};

const Stats = (props) => {
  const avg = (props.good - props.bad) / props.all;
  const posPerc = (props.good / props.all)*100;

  return (
    <>
      <table>
        <tbody>
        <StatisticLine text="good" val={props.good}></StatisticLine>
        <StatisticLine text="neutral" val={props.neutral}></StatisticLine>
        <StatisticLine text="bad" val={props.bad}></StatisticLine>
        <StatisticLine text="all" val={props.all}></StatisticLine>
        <StatisticLine text="average" val={avg}></StatisticLine>
        <StatisticLine
          text="positive"
          val={posPerc}
          symbol={"%"}
        ></StatisticLine>
        </tbody>
      </table>
    </>
  );
};

const RenderStats = (props) => {
  if (props.all === 0) {
    return <div>No Feedback Provided</div>;
  }
  return (
    <Stats
      good={props.good}
      neutral={props.neutral}
      bad={props.bad}
      all={props.all}
    ></Stats>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = () => {
    console.log("Someone reviewed as Good");
    setGood(good + 1);
    setAll(all + 1);
  };
  const handleNeutral = () => {
    console.log("Someone reviewed as neutral");
    setNeutral(neutral + 1);
    setAll(all + 1);
  };
  const handleBad = () => {
    console.log("Someone reviewed as Bad");
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <div>
      <h2>Gib Feedback</h2>
      <Button handleClick={handleGood} text={"good"}></Button>
      <Button handleClick={handleNeutral} text={"neutral"}></Button>
      <Button handleClick={handleBad} text={"bad"}></Button>
      <h2>Stats</h2>
      <RenderStats
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
      ></RenderStats>
    </div>
  );
};

export default App;
