import express from "express";
import { shortenPostRequestSchema } from "../validation/request.validation.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { insertURL, getUrlByShortCode } from "../services/url.service.js";
import { getCodesByUserId } from "../services/url.service.js";
import db from "../db/index.js";
import { urlsTable } from "../models/url.model.js";
import { and, eq } from "drizzle-orm";

const router = express.Router();

router.post("/shorten", ensureAuthenticated, async function (req, res) {
  const userId = req.user.id;
  const validationResult = await shortenPostRequestSchema.safeParseAsync(
    req.body
  );

  if (validationResult.error)
    return res.status(400).json({ error: validationResult.error });

  const { url, code } = validationResult.data;

  const result = await insertURL(url, code, userId);

  return res.status(201).json({
    id: result.id,
    shortCode: result.shortCode,
    targetURL: result.targetURL,
  });
});

router.get("/codes", ensureAuthenticated, async function (req, res) {
  const userId = req.user.id;
  const codes = await getCodesByUserId(userId);

  return res.json({ codes });
});

router.delete("/:id", ensureAuthenticated, async function (req, res) {
  const id = req.params.id;
  await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id)));

  return res.status(200).json({ delete: true });
});

router.get("/:shortCode", async function (req, res) {
  const code = req.params.shortCode;
  const result = await getUrlByShortCode(code);
  if (!result) return res.status(404).json({ error: "Invalid URL" });

  return res.redirect(result.targetURL);
});

export default router;
