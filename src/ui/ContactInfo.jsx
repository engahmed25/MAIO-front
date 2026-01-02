import React from "react";

function ContactInfo({ patientData }) {
  const data = patientData
    ? {
        Email: "N/A",
        Phone: patientData.emergencyContactNumber || "N/A",
        Address: {
          street: "N/A",
          city: "N/A",
          country: "N/A",
        },
      }
    : {
        Email: "thomas.bailey@gmail.com",
        Phone: "+1 (555) 987-6543",
        Address: {
          street: "123Health Ave",
          city: "MAIO City",
          country: "Egypt",
        },
      };
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <h6 className="text-sm text-gray-500 mb-1">Emergency Contact</h6>
          <p className="text-sm text-gray-900">{data.Phone}</p>
        </div>
        <div>
          <h6 className="text-sm text-gray-500 mb-1">Gender</h6>
          <p className="text-sm text-gray-900 capitalize">
            {patientData?.gender || "N/A"}
          </p>
        </div>
      </div>

      <div>
        <h6 className="text-sm text-gray-500 mb-1">Smoking Status</h6>
        <p className="text-sm text-gray-900 capitalize">
          {patientData?.smoking || "N/A"}
        </p>
      </div>
    </div>
  );
}
export default ContactInfo;
