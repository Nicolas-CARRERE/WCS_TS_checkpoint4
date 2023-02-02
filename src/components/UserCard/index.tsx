import { TUser } from "@/types/apiTypes";
import React from "react";

type Props = {
  user: Omit<TUser, "password">;
};

function UserCard({ user }: Props) {
  return (
    <div className="w-52 h-52 bg-slate-300 rounded-xl">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-32 h-32 bg-slate-400 rounded-full"></div>
        <div className="text-xl font-bold">{`${user.firstname} ${user.lastname}`}</div>
        <div className="text-xl font-bold">{`${user.username}`}</div>
        <div className="text-lg">{user.email}</div>
      </div>
    </div>
  );
}

export default UserCard;
