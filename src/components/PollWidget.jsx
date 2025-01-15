// file: PollWidget.js
import React, { useState } from "react";
import "./PollWidget.css";

const PollWidget = ({ question, options }) => {
  const [votes, setVotes] = useState(Array(options.length).fill(0));
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);

  const handleVote = (index) => {
    const newVotes = [...votes];
    newVotes[index] += 1;
    setVotes(newVotes);
    setSelectedOption(index);
    setTotalVotes(totalVotes + 1);
  };

  return (
    <div className="poll-widget">
      <h2>{question}</h2>
      <ul className="poll-options">
        {options.map((option, index) => (
          <li
            key={index}
            className={`poll-option ${selectedOption === index ? "selected" : ""}`}
            onClick={() => handleVote(index)}
          >
            {option}
            <div className="poll-result">
              <span>{votes[index]} votes</span>
              <span>
                ({totalVotes > 0 ? ((votes[index] / totalVotes) * 100).toFixed(1) : 0}%)
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// file: App.js

const App = () => {
  const pollData = {
    question: "What's your favorite programming language?",
    options: ["JavaScript", "Python", "Java", "C++"],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Poll Widget</h1>
      <PollWidget question={pollData.question} options={pollData.options} />
    </div>
  );
};

export default App;

