import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import "./App.css";

function App() {
  const [equation, updateEquation] = useState([]);
  const [textOutput, updateTextOutput] = useState("0");

  function handleClick(num) {
    let checkParent = equation[equation.length - 1];

    if (
      checkParent === ")" &&
      !(num === "/" || num === "*" || num === "-" || num === "+" || num === ")")
    ) {
      updateEquation((prevVal) => [...prevVal, "*", num]);
    } else {
      updateEquation((prevVal) => [...prevVal, num]);
    }
  }

  function handleLeftParent() {
    let lastNum = equation[equation.length - 1] * 1;
    let parentCheck = equation[equation.length - 1];
    if (isNaN(lastNum) === true && parentCheck != ")") {
      updateEquation((prevVal) => [...prevVal, "("]);
    } else if (parentCheck === ")" || typeof lastNum === "number") {
      updateEquation((prevVal) => [...prevVal, "*("]);
    }
  }

  function clearLast() {
    if (equation.length === 0) {
      console.log("I was called 1");
    } else {
      updateEquation((prevVal) => {
        prevVal.pop();
        console.log(prevVal);
        return [...prevVal];
      });
    }
  }

  useEffect(() => {
    let joinedText = equation.join("");
    updateTextOutput(joinedText);
  });

  function solve() {
    try {
      let solve = eval(equation.join(""));
      solve = [solve];
      updateEquation(solve);
    } catch (error) {
      updateEquation(["Error"]);
    }
  }

  function clearAll() {
    updateEquation([]);
    updateTextOutput("0");
  }

  const handleKeyDown = (event) => {
    if (event.key === "(") {
      handleLeftParent();
      return;
    }
    if (event.key === "Enter") {
      solve();
      return;
    }
    if (event.key === "Backspace") {
      clearLast();
      return;
    }
    const keyNum = event.key * 1;
    if (
      keyNum ||
      event.key === "/" ||
      event.key === "*" ||
      event.key === "-" ||
      event.key === "+" ||
      event.key === "0" ||
      event.key === ")"
    ) {
      handleClick(event.key);
      return;
    }

  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="App">
      <div className="divRow">
        <h2 class="textBox">{textOutput}</h2>
      </div>
      <div className="divRow">
        <Buttons num="C" class="clear" handle={clearAll} />
        <Buttons num="CE" class="clearLast" handle={clearLast} />
        <Buttons num="/" class="mult" handle={handleClick} />
        <Buttons num="*" class="sub" handle={handleClick} />
      </div>
      <div className="divRow">
        <Buttons num="7" handle={handleClick} />
        <Buttons num="8" handle={handleClick} />
        <Buttons num="9" handle={handleClick} />
        <Buttons num="-" handle={handleClick} />
      </div>
      <div className="divRow">
        <Buttons num="4" handle={handleClick} />
        <Buttons num="5" handle={handleClick} />
        <Buttons num="6" handle={handleClick} />
        <Buttons num="+" class="enter" handle={handleClick} />
      </div>
      <div className="divRow">
        <Buttons num="1" handle={handleClick} />
        <Buttons num="2" handle={handleClick} />
        <Buttons num="3" handle={handleClick} />
        <Buttons num="=" class="clearAll" handle={solve} />
      </div>
      <div className="divRow">
        <Buttons num="0" handle={handleClick} />
        <Buttons num="." class="decimal" handle={handleClick} />
        <Buttons num="(" class="leftParent" handle={handleLeftParent} />
        <Buttons num=")" class="rightParent" handle={handleClick} />
      </div>
    </div>
  );
}

export default App;
