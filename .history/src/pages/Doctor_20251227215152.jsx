import { useParams } from "react-router-dom";
import DrInfo from "../features/Appointments/DrInfo";
import RelatedDoctors from "../ui/RelatedDoctors";
import BookingSlots from "../features/Appointments/BookingSlot";
import { useDoctor } from "../features/Doctors/useDoctor";

function Doctor() {
  const { id } = useParams();
  const { isLoading, doctor, error } = useOneDoctor()
  console.log("doctoooors:", doctor);
  

  return (
    <>
      <DrInfo  id={id} />
      <BookingSlots id={id} />
      <RelatedDoctors currentDoctorId={id} />
    </>
  );
}

export default Doctor;
