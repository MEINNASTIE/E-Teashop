import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

export default function VerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await axios.get(`/api/verify/${window.location.pathname.split('/')[2]}`);
        if (data.success) {
          setVerificationStatus('Thank you for joining us! Your email has been verified.');
        } else {
          setVerificationStatus('Verification failed. Please try again later.');
        }
      } catch (error) {
        console.error('Verification failed:', error);
        setVerificationStatus('Verification failed. Please try again later.');
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Email Verification</h2>
        <p className="text-[20px] text-[#E15438] mb-4">You&apos;ve successfully verified your email!</p>
        <Link to="/login" className="hover:text-[#BCC490] transition duration-200">Come back to TEAPUNKTUR</Link>
      </div>
      <img src="/assets/transparent_tea.png" alt="tea_plant" className="absolute bottom-0 right-20"></img>
    </div>
  );
}
