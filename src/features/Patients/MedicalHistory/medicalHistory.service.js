const mockMedicalHistory = [
  {
    id: "mh-001",
    title: "Routine Check-up & ECG",
    date: "2025-12-09",
    type: "Note",
    description:
      "Follow-up for reported chest discomfort. ECG results showed minor irregularities requiring observation.",
    recordedBy: "Dr. Emily Carter",
  },
  {
    id: "mh-002",
    title: "Initial Diagnosis: Mild Hypertension",
    date: "2025-11-15",
    type: "Diagnosis",
    description:
      "Patient presented with elevated blood pressure (145/95). Prescribed Lisinopril 5mg daily.",
    recordedBy: "Dr. Emily Carter",
  },
  {
    id: "mh-003",
    title: "New Medication: Lisinopril 5mg",
    date: "2025-11-15",
    type: "Medication",
    description:
      "Start date for anti-hypertensive medication. Instructions given for monitoring and follow-up in 1 month.",
    recordedBy: "Dr. Emily Carter",
  },
  {
    id: "mh-004",
    title: "Appendectomy Procedure",
    date: "2025-05-20",
    type: "Procedure",
    description:
      "Emergency laparoscopic appendectomy performed at City General Hospital. Full recovery noted 6 weeks post-op.",
    recordedBy: "Dr. Emily Carter",
  },
];

export async function fetchMedicalHistory() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMedicalHistory), 450);
  });
}
