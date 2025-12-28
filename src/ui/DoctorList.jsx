const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    description: "Expert cardiologist with over 10 years of experience.",
    specialization: "Cardiology",
    price: 500,
    status: "Available",
    image: "/images/doctors/john-doe.jpg",
  },
  {
    id: 2,
    name: "Dr. Sarah Lee",
    description: "Skilled dermatologist specializing in skin treatments.",
    specialization: "Dermatology",
    price: 400,
    status: "Available",
    image: "/images/doctors/sarah-lee.jpg",
  },
  {
    id: 3,
    name: "Dr. Mark Samir",
    description: "Experienced neurologist focused on nervous system disorders.",
    specialization: "Neurology",
    price: 600,
    status: "Unavailable",
    image: "/images/doctors/mark-samir.jpg",
  },
  {
    id: 4,
    name: "Dr. Laila Ahmed",
    description:
      "Pediatric specialist with 12 years of child healthcare experience.",
    specialization: "Pediatrics",
    price: 450,
    status: "Available",
    image: "/images/doctors/laila-ahmed.jpg",
  },
];
import DoctorCard from "./DoctorCard.jsx";
import { useDoctors } from "../features/Doctors/useDoctors";
import Spinner from "./Spinner.jsx";

function DoctorList({ speciality, search, urlSearchParams = {} }) {
  // Build search params for API call
  const apiSearchParams = {};

  // If URL has search params, use them; otherwise use local filters
  if (
    urlSearchParams.q ||
    urlSearchParams.specialization ||
    urlSearchParams.location
  ) {
    if (urlSearchParams.q) apiSearchParams.q = urlSearchParams.q;
    if (urlSearchParams.specialization)
      apiSearchParams.specialization = urlSearchParams.specialization;
    if (urlSearchParams.location)
      apiSearchParams.location = urlSearchParams.location;
    if (urlSearchParams.minPrice)
      apiSearchParams.minPrice = urlSearchParams.minPrice;
    if (urlSearchParams.maxPrice)
      apiSearchParams.maxPrice = urlSearchParams.maxPrice;
  }

  const { isLoading, doctors, error } = useDoctors(
    Object.keys(apiSearchParams).length > 0 ? apiSearchParams : undefined
  );

  console.log("DoctorList props - speciality:", doctors);

  if (isLoading) {
    return <Spinner />;
  }

  const data = doctors?.data;
  const doctorsData = data?.doctors || [];
  console.log("Doctors data:", doctorsData);

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSpeciality =
      speciality === "All" || doctor.specialization === speciality;
    const matchesSearch = search
      ? doctor.fullName.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesSpeciality && matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredDoctors.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No doctors found
          </h3>
          <p className="text-gray-500 max-w-md">
            We couldn't find any doctors matching your search criteria. Try
            adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))
      )}
    </div>
  );
}

export default DoctorList;
