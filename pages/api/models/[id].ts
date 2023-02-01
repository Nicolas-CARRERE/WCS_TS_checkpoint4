import { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const model = await prisma.vehicleModel.findUniqueOrThrow({
        where: {
          id: id as string,
        },
        include: {
          brand: true,
        },
      });
      res.status(200).json(model);
      break;
    case "PUT":
      const updateModel = await prisma.vehicleModel.update({
        where: {
          id: id as string,
        },
        data: {
          ...req.body,
        },
      });
      res.status(200).json(updateModel);
      break;
    case "DELETE":
      await prisma.vehicleModel.delete({
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
