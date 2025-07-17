import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-red-800 text-white py-4 px-6 text-center w-full fixed bottom-0 left-0 z-50">
      <p className="text-sm">
        © {new Date().getFullYear()} CodeDrop. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
