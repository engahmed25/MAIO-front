import React, { useState } from "react";
import { Download } from "lucide-react";
import PatientCard from "../features/Doctors/PateintCard";
import SearchPatients from "../features/Doctors/SearchPatients";

function PatientsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample patient data
  const allPatients = [
    {
      id: 1,
      name: "Thomas Bailey",
      initials: "TB",
      age: 45,
      status: "observation",
      lastAppointment: "Dec 9, 2025",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      initials: "MR",
      age: 62,
      status: "critical",
      lastAppointment: "Dec 10, 2025",
    },
    {
      id: 3,
      name: "Oliver Smith",
      initials: "OS",
      age: 28,
      status: "stable",
      lastAppointment: "Dec 5, 2025",
    },
    {
      id: 4,
      name: "Jessica Lee",
      initials: "JL",
      age: 71,
      status: "referred",
      lastAppointment: "Nov 28, 2025",
    },
  ];

  // Filter patients
  const filteredPatients = allPatients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patients</h1>
        <p className="text-gray-600">
          Manage and view all your assigned patients
        </p>
      </div>

      {/* Search and Filters */}
      <div className="px-8">
        <SearchPatients
          onSearch={setSearchQuery}
          onFilterChange={setFilterStatus}
        />
      </div>

      {/* Results Header */}
      <div className="px-8 mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold">{filteredPatients.length}</span> of{" "}
          <span className="font-semibold">{allPatients.length}</span> patients
        </p>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-white rounded-lg border border-gray-200 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Patient Grid */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientsList;
