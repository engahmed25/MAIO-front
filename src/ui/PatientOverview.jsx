import ContactInfo from "./ContactInfo";
import Allergies from "./Allergies";
import PrimaryDiagnosis from "./PrimaryDiagnosis";

function PatientOverview() {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PrimaryDiagnosis />
        <Allergies />
      </div>
      <ContactInfo />
    </div>
  );
}
export default PatientOverview;
