import React, { Suspense } from "react";

const LandingPage = React.lazy(() => import("./pages/LandingPage"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <LandingPage />
      </Suspense>
    </>
  );
}

export default App;
