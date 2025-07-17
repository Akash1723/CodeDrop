import {React,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/img1.jpg';
import { getCurrentSession } from '../services/sessionService';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const session =getCurrentSession()
    if(session===null){
      navigate('/login');
    }
  },[])

  const handleShareClick = () => {
    navigate('/upload'); // Navigate to the upload page when the button is clicked
  };

  const handleReceiveClick = () => {
    navigate('/receive'); // Navigate to the upload page when the button is clicked
  };

  return (
    <div className='mb-4'>
      {/* Hero Section with Background Image */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay with blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center px-6">
            <h2 className="text-white text-4xl font-bold mb-4">
              Share Files Instantly with a Secure Code
            </h2>
            <p className="text-white text-lg max-w-xl mx-auto">
              Upload your file, generate a secure code, and share it with others.
              Simple, fast, and time-limited — your data stays in control.
            </p>
          </div>
        </div>
      </div>

      {/* Intro Content Section */}
      <div className="bg-white text-black px-6 py-12 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Fast & Secure File Sharing Platform
        </h3>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          CodeDrop lets you upload files that generate unique codes, which others can use to download the file — valid only for a limited time. 
          No signups, no clutter — just direct, secure file sharing with full control.
        </p>

        <button
          onClick={handleShareClick}
          className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition"
        >
          Share Here
        </button>
        <button
          onClick={handleReceiveClick}
          className="bg-red-700 text-white ml-1.5 px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition"
        >
          Download Here
        </button>
      </div>
    </div>
  );
};

export default Home;
