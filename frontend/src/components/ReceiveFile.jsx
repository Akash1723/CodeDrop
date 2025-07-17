import React, { useState,useEffect } from 'react';
import { getCurrentSession } from '../services/sessionService';
import { useNavigate } from 'react-router-dom';

const ReceiveFile = () => {
  const navigate=useNavigate();
  const [code, setCode] = useState('');

  const handleDownload = async () => {
    if(code.length!=6){
      alert("Code length must be 6");
      return
    }

    let response=await fetch(`http://127.0.0.1:8000/api/receive/${code}`);
    let res=await response.json();

    if(!response.ok){
      alert(res.detail);
      return;
    }

    console.log(res.URL);

     window.open(res.URL, '_blank');

  };

  useEffect(() => {
      const session =getCurrentSession()
      if(session===null){
        navigate('/login');
      }
    },[])

  return (
    <div className="flex items-center justify-center bg-white mt-20 mb-20">
      <div className="bg-gray-100 text-black rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Enter 6-Digit Code</h2>
        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="123456"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg tracking-widest mb-4 text-center"
        />
        <button
          onClick={handleDownload}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 text-lg w-full"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ReceiveFile;
