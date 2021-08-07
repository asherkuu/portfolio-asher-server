import { body } from "express-validator";

// 포폴 생성
export const validCreatePortfolio = [
  body("content", "내용을 입력하세요").trim().notEmpty(),
];
