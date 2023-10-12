import bcrypt from "bcrypt";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export const UserRoles = [
  "frontend",
  "backend",
  "fullstack",
  "manager",
  "productOwner",
] as const;

export type UserRole = (typeof UserRoles)[number];

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: "enum",
    enum: UserRoles,
    default: "fullstack",
  })
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
