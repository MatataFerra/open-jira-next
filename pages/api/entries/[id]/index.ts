import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const { id } = req.query;

  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).json({ message: "Invalid id" });
  // }

  if (req.method === "PUT") {
    return updateEntry(req, res);
  }

  if (req.method === "GET") {
    return getEntry(req, res);
  }

  if (req.method === "DELETE") {
    return deleteEntry(req, res);
  }

  res.status(400).json({ message: "Method not allowed" });
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

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entry = await Entry.findById(id);

  if (!entry) {
    await db.disconnect();
    return res.status(404).json({ message: "Entry not found" });
  }

  await db.disconnect();
  res.status(200).json(entry);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entry = await Entry.findById(id);

  if (!entry) {
    await db.disconnect();
    return res.status(404).json({ message: "Entry not found" });
  }

  await entry.remove();

  await db.disconnect();
  res.status(200).json({ message: "Entry deleted" });
};
