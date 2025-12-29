import express from "express";
import { shortenPostRequestSchema } from "../validation/request.validation.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { insertURL } from "../services/url.service.js";

const router = express.Router();

router.post("/shorten", ensureAuthenticated, async function (req, res) {
  const validationResult = await shortenPostRequestSchema.safeParseAsync(
    req.body
  );

  if (validationResult.error)
    return res.status(400).json({ error: validationResult.error });

  const { url, code } = validationResult.data;

  const result = await insertURL(url, code);

  return res.status(201).json({
    id: result.id,
    shortCode: result.shortCode,
    targetURL: result.targetURL,
  });
});

export default router;
