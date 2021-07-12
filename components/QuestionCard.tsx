import React, { useLayoutEffect, useRef }  from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import LoadingQuestionMsg from "./LoadingQuestionMsg";
import styles from './styles/QuestionCard.module.css';
import NextQuestionBtn from "./svg/NextQuestionBtn";

interface QuestionCardProps {
  question: string
  answer: string
  nextQuestion: () => Promise<string>
  loggedIn: boolean
}


const QuestionCard = ({ question, answer, nextQuestion, loggedIn }: QuestionCardProps) => {
  const [isLoading, setisLoading] = useState(false);
  const questionRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    if(questionRef.current)
      questionRef.current.scrollIntoView();
  })
  

  const getQuestion = () => {
    setisLoading(true);
    nextQuestion().then(() => setisLoading(false));
  }

  return (
    <>
      {(!question && loggedIn) &&
        <Row style={{ color: "white", padding: "100px" }} >
          <Col className="text-center">
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
              </svg>
            </p>
            <div>
              <h2>No questions available...yet.</h2>
            </div>
            <br />
            <p>Add questions above</p>
          </Col>
        </Row>}
      {question &&
        <Row>
          <Col className="d-flex justify-content-center">
            <div className={styles.qcard}>
              <Row>
                {isLoading ?
                  <LoadingQuestionMsg />
                  :
                  <Col id={styles.questioncol}>
                    <div id={styles.cardhead} >
                      <div ref={questionRef}>
                        Q: {question}
                      </div>
                      <div id={styles.buttondiv}>
                        <NextQuestionBtn nextQuestion={getQuestion} />
                      </div>
                    </div>
                    <div id={styles.cardbody}>
                      {answer.split("\n").map(el => el.trim()).map((sentence, idx) =>
                        <p key={idx} className={styles.qtext}>{sentence}</p>)}
                    </div>
                  </Col>
                }
              </Row>
            </div>
          </Col>
        </Row>}
    </>
  )
};

export default QuestionCard;
