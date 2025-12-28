import { useParams } from "react-router-dom";
import DrInfo from "../features/Appointments/DrInfo";
import RelatedDoctors from "../ui/RelatedDoctors";
import BookingSlots from "../features/Appointments/BookingSlot";

function Doctor() {
  const { id } = useParams();
  const {isLoading, doctor, error}

  return (
    <>
      <DrInfo id={id} />
      <BookingSlots id={id} />
      <RelatedDoctors currentDoctorId={id} />
    </>
  );
}

export default Doctor;
