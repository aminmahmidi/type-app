import { useState, useEffect } from "react";
import "./App.css";
import {
  Moon,
  Sun,
  Copy,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";
function App() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [copy, setCopy] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const changeHandler = (event) => {
    setText(event.target.value);
  };
  useEffect(() => {
    const words = text.split(" ");
    let wordCount = 0;
    words.forEach((word) => {
      if (word.trim() !== "") {
        wordCount++;
      }
    });
    setWordCount(wordCount);
    setCharCount(text.length);
  }, [text]);
  const wordTimer = text.split(/\s+/).length;
  const averageWPM = 220;
  const estimatedReadingTime = Math.ceil(wordTimer / averageWPM);
  const toggle = () => {
    setIsToggle(!isToggle);
    const newMode = !isToggle;
    setIsToggle(newMode);
    localStorage.setItem("theme", newMode);
  };
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setIsToggle(savedMode === "true");
    }
  }, []);
  const clipboard = async () => {
    if (navigator.clipboard && text.length > 0) {
      try {
        await navigator.clipboard.writeText(text);
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 4000);
      } catch (error) {
        alert("خطا");
      }
    } else {
      setCopy(false);
    }
  };
  return (
    <>
      <div className={isToggle ? " container light" : "container dark"}>
        <section className="text-container">
          <div className="top-section">
            <h4>بنویس</h4>
            <div className="top-section-btn">
              <div className="copy-message">
                {copy && (
                  <span className="show-copy">
                    <CheckCircle /> متن کپی شد
                  </span>
                )}
              </div>
              <button
                onClick={clipboard}
                type="button"
                disabled={text.length === 0}
                className="copy-btn"
              >
                <Copy size={18} weight="bold" /> کپی متن
              </button>
              <button type="button" className="toggle" onClick={toggle}>
                {isToggle ? (
                  <Moon size={18} weight="bold" />
                ) : (
                  <Sun size={18} weight="bold" />
                )}
              </button>
            </div>
          </div>
          <div>
            <textarea
              value={text}
              onChange={changeHandler}
              placeholder="متن خود را بنویس"
            ></textarea>
            <div
              className={
                isToggle ? "count-container light " : "count-container dark"
              }
            >
              <p className="word-count"> کاراکتر: {wordCount}</p>
              {wordTimer > 0 && (
                <p>زمان تقریبی مطالعه: {estimatedReadingTime}دقیقه </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
