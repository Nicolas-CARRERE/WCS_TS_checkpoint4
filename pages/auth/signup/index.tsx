import React from "react";
import Link from "next/link";
import { FieldValue, useForm } from "react-hook-form";
import { TNewUser } from "@/types/apiTypes";
import axiosInstance from "@/utils/axiosinstance";

type Props = {};

function SignUp({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data: FieldValue<TNewUser>) => {
    const { password, passwordConfirmation } = data as TNewUser;
    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }
    const postData = await axiosInstance.post("/auth/signup", data);
    reset();
    return postData;
  };

  return (
    <div className="w-full">
      <form className="w-1/2 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="label-field" htmlFor="firstname">
          First Name
          <input
            className="input-field"
            type="text"
            {...register("firstname", { required: true })}
          />
        </label>
        <label className="label-field" htmlFor="lastname">
          Last Name
          <input
            className="input-field"
            type="text"
            {...register("lastname", { required: true })}
          />
        </label>
        <label className="label-field" htmlFor="username">
          User Name
          <input
            className="input-field"
            type="text"
            {...register("username", { required: true })}
          />
        </label>
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
        <label className="label-field" htmlFor="passwordConfirmation">
          Confirm password
          <input
            className="input-field"
            type="password"
            {...register("passwordConfirmation", { required: true })}
          />
        </label>
        <input className="submit-btn" type="submit" />
      </form>
    </div>
  );
}

export default SignUp;
