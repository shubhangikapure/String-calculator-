import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const add = (numbers) => {
    if (numbers === "") return 0; 

    let delimiter = /,|\n/; 
   
     if (numbers.startsWith("//")) {
      const parts = numbers.split("\n", 2); 
      delimiter = new RegExp(parts[0].substring(2)); 
      numbers = parts[1]; 
    }

 
    const numArray = numbers.split(delimiter);
    const negatives = [];
    const sum = numArray.reduce((total, num) => {
      const value = parseInt(num, 10);
      if (isNaN(value)) return total; 
      if (value < 0) negatives.push(value); 
      return total + value;
    }, 0);

    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return sum;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const sum = add(input); 
      setResult(sum); 
      setError(null); 
    } catch (err) {
      setError(err.message); 
      setResult(null); 
    }
  };

  return (
    <div className="App">
      <h1>String Calculator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your numbers"
          rows="4"
          cols="50"
        ></textarea>
        <br />
        <button type="submit">Calculate</button>
      </form>
      {result !== null && <h2>Result: {result}</h2>}
      {error && <h3 className="error">{error}</h3>}
    </div>
  );
}

export default App;
