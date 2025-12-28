import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import Button from "../../ui/Button";

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
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const [slots, setSlots] = useState([{ id: Date.now() }]);

  // -----------------------------
  // SUBMIT FORM
  // -----------------------------
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    onNext();
  };

  // -----------------------------
  // ADD SLOT with RHF validation
  // -----------------------------
  const handleAddSlot = async () => {
    const lastIndex = slots.length - 1;

    // Validate ONLY the last row
    const isValid = await trigger([
      `slots.${lastIndex}.day`,
      `slots.${lastIndex}.start`,
      `slots.${lastIndex}.end`,
    ]);

    if (!isValid) return; // do nothing, RHF will display errors

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
            name="price"
            type="number"
            placeholder="Enter the Price"
            register={register}
            error={errors.price}
            validation={{ required: "Price is required" }}
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
          </div>
        ))}

        {/* ADD SLOT */}
        <Button
          type="button"
          className="w-full p-2.5 mt-2.5"
          onClick={handleAddSlot}
        >
          Add Time Slot
        </Button>

        {/* SUBMIT */}
        <Button
          type="submit"
          className="w-full p-2.5 mt-2.5 bg-white text-black! border border-(--main-color) hover:bg-(--main-color) hover:text-white!"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default DoctorClinicForm;
