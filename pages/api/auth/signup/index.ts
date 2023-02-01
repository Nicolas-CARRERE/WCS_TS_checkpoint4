import { TNewUser } from "./../../../../src/types/apiTypes";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../../prisma/client";
import { SignJWT } from "jose";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    const { password } = req.body;
    console.log(req);
    const saltRounds = 10;
    console.log("saltRounds", saltRounds);
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    console.log("hashedPassword", hashedPassword);

    const newUser: TNewUser = await prisma.user.create({
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
    });
    const { password: removedPassword, ...newUserWithoutPassword } = newUser;
    console.log(newUserWithoutPassword);

    const alg = "HS256";
    const token = await new SignJWT(newUserWithoutPassword)
      .setProtectedHeader({ alg })
      .setExpirationTime("5d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET || "secret"));

    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json(newUserWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default signup;
