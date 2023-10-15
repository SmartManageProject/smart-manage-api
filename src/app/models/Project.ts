import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

@Entity("projects")
export default class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  members: User[];
}
