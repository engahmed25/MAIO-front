import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FileText, Pill, Users, File, Download, Eye } from "lucide-react";
import PatientInfo from "../features/Patients/PatienInfo/PatientInfo";
import Allergies from "../ui/Allergies";
import ContactInfo from "../ui/ContactInfo";
import PatientOverview from "../ui/PatientOverview";
import PrimaryDiagnosis from "../ui/PrimaryDiagnosis";
import Spinner from "../ui/Spinner";
import { usePatientPublicProfile } from "../features/Patients/usePatientPublicProfile";
import { useCreatePrescription } from "../features/Doctors/useCreatePrescription";
import { useUpdatePrescription } from "../features/Doctors/useUpdatePrescription";
import { usePatientPrescriptions } from "../features/Doctors/usePatientPrescriptions";
import { useGetPatientDocByDoctor } from "../features/Doctors/useGetPatientDocByDoctor";
import DoctorFileCard from "../features/Doctors/DoctorFileCard";
import FileViewerModal from "../features/Patients/FileViewer";

function PatientProfile() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [editingPrescription, setEditingPrescription] = useState(null);
  const { patient, isLoading, error } = usePatientPublicProfile(patientId);
  const { createPrescription, isCreating } = useCreatePrescription();
  const { updatePrescription, isUpdating } = useUpdatePrescription();
  const {
    prescriptions,
    statistics,
    isLoading: isPrescriptionsLoading,
    refetch: refetchPrescriptions,
  } = usePatientPrescriptions(patientId);

  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      medicationName: "",
      concentration: "",
      frequency: "",
      date: new Date().toISOString().split("T")[0],
      doseTime: "",
      notes: "",
      status: "active",
    },
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "prescriptions", label: "Prescriptions", icon: Pill },
    { id: "documents", label: "View Documents", icon: File },
    { id: "doctors", label: "Doctors", icon: Users },
  ];

  // Fetch patient documents using the custom hook
  const { medicalDocuments: patientDocuments, isLoading: isLoadingDocuments } =
    useGetPatientDocByDoctor(patientId);

  // State for viewing files
  const [viewingFile, setViewingFile] = useState(null);

  const onSubmit = (data) => {
    // Map frequency to timesPerDay
    const timesPerDayMap = {
      once: 1,
      twice: 2,
      three: 3,
      four: 4,
    };

    // Construct dosageTiming string
    const frequencyText = {
      once: "Once daily",
      twice: "Twice daily",
      three: "Three times daily",
      four: "Four times daily",
    };

    const dosageTiming = data.doseTime
      ? `${frequencyText[data.frequency]} at ${data.doseTime}`
      : frequencyText[data.frequency];

    const prescriptionData = {
      drugName: data.medicationName,
      concentration: data.concentration,
      timesPerDay: timesPerDayMap[data.frequency],
      dosageTiming: dosageTiming,
      notes: data.notes || `Prescribed on ${data.date}`,
      status: data.status,
    };

    if (editingPrescription) {
      // Update existing prescription
      updatePrescription(
        {
          patientId,
          prescriptionId: editingPrescription._id,
          prescriptionData,
        },
        {
          onSuccess: (response) => {
            // Refetch prescriptions to get updated list
            refetchPrescriptions();

            // Load the updated prescription into the form
            const updatedPrescription = response.data;
            loadPrescriptionToForm(updatedPrescription);
            setEditingPrescription(updatedPrescription);
          },
        }
      );
    } else {
      // Create new prescription
      createPrescription(
        { patientId, prescriptionData },
        {
          onSuccess: (response) => {
            // Refetch prescriptions to get updated list
            refetchPrescriptions();

            // Load the newly created prescription into the form for editing
            const newPrescription = response.data;
            loadPrescriptionToForm(newPrescription);
            setEditingPrescription(newPrescription);
          },
        }
      );
    }
  };

  const loadPrescriptionToForm = (prescription) => {
    // Reverse map timesPerDay to frequency
    const frequencyMap = {
      1: "once",
      2: "twice",
      3: "three",
      4: "four",
    };

    // Extract time from dosageTiming if it exists
    const timeMatch = prescription.dosageTiming.match(/at (\d{2}:\d{2})/);
    const doseTime = timeMatch ? timeMatch[1] : "";

    // Set form values
    setValue("medicationName", prescription.drugName);
    setValue("concentration", prescription.concentration);
    setValue("frequency", frequencyMap[prescription.timesPerDay]);
    setValue(
      "date",
      new Date(prescription.startDate).toISOString().split("T")[0]
    );
    setValue("doseTime", doseTime);
    setValue("notes", prescription.notes);
    setValue("status", prescription.status);
  };

  const handleAddNewPrescription = () => {
    setEditingPrescription(null);
    reset({
      medicationName: "",
      concentration: "",
      frequency: "",
      date: new Date().toISOString().split("T")[0],
      doseTime: "",
      notes: "",
      status: "active",
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">
            Error loading patient profile
          </p>
          <p className="text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Patient not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Patient Info Section */}
        <PatientInfo patientData={patient} />

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === "doctors") {
                      navigate("/doctor/consulting-doctors", {
                        state: { patientId },
                      });
                    } else {
                      setActiveTab(tab.id);
                    }
                  }}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Primary Diagnosis and Allergies Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <PrimaryDiagnosis patientData={patient} />
                  <Allergies patientData={patient} />
                </div>

                {/* Contact Information */}
                <ContactInfo patientData={patient} />
              </div>
            )}

            {activeTab === "prescriptions" && (
              <div className="max-w-4xl mx-auto">
                {/* Loading State */}
                {isPrescriptionsLoading ? (
                  <div className="flex justify-center py-12">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    {/* Statistics */}
                    {statistics && prescriptions.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {statistics.total}
                          </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <p className="text-sm text-green-600">Active</p>
                          <p className="text-2xl font-bold text-green-700">
                            {statistics.active}
                          </p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-600">Completed</p>
                          <p className="text-2xl font-bold text-blue-700">
                            {statistics.completed}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600">Discontinued</p>
                          <p className="text-2xl font-bold text-gray-700">
                            {statistics.discontinued}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Prescriptions List */}
                    {prescriptions.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Prescriptions ({prescriptions.length})
                          </h3>
                          <button
                            type="button"
                            onClick={handleAddNewPrescription}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            + Add New Prescription
                          </button>
                        </div>
                        <div className="space-y-3 mb-6">
                          {prescriptions.map((prescription) => (
                            <div
                              key={prescription._id}
                              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                editingPrescription?._id === prescription._id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => {
                                setEditingPrescription(prescription);
                                loadPrescriptionToForm(prescription);
                              }}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {prescription.drugName}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {prescription.concentration} •{" "}
                                    {prescription.dosageTiming}
                                  </p>
                                  {prescription.notes && (
                                    <p className="text-sm text-gray-500 mt-1">
                                      {prescription.notes}
                                    </p>
                                  )}
                                  <p className="text-xs text-gray-400 mt-1">
                                    Started:{" "}
                                    {new Date(
                                      prescription.startDate
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    prescription.status === "active"
                                      ? "bg-green-100 text-green-800"
                                      : prescription.status === "completed"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {prescription.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prescription Form */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {editingPrescription
                            ? "Edit Prescription"
                            : "Add New Prescription"}
                        </h3>
                        {editingPrescription && (
                          <button
                            type="button"
                            onClick={handleAddNewPrescription}
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            Cancel Edit
                          </button>
                        )}
                      </div>
                      <form
                        className="space-y-6"
                        onSubmit={handleFormSubmit(onSubmit)}
                      >
                        {/* Medication Name */}
                        <div>
                          <label
                            htmlFor="medicationName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Medication Name
                          </label>
                          <input
                            type="text"
                            id="medicationName"
                            {...register("medicationName", {
                              required: "Medication name is required",
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter medication name"
                          />
                          {errors.medicationName && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.medicationName.message}
                            </p>
                          )}
                        </div>

                        {/* Concentration */}
                        <div>
                          <label
                            htmlFor="concentration"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Concentration
                          </label>
                          <input
                            type="text"
                            id="concentration"
                            {...register("concentration", {
                              required: "Concentration is required",
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., 500mg, 5mg, 1000 IU"
                          />
                          {errors.concentration && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.concentration.message}
                            </p>
                          )}
                        </div>

                        {/* How Many Times Daily */}
                        <div>
                          <label
                            htmlFor="frequency"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            How Many Times Daily
                          </label>
                          <select
                            id="frequency"
                            {...register("frequency", {
                              required: "Frequency is required",
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select frequency</option>
                            <option value="once">Once daily</option>
                            <option value="twice">Twice daily</option>
                            <option value="three">Three times daily</option>
                            <option value="four">Four times daily</option>
                          </select>
                          {errors.frequency && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.frequency.message}
                            </p>
                          )}
                        </div>

                        {/* Status - Only show when editing */}
                        {editingPrescription && (
                          <div>
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Status
                            </label>
                            <select
                              id="status"
                              {...register("status", {
                                required: "Status is required",
                              })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="active">Active</option>
                              <option value="completed">Completed</option>
                              <option value="discontinued">Discontinued</option>
                            </select>
                            {errors.status && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.status.message}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Date */}
                        <div>
                          <label
                            htmlFor="prescriptionDate"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Date
                          </label>
                          <input
                            type="date"
                            id="prescriptionDate"
                            {...register("date")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        {/* Dose Time */}
                        <div>
                          <label
                            htmlFor="doseTime"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Dose Time
                          </label>
                          <input
                            type="time"
                            id="doseTime"
                            {...register("doseTime")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        {/* Notes (Optional) */}
                        <div>
                          <label
                            htmlFor="notes"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Notes (Optional)
                          </label>
                          <textarea
                            id="notes"
                            {...register("notes")}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Add any additional notes or instructions"
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-3 pt-4">
                          <button
                            type="button"
                            onClick={() => reset()}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            disabled={isCreating || isUpdating}
                          >
                            Clear Form
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                            disabled={isCreating || isUpdating}
                          >
                            {isCreating || isUpdating
                              ? "Saving..."
                              : editingPrescription
                              ? "Update Prescription"
                              : "Add Prescription"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "documents" && (
              <div className="space-y-4">
                {/* File Viewer Modal */}
                {viewingFile && (
                  <FileViewerModal
                    file={viewingFile}
                    onClose={() => setViewingFile(null)}
                  />
                )}

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Patient Medical Documents
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      View all medical documents uploaded by the patient
                    </p>
                  </div>
                </div>

                {/* Stats Bar */}
                {patientDocuments.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                          {patientDocuments.length}
                        </p>
                        <p className="text-sm text-gray-600">Total Files</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                          {
                            patientDocuments.filter((f) =>
                              f.fileType?.startsWith("image/")
                            ).length
                          }
                        </p>
                        <p className="text-sm text-gray-600">Images</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                          {
                            patientDocuments.filter(
                              (f) => f.fileType === "application/pdf"
                            ).length
                          }
                        </p>
                        <p className="text-sm text-gray-600">Documents</p>
                      </div>
                    </div>
                  </div>
                )}

                {isLoadingDocuments ? (
                  <div className="flex justify-center py-12">
                    <Spinner />
                  </div>
                ) : patientDocuments.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                    <File className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">No documents found</p>
                    <p className="text-sm text-gray-500 mt-1">
                      This patient hasn't uploaded any medical documents yet
                    </p>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Uploaded Files ({patientDocuments.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {patientDocuments.map((doc) => {
                        const backendURL =
                          import.meta.env.VITE_BACKEND_URL ||
                          "http://localhost:5000";
                        const fileUrl = `${backendURL}/${doc.filePath?.replace(
                          /\\/g,
                          "/"
                        )}`;

                        // Convert backend document to FileCard format
                        const fileForCard = {
                          id: doc._id || doc.id,
                          name: doc.title,
                          type: doc.fileType,
                          size: doc.size || 0,
                          doctorName: doc.doctorName,
                          documentType: doc.documentType,
                          uploadDate: doc.uploadedAt
                            ? new Date(doc.uploadedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "N/A",
                          preview: fileUrl,
                          url: fileUrl,
                        };

                        return (
                          <DoctorFileCard
                            key={doc._id}
                            file={fileForCard}
                            onView={setViewingFile}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "doctors" && (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Consulting doctors will be displayed here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
