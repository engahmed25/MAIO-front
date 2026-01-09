import { useParams } from "react-router-dom";
import DrInfo from "../features/Appointments/DrInfo";
import RelatedDoctors from "../ui/RelatedDoctors";
import BookingSlots from "../features/Appointments/BookingSlot";
import { useDoctor } from "../features/Doctors/useDoctor";

function Doctor() {
  const { id } = useParams();
  const { doctor } = useDoctor(id);

  // Extract specialization from doctor data
  const doctorData = doctor?.data?.doctor || doctor?.data || doctor;
  const specialization = doctorData?.specialization;

  return (
    <>
      <DrInfo id={id} />
      <BookingSlots id={id} />
      {specialization && (
        <RelatedDoctors specialization={specialization} currentDoctorId={id} />
      )}
    </>
  );
}

export default Doctor;
