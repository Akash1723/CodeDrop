import React from "react";
import {
  clearCurrentSession,
  getCurrentSession,
} from "../services/sessionService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Simulated user data — in a real app, you'd fetch this from backend or context
  const user = getCurrentSession();

  const Navigate = useNavigate();
  const logout_fun = () => {
    clearCurrentSession();
    Navigate("/login");
  };

  return user ? (
    <div className="flex items-center justify-center bg-white mt-20 mb-20">
      <div className="bg-gray-100 rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
          User Dashboard
        </h2>

        <div className="space-y-4 text-gray-800">
          <div className="flex justify-between">
            <span className="font-semibold">Username:</span>
            <span>{user.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Phone:</span>
            <span>{user.phone}</span>
          </div>
        </div>

        {/* You can add logout or edit profile button here */}
        <div className="mt-8 text-center">
          <button
            className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition"
            onClick={logout_fun}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-black text-white text-lg">
      <p className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-md">
        Please log in to view the dashboard.
      </p>
    </div>
  );
};

export default Dashboard;
