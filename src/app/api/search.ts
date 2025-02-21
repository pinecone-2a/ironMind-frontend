import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  try {
    const { q } = req.query; 

    if (!q || typeof q !== "string") {
      return res.status(400).json({ message: "Invalid query" });
    }

    const profile = await prisma.profile.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
              mode: "insensitive", 
            },
          },
          {
            tags: {
              has: q, 
            },
          },
        ],
      },
    });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
