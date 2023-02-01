// import Cookies from "cookies";
// import { SignJWT } from "jose";
// import next, { NextApiRequest, NextApiResponse } from "next";

// const secret = process.env.JWT_SECRET || "secret";

// type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => void;

// export const getToken = (req: NextApiRequest, res: NextApiResponse) => {
//   const cookies = new Cookies(req, res);
//   const headerToken = req.headers["authorization"]?.split(" ")[1];
//   const headerCookie = cookies.get("token")?.split(" ")[1];

//   return headerToken || headerCookie;
// };

// const checkToken = (
//   req: NextApiRequest,
//   res: NextApiResponse,
//   next: NextApiHandler
// ) => {
//   const token = getToken(req, res);

//   if (!token) {
//     console.log("No token");
//     return next();
//   }
//   const decodedToken = jwt.verify(token, secret);

//   if (typeof decodedToken === "string") {
//     throw new Error(decodedToken);
//   }
//   req.user = decodedToken;

//   next();
// };

// export default checkToken;
