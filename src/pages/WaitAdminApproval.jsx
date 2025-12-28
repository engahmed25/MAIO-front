// WaitAdminApproval.js - FIXED with localStorage fallback
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function WaitAdminApproval() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    let doctorData = queryClient.getQueryData(["DoctorData"]);

    if (!doctorData) {
      const storedDoctor = localStorage.getItem("pendingDoctor");
      if (storedDoctor) {
        doctorData = JSON.parse(storedDoctor);
        queryClient.setQueryData(["DoctorData"], doctorData);
      }
    }

    if (doctorData) {
      setDoctor(doctorData);
    } else {
      // No pending doctor data found - redirect to login
      navigate("/login");
    }
  }, [queryClient, navigate]);

  if (!doctor) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">
        Hello Dr. {doctor.firstName} {doctor.lastName}
      </h1>
      <p className="text-lg">Your account is pending admin approval.</p>
      <p className="text-sm text-gray-600">
        You will be notified once your account is approved.
      </p>
      <Button
        onClick={() => {
          localStorage.removeItem("pendingDoctor");
          queryClient.removeQueries(["DoctorData"]);
          navigate("/login");
        }}
        className="mt-4 px-4 py-6"
      >
        Back to Login
      </Button>
    </div>
  );
}
