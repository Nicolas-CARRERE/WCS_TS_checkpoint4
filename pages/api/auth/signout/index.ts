const signOut = async (req: any, res: any) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

export default signOut;
