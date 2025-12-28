import { createContext, useContext, useState } from "react";

const PatientRegisterContext = createContext();

function PatientRegisterProvider({ children }) {
  const [patientFormData, setPatientFormData] = useState({
    step1: {},
    step2: {},
  });

  function updatePatientFormData(step, data) {
    console.log("Updating form data:", step, data); // Debug log

    setPatientFormData((prevSteps) => ({
      ...prevSteps,
      [step]: data,
    }));
  }

  return (
    <PatientRegisterContext.Provider
      value={{ patientFormData, updatePatientFormData }}
    >
      {children}
    </PatientRegisterContext.Provider>
  );
}

function usePatientRegister() {
  const context = useContext(PatientRegisterContext);
  if (!context) {
    throw new Error(
      "usePatientRegister must be used within PatientRegisterProvider"
    );
  }
  return context;
}

export { PatientRegisterProvider, usePatientRegister };
