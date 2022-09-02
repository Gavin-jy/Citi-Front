import React, { useEffect, useState } from "react";
import "./index.css";

export default function NlpResult(props) {
  const { nlpWords, nlpResult } = props;

  const [wordList, setWordList] = useState([]);

  const transferResult = (nlpResult) => {
    const newResult = {
      NAME: [],
      NOTIONAL: [],
      TICKER: [],
    };
    nlpResult.forEach((item) => {
      const words = item[0].split(" ");
      newResult[item[1]] = newResult[item[1]].concat(words);
    });
    return newResult;
  };

  const computeDom = (nlpWords, nlpResult) => {
    let newWordList = [];
    let newResult = transferResult(nlpResult);
    nlpWords.split(" ").forEach((item) => {
      if (newResult.NAME.indexOf(item) !== -1) {
        newWordList.push([item, "name"]);
      } else if (newResult.NOTIONAL.indexOf(item) !== -1) {
        newWordList.push([item, "notional"]);
      } else if (newResult.TICKER.indexOf(item) !== -1) {
        newWordList.push([item, "ticker"]);
      } else {
        newWordList.push([item, "normal"]);
      }
    });
    console.log(newWordList);
    setWordList(newWordList);
  };

  useEffect(() => {
    computeDom(nlpWords, nlpResult);
  }, []);

  return (
    <div className="nlp-result-wrapper">
      {wordList.map((item, index) => (
        <span key={index} className={`word-` + item[1]}>
          {item[0]}{" "}
        </span>
      ))}
    </div>
  );
}
