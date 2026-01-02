import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../features/Authentication/FormInput.jsx";
import Button from "../../ui/Button.jsx";
import { useDoctorSettings } from "./useDoctorSettings.js";
import { useUpdateDoctorSettings } from "./useUpdateDoctorSettings.js";
import { useUpdateDoctorProfilePicture } from "./useUpdateDoctorProfilePicture.js";
import Spinner from "../../ui/Spinner.jsx";

/**
 * DoctorSettings
 * @param {{ initialValues?: object, onSubmit?: function }} props
 * @returns {React.ReactElement}
 */
export default function DoctorSettings({ initialValues = {}, onSubmit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const { doctorData, isLoading, error } = useDoctorSettings();
  console.log("useDoctorSettings:", { doctorData, isLoading, error });
  const { updateSettings, isUpdating } = useUpdateDoctorSettings();
  console.log("useUpdateDoctorSettings:", { updateSettings, isUpdating });
  const { updateProfilePicture, isUpdatingPicture } =
    useUpdateDoctorProfilePicture();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  // Update form when doctor data is loaded
  useEffect(() => {
    if (doctorData) {
      reset({
        firstName: doctorData.firstName || "",
        lastName: doctorData.lastName || "",
        age: doctorData.age || "",
        gender: doctorData.gender || "",
        specialization: doctorData.specialization || "",
        phoneNumber: doctorData.phoneNumber || "",
        bio: doctorData.bio || "",
        yearsOfExperience: doctorData.yearsOfExperience || "",
        ratePerSession: doctorData.ratePerSession || "",
        clinicAddress: doctorData.clinicAddress || "",
      });
    }
  }, [doctorData, reset]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const internalSubmit = async (data) => {
    try {
      // Handle profile picture upload separately if exists
      if (profilePictureFile) {
        await updateProfilePicture(profilePictureFile);
        setProfilePictureFile(null);
        setProfilePicturePreview(null);
      }

      // Update other doctor settings
      const formattedData = {
        ...data,
        age: Number(data.age),
        yearsOfExperience: Number(data.yearsOfExperience),
        ratePerSession: Number(data.ratePerSession),
      };
      await updateSettings(formattedData);

      setIsEditing(false);

      if (typeof onSubmit === "function") onSubmit(data);
    } catch (error) {
      console.error("Failed to update settings:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 mt-8">
        <p className="text-red-500">
          Error loading doctor data: {error.message}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(internalSubmit)}
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 mt-8"
    >
      {/* Header */}
      <div className="mt-6 grid grid-cols">
        <h1 className="text-4xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your profile and professional information
        </p>
      </div>
      <div className="mt-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold">Profile Information</h3>
            <p className="text-sm text-gray-500">
              Manage your personal and professional details
            </p>
          </div>
        </div>

        <div>
          <Button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 border rounded-md px-3 py-1 text-sm hover:bg-black"
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4">
        {/* Profile Picture */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Profile Picture</label>
          <div className="flex items-center gap-4">
            <img
              src={
                profilePicturePreview ||
                (doctorData?.profilePicture
                  ? `${import.meta.env.VITE_BACKEND_URL}/${
                      doctorData.profilePicture
                    }`
                  : "https://via.placeholder.com/80")
              }
              alt="Doctor avatar"
              className="w-20 h-20 rounded-md object-cover border"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/80";
              }}
            />
            {isEditing && (
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                {profilePictureFile && (
                  <p className="text-xs text-gray-500">
                    Selected: {profilePictureFile.name}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            name="firstName"
            placeholder="First Name"
            register={register}
            error={errors.firstName}
            disabled={!isEditing}
            validation={{ required: "First name is required" }}
          />

          <FormInput
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            register={register}
            error={errors.lastName}
            disabled={!isEditing}
            validation={{ required: "Last name is required" }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Age"
            type="number"
            name="age"
            placeholder="Age"
            register={register}
            error={errors.age}
            disabled={!isEditing}
            validation={{ required: "Age is required" }}
          />

          <div className="flex flex-col gap-1">
            <label className="ml-0.5 text-sm font-medium">Gender</label>
            <select
              className={`border-[1px] border-gray-300 rounded-lg p-2 ${
                !isEditing
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-white"
              }`}
              disabled={!isEditing}
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm">
                {errors.gender.message}
              </span>
            )}
          </div>
        </div>

        <FormInput
          label="Phone Number"
          name="phoneNumber"
          placeholder="+1 (555) 123-4567"
          register={register}
          error={errors.phoneNumber}
          disabled={!isEditing}
          validation={{ required: "Phone number is required" }}
        />

        {/* Professional Information */}
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">
            Professional Information
          </h3>
        </div>

        <FormInput
          label="Specialization"
          name="specialization"
          placeholder="e.g., Cardiology, Dermatology"
          register={register}
          error={errors.specialization}
          disabled={!isEditing}
          validation={{ required: "Specialization is required" }}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Years of Experience"
            type="number"
            name="yearsOfExperience"
            placeholder="Years of Experience"
            register={register}
            error={errors.yearsOfExperience}
            disabled={!isEditing}
            validation={{ required: "Years of experience is required" }}
          />

          <FormInput
            label="Rate Per Session"
            type="number"
            name="ratePerSession"
            placeholder="Rate Per Session"
            register={register}
            error={errors.ratePerSession}
            disabled={!isEditing}
            validation={{ required: "Rate per session is required" }}
          />
        </div>

        <div className="flex flex-col items-start gap-1">
          <label className="ml-0.5 text-sm font-medium">Bio</label>
          <textarea
            className={`border-[1px] border-gray-300 rounded-lg p-2 w-full min-h-[100px] ${
              !isEditing
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-white"
            }`}
            placeholder="Tell us about yourself and your practice"
            disabled={!isEditing}
            {...register("bio")}
          />
          {errors.bio && (
            <span className="text-red-500 text-sm">{errors.bio.message}</span>
          )}
        </div>

        {/* Clinic Information */}
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Clinic Information</h3>
        </div>

        <div className="flex flex-col items-start gap-1">
          <label className="ml-0.5 text-sm font-medium">Clinic Address</label>
          <textarea
            className={`border-[1px] border-gray-300 rounded-lg p-2 w-full min-h-[80px] ${
              !isEditing
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-white"
            }`}
            placeholder="Full clinic address"
            disabled={!isEditing}
            {...register("clinicAddress")}
          />
          {errors.clinicAddress && (
            <span className="text-red-500 text-sm">
              {errors.clinicAddress.message}
            </span>
          )}
        </div>

        {/* Status Information */}
        {doctorData?.status && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm">
              <span className="font-medium">Account Status: </span>
              <span
                className={`capitalize ${
                  doctorData.status === "approved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {doctorData.status}
              </span>
            </p>
          </div>
        )}

        {/* Save Button */}
        {isEditing && (
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full py-3"
              disabled={isUpdating || isUpdatingPicture}
            >
              {isUpdating || isUpdatingPicture ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
