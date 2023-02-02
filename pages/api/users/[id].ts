import { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: id as string,
        },
        include: {
          vehicles: true,
        },
      });
      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
      break;
    case "PUT":
      const updateUser = await prisma.user.update({
        where: {
          id: id as string,
        },
        data: {
          ...req.body,
        },
      });
      const { password: removedPassword, ...userUpdatedWithoutPassword } =
        updateUser;
      res.status(200).json(userUpdatedWithoutPassword);
      break;
    case "DELETE":
      await prisma.user.delete({
        where: {
          id: id as string,
        },
      });
      res.status(200).json("Deletion ok");
    default:
      res.status(405).end(`Method ${method} not allowed`);
  }
};

export default handler;
