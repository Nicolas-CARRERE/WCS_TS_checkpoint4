import React, { useEffect } from "react";
import ModelCard from "@/components/ModelCard";
import {
  useQueryClient,
  useQuery,
  useMutation,
  useQueries,
} from "@tanstack/react-query";
import { FieldValue, useForm } from "react-hook-form";
import { TNewVehicleModel, TVehicleBrand } from "@/types/apiTypes";
import modelFetcher from "@/utils/modelFetcher";
import Brands from "pages/brands";
import brandFetcher from "@/utils/brandFetcher";

type Props = {};

function Models({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (data: FieldValue<TNewVehicleModel>) => {
      modelFetcher.createModel(data as TNewVehicleModel);
    },
    {
      onSuccess: () => {
        console.log("success");
        modelFetcher.getModels();
        queryClient.invalidateQueries({
          queryKey: "models",
          refetchActive: true,
        });
        reset();
      },
      onError: () => {
        console.log(JSON.stringify(errors));
      },
    }
  );

  const [modelsQuery, brandsQuery] = useQueries({
    queries: [
      {
        queryKey: ["models"],
        queryFn: () => modelFetcher.getModels(),
        staleTime: 5000,
      },
      {
        queryKey: ["brands"],
        queryFn: () => brandFetcher.getBrands(),
        staleTime: 5000,
      },
    ],
  });

  if (modelsQuery.isLoading) {
    return <div>Loading Models...</div>;
  }

  if (modelsQuery.error) {
    return "An error has occured: " + modelsQuery.error.message;
  }

  if (brandsQuery.isLoading) {
    return <div>Loading Brands...</div>;
  }

  if (brandsQuery.error) {
    return "An error has occured: " + brandsQuery.error.message;
  }

  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <form
        className="w-full flex flex-col static bg-slate-100 z-50 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
        onSubmit={handleSubmit(mutate)}>
        <div className="flex flex-col">
          <div className="flex justify-around">
            <label className="label-field w-[30%]" htmlFor="name">
              Model
              <input
                className="input-field"
                type="text"
                {...register("name", { required: true })}
              />
            </label>
            <label className="label-field w-[70%]" htmlFor="imageUrl1">
              Url picture 1
              <input
                className="input-field"
                type="text"
                {...register("imageUrl1", { required: true })}
              />
            </label>
          </div>

          <div className="flex justify-around">
            <div className="label-field w-[30%]"></div>
            <label className="label-field w-[70%]" htmlFor="imageUrl2">
              Url picture 2
              <input
                className="input-field"
                type="text"
                {...register("imageUrl2", { required: true })}
              />
            </label>
          </div>

          <div className="flex justify-around">
            <label className="label-field w-[30%]" htmlFor="name">
              Brand
              <select
                id="brandId"
                className="input-field"
                {...register("brandId", { required: true })}>
                <option value="">Select a brand</option>
                {brandsQuery.data &&
                  brandsQuery.data.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
              </select>
            </label>
            <label className="label-field w-[70%]" htmlFor="imageUrl3">
              Url picture 3
              <input
                className="input-field"
                type="text"
                {...register("imageUrl3", { required: true })}
              />
            </label>
          </div>

          <input className="submit-btn" type="submit" />
        </div>
      </form>
      <div className="flex flex-wrap overflow-auto">
        {modelsQuery.data &&
          modelsQuery.data.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
      </div>
    </div>
  );
}

export default Models;
