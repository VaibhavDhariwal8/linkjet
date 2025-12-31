import express from "express";
import { shortenPostRequestSchema } from "../validation/request.validation.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { insertURL, getUrlByShortCode } from "../services/url.service.js";
import { getCodesByUserId } from "../services/url.service.js";
import db from "../db/index.js";
import { urlsTable } from "../models/url.model.js";
import { urlClicksTable } from "../models/urlClicks.model.js";
import { and, eq, sql } from "drizzle-orm";
import { getCountry } from "../utils/geo.js";

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

router.get("/:shortCode", async (req, res) => {
  const code = req.params.shortCode;

  const url = await getUrlByShortCode(code);
  if (!url) return res.status(404).json({ error: "Invalid URL" });

  const country = getCountry(req);

  // increment clicks
  await db
    .update(urlsTable)
    .set({ clicks: sql`${urlsTable.clicks} + 1` })
    .where(eq(urlsTable.id, url.id));

  // store geo click
  await db.insert(urlClicksTable).values({
    urlId: url.id,
    country,
  });

  return res.redirect(url.targetURL);
});

export default router;
