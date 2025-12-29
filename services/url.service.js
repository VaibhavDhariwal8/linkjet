import { nanoid } from "nanoid";
import { db } from "../db/index.js";
import { urlsTable } from "../models/index.js";

export async function insertURL(url, code) {
  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode: code ?? nanoid(6),
      targetURL: url,
      userId: req.user.id,
    })
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetURL: urlsTable.targetURL,
    });

  return result;
}
