import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout.jsx";
import Home from "./ui/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import DoctorRegisterWizard from "./features/Authentication/DoctorRegisterWizard.jsx";
import PatientRegisterFormWizard from "./features/Authentication/PatientRegisterFormWizard.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import DrInfo from "./features/Appointments/DrInfo.jsx";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import AllDoctors from "./pages/AllDoctors.jsx";
import PatientDashboard from "./pages/PatientDashBoard.jsx";
import Home2 from "./pages/Home2.jsx";

import MedicalHistory from "./features/Authentication/MedicalHistoryForm.jsx";
import { Toaster } from "react-hot-toast";
import Doctor from "./pages/Doctor.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import DoctorDashBoard from "./pages/DoctorDashBoard.jsx";
import PatientList from "./pages/PatientsList.jsx";
import DashboardLayout from "./ui/DoctorDashBoardLayout.jsx";
import { AuthProvider } from "react-auth-kit";
import WaitAdminApproval from "./pages/WaitAdminApproval.jsx";
import ProtectedRoute from "./features/Authentication/ProtectedRoutes.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import ConsultingDoctors from "./pages/ConsultingDoctors.jsx";
import UploadPatientsFiles from "./pages/UploadPatientsFiles.jsx";
import EmailConfirmation from "./pages/EmailConfirmation.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import DoctorsBySpecialization from "./pages/DoctorsBySpecialization.jsx";
import { MedicalHistory as MedicalHistoryComponent } from "./features/Patients/MedicalHistory.jsx";
import PatientInfo from "./features/Patients/PatienInfo/PatientInfo.jsx";

import PaymentPage from "./pages/PaymentPage.jsx";
import ConfirmAppointmentPage from "./pages/ConfirmAppointmentPage.jsx";
import PaymentConfirmation from "./features/paymentMethods/PaymentConfirmation.jsx";
import PatientSettings from "./features/Patients/PatientSettings.jsx";
import DoctorSettings from "./features/Doctors/DoctorSettings.jsx";
import ReschedulePage from "./pages/ReschedulePage.jsx";
import PatientProfile from "./pages/PatientProfile.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import DoctorCalendarPage from "./pages/DoctorCalendarPage.jsx";
import { NotificationProvider } from "./features/Notifications/NotificationContext.jsx";

// import store from "./utils/authStore.js";
// import * as authKit from "react-auth-kit";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home2 />,
      },

      {
        path: "/doctors",
        element: <AllDoctors />,
      },
      {
        path: "/doctors/specialization/:specialization",
        element: <DoctorsBySpecialization />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/doctor/:id",
        element: <Doctor />,
      },
      {
        path: "/appointments",
        element: <MyAppointments />,
      },
    ],
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register/doctors",
    element: <DoctorRegisterWizard />,
  },

  {
    path: "/register/patients",
    element: <PatientRegisterFormWizard />,
  },

  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  // {
  //   path: "/patient/dashboard",
  //   element: (
  //     <ProtectedRoute allowedRoles={["patient", "doctor"]}>
  //       <PatientDashboard />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/patient/medical-form",
    element: (
      <ProtectedRoute allowedRoles={["patient", "doctor"]}>
        <MedicalHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/doctor/info",
    element: <DrInfo />,
  },

  {
    path: "/PatientDashboard",
    element: <PatientDashboard />,
  },
  {
    path: "/forgot-password",
    element: <EmailConfirmation />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/wait",
    element: <WaitAdminApproval />,
  },
  // {
  //   path: "/medicalss",
  //   element: <MedicalHistory />,
  // },
  //! we need to reuse the layout for both doctor and patient dashboard
  {
    path: "/doctor",
    element: (
      <ProtectedRoute allowedRoles={["doctor"]}>
        <DashboardLayout role="doctor" />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <DoctorDashBoard /> },
      { path: "patientList", element: <PatientList /> },
      { path: "calendar", element: <DoctorCalendarPage /> },
      {
        path: "consulting-doctors",
        element: <ConsultingDoctors />,
      },
      {
        path: "patient/:patientId",
        element: <PatientProfile />,
      },
      {
        path: "settings",
        element: <DoctorSettings />,
      },
    ],
  },

  {
    path: "/patient",
    element: (
      <ProtectedRoute allowedRoles={["patient"]}>
        <DashboardLayout role="patient" />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <PatientDashboard /> },
      {
        path: "/patient/upload-files",
        element: <UploadPatientsFiles />,
      },
      {
        path: "/patient/medical-history",
        element: <MedicalHistoryComponent />,
      },
      {
        path: "/patient/settings",
        element: <PatientSettings />,
      },

      {
        path: "/patient/reschedule/:doctorId",
        element: <ReschedulePage />,
      },
    ],
  },
  {
    path: "/wait",
    element: <WaitAdminApproval />,
  },

  {
    path: "/patient/patientInfo",
    element: <PatientInfo />,
  },
  {
    path: "/patient/payment",
    element: <PaymentPage />,
  },
  {
    path: "/patient/payment/confirm-payment",
    element: <PaymentConfirmation />,
  },
  {
    path: "/confirmappointmentpage",
    element: <ConfirmAppointmentPage />,
  },
  {
    path: "/doctor/chat/:roomId",
    element: <ChatPage />,
  },
]);

function App() {
  // console.log("Available exports:", Object.keys(authKit));
  return (
    <>
      <AuthProvider
        authType="cookie"
        authName="_auth"
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}
      >
        <NotificationProvider>
          <QueryClientProvider client={queryClient}>
            {" "}
            <RouterProvider router={router} />
          </QueryClientProvider>
        </NotificationProvider>
        <Toaster position="top-center" />
      </AuthProvider>
    </>
  );
}

export default App;
