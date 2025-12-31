import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiSearch, FiX } from "react-icons/fi";
import { RiStethoscopeLine } from "react-icons/ri";

const fields = [
  {
    id: "doctor",
    label: "Search Doctor",
    placeholder: "Dr. Smith, cardiologist, etc.",
    icon: <FiSearch className="text-sky-600 text-xl" />,
  },
  {
    id: "location",
    label: "Set Location",
    placeholder: "City, clinic, or ZIP code",
    icon: <FiMapPin className="text-sky-600 text-xl" />,
  },
];

const tags = [
  "Family Medicine",
  "COVID",
  "Top Hospital",
  "Telehealth",
  "Family Medicine",
];

const specialtyOptions = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Orthopedics",
  "Gynecology",
  "Oncology",
  "Anesthesiology",
  "Emergency Medicine",
  "Family Medicine",
  "Internal Medicine",
  "Ophthalmology",
];

function Search() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    doctor: "",
    location: "",
    specialty: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);

  const handleTextChange = (field) => (event) => {
    const { value } = event.target;
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpecialtyChange = (event) => {
    const { value } = event.target;
    setFormValues((prev) => ({ ...prev, specialty: value }));
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const requestPayload = useMemo(
    () => ({
      doctorQuery: formValues.doctor.trim(),
      location: formValues.location.trim(),
      specialty: formValues.specialty || undefined,
      quickFilters: selectedTags,
      timestamp: new Date().toISOString(),
    }),
    [formValues, selectedTags]
  );

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (formValues.doctor.trim()) params.append("q", formValues.doctor.trim());
    if (formValues.specialty)
      params.append("specialization", formValues.specialty);
    if (formValues.location.trim())
      params.append("location", formValues.location.trim());

    navigate(`/doctors?${params.toString()}`);
  };

  return (
    <section className="bg-white px-4 py-12 mt-0 mb-10">
      <div className="mx-auto max-w-6xl space-y-6 rounded-[32px] bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.6)]">
        <div className="flex flex-col gap-4 text-slate-600 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-col gap-4 lg:flex-row">
            {fields.map(({ id, label, placeholder, icon }) => (
              <label
                key={id}
                className="flex flex-1 flex-col gap-2 rounded-3xl border border-slate-200 bg-slate-50/60 px-5 py-4 shadow-inner shadow-white transition hover:border-sky-200 hover:bg-white"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {label}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                    {icon}
                  </span>
                  <input
                    type="text"
                    value={formValues[id]}
                    onChange={handleTextChange(id)}
                    placeholder={placeholder}
                    className="w-full border-none bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </label>
            ))}

            {/* Specialty Select */}
            <label className="flex flex-1 flex-col gap-2 rounded-3xl border border-slate-200 bg-slate-50/60 px-5 py-4 shadow-inner shadow-white transition hover:border-sky-200 hover:bg-white">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Select Specialty
              </span>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                  <RiStethoscopeLine className="text-xl" />
                </span>
                <select
                  value={formValues.specialty}
                  onChange={handleSpecialtyChange}
                  className="w-full appearance-none rounded-2xl border border-transparent bg-transparent px-2 py-2 text-base text-slate-900 outline-none focus:ring-0"
                >
                  <option value="">Cardiology, Pediatrics, Neurology...</option>
                  {specialtyOptions.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-sky-600 text-white shadow-lg shadow-blue-200 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 lg:mx-0"
            aria-label="Search"
          >
            <FiSearch className="text-2xl" />
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
            You may be looking for
          </p>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => {
              const isActive = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition ${
                    isActive
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{tag}</span>
                  <FiX
                    className={`text-base transition ${
                      isActive
                        ? "text-sky-600"
                        : "text-slate-400 group-hover:text-slate-500"
                    }`}
                  />
                </button>
              );
            })}

            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
            >
              More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Search;
