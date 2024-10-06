import { z } from "zod";

const requiredString = z
  .string({ invalid_type_error: "Input a string" })
  .min(1, "Required")
  .trim();

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString.regex(
    /^[a-zA-z0-9_-]+$/,
    "Only letters, numbers, _ , and - are alloweds"
  ),
  password: requiredString.min(8, " Must be at least 8 characters"),
});

export type signUpValue = z.infer<typeof signUpSchema>;

export const LoginSchema = z.object({
  email: requiredString.email("Provide a valid email address"),
  password: requiredString.min(8, " Must be at least 8 characters"),
});

export type LoginValue = z.infer<typeof LoginSchema>;
