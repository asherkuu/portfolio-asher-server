import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import mongoose from "mongoose";
import { nextTick } from "process";
const Portfolios = require("../models/portfolio");
const Portfolio = mongoose.model("Portfolios");
import IPortfolio from "../interfaces/portfolio";

/***
 * 리스트 조회
 * @METHOD `GET`
 * @PATH `/api/v1/portfolios`
 */
export const getPortfolios = async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      await Portfolio.find({}).exec(
        async (err: Object, portfolios: IPortfolio[]) => {
          return res.status(200).json(portfolios);
        }
      );
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};

/***
 * 상세 조회
 * @METHOD `GET`
 * @PATH `/api/v1/portfolios/:id`
 */
export const getPortfolioById = async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      await Portfolio.findById(req.params.id).exec(
        (err: Object, portfolio: IPortfolio) => {
          if (err || !portfolio) {
            return res.status(400).json({
              msg: "게시글이 존재하지 않습니다.",
            });
          }
          return res.status(200).json(portfolio);
        }
      );
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};

/***
 * 포폴 추가
 * @METHOD `POST`
 * @PATH `/api/v1/portfolios`
 */
export const createPortfolio = async (req: any, res: Response, next:NextFunction) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      let portfolioData = req.body;
      portfolioData.userId = req.user.sub;

      const portfolio: any = new Portfolio(portfolioData);
      const newPortfolio = await portfolio.save()
      return res.json(newPortfolio);
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};

/***
 * 포폴 업데이트
 * @METHOD `PATCH`
 * @PATH `/api/v1/portfolios/:id`
 */
export const updatePortfolio = async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    const {
      body,
      params: { id },
    } = req;
    try {
      const updatePortfolio = await Portfolio.findOneAndUpdate(
        { _id: id },
        body,
        { new: true, runValidators: true }
      );
      return res.json(updatePortfolio);
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};

/***
 * 포폴 삭제
 * @METHOD `DELETE`
 * @PATH `/api/v1/portfolios/:id`
 */
export const deletePortfolio = async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      const portfolio = await Portfolio.findOneAndRemove({
        _id: req.params.id,
      });
      return res.json({ _id: portfolio.id });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};
