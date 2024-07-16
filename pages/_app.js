// pages/_app.js
import '../styles/globals.css';
import { AnonAadhaarProvider } from '@anon-aadhaar/react';

function MyApp({ Component, pageProps }) {
  return (
    <AnonAadhaarProvider _useTestAadhaar={true} _fetchArtifactsFromServer={false}>
      <Component {...pageProps} />
    </AnonAadhaarProvider>
  );
}

export default MyApp;
