import { TypeOf, z } from "zod";
import { UserRoles } from "../models/User";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().nonempty(),
    role: z.enum(UserRoles).default("fullstack"),
  }),
});

export const listUserSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().positive().optional(),
  }),
});

export type CreateUserRequest = TypeOf<typeof createUserSchema>["body"];
export type GetAllUsersRequest = TypeOf<typeof listUserSchema>["query"];
