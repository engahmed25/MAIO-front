import React from "react";
import { useMemo, useState } from "react";

import { BiSolidError } from "react-icons/bi";

function Allergies({ patientData }) {
  const allergies = patientData?.drugAllergies
    ? patientData.drugAllergies.split(",").map((allergy, index) => ({
        id: index + 1,
        name: allergy.trim(),
      }))
    : [
        { id: 1, name: "Penicillin" },
        { id: 2, name: "Dust Mites" },
      ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <BiSolidError className="text-red-600 text-xl" />
        <h2 className="text-base font-semibold text-gray-900">Allergies</h2>
      </div>
      <div>
        <ul className="space-y-2">
          {allergies.map((allergy) => (
            <li key={allergy.id} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full shrink-0"></span>
              <h4 className="text-sm text-gray-900">{allergy.name}</h4>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Allergies;
