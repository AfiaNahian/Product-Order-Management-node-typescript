import { Request, Response } from 'express';
import { ProductServices } from './products.service';
import ProductValidationSchema from './products.validation';

// Creating a product after validation
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    // product validation using zod
    const validatedProduct = ProductValidationSchema.parse(productData);
    const result = await ProductServices.createProductDB(validatedProduct);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Finding a product with specified term and find all products
const findProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (
      req.query.hasOwnProperty('searchTerm') &&
      typeof searchTerm === 'string' &&
      searchTerm !== undefined
    ) {
      const result = await ProductServices.findProductWithSearch(searchTerm);
      // if there is no product in the array , it will show a message
      if (result.length === 0) {
        res.status(404).json({
          success: false,
          message: 'No product found',
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: result,
        });
      }
    } else {
      const result = await ProductServices.findProductDB();
      res.status(200).json({
        success: true,
        message: `Products fetched successfully!`,
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// finding a product with id
const findSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const result = await ProductServices.findSingleProductDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Updating a product with id
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const updatedProductInfo = req.body;
    const result = await ProductServices.updateProductDB(
      productId,
      updatedProductInfo,
    );
    if (!result) {
      res.status(400).json({
        success: false,
        message: 'Invalid Product ID',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Deleting a product from the database
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const result = await ProductServices.deleteProductDB(productId);
    // error handling
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product does not exist',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

export const ProductController = {
  createProduct,
  findProduct,
  findSingleProduct,
  updateSingleProduct,
  deleteProduct,
};
