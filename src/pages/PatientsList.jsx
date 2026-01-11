import React, { useState } from "react";
import { Download } from "lucide-react";
import PatientCard from "../features/Doctors/PateintCard";
import SearchPatients from "../features/Doctors/SearchPatients";
import { usePatientsByDoctor } from "../features/Doctors/usePatientsByDoctor";
import Spinner from "../ui/Spinner";

function PatientsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch patients from API
  const { isLoading, patients, totalPatients, error } = usePatientsByDoctor();

  console.log("🏥 PatientsList - patients:", patients);
  console.log("🏥 PatientsList - totalPatients:", totalPatients);
  console.log("🏥 PatientsList - isLoading:", isLoading);
  console.log("🏥 PatientsList - error:", error);

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center p-8">
        <p className="text-red-600 text-lg font-semibold mb-2">
          Error loading patients
        </p>
        <p className="text-gray-600">{error.message}</p>
        <p className="text-sm text-gray-500 mt-4">
          Please check the console for more details
        </p>
      </div>
    );
  }

  // If no error but no patients either
  if (!isLoading && patients.length === 0) {
    return (
      <div className="flex-1 bg-gray-50">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patients</h1>
          <p className="text-gray-600">
            Manage and view all your assigned patients
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md text-center">
            <p className="text-gray-600 text-lg mb-2">No patients found</p>
            <p className="text-sm text-gray-500">
              You don't have any patients with confirmed or completed
              appointments yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Transform API data to match the expected format
  const allPatients = patients.map((patient) => ({
    id: patient.patientId,
    name: patient.personalInfo.fullName,
    initials: `${patient.personalInfo.firstName[0]}${patient.personalInfo.lastName[0]}`,
    age: patient.personalInfo.age,
    gender: patient.personalInfo.gender,
    emergencyContact: patient.personalInfo.emergencyContact,
    // Medical info
    reasonForSeeingDoctor: patient.medicalOverview.reasonForSeeingDoctor,
    drugAllergies: patient.medicalOverview.drugAllergies,
    illnesses: patient.medicalOverview.illnesses,
    currentMedications: patient.medicalOverview.currentMedications,
    chronicDiseases: patient.medicalOverview.chronicDiseases,
    allergies: patient.medicalOverview.allergies,
    medicalNotes: patient.medicalOverview.medicalNotes,
    // Appointment stats
    totalAppointments: patient.appointmentStats.totalAppointments,
    completedAppointments: patient.appointmentStats.completedAppointments,
    upcomingAppointments: patient.appointmentStats.upcomingAppointments,
    lastAppointment: patient.appointmentStats.lastVisit
      ? new Date(patient.appointmentStats.lastVisit).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )
      : "N/A",
    nextVisit: patient.appointmentStats.nextVisit,
    registeredDate: patient.registeredDate,
    // Status based on upcoming appointments
    status:
      patient.appointmentStats.upcomingAppointments > 0
        ? "observation"
        : "stable",
  }));

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
          <span className="font-semibold">{totalPatients}</span> patients
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
