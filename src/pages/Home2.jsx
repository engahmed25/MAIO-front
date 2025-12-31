import React, { useState, useMemo } from "react";
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

import { Link } from "react-router-dom";
import Search from "../ui/Search";

// Header Component
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">MAIO</h1>
              <p className="text-xs text-gray-500">Medical Platform</p>
            </div>
          </div>

          {/* Navigation & Auth Buttons */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Dashboard
                </button>
                <button className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <User className="w-5 h-5 text-blue-600" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Login
                </button>
                <button className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
// Hero Section Component
const HeroSection = () => {
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
              <button className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-gray-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors border-2 border-gray-200">
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
};

// Specialty Card Component
const SpecialtyCard = ({ specialty }) => {
  const Icon = specialty.icon;

  return (
    <Link to={`/specialties/${specialty.id}`}>
      <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group">
        <div
          className={`w-14 h-14 ${specialty.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
        >
          <Icon className={`w-7 h-7 ${specialty.iconColor}`} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {specialty.name}
        </h3>
        <p className="text-gray-600 mb-4">{specialty.description}</p>
        <p className="text-sm text-blue-600 font-semibold">
          {specialty.doctorCount} Doctors Available
        </p>
      </div>
    </Link>
  );
};

// Find by Specialty Section
const FindBySpecialtySection = () => {
  const specialties = [
    {
      id: 1,
      name: "Cardiology",
      description: "Heart and cardiovascular care",
      doctorCount: 25,
      icon: Heart,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      id: 2,
      name: "Neurology",
      description: "Brain and nervous system",
      doctorCount: 18,
      icon: Brain,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      name: "Pediatrics",
      description: "Children's healthcare",
      doctorCount: 30,
      icon: Baby,
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      id: 4,
      name: "Ophthalmology",
      description: "Eye care and vision",
      doctorCount: 15,
      icon: Eye,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 5,
      name: "Orthopedics",
      description: "Bone and joint care",
      doctorCount: 22,
      icon: Bone,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      id: 6,
      name: "General Practice",
      description: "Primary healthcare",
      doctorCount: 40,
      icon: Stethoscope,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      id: 7,
      name: "Dermatology",
      description: "Skin and hair care",
      doctorCount: 20,
      icon: Activity,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: 8,
      name: "Pharmacy",
      description: "Medication management",
      doctorCount: 12,
      icon: Pill,
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
  ];

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
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a specialty or doctor..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Specialty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((specialty) => (
            <SpecialtyCard key={specialty.id} specialty={specialty} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg flex items-center gap-2 mx-auto">
            View All Specialties
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Main Home Component
const Home2 = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FindBySpecialtySection />
    </div>
  );
};

export default Home2;
