import { body } from "express-validator";

// 포폴 생성
export const validCreatePortfolio = [
  body("content", "내용을 입력하세요").trim().notEmpty(),
  body("jobTitle", "잡 타이틀을 입력하세요").trim().notEmpty(),
  body("title", "프로젝트 제목을 입력하세요").trim().notEmpty(),
  body("description", "프로젝트 설명을 입력하세요").trim().notEmpty(),
  body("startDate", "시작일을 입력하세요").trim().notEmpty(),
  body("endDate", "종료일을 입력하세요").trim().notEmpty(),
];
