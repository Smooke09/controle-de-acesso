import { ProductRepository } from "../repositories";
import BaseClass from "./helpers/baseClass";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export class ProductUseCase extends BaseClass {
  constructor(repository: any, id: string = "", obj: Partial<Product> = {}) {
    super(repository, id, obj);
  }

  public async getProducts() {
    return await this.get();
  }

  public async getProduct() {
    return await this.getById();
  }

  public async createProduct() {
    const verifyProduct = await ProductRepository().findBy({
      name: this.obj.name,
    });

    if (verifyProduct.length > 0) {
      return false;
    }

    return await this.create(this.obj);
  }

  public async updateProduct() {
    const verifyProduct = await ProductRepository().findOneBy({
      id: this.obj.id,
    });

    if (!verifyProduct) return false;

    return await this.update();
  }

  public async deleteProduct() {
    const verifyProduct = await ProductRepository().findBy({ id: this.id });

    if (verifyProduct.length === 0) return false;

    return await this.delete();
  }
}
