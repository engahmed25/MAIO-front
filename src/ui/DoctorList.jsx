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

function DoctorList({ speciality, search }) {
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpeciality =
      speciality === "All" || doctor.specialization === speciality;
    const matchesSearch = search
      ? doctor.name.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesSpeciality && matchesSearch;
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredDoctors.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No doctors found.</p>
      ) : (
        filteredDoctors.map((doctor) => (
          <DoctorCard
            name={doctor.name}
            description={doctor.description}
            specialization={doctor.specialization}
            price={doctor.price}
            status={doctor.status}
            image={doctor.image}
            id={doctor.id}
          />
        ))
      )}
      {/* Add more doctor cards as needed */}
    </div>
  );
}

export default DoctorList;
