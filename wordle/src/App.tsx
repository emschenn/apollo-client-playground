import { useCallback, useEffect, useRef, useState, memo } from "react";
import "./App.css";
import { faker } from "@faker-js/faker";

const TRY_LIMIT = 6;
const WORD_LENGTH = 5;

const Guess = memo(
  ({
    guess,
    isSent,
    answer,
  }: {
    answer: string;
    guess: string[];
    isSent: boolean;
  }) => {
    return (
      <div className="guess">
        {Array(WORD_LENGTH)
          .fill(null)
          .map((_, idx) => {
            const char = guess?.[idx] || "";

            let checkClassName = "";
            if (isSent && char) {
              checkClassName =
                char === answer[idx]
                  ? "matched"
                  : answer.includes(char)
                  ? "exist"
                  : "not-exist";
            }

            return (
              <div key={idx} className={`guess-char ${checkClassName}`}>
                {char}
              </div>
            );
          })}
      </div>
    );
  }
);

Guess.displayName = "Guess";

function App() {
  const [guesses, setGuesses] = useState<string[][]>(() =>
    Array(TRY_LIMIT)
      .fill(null)
      .map(() => [])
  );
  const [isGuessesSent, setIsGuessesSent] = useState<boolean[]>(() =>
    Array(TRY_LIMIT).fill(false)
  );
  const [currentGuess, setCurrentGuess] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const answer = useRef(faker.word.adjective(WORD_LENGTH));

  const restart = useCallback(() => {
    setGuesses(
      Array(TRY_LIMIT)
        .fill(null)
        .map(() => [])
    );
    setIsGuessesSent(Array(TRY_LIMIT).fill(false));
    setCurrentGuess(0);
    setGameOver(false);
    answer.current = faker.word.adjective(WORD_LENGTH);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (gameOver || currentGuess >= TRY_LIMIT) return;

      const word = guesses[currentGuess];

      if (e.key === "Enter") {
        if (word.length !== WORD_LENGTH) return;

        setIsGuessesSent((prev) => {
          const newGuessesSent = [...prev];
          newGuessesSent[currentGuess] = true;
          return newGuessesSent;
        });

        const wordStr = word.join("");
        if (wordStr === answer.current) {
          setGameOver(true);
          setTimeout(() => alert("Bingo 🎉"), 100);
        } else if (currentGuess + 1 >= TRY_LIMIT) {
          setGameOver(true);
          setTimeout(
            () => alert(`Game over! The word was: ${answer.current}`),
            100
          );
        }

        setCurrentGuess((prev) => prev + 1);
      } else if (e.key === "Backspace") {
        if (word.length === 0) return;

        setGuesses((prev) => {
          const newGuesses = [...prev];
          newGuesses[currentGuess] = [...word.slice(0, -1)];
          return newGuesses;
        });
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        if (word.length >= WORD_LENGTH) return;

        setGuesses((prev) => {
          const newGuesses = [...prev];
          newGuesses[currentGuess] = [...word, e.key.toLowerCase()];
          return newGuesses;
        });
      }
    },
    [currentGuess, guesses, gameOver]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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

      {gameOver && <button onClick={restart}>Restart</button>}
    </>
  );
}

export default App;
