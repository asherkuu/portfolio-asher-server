import express, { NextFunction } from "express";
import {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolio";
import { checkJwt, checkRole } from "../controllers/auth";
import { imageUpload } from "../lib/fileUpload";
import { validCreatePortfolio } from "../lib/valid";

const router = express.Router();

const PTF = "/portfolios";

router.get(PTF + "", getPortfolios); // 포폴 리스트 조회
router.get(PTF + "/:id", getPortfolioById); // 포폴 상세 조죄
router.post(
  PTF + "",
  // checkJwt,
  // validCreatePortfolio,
  // checkRole("admin"),
  // imageUpload.single("image"),
  createPortfolio
); // 포폴 등록
router.post(
  "/portfolios/upload",
  checkJwt,
  checkRole("admin"),
  imageUpload.single("image"),
  createPortfolio
); // 이미지 업로드 테스트
router.patch(PTF + "/:id", checkJwt, checkRole("admin"), updatePortfolio); // 포폴 수정
router.delete(PTF + "/:id", checkJwt, checkRole("admin"), deletePortfolio); // 포폴 삭제

module.exports = router;
