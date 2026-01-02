import React from "react";

import { useMemo, useState } from "react";

import { FaExclamationCircle } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

function PrimaryDiagnosis({ patientData }) {
  const illnesses =
    patientData?.illnesses?.length > 0
      ? patientData.illnesses.map((illness, index) => ({
          id: index + 1,
          Diagnosis: illness,
          LastAppointment: "N/A",
        }))
      : [
          {
            id: 1,
            Diagnosis: "Atypical Chest Pain / Mild Hypertension",
            LastAppointment: "12/9/2025",
          },
          {
            id: 2,
            Diagnosis: "Type 2 Diabetes Mellitus",
            LastAppointment: "11/15/2025",
          },
        ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <FaExclamationCircle className="text-blue-600 text-xl" />
        <h2 className="text-base font-semibold text-gray-900">Illnesses</h2>
      </div>
      <div className="flex flex-column gap-2">
        <ul className="list-none">
          {illnesses.map((record) => (
            <li key={record.id} className="flex items-center gap-2 mb-2">
              <div className="flex flex-col">
                <h4 className="text-sm font-normal text-gray-900 mb-2">
                  {record.Diagnosis}
                </h4>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {patientData?.currentMedications && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Current Medications
          </h3>
          <p className="text-sm text-gray-700">
            {patientData.currentMedications}
          </p>
        </div>
      )}

      {patientData?.operations && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Operations
          </h3>
          <p className="text-sm text-gray-700">{patientData.operations}</p>
        </div>
      )}
    </div>
  );
}
export default PrimaryDiagnosis;
