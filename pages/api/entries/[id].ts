import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import { Entry } from "../../../models";
import { IEntry } from "../../../models/Entry";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  if (req.method === "PUT") {
    return updateEntry(req, res);
  }

  res.status(200).json({ message: "Method not allowed" });
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(404).json({ message: "Entry not found" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      {
        runValidators: true,
        new: true,
      }
    );

    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: error.errors.status.message });
  }
};
