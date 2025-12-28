import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import PatientRegisterForm from "./PatientRegisterForm";
import MedicalHistoryForm from "./MedicalHistoryForm";
import { PatientRegisterProvider } from "../../Context/PatientRegisterContext";

function PatientRegisterFormWizard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const step = parseInt(searchParams.get("step") || "1");

  const goToNextStep = () => {
    setSearchParams({ step: step + 1 });
  };

  return (
    <PatientRegisterProvider>
      {step === 1 && <PatientRegisterForm onNext={goToNextStep} />}
      {step === 2 && <MedicalHistoryForm onNext={goToNextStep} />}
    </PatientRegisterProvider>
  );
}

export default PatientRegisterFormWizard;
