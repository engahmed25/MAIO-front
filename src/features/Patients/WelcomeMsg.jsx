import { CheckCircle } from "lucide-react";
export default function WelcomeSection() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl">RPJ</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome back, Robert!
            </h1>
            <p className="text-gray-600">
              Here's your health overview for today
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Stable</span>
          </div>
          <p className="text-sm text-gray-600">Age: 40 years</p>
          <p className="text-sm text-gray-600">ID: p_1001_self</p>
        </div>
      </div>
    </div>
  );
}
