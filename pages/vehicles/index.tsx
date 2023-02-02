import React, { useEffect } from "react";
import ModelCard from "@/components/ModelCard";
import {
  useQueryClient,
  useQuery,
  useMutation,
  useQueries,
} from "@tanstack/react-query";
import { FieldValue, useForm } from "react-hook-form";
import { TNewVehicle, TVehicleBrand } from "@/types/apiTypes";
import modelFetcher from "@/utils/modelFetcher";
import brandFetcher from "@/utils/brandFetcher";
import vehicleFetcher from "@/utils/vehicleFetcher";
import userFetcher from "@/utils/userFetcher";
import VehicleCard from "@/components/VehicleCard";

type Props = {};

function Vehicles({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (data: FieldValue<TNewVehicle>) => {
      vehicleFetcher.createVehicle(data as TNewVehicle);
    },
    {
      onSuccess: () => {
        console.log("success");
        vehicleFetcher.getVehicles();
        queryClient.invalidateQueries({
          queryKey: "vehicles",
          refetchActive: true,
        });
        reset();
      },
      onError: () => {
        console.log(JSON.stringify(errors));
      },
    }
  );

  const [modelsQuery, usersQuery, vehiclesQuery] = useQueries({
    queries: [
      {
        queryKey: ["models"],
        queryFn: () => modelFetcher.getModels(),
        staleTime: 5000,
      },
      {
        queryKey: ["users"],
        queryFn: () => userFetcher.getUsers(),
        staleTime: 5000,
      },
      {
        queryKey: ["vehicles"],
        queryFn: () => vehicleFetcher.getVehicles(),
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

  if (usersQuery.isLoading) {
    return <div>Loading Users...</div>;
  }

  if (usersQuery.error) {
    return "An error has occured: " + usersQuery.error.message;
  }

  if (vehiclesQuery.isLoading) {
    return <div>Loading Vehicles...</div>;
  }

  if (vehiclesQuery.error) {
    return "An error has occured: " + vehiclesQuery.error.message;
  }

  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <form
        className="w-full flex flex-col static bg-slate-100 z-50 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
        onSubmit={handleSubmit(mutate)}>
        <div className="flex flex-col">
          <div className="flex justify-around">
            <label className="label-field w-30%]" htmlFor="name">
              Vehicle name
              <input
                className="input-field"
                type="text"
                {...register("name", { required: true })}
              />
            </label>
            <label className="label-field w-[30%]" htmlFor="name">
              Model
              <select
                id="modelId"
                className="input-field"
                {...register("modelId", { required: true })}>
                <option value="">Select a Model</option>
                {modelsQuery.data &&
                  modelsQuery.data.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
              </select>
            </label>
            <label className="label-field w-[30%]" htmlFor="name">
              User
              <select
                id="userId"
                className="input-field"
                {...register("userId", { required: true })}>
                <option value="">Select a user</option>
                {usersQuery.data &&
                  usersQuery.data.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <input className="submit-btn" type="submit" />
        </div>
      </form>
      <div className="flex flex-wrap overflow-auto">
        {vehiclesQuery.data &&
          vehiclesQuery.data.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
      </div>
    </div>
  );
}

export default Vehicles;
