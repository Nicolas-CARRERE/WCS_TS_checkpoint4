import { TVehicleBrand } from "@/types/apiTypes";
import React from "react";
import Image from "next/image";
import brandFetcher from "@/utils/brandFetcher";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ModalOnDelete from "../ModalOnDelete";

type Props = {
  brand: Omit<TVehicleBrand, "models">;
};

function BrandCard({ brand }: Props) {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const deleteBrand = async () => {
    await brandFetcher.deleteBrandById(brand.id);
    queryClient.invalidateQueries({
      queryKey: "brands",
      refetchActive: true,
    });
  };

  const handleItemToDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowModal(true);
  };

  const handleDeleteConfirmed = (): void => {
    deleteBrand();
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
          src={brand.logoUrl}
          width={32}
          height={32}
          alt={brand.name}
        /> */}
        <div className="w-32 h-32 bg-slate-400 rounded-full"></div>
        <div className="flex justify-between">
          <div className="text-xl font-bold mr-6">{`${brand.name}`}</div>
          <button
            className="text-xl font-bold ml-6"
            onClick={handleItemToDelete}>
            🗑️
          </button>
          {showModal && (
            <ModalOnDelete
              handleDeleteConfirmed={handleDeleteConfirmed}
              handleDeleteCancelled={handleDeleteCancelled}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BrandCard;
