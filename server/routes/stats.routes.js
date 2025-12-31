import { Router } from "express";
import { eq, desc, sql } from "drizzle-orm";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { db } from "../db/index.js";
import { urlsTable } from "../models/url.model.js";
import { urlClicksTable } from "../models/urlClicks.model.js";

const router = Router();

router.get("/top-region", ensureAuthenticated, async (req, res) => {
  const userId = req.user.id;

  const [result] = await db
    .select({
      country: urlClicksTable.country,
      clicks: sql`count(*)`.as("clicks"),
    })
    .from(urlClicksTable)
    .innerJoin(urlsTable, eq(urlClicksTable.urlId, urlsTable.id))
    .where(eq(urlsTable.userId, userId))
    .groupBy(urlClicksTable.country)
    .orderBy(desc(sql`count(*)`))
    .limit(1);

  return res.json(result || null);
});

export default router;
