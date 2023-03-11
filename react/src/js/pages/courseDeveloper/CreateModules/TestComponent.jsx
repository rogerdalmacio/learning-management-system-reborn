import React, { useState } from "react";

function DummyDataGenerator() {
  const [numQuestions, setNumQuestions] = useState(5);
  const [dummyData, setDummyData] = useState([
    {
      id: `question1`,
      question: "",
      options: [
        { id: "option1", text: "", isCorrect: "" },
        { id: "option2", text: "", isCorrect: "" },
        { id: "option3", text: "", isCorrect: "" },
        { id: "option4", text: "", isCorrect: "" },
      ],
    },
  ]);

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value);

    setNumQuestions(isNaN(newValue) ? "" : newValue);
  };

  const generateDummyData = () => {
    const data = [];
    for (let i = 1; i <= numQuestions; i++) {
      const question = {
        id: `question${i}`,
        question: "",
        options: [
          { id: "option1", text: "", isCorrect: "" },
          { id: "option2", text: "", isCorrect: "" },
          { id: "option3", text: "", isCorrect: "" },
          { id: "option4", text: "", isCorrect: "" },
        ],
      };
      data.push(question);
    }
    setDummyData(data);
  };
  console.log(dummyData);

  return (
    <div>
      <label>
        Number of questions:
        <input
          type="number"
          value={numQuestions}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={generateDummyData}>Generate</button>
      <div>
        {dummyData.map((question) => (
          <div key={question.id}>
            <p>{question.id}</p>
            <p>{question.question}</p>
            {question.options.map((option) => (
              <div key={option.id}>
                <p>{option.id}</p>
                <p>{option.text}</p>
                <p>{option.isCorrect}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DummyDataGenerator;
