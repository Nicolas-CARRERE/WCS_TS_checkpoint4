import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const vehicles = await prisma.vehicle.findMany({
        include: {
          user: true,
          model: true,
        },
      });
      res.status(200).json(vehicles);
      break;
    case "POST":
      const newVehicle = await prisma.vehicle.create({
        data: {
          name: req.body.name,
          user: {
            connect: {
              id: req.body.userId,
            },
          },
          model: {
            connect: {
              id: req.body.modelId,
            },
          },
        },
      });
      res.status(200).json(newVehicle);
      break;
    default:
      res.status(405).end(`Method ${method} not allowed`);
  }
};

export default handler;
