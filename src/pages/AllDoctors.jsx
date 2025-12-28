import { useState } from "react";
import DoctorList from "../ui/DoctorList";
import FilterList from "../ui/FilterList";
import SearchBar from "../ui/SearchBar";

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
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <main className=" flex h-full">
      <FilterList
        options={specializations}
        selected={selectedSpecialization}
        onSelect={setSelectedSpecialization}
      />
      <div className="p-4 flex-1 h-[calc(100vh-64px)] overflow-auto">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <DoctorList speciality={selectedSpecialization} search={search} />
      </div>
    </main>
  );
}

export default AllDoctors;
