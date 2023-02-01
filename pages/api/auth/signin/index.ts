import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import Cookies from "cookies";

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV === "production",
  });
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json("user not found");
    }
    if (!bcrypt.compare(user.password, password)) {
      return res.status(403).json("Invalid credentials");
    }

    const { password: removedPassword, ...userWithoutPassword } = user;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");
    const alg = "HS256";
    const token = await new SignJWT(userWithoutPassword)
      .setProtectedHeader({ alg })
      .setExpirationTime("5d")
      .sign(secret);

    cookies.set("token", `Bearer ${token}`, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default signIn;
