"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPencilAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

import ImageUpload from "@/components/profile/ImageUpload"; // Import the ImageUpload component
import WebcamCapture from "@/components/profile/WebcamCapture"; // Import the WebcamCapture component
import PaymentMethod from "@/components/profile/PaymentMethod"; // Import the PaymentMethod component

const Form = () => {
  const { currentUser, unlinkSocialAccount } = useAuth(); // Assuming unlinkSocialAccount is a method for unlinking social accounts
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      setValue("name", currentUser.displayName);
      setValue("username", currentUser.username); // Assuming username is a part of your user object
      setValue("email", currentUser.email);
    }
  }, [currentUser, setValue]);

  const formSubmit = async (data) => {
    // Update profile logic here
  };

  const hasSocialAccountLinked =
    currentUser &&
    currentUser.providerData &&
    currentUser.providerData.length > 1;

  return (
    <div className="max-w-md mx-auto card bg-base-300 my-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="card-title">Profile</h1>
        <FaPencilAlt
          className="cursor-pointer"
          onClick={() => setIsEditMode(!isEditMode)}
        />
      </div>
      <form onSubmit={handleSubmit(formSubmit)}>
        
        {/* Profile Picture */}
        <div className="flex justify-center items-center">
          <ImageUpload />
          
        </div> 

        <div className="form-control">
          {/* Name */}
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            disabled={!isEditMode}
            className="input input-bordered"
          />
          {/* Username */}
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            disabled={!isEditMode}
            className="input input-bordered"
          />
          {/* Email */}
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="text"
            {...register("email")}
            disabled={!isEditMode}
            className="input input-bordered"
          />
          {/* Password */}
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            disabled={!isEditMode}
            className="input input-bordered"
          />
        </div>

        {/* Linked Accounts */}
        {hasSocialAccountLinked && (
          <div className="mt-4">
            <h2 className="text-lg">Linked Account</h2>
            <button
              type="button"
              className="btn btn-error btn-sm"
              onClick={unlinkSocialAccount}
            >
              Disconnect
            </button>
          </div>
        )}

        {/* Payment Method */}
        <div className="mt-4">
          <PaymentMethod />
        </div>

        {/* Edit/Update Button */}
        <div className="form-control mt-4">
          {isEditMode ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              Update
            </button>
          ) : (
            <button
              type="button"
              className="btn"
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
