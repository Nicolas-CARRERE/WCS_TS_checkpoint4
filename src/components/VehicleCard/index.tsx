import { TVehicle } from "@/types/apiTypes";
import React from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import vehicleFetcher from "@/utils/vehicleFetcher";
import { useState } from "react";
import ModalOnDelete from "../ModalOnDelete";

type Props = {
  vehicle: TVehicle;
};

function VehicleCard({ vehicle }: Props) {
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const deleteVehicle = async () => {
    await vehicleFetcher.deleteVehicleById(vehicle.id);
    queryClient.invalidateQueries({
      queryKey: "vehicles",
      refetchActive: true,
    });
  };

  const handleItemToDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowModal(true);
  };

  const handleDeleteConfirmed = (): void => {
    deleteVehicle();
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
          <div className="text-xl font-bold mr-6">{`${vehicle.name}`}</div>
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

export default VehicleCard;
