import React from "react";
import { FieldValue, useForm } from "react-hook-form";
import { TNewUser } from "@/types/apiTypes";
import axiosInstance from "@/utils/axiosinstance";

type Props = {};

function SignIn({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data: FieldValue<TNewUser>) => {
    const postData = await axiosInstance.post("/auth/signin", data);
    reset();
    return postData;
  };

  return (
    <div className="w-full">
      <form className="w-1/2 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="label-field" htmlFor="email">
          Email
          <input
            className="input-field"
            type="email"
            {...register("email", { required: true })}
          />
        </label>
        <label className="label-field" htmlFor="password">
          Password
          <input
            className="input-field"
            type="password"
            {...register("password", { required: true })}
          />
        </label>
        <input className="submit-btn" type="submit" />
      </form>
    </div>
  );
}

export default SignIn;
