// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import FormInput from "./FormInput";
// import Button from "../../ui/Button";
// import { useSignUpDoctor } from "./useSignUpDoctor";
// import { useNavigate } from "react-router-dom";
// import { useDoctorRegister } from "../../Context/DoctorRegisterContext";

// const Days = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// function DoctorClinicForm({ onNext }) {
//   const { updateFormData, formData } = useDoctorRegister();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     trigger,
//     formState: { errors },
//   } = useForm({
//     defaultValues: formData.step3,
//   });

//   const [slots, setSlots] = useState([{ id: Date.now() }]);

//   const { signUpAsync: doctorRegister, isLoading } = useSignUpDoctor();
//   const navigate = useNavigate();

//   // -----------------------------
//   // SUBMIT FORM
//   // -----------------------------
//   async function onSubmit(data) {
//     if (isLoading) return; // ✅ Prevent multiple submissions

//     updateFormData("step3", data);

//     // Merge all steps
//     const allData = {
//       ...formData.step1,
//       ...data,
//     };

//     // ✅ CREATE FORMDATA
//     const payload = new FormData();

//     // Add text fields
//     const textFields = [
//       "email",
//       "password",
//       "firstName",
//       "lastName",
//       "phoneNumber",
//       "gender",
//       "yearsOfExperience",
//       "specialization",
//       "otherSpecialization",
//       "clinicAddress",
//       "bio",
//       "ratePerSession",
//     ];

//     textFields.forEach((field) => {
//       if (allData[field] !== undefined && allData[field] !== null) {
//         payload.append(field, allData[field]);
//       }
//     });

//     // Add slots as JSON (if you keep them)
//     if (data.slots) {
//       payload.append("slots", JSON.stringify(data.slots));
//     }

//     // ✅ ADD FILES FROM STEP 2
//     const files = formData.step2;

//     if (files.profilePicture) {
//       const profilePic = Array.isArray(files.profilePicture)
//         ? files.profilePicture[0]
//         : files.profilePicture;
//       payload.append("profilePicture", profilePic);
//     }

//     if (files.idProof && files.idProof[0]) {
//       payload.append("idProof", files.idProof[0]);
//     }

//     if (files.phdCertificate && files.phdCertificate[0]) {
//       payload.append("phdCertificate", files.phdCertificate[0]);
//     }

//     if (files.medicalLicense && files.medicalLicense[0]) {
//       payload.append("medicalLicense", files.medicalLicense[0]);
//     }

//     // Debug: Log FormData contents
//     console.log("=== FormData Contents ===");
//     for (let [key, value] of payload.entries()) {
//       console.log(key, value);
//     }

//     try {
//       const res = await doctorRegister(payload);
//       console.log("Registration successful:", res);
//     } catch (error) {
//       console.error("Registration failed:", error);
//       // TODO: Show error message to user
//     }
//   }

//   // -----------------------------
//   // ADD SLOT with RHF validation
//   // -----------------------------
//   const handleAddSlot = async () => {
//     const lastIndex = slots.length - 1;

//     const isValid = await trigger([
//       `slots.${lastIndex}.day`,
//       `slots.${lastIndex}.start`,
//       `slots.${lastIndex}.end`,
//     ]);

//     if (!isValid) return;

//     setSlots([...slots, { id: Date.now() }]);
//   };

//   return (
//     <div className="w-[90%] min-h-screen grid place-content-center ml-[5%] py-8">
//       <h2 className="mb-5 flex items-center justify-center font-bold text-3xl">
//         Clinic Time Information
//       </h2>

//       <form
//         className="shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-6 rounded-2xl max-h-[600px] overflow-auto"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         {/* PRICE */}
//         <div className="mb-6">
//           <FormInput
//             label="Rate Per Session"
//             name="ratePerSession"
//             type="number"
//             placeholder="Enter the Rate Per Session"
//             register={register}
//             error={errors.ratePerSession}
//             validation={{ required: "Rate per session is required" }}
//           />
//         </div>

//         {/* SLOTS */}
//         {slots.map((slot, index) => (
//           <div key={slot.id} className="mb-6 flex flex-col md:flex-row gap-4">
//             {/* DAY */}
//             <div className="flex flex-col items-start gap-1 w-full md:w-1/3">
//               <label>Day</label>
//               <select
//                 className="border border-gray-300 rounded-lg p-2 w-full"
//                 {...register(`slots.${index}.day`, {
//                   required: "Day is required",
//                 })}
//               >
//                 <option value="">Select the Day</option>
//                 {Days.map((d) => (
//                   <option key={d} value={d}>
//                     {d}
//                   </option>
//                 ))}
//               </select>
//               {errors?.slots?.[index]?.day && (
//                 <span className="text-red-500 text-sm">
//                   {errors.slots[index].day.message}
//                 </span>
//               )}
//             </div>

//             {/* START TIME */}
//             <FormInput
//               label="Start Time"
//               name={`slots.${index}.start`}
//               type="time"
//               register={register}
//               error={errors?.slots?.[index]?.start}
//               validation={{ required: "Start time is required" }}
//             />

//             {/* END TIME */}
//             <FormInput
//               label="End Time"
//               name={`slots.${index}.end`}
//               type="time"
//               register={register}
//               error={errors?.slots?.[index]?.end}
//               validation={{
//                 required: "End time is required",
//                 validate: (value) => {
//                   const start = watch(`slots.${index}.start`);
//                   return (
//                     !start ||
//                     value > start ||
//                     "End time must be after start time"
//                   );
//                 },
//               }}
//             />
//           </div>
//         ))}

//         {/* ADD SLOT */}
//         <Button
//           type="button"
//           className="w-full p-2.5 mt-2.5"
//           onClick={handleAddSlot}
//         >
//           Add Time Slot
//         </Button>

//         {/* SUBMIT */}
//         <Button
//           type="submit"
//           className="w-full p-2.5 mt-2.5  text-black border border-gray-300 "
//           disabled={isLoading}
//         >
//           {isLoading ? "Submitting..." : "Submit"}
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default DoctorClinicForm;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import Button from "../../ui/Button";
import { useDoctorRegister } from "../../Context/DoctorRegisterContext";
import { useSignUpDoctor } from "./useSignUpDoctor";
import { useNavigate } from "react-router-dom";

const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function DoctorClinicForm({ onNext }) {
  const { updateFormData, formData } = useDoctorRegister();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: formData.step3,
  });

  const [slots, setSlots] = useState([{ id: Date.now() }]);

  const { signUpAsync: doctorRegister, isLoading } = useSignUpDoctor();
  const navigate = useNavigate();

  // -----------------------------
  // SUBMIT FORM
  // -----------------------------
  async function onSubmit(data) {
    updateFormData("step3", data);

    // Merge all steps
    const allData = {
      ...formData.step1,
      ...data,
    };

    // ✅ CREATE FORMDATA
    const payload = new FormData();

    // Add text fields
    const textFields = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "gender",
      "yearsOfExperience",
      "specialization",
      "otherSpecialization",
      "clinicAddress",
      "bio",
      "ratePerSession",
    ];

    textFields.forEach((field) => {
      if (allData[field] !== undefined && allData[field] !== null) {
        payload.append(field, allData[field]);
      }
    });

    // Add slots as JSON (if you keep them)
    if (data.slots) {
      payload.append("slots", JSON.stringify(data.slots));
    }
    if (data.maxPersonsPerSlot) {
      payload.append("maxPersonsPerSlot", data.maxPersonsPerSlot);
    }

    // ✅ ADD FILES FROM STEP 2
    const files = formData.step2;

    if (files.profilePicture) {
      const profilePic = Array.isArray(files.profilePicture)
        ? files.profilePicture[0]
        : files.profilePicture;
      payload.append("profilePicture", profilePic);
    }

    if (files.idProof && files.idProof[0]) {
      payload.append("idProof", files.idProof[0]);
    }

    if (files.phdCertificate && files.phdCertificate[0]) {
      payload.append("phdCertificate", files.phdCertificate[0]);
    }

    if (files.medicalLicense && files.medicalLicense[0]) {
      payload.append("medicalLicense", files.medicalLicense[0]);
    }

    // Debug: Log FormData contents
    console.log("=== FormData Contents ===");
    for (let [key, value] of payload.entries()) {
      console.log(key, value);
    }

    try {
      const res = await doctorRegister(payload);
      console.log("Registration successful:", res);
    } catch (error) {
      console.error("Registration failed:", error);
      // TODO: Show error message to user
    }
  }

  // -----------------------------
  // ADD SLOT with RHF validation
  // -----------------------------
  const handleAddSlot = async () => {
    const lastIndex = slots.length - 1;

    const isValid = await trigger([
      `slots.${lastIndex}.day`,
      `slots.${lastIndex}.start`,
      `slots.${lastIndex}.end`,
      `slots.${lastIndex}.end`,
      `slots.${lastIndex}.maxPersonsPerSlot`,
    ]);

    if (!isValid) return;

    setSlots([...slots, { id: Date.now() }]);
  };

  return (
    <div className="w-[90%] min-h-screen grid place-content-center ml-[5%] py-8">
      <h2 className="mb-5 flex items-center justify-center font-bold text-3xl">
        Clinic Time Information
      </h2>

      <form
        className="shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-6 rounded-2xl max-h-[600px] overflow-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* PRICE */}
        <div className="mb-6">
          <FormInput
            label="Rate Per Session"
            name="ratePerSession"
            type="number"
            placeholder="Enter the Rate Per Session"
            register={register}
            error={errors.ratePerSession}
            validation={{ required: "Rate per session is required" }}
          />
        </div>

        {/* SLOTS */}
        {slots.map((slot, index) => (
          <div key={slot.id} className="mb-6 flex flex-col md:flex-row gap-4">
            {/* DAY */}
            <div className="flex flex-col items-start gap-1 w-full md:w-1/3">
              <label>Day</label>
              <select
                className="border border-gray-300 rounded-lg p-2 w-full"
                {...register(`slots.${index}.day`, {
                  required: "Day is required",
                })}
              >
                <option value="">Select the Day</option>
                {Days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors?.slots?.[index]?.day && (
                <span className="text-red-500 text-sm">
                  {errors.slots[index].day.message}
                </span>
              )}
            </div>

            {/* START TIME */}
            <FormInput
              label="Start Time"
              name={`slots.${index}.start`}
              type="time"
              register={register}
              error={errors?.slots?.[index]?.start}
              validation={{ required: "Start time is required" }}
            />

            {/* END TIME */}
            <FormInput
              label="End Time"
              name={`slots.${index}.end`}
              type="time"
              register={register}
              error={errors?.slots?.[index]?.end}
              validation={{
                required: "End time is required",
                validate: (value) => {
                  const start = watch(`slots.${index}.start`);
                  return (
                    !start ||
                    value > start ||
                    "End time must be after start time"
                  );
                },
              }}
            />
            {/* MAX PERSONS PER SLOT */}
            <div className="mb-6">
              <FormInput
                label="Max Persons Per Slot"
                name={`slots.${index}.maxPersonsPerSlot`}
                type="number"
                placeholder="e.g. 6"
                register={register}
                error={errors?.slots?.[index]?.maxPersonsPerSlot}
                validation={{
                  required: "Max persons per slot is required",
                  min: {
                    value: 1,
                    message: "Must be at least 1",
                  },
                  valueAsNumber: true,
                }}
              />
            </div>
          </div>
        ))}

        {/* ADD SLOT */}
        <Button
          type="button"
          className="w-full p-2.5 mt-2.5"
          onClick={handleAddSlot}
        >
          {isLoading ? "Adding..." : "Add Time Slot"}
        </Button>

        {/* SUBMIT */}
        <Button
          type="submit"
          className="w-full p-2.5 mt-2.5  text-black border border-gray-300 "
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default DoctorClinicForm;
