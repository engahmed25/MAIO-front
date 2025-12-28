import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DoctorList from "../ui/DoctorList";
import FilterList from "../ui/FilterList";
import SearchBar from "../ui/SearchBar";
import { useDoctors } from "../features/Doctors/useDoctors";

const specializations = [
  "All",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Orthopedics",
  "Gynecology",
  "Oncology",
  "Anesthesiology",
  "Emergency Medicine",
  "Family Medicine",
  "Internal Medicine",
  "Ophthalmology",
];

function AllDoctors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [search, setSearch] = useState("");

  // Extract search parameters from URL
  const urlSearchParams = {
    q: searchParams.get("q") || "",
    specialization: searchParams.get("specialization") || "",
    location: searchParams.get("location") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  };

  // Update local state when URL params change
  useEffect(() => {
    if (urlSearchParams.q) setSearch(urlSearchParams.q);
    if (urlSearchParams.specialization)
      setSelectedSpecialization(urlSearchParams.specialization);
  }, [searchParams]);

  return (
    <main className=" flex h-full">
      <FilterList
        options={specializations}
        selected={selectedSpecialization}
        onSelect={setSelectedSpecialization}
      />
      <div className="p-4 flex-1 h-[calc(100vh-64px)] overflow-auto">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <DoctorList
          speciality={selectedSpecialization}
          search={search}
          urlSearchParams={urlSearchParams}
        />
      </div>
    </main>
  );
}

export default AllDoctors;
