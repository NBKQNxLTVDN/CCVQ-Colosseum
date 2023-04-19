import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";

import { socket } from "service/socket";

import BoxContent from "components/MC/components/BoxContent";
import Crossword from "components/Viewers/VCNV/CrosswordSlide/crossword";
import Answers from "./answers";

const useStyles = makeStyles((theme) => ({
  TTContainer: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: "15% 82%",
    rowGap: "3%",
  },
  AnswerContainer: {
    display: "grid",
    gridTemplateColumns: "28% 70%",
    columnGap: "2%",
  },
  AnswerCCVQContainer: {
    display: "grid",
    gridTemplateRows: "auto auto auto",
    rowGap: "5%",
  },
  AnswersCandidateContainer: {
    position: "relative",
    border: "1px solid black",
    display: "grid",
    gridTemplateRows: "auto auto auto auto",
    rowGap: "5%",
    padding: "1% 2%",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px #000000",
    height: "100%",
    width: "100%",
    fontFamily: "Montserrat",
    fontWeight: "bold",
  },
  solution: {
    padding: "5%",
    border: "1px solid black",
    borderRadius: "10px",
    backgroundColor: "#C4C4C4",
    boxShadow: "inset 5px 5px 5px #000000",
    display: "flex",
    flexDirection: "row",
    gap: "5%",
    alignItems: "center",
    fontSize: "1rem",
  },
  cnv: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5%",
    justifyContent: "space-between",
  },
}));

const TT = (props) => {
  const { setHideTitleRound, roundName } = props;
  const styles = useStyles();

  const [data, setData] = useState(null);
  const [length, setLength] = useState();
  //eslint-disable-next-line
  const [CNV, setCNV] = useState(null);
  const [Candidate, setCandidate] = useState(null);
  const [crossword, setCrossword] = useState();
  const [status, setStatus] = useState([
    "none",
    "none",
    "none",
    "none",
    "none",
  ]);

  useEffect(() => {
    if (roundName === "VCNV") {
      setHideTitleRound(true);
    }

    socket.on("tt:state", (data) => {
      if (data.status) {
        setHideTitleRound(true);
        setCNV(data.cnv);
      }
    });

    socket.on("ccvq:sendQues_mc", (data) => {
      setData(data);
      setCandidate(null);
    });

    socket.on("ccvq:show_all_players_ans", (data) => {
      setCandidate(data.players);
    });

    socket.on("vcnv:sendToMCStatusCrossword", (data) => {
      setStatus(data);
    });

    socket.on("vcnv:crossword", (data) => {
      let tempLength = data.crossword.map((item) => {
        return item.length;
      });
      setLength(tempLength);
      let temp = data.crossword.map((item, index) => {
        if (index < 4) {
          let line = [];
          for (let i = 0; i < parseInt((15 - item.length) / 2); i++) {
            line.push("");
          }
          for (let i = 0; i < item.length; i++) {
            line.push(item.word[i]);
          }
          for (
            let i = line.length;
            i < parseInt((17 + Math.max(...tempLength)) / 2);
            i++
          ) {
            line.push("");
          }
          return line;
        } else return null;
      });
      temp.pop();
      setCrossword(temp);
      setCNV(data.cnv);
    });

    return () => {
      socket.off("ccvq:show_all_players_ans");
      socket.off("ccvq:sendQues_mc");
      socket.off("tt:state");
      socket.off("vcnv:choose_ques");
      socket.off("vcnv:crossword");
    };
    //eslint-disable-next-line
  }, []);
  return (
    <>
      {data ? (
        <div className={styles.TTContainer}>
          <div className={styles.question}>
            {Candidate && (
              <BoxContent
                header="Question"
                content={data.ques_content}
                padding="1%"
              />
            )}
          </div>
          <div className={styles.AnswerContainer}>
            <div className={styles.AnswerCCVQContainer}>
              <BoxContent header="Answer" content={data.ques_ans} />
              <BoxContent header="Solution" content={data.solution} />
              {roundName === "VCNV" && crossword && (
                <div className={styles.solution}>
                  <Crossword
                    crossword={crossword}
                    status={status}
                    size="small"
                    length={length}
                  />
                </div>
              )}
            </div>
            {Candidate ? (
              <div className={styles.AnswersCandidateContainer}>
                <Answers display={true} Candidate={Candidate} />
              </div>
            ) : (
              <BoxContent header="Question" content={data.ques_content} />
            )}
          </div>
        </div>
      ) : (
        CNV && (
          <div className={styles.cnv}>
            <BoxContent
              header="ĐÁP ÁN CHƯỚNG NGẠI VẬT"
              content={`["${CNV}"] (
              ${CNV.split(" ").join("").length} kí tự)`}
              padding="1%"
            />
            <div className={styles.solution}>
              <Crossword
                crossword={crossword}
                status={status}
                size="medium"
                length={length}
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default TT;
