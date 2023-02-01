import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } else {
    res.status(405).end(`Method ${method} not allowed`);
  }
};

export default handler;
