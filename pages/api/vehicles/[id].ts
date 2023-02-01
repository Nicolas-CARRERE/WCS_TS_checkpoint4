import prisma from "prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const vehicle = await prisma.vehicle.findUniqueOrThrow({
        where: {
          id: id as string,
        },
        include: {
          user: true,
          model: true,
        },
      });
      res.status(200).json(vehicle);
      break;
    case "PUT":
      const updateVehicle = await prisma.vehicle.update({
        where: {
          id: id as string,
        },
        data: {
          ...req.body,
        },
      });
      res.status(200).json(updateVehicle);
      break;
    case "DELETE":
      await prisma.vehicle.delete({
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
