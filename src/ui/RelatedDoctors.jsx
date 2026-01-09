//related doctor of each doctor using speciality field
import { useEffect, useState } from "react";
import { getDoctorsBySpecialization } from "../services/apiDoctors";
import DoctorCard from "./DoctorCard";
import Spinner from "./Spinner";

function RelatedDoctors({ specialization, currentDoctorId }) {
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!specialization) return;

    const fetchRelatedDoctors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getDoctorsBySpecialization(specialization);
        const doctors = response.data || response.doctors || [];

        // Filter out the current doctor from related doctors
        const filtered = doctors.filter((doc) => doc._id !== currentDoctorId);

        // Limit to 3 related doctors
        setRelatedDoctors(filtered.slice(0, 3));
      } catch (err) {
        console.error("Error fetching related doctors:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedDoctors();
  }, [specialization, currentDoctorId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return null; // Silently fail, don't show error to user
  }

  if (relatedDoctors.length === 0) {
    return null; // Don't show section if no related doctors
  }

  return (
    <section className="mt-12 mb-8 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Related Doctors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedDoctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </section>
  );
}

export default RelatedDoctors;
