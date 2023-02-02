import { TUser } from "@/types/apiTypes";
import userFetcher from "@/utils/userFetcher";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ModalOnDelete from "../ModalOnDelete";

type Props = {
  user: Omit<TUser, "password">;
};

function UserCard({ user }: Props) {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const deleteUser = async () => {
    await userFetcher.deleteUserById(user.id);
    queryClient.invalidateQueries({
      queryKey: "users",
      refetchActive: true,
    });
  };

  const handleItemToDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowModal(true);
  };

  const handleDeleteConfirmed = (): void => {
    deleteUser();
    setShowModal(false);
  };

  const handleDeleteCancelled = (): void => {
    setShowModal(false);
  };

  return (
    <div className="w-52 h-52 bg-slate-300 rounded-xl m-6 hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-32 h-32 bg-slate-400 rounded-full"></div>
        <div className="text-xl font-bold">{`${user.firstname} ${user.lastname}`}</div>
        <div className="text-xl font-bold">{`${user.username}`}</div>
        <div className="flex flex-row">
          <div className="text-lg">{user.email}</div>
          <button
            className="text-xl font-bold ml-6"
            onClick={handleItemToDelete}>
            🗑️
          </button>
        </div>
      </div>
      {showModal && (
        <ModalOnDelete
          handleDeleteConfirmed={handleDeleteConfirmed}
          handleDeleteCancelled={handleDeleteCancelled}
        />
      )}
    </div>
  );
}

export default UserCard;
