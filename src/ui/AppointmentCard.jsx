import drimg from "../assets/headerPhoto/dr2.png";
import Button from "./Button";
import Header from "./Header";

function AppointmentCard({
  image = drimg,
  name = "Dr Suhaila",
  specialization = "Dermatologist",
  address = "6th Of October City, Giza",
  date = "21,july,2026",
  time = "8:30pm",
  onPayment,
  onCancel,
}) {
  return (
    <>
      <div className="bg-[var(--sec-color)]  rounded-lg shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-6 sm:p-6 w-full mt-10">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 sm:gap-12 items-center">
          {/* Doctor Image */}
          <div className="mx-auto md:mx-0 ">
            <img
              src={image}
              alt={name}
              className="w-28 h-32 sm:w-32 sm:h-48 object-cover rounded-lg shadow-md "
            />
          </div>

          {/*  Doctor Info */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-gray-800 mb-1">{name}</h2>
            <p className="text-[var(--head-desc-color)] text-sm mb-4">
              {specialization}
            </p>

            <div className="space-y-2">
              <div>
                <p className="text-[var(--head-desc-color)] font-semibold text-sm">
                  Address:
                </p>
                <p className="text-[var(--head-desc-color)] text-sm">
                  {address}
                </p>
              </div>

              <div>
                <p className="text-[var(--head-desc-color)] font-semibold text-sm">
                  Date & Time:{" "}
                  <span className="font-normal">
                    {date} | {time}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button
              onClick={onPayment}
              className=" px-8 py-2.5 rounded-md font-medium shadow-md"
            >
              Pay here
            </Button>
            <Button
              type="button"
              className="w-full p-2.5 mt-2.5 bg-white text-black! font-semibold!  border border-(--main-color) hover:bg-(--main-color) hover:text-white!"
            >
              Cancel Appointment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentCard;
