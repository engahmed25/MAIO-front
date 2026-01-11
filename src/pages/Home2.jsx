import React, { useState, useMemo, useEffect } from "react";
import {
  User,
  Search as SearchIcon,
  Heart,
  Brain,
  Baby,
  Eye,
  Bone,
  Stethoscope,
  Activity,
  Pill,
  ArrowRight,
  CheckCircle,
  Calendar,
  Clock,
  Shield,
  MapPin,
  X,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import Search from "../ui/Search";
import { useAuthHeader, useIsAuthenticated, useAuthUser } from "react-auth-kit";
import UserButton from "../ui/UserButton";
import Button from "../ui/Button";
import { useDoctors } from "../features/Doctors/useDoctors";

// Header Component
function Header() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const user = auth()?.user;
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <div className="text-xl font-semibold flex items-center gap-1">
              <img
                src="./logo.png"
                alt="logo"
                className="w-12 md:w-12 rounded-xl object-cover"
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/doctors"
              className="text-[var(--main-color)] hover:text-[var(--main-lite-color)] font-bold transition-colors"
            >
              All Doctors
            </Link>
            <Link
              to="/contactus"
              className="text-[var(--main-color)] hover:text-[var(--main-lite-color)] font-bold transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Navigation & Auth Buttons */}
          <div className="flex items-center gap-4">
            {isAuthenticated() ? (
              <UserButton
                profilePicture={`${baseUrl}/${user?.profilePicture}`}
                role={user?.role}
                userName={`${user?.firstName} ${user?.lastName}`}
              />
            ) : (
              <>
                <Link to="/login">
                  <Button className="w-full p-2.5 mt-2.5  border border-(--main-color) hover:bg-(--main-color) hover:text-white!">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="p-2.5 mt-2.5 bg-white text-black! font-semibold!  border border-(--main-color) hover:bg-(--main-color) hover:text-white!">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
// Hero Section Component
function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Your Health, <br />
              <span className="text-blue-600">Our Priority</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with top medical professionals, manage your health
              records, and schedule appointments all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => navigate("/doctors")}
                className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/contactus")}
                className="bg-white text-gray-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors border-2 border-gray-200"
              >
                Learn More
              </button>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  Easy Scheduling
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  Secure Records
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  Expert Doctors
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Stat Card 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">500+</p>
                <p className="text-gray-600">Appointments Daily</p>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mt-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">200+</p>
                <p className="text-gray-600">Expert Doctors</p>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">100%</p>
                <p className="text-gray-600">Secure & Private</p>
              </div>

              {/* Stat Card 4 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mt-8">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">24/7</p>
                <p className="text-gray-600">Available Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Specialty Card Component
const SpecialtyCard = ({ specialty }) => {
  const Icon = specialty.icon;
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to doctors filtered by specialization
    navigate(`/doctors/specialization/${specialty.name.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group"
    >
      <div
        className={`w-14 h-14 ${specialty.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <Icon className={`w-7 h-7 ${specialty.iconColor}`} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{specialty.name}</h3>
      <p className="text-gray-600 mb-4">{specialty.description}</p>
      <p className="text-sm text-blue-600 font-semibold">
        {specialty.doctorCount} Doctors Available
      </p>
    </div>
  );
};

// Find by Specialty Section
const FindBySpecialtySection = () => {
  const navigate = useNavigate();

  // Fetch all doctors
  const { isLoading, doctors, error } = useDoctors({});

  // Define specialty configurations with icons
  const specialtyConfigs = [
    {
      id: 1,
      name: "Cardiology",
      description: "Heart and cardiovascular care",
      icon: Heart,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      id: 2,
      name: "Neurology",
      description: "Brain and nervous system",
      icon: Brain,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      name: "Pediatrics",
      description: "Children's healthcare",
      icon: Baby,
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      id: 4,
      name: "Ophthalmology",
      description: "Eye care and vision",
      icon: Eye,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 5,
      name: "Orthopedics",
      description: "Bone and joint care",
      icon: Bone,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      id: 6,
      name: "General Practice",
      description: "Primary healthcare",
      icon: Stethoscope,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      id: 7,
      name: "Dermatology",
      description: "Skin and hair care",
      icon: Activity,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: 8,
      name: "Pharmacy",
      description: "Medication management",
      icon: Pill,
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
  ];

  // Count doctors by specialty from real data
  const specialtyCounts = useMemo(() => {
    if (!doctors?.data?.doctors || !Array.isArray(doctors.data.doctors))
      return {};

    const counts = {};
    doctors.data.doctors.forEach((doctor) => {
      const specialization = doctor.specialization;
      if (specialization) {
        counts[specialization] = (counts[specialization] || 0) + 1;
      }
    });

    return counts;
  }, [doctors]);

  // Merge specialty configs with real counts
  const specialties = useMemo(() => {
    return specialtyConfigs.map((config) => ({
      ...config,
      doctorCount: specialtyCounts[config.name] || 0,
    }));
  }, [specialtyCounts]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/doctors?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find by Specialty
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our medical specialties and connect with expert doctors in
            your area of need
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a specialty or doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </form>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading specialties...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">
              Failed to load doctor data. Please try again later.
            </p>
          </div>
        )}

        {/* Specialty Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty) => (
              <SpecialtyCard key={specialty.id} specialty={specialty} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/doctors")}
            className="text-blue-600 hover:text-blue-700 font-semibold text-lg flex items-center gap-2 mx-auto"
          >
            View All Specialties
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Main Home Component
function Home2() {
  const authHeader = useAuthHeader();
  const token = authHeader();
  console.log("==============================================");
  console.log("🔑 ACCESS TOKEN IN HOME PAGE:");
  console.log("Full Auth Header:", token);

  useEffect(() => {
    console.log("Token (without Bearer):", token?.replace("Bearer ", ""));
    console.log("==============================================");
  }, [authHeader]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <Search />
      <FindBySpecialtySection />
    </div>
  );
}

export default Home2;
