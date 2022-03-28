import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    return getEntries(res);
  }

  if (req.method === "POST") {
    return addEntry(req, res);
  }

  return res.status(400).json({ message: "Method not allowed" });
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: "ascending" });

  await db.disconnect();

  res.status(200).json(entries);
};

const addEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body;

  const entry = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await db.connect();
    await entry.save();
    await db.disconnect();

    res.status(201).json(entry);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
};
