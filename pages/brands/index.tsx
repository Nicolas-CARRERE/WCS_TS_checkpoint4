import React from "react";
import BrandCard from "@/components/BrandCard";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { FieldValue, useForm } from "react-hook-form";
import { TNewVehicleBrand } from "@/types/apiTypes";
import brandFetcher from "@/utils/brandFetcher";

type Props = {};

function Brands({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (data: FieldValue<TNewVehicleBrand>) => {
      brandFetcher.createBrand(data as TNewVehicleBrand);
    },
    {
      onSuccess: () => {
        console.log("success");
        brandFetcher.getBrands();
        queryClient.invalidateQueries({
          queryKey: "brands",
          refetchActive: true,
        });
        reset();
      },
      onError: () => {
        console.log(JSON.stringify(errors));
      },
    }
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: () => brandFetcher.getBrands(),
    staleTime: 5000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <form
        className="w-full flex flex-col static bg-slate-100 z-50 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]"
        onSubmit={handleSubmit(mutate)}>
        <div className="flex justify-around">
          <label className="label-field w-[30%]" htmlFor="name">
            Name
            <input
              className="input-field"
              type="text"
              {...register("name", { required: true })}
            />
          </label>
          <label className="label-field w-[70%]" htmlFor="logoUrl">
            Logo url
            <input
              className="input-field"
              type="text"
              {...register("logoUrl", { required: true })}
            />
          </label>
        </div>
        <input className="submit-btn" type="submit" />
      </form>
      <div className="flex flex-wrap overflow-auto">
        {data &&
          data.map((brand) => <BrandCard key={brand.id} brand={brand} />)}
      </div>
    </div>
  );
}

export default Brands;
