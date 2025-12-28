//related doctor of each doctor using speciality field
import { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
function RelatedDoctors({ speciality, currentDoctorId }) {
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  //
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {relatedDoctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          name={doctor.name}
          description={doctor.description}
          specialization={doctor.specialization}
          price={doctor.price}
          status={doctor.status}
          image={doctor.image}
        />
      ))}
    </div>
  );
}

export default RelatedDoctors;
