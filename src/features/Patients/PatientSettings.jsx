import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../features/Authentication/FormInput.jsx";
import Button from "../../ui/Button.jsx";
import { usePatientSettings } from "./usePatientSettings.js";
import { useUpdatePatientSettings } from "./useUpdatePatientSettings.js";
import { useUpdateProfilePicture } from "./useUpdateProfilePicture.js";
import Spinner from "../../ui/Spinner.jsx";

/**
 * PatientSettings
 * @param {{ initialValues?: object, onSubmit?: function }} props
 * @returns {React.ReactElement}
 */
export default function PatientSettings({ initialValues = {}, onSubmit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const { patientData, isLoading, error } = usePatientSettings();
  const { updateSettings, isUpdating } = useUpdatePatientSettings();
  const { updateProfilePicture, isUpdatingPicture } = useUpdateProfilePicture();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  // Update form when patient data is loaded
  useEffect(() => {
    if (patientData) {
      reset({
        firstName: patientData.firstName || "",
        lastName: patientData.lastName || "",
        email: patientData.email || "",
        age: patientData.age || "",
        gender: patientData.gender || "",
        emergencyContactNumber: patientData.emergencyContactNumber || "",
        reasonForSeeingDoctor: patientData.reasonForSeeingDoctor || "",
        drugAllergies: patientData.drugAllergies || "",
        illnesses: patientData.illnesses?.join(", ") || "",
        otherIllness: patientData.otherIllness || "",
        operations: patientData.operations || "",
        currentMedications: patientData.currentMedications || "",
        smoking: patientData.smoking || "",
      });
    }
  }, [patientData, reset]);

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

      // Update other patient settings
      const formattedData = {
        ...data,
        illnesses: data.illnesses
          ? data.illnesses.split(",").map((illness) => illness.trim())
          : [],
        age: Number(data.age),
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
          Error loading patient data: {error.message}
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
          Manage your profile and medical information
        </p>
      </div>
      <div className="mt-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold">Profile Information</h3>
            <p className="text-sm text-gray-500">
              Manage your personal and medical details
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
                (patientData?.profilePicture
                  ? `${import.meta.env.VITE_BACKEND_URL}/${
                      patientData.profilePicture
                    }`
                  : "https://via.placeholder.com/80")
              }
              alt="Patient avatar"
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

        <FormInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="email@example.com"
          register={register}
          error={errors.email}
          disabled={!isEditing}
          validation={{
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
          }}
        />

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
          label="Emergency Contact Number"
          name="emergencyContactNumber"
          placeholder="+1 (555) 123-4567"
          register={register}
          error={errors.emergencyContactNumber}
          disabled={!isEditing}
          validation={{ required: "Emergency contact is required" }}
        />

        {/* Medical Information */}
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Medical Information</h3>
        </div>

        <div className="flex flex-col items-start gap-1">
          <label className="ml-0.5 text-sm font-medium">
            Reason for Seeing Doctor
          </label>
          <textarea
            className={`border-[1px] border-gray-300 rounded-lg p-2 w-full min-h-[80px] ${
              !isEditing
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-white"
            }`}
            placeholder="Describe your reason for seeing a doctor"
            disabled={!isEditing}
            {...register("reasonForSeeingDoctor")}
          />
          {errors.reasonForSeeingDoctor && (
            <span className="text-red-500 text-sm">
              {errors.reasonForSeeingDoctor.message}
            </span>
          )}
        </div>

        <div className="flex flex-col items-start gap-1">
          <label className="ml-0.5 text-sm font-medium">Drug Allergies</label>
          <textarea
            className={`border-[1px] border-gray-300 rounded-lg p-2 w-full min-h-[80px] ${
              !isEditing
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-white"
            }`}
            placeholder="List any drug allergies"
            disabled={!isEditing}
            {...register("drugAllergies")}
          />
          {errors.drugAllergies && (
            <span className="text-red-500 text-sm">
              {errors.drugAllergies.message}
            </span>
          )}
        </div>

        <FormInput
          label="Illnesses (comma-separated)"
          name="illnesses"
          placeholder="e.g., Diabetes, Hypertension"
          register={register}
          error={errors.illnesses}
          disabled={!isEditing}
        />

        <FormInput
          label="Other Illness"
          name="otherIllness"
          placeholder="Any other illness not listed above"
          register={register}
          error={errors.otherIllness}
          disabled={!isEditing}
        />

        <div className="flex flex-col items-start gap-1">
          <label className="ml-0.5 text-sm font-medium">
            Previous Operations
          </label>
          <textarea
            className={`border-[1px] border-gray-300 rounded-lg p-2 w-full min-h-[80px] ${
              !isEditing
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-white"
            }`}
            placeholder="Describe any previous operations"
            disabled={!isEditing}
            {...register("operations")}
          />
          {errors.operations && (
            <span className="text-red-500 text-sm">
              {errors.operations.message}
            </span>
          )}
        </div>

        <div className="flex flex-col items-start gap-1">
          <label className="ml-0.5 text-sm font-medium">
            Current Medications
          </label>
          <textarea
            className={`border-[1px] border-gray-300 rounded-lg p-2 w-full min-h-[80px] ${
              !isEditing
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-white"
            }`}
            placeholder="List current medications"
            disabled={!isEditing}
            {...register("currentMedications")}
          />
          {errors.currentMedications && (
            <span className="text-red-500 text-sm">
              {errors.currentMedications.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="ml-0.5 text-sm font-medium">Smoking Status</label>
          <select
            className={`border-[1px] border-gray-300 rounded-lg p-2 ${
              !isEditing
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-white"
            }`}
            disabled={!isEditing}
            {...register("smoking")}
          >
            <option value="">Select Status</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="former">Former Smoker</option>
          </select>
          {errors.smoking && (
            <span className="text-red-500 text-sm">
              {errors.smoking.message}
            </span>
          )}
        </div>

        {/* Status Information */}
        {patientData?.status && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm">
              <span className="font-medium">Account Status: </span>
              <span
                className={`capitalize ${
                  patientData.status === "approved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {patientData.status}
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
