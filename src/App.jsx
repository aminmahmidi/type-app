import { useState, useEffect } from "react";
import "./App.css";
import { Moon, Sun, Copy } from "@phosphor-icons/react";
function App() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
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
  const averageWPM = 200;
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
        await navigator.clipboard.writeText(text)
      } catch (error) {
        
      }
    }
    else {
      alert('ne text')
    }
  }
  return (
    <>
      <div className={isToggle ? " container light" : "container dark"}>
        <section className="text-container">
          <div className="top-section">
            <h3>شمارنده تعداد کارکترها به دقایق</h3>
            <div className="top-section-btn">
              <span className="copy-success"> متن کپی شد </span>
              <span className="copy-success"> فرم خالی است !! </span>
              <button onClick={clipboard} type="button" className="copy-btn">
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
              {/* <button type="button">
              شمارش وقت
            </button> */}
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
