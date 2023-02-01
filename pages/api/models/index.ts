import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const models = await prisma.vehicleModel.findMany();
      return res.status(200).json(models);
    case "POST":
      const newModel = await prisma.vehicleModel.create({
        data: {
          name: req.body.name,
          imageUrl1: req.body.imageUrl1,
          imageUrl2: req.body.imageUrl2,
          imageUrl3: req.body.imageUrl3,
          brand: {
            connect: {
              id: req.body.brandId,
            },
          },
        },
      });
      return res.status(200).json(newModel);
    default:
      res.status(405).end(`Method ${method} not allowed`);
  }
};

export default handler;
