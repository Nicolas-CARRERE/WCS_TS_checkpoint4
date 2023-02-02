import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    const users = await prisma.user.findMany();
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return res.status(200).json(usersWithoutPassword);
  } else {
    res.status(405).end(`Method ${method} not allowed`);
  }
};

export default handler;
