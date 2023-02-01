import { Request, Response } from "express";
import { ProductRepository } from "../repositories";
import { ProductUseCase } from "../useCase/productUseCase";

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    const products = await new ProductUseCase(
      ProductRepository()
    ).getProducts();

    if (!products) {
      return res.status(400).json({ message: "No products found" });
    }

    return res.status(200).json({ message: "Products found", products });
  }

  async getProduct(req: Request, res: Response) {
    const { id } = req.params;

    const product = await new ProductUseCase(
      ProductRepository(),
      id
    ).getProduct();

    if (!product) {
      return res.status(400).json({ message: "No product found" });
    }

    return res.status(200).json({ message: "Product found", product });
  }

  async createProduct(req: Request, res: Response) {
    const { name, description, price } = req.body;

    const product = await new ProductUseCase(ProductRepository(), "", {
      name,
      description,
      price,
    }).createProduct();

    if (!product) {
      return res.status(400).json({ message: "Error creating product" });
    }

    return res.status(200).json({ message: "Product created", product });
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const product = await new ProductUseCase(ProductRepository(), "", {
      id,
      name,
      description,
      price,
    }).updateProduct();

    if (!product) {
      return res.status(400).json({ message: "Error updating product" });
    }

    return res.status(200).json({ message: "Product updated", product });
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    const product = await new ProductUseCase(
      ProductRepository(),
      id
    ).deleteProduct();

    if (!product) {
      return res.status(400).json({ message: "Error deleting product" });
    }

    return res.status(200).json({ message: "Product deleted" });
  }
}

export default new ProductController();
