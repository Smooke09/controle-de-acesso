import { PrimaryColumn, CreateDateColumn } from "typeorm";

export class BaseEntity {
  @PrimaryColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = this.id;
    }
  }
}
