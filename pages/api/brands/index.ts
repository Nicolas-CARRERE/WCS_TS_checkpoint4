import { TNewVehicleBrand } from "./../../../src/types/apiTypes";
import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const brands = await prisma.vehicleBrand.findMany();
      return res.status(200).json(brands);
    case "POST":
      const newBrand: TNewVehicleBrand = await prisma.vehicleBrand.create({
        data: {
          name: req.body.name,
          logoUrl: req.body.logoUrl,
        },
      });
      return res.status(200).json(newBrand);
    default:
      res.status(405).end(`Method ${method} not allowed`);
  }
};

export default handler;
