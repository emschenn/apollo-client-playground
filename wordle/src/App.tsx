import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { faker } from "@faker-js/faker";

const TRY_LIMIT = 6;
const WORD_LENGTH = 5;

function Guess({
  guess,
  isSent,
  answer,
}: {
  answer: string;
  guess: string[];
  isSent: boolean;
}) {
  return (
    <div className="guess">
      {new Array(WORD_LENGTH).fill("").map((_, idx) => {
        const char = guess?.[idx];
        const checkClassName = isSent
          ? char === answer[idx]
            ? "matched"
            : answer.includes(char)
            ? "exist"
            : "not-exist"
          : "";

        return (
          <div key={idx} className={`guess-char ${checkClassName}`}>
            {char || ""}
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [guesses, setGuesses] = useState(new Array(TRY_LIMIT).fill([]));
  const [isGuessesSent, setIsGuessesSent] = useState(
    new Array(TRY_LIMIT).fill(false)
  );
  const [currentGuess, setCurrentGuess] = useState(0);
  const answer = useRef(faker.word.adjective(WORD_LENGTH));

  const restart = useCallback(() => {
    setGuesses(new Array(TRY_LIMIT).fill([]));
    setIsGuessesSent(new Array(TRY_LIMIT).fill(false));
    setCurrentGuess(0);
    answer.current = faker.word.adjective(WORD_LENGTH);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const word = guesses[currentGuess];

      if (e.key === "Enter") {
        if (word.length !== WORD_LENGTH) {
          return;
        }

        setIsGuessesSent((prev) => {
          const newGuessesSent = [...prev];
          newGuessesSent[currentGuess] = true;
          return newGuessesSent;
        });
        setCurrentGuess((prev) => prev + 1);
        if (word === answer.current) {
          alert("Bingo 🎉");
        }
      } else if (e.key === "Backspace") {
        setGuesses((prev) => {
          const newGuesses = [...prev];
          newGuesses[currentGuess] = word.slice(0, -1);
          return newGuesses;
        });
      } else if (e.key.match(/[a-zA-Z]/)) {
        if (word.length >= WORD_LENGTH) return;
        setGuesses((prev) => {
          const newGuesses = [...prev];
          newGuesses[currentGuess] = word + e.key;
          return newGuesses;
        });
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setGuesses, currentGuess, guesses]);

  return (
    <>
      <h2> 🧩 Wordle</h2>
      <div>
        {TRY_LIMIT} chances to guess a {WORD_LENGTH}-letter word
      </div>

      <div className="guess-container">
        {guesses.map((guess, idx) => (
          <Guess
            answer={answer.current}
            key={idx}
            guess={guess}
            isSent={isGuessesSent[idx]}
          />
        ))}
      </div>

      <button onClick={restart}>Restart</button>
    </>
  );
}

export default App;
