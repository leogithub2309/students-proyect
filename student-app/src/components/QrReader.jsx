import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router';

function QrScanner() {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 600,
        height: 550,
      },
      fps: 40,
    });

    const success = (result) => {
      scanner.clear();
      setScanResult(result);
      
    };

    const error = (err) => {
      console.warn(err);
    };

    scanner.render(success, error);

    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

  return (
    <div className='bg-white p-3 w-full h-screen'>
      {scanResult ? navigate(scanResult) : (
        <div id="reader" />
      )}
    </div>
  );
}

export default QrScanner;