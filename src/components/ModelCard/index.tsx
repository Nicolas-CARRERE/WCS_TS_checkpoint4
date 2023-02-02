import { TVehicleModel } from "@/types/apiTypes";
import React from "react";
import Image from "next/image";
import modelFetcher from "@/utils/modelFetcher";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ModalOnDelete from "../ModalOnDelete";

type Props = {
  model: Omit<TVehicleModel, "users | brand">;
};

function ModelCard({ model }: Props) {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const deleteModel = async () => {
    await modelFetcher.deleteModelById(model.id);
    queryClient.invalidateQueries({
      queryKey: "models",
      refetchActive: true,
    });
  };

  const handleItemToDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowModal(true);
  };

  const handleDeleteConfirmed = (): void => {
    deleteModel();
    setShowModal(false);
  };

  const handleDeleteCancelled = (): void => {
    setShowModal(false);
  };

  return (
    <div className="w-52 h-52 bg-slate-300 rounded-xl m-6 hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col items-center justify-center h-full">
        {/* <Image
          className="bg-slate-400 rounded-full"
          src={model.logoUrl}
          width={32}
          height={32}
          alt={model.name}
        /> */}
        <div className="w-32 h-32 bg-slate-400 rounded-full"></div>
        <div className="flex justify-between">
          <div className="text-xl font-bold mr-6">{`${model.name}`}</div>
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

export default ModelCard;
