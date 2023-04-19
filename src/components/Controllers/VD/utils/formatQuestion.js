import { VDConst } from "utils/const";

export const FormatQuestion = [
  {
    id: 1,
    score: -1,
    data: {},
  },
  {
    id: 2,
    score: -1,
    data: {},
  },
  {
    id: 3,
    score: -1,
    data: {},
  },
];

export const locateTimeQuestion = (question) => {
  return (
    question.time ||
    VDConst[`${question.type === "lab" ? "lab" : "time"}${question.score}`] ||
    15
  );
};

export const locateTimePractical = (question) => {
  return question.time_practical % 15 === 0 ? question.time_practical : null;
};
