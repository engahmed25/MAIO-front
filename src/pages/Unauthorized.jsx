import Button from "../ui/Button";

// Unauthorized.jsx
export default function Unauthorized() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="mt-4">You don't have permission to access this page.</p>
      <Button
        onClick={() => window.history.back()}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go Back
      </Button>
    </div>
  );
}
