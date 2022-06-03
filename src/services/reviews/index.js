import express from "express";
import createError from "http-errors";
import ReviewModel from "./models.js";

const reviewRouter = express.Router();

reviewRouter.post("/", async (req, res, next) => {
  try {
    const review = await ReviewModel.create(req.body);
    res.json(review);
  } catch (err) {
    next(err);
  }
});

reviewRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await ReviewModel.find();
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

reviewRouter.get("/:reviewId", async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await ReviewModel.findById(reviewId);
    if (review) {
      res.send(review);
    } else {
      next(
        createError(404, `Review with id ${req.params.reviewId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default reviewRouter;
