'use client'

// pages/index.js (or any other page)
import { LogInWithAnonAadhaar, useAnonAadhaar, AnonAadhaarProof } from "@anon-aadhaar/react";
import { useEffect } from "react";

export default function Login() {
  const [anonAadhaar] = useAnonAadhaar();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <div className="flex justify-center p-64 items-center ">
      <div className="border rounded-lg p-4 border-white">
      <LogInWithAnonAadhaar nullifierSeed={1234} />
      </div>
      
      <p className="ml-3 border rounded-lg p-6 ">{anonAadhaar?.status}</p>
      

      {/* Display the proof if generated and valid */}
      {anonAadhaar?.status === "logged-in" && (
        <>
          <p>✅ Proof is valid</p>
          <AnonAadhaarProof code={JSON.stringify(anonAadhaar.anonAadhaarProof, null, 2)} />
        </>
      )}
    </div>
  );
}
