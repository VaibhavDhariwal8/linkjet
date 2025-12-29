import express from "express";
import {
  signupPostRequestSchema,
  loginPostRequestSchema,
} from "../validation/request.validation.js";
import { hashPasswordUsingSalt } from "../utils/hash.js";
import { createUser, getUserByEmail } from "../services/user.service.js";
import { createUsertoken } from "../utils/token.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const validationResult = await signupPostRequestSchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { firstname, lastname, email, password } = validationResult.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser)
    return res
      .status(400)
      .json({ error: `User with email: ${email} already exists!` });

  const { salt, password: hashedPassword } = await hashPasswordUsingSalt(
    password
  );

  const user = await createUser(
    email,
    firstname,
    lastname,
    salt,
    hashedPassword
  );

  return res.status(201).json({ data: { userId: user.id } });
});

router.post("/login", async (req, res) => {
  const validationResult = await loginPostRequestSchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { email, password } = validationResult.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return res
      .status(404)
      .json({ error: `user with the email ${email} does not exist` });
  }

  const { password: hashedPassword } = await hashPasswordUsingSalt(
    password,
    user.salt
  );

  if (user.password !== hashedPassword) {
    return res.status(404).json({ error: "Invalid Password" });
  }

  const token = await createUsertoken({ id: user.id });

  return res.json({ token });
});

export default router;
