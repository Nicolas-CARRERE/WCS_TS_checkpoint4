import { TNewUser } from "./../../../../src/types/apiTypes";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../../prisma/client";
import { SignJWT } from "jose";
import Cookies from "cookies";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV === "production",
  });
  try {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

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

    cookies.set("token", `Bearer ${token}`, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json(newUserWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default signup;
