import { useParams } from "react-router-dom";
import DrInfo from "<div styleName={} />
<features />
<Appoint></Appoint>ments/DrInfo";
import RelatedDoctors from "../ui/RelatedDoctors";
import BookingSlots from "../features/Appointments/BookingSlot";

function Doctor() {
  const { id } = useParams();

  return (
    <>
      <DrInfo id={id} />
      <BookingSlots id={id} />
      <RelatedDoctors currentDoctorId={id} />
    </>
  );
}

export default Doctor;
