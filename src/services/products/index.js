import express from "express";
import createError from "http-errors";
import q2m from "query-to-mongo";
import ProductModel from "./models.js";

const productRouter = express.Router();

//END POINT TO POST PRODUCTS
productRouter.post("/", async (req, res, next) => {
  try {
    const product = await ProductModel.create(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//END POINT TO GET PRODUCTS

productRouter.get("/", async (req, res, next) => {
  try {
    const product = await ProductModel.find();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//END POINT TO GET PRODUCT BY ID

productRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (product) {
      res.send(product);
    } else {
      next(
        createError(
          404,
          `Product with the id ${req.params.productId} not found`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

// END POINT TO UPDATE PRODUCT BY ID
productRouter.put("/:productId", async (req, res, next) => {
  try {
    const modifyProduct = await ProductModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true, runValidators: true }
    );
    if (modifyProduct) {
      res.send(modifyProduct);
    } else {
      next(
        createError(
          404,
          `Product with the id ${req.params.productId} not found`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

// END POINT TO DELETE PRODUCT BY ID
productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(
      req.params.productId
    );
    if (deletedProduct) {
      res.status(204).send();
    } else {
      next(
        createError(
          404,
          `Product with the id ${req.params.productId} not found`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

export default productRouter;
