import { createContext, useContext, useState } from "react";

const DoctorRegisterContext = createContext();

function DoctorRegisterProvider({ children }) {
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
  });

  function updateFormData(step, data) {
    console.log("Updating form data:", step, data); // Debug log

    setFormData((prevSteps) => ({
      ...prevSteps,
      [step]: data,
    }));
  }

  return (
    <DoctorRegisterContext.Provider value={{ formData, updateFormData }}>
      {children}
    </DoctorRegisterContext.Provider>
  );
}

function useDoctorRegister() {
  const context = useContext(DoctorRegisterContext);
  if (!context) {
    throw new Error(
      "useDoctorRegister must be used within DoctorRegisterProvider"
    );
  }
  return context;
}

export { DoctorRegisterProvider, useDoctorRegister };
