import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DoctorRegisterForm from "./DoctorRegisterForm";
import DoctorUploadFilesForm from "./DoctorUploadFilesForm";
import DoctorClinicForm from "./DoctorClinicForm";
import { DoctorRegisterProvider } from "../../Context/DoctorRegisterContext";

function DoctorRegisterWizard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const step = parseInt(searchParams.get("step") || "1");

  const goToNextStep = () => {
    setSearchParams({ step: step + 1 });
  };

  return (
    <DoctorRegisterProvider>
      {step === 1 && <DoctorRegisterForm onNext={goToNextStep} />}
      {step === 2 && <DoctorUploadFilesForm onNext={goToNextStep} />}
      {step === 3 && <DoctorClinicForm onNext={goToNextStep} />}
    </DoctorRegisterProvider>
  );
}

export default DoctorRegisterWizard;
