import { useEffect, useState } from "react";
import Dice from "./Dice";
import { arr } from "./images/images.js";
import { nanoid } from "nanoid";
function App() {
  const [dice, setDice] = useState(generateArray());
  const [win, setWin] = useState(false);

  function generateArray() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({ value: getRandom(), id: nanoid(), isHeld: false });
    }
    return arr;
  }
  function getRandom() {
    return Math.ceil(Math.random() * 6);
  }

  function roll() {
    setDice((pre) =>
      pre.map((n) => (n.isHeld ? n : { ...n, value: getRandom() }))
    );
  }

  function handleClick(id) {
    setDice((pre) =>
      pre.map((ob) => (ob.id != id ? ob : { ...ob, isHeld: !ob.isHeld }))
    );
  }

  useEffect(
    (_) => {
      if (dice.every((m) => m.isHeld)) {
        const val = dice[0].value;
        if (dice.every((m) => m.value == val)) {
          setWin(true);
        }
      }
    },
    [dice]
  );

  return (
    <div className="App">
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {dice.map((obj) => (
          <Dice
            img={arr[obj.value - 1]}
            onClick={() => handleClick(obj.id)}
            selected={obj.isHeld}
          />
        ))}
      </div>
      <button
        className="button"
        onClick={win ? () => setDice(generateArray()) : roll}
      >
        {win ? "Play again" : "Roll"}
      </button>
    </div>
  );
}

export default App;
