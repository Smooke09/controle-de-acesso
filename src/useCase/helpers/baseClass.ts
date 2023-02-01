class BaseClass {
  constructor(
    protected repository: any,
    protected id: string,
    protected obj: any
  ) {
    this.repository = repository;
    this.id = id;
    this.obj = obj;
  }

  async get() {
    const data = await this.repository.find();

    if (data.length === 0) {
      return false;
    }

    return data;
  }

  async getById() {
    const data = await this.repository.findBy({ id: this.id });

    if (data.length === 0) {
      return false;
    }

    return data;
  }

  async create(obj: any) {
    const data = await this.repository.create(obj);
    await this.repository.save(data);

    if (!data) return false;

    return data;
  }

  async update() {
    const data = await this.repository.save(this.obj);

    if (!data) return false;

    return data;
  }

  async delete() {
    const data = await this.repository.delete(this.id);

    return data;
  }
}

export default BaseClass;
