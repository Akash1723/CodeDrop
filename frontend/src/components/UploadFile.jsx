import React, { useState, useEffect } from "react";
import { getCurrentSession } from "../services/sessionService";
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    const session = getCurrentSession();
    if (session === null) {
      navigate("/login");
    }
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Upload failed");
      } else {
        setResult(data);
        alert("✅ File uploaded successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
    // Reset
    setSelectedFile(null);
    e.target.reset(); // clear the form
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white mt-20 mb-20">
      <div className="bg-gray-100 text-black rounded-xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
          Upload Your File
        </h2>

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Choose File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-green-600">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2 rounded-lg font-semibold hover:bg-red-800 transition"
          >
            {isLoading ? "Uploading..." : "Upload & Get Code"}
          </button>
        </form>
      </div>
      {result && (
        <div className="mt-6 mb-6 p-6 bg-gray-100 text-black rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Your Unique Code
          </h2>
          <p className="text-4xl font-bold text-red-600 tracking-widest">
            {result.code}
          </p>
          <p className="mt-3">Scan to open file:</p>
          <img src={result.qr} alt="QR Code" className="mx-auto" />
        </div>
      )}
    </div>
  );
};

export default UploadFile;
