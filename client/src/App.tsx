import React from "react";
import SignUp from "./pages/sign-up";
import { ToasrProvider } from "./components/toastr";

function App() {
  return (
    <>
      <ToasrProvider>
        <main className="px-4 py-12 sm:px-6 lg:px-8">
          <SignUp />
        </main>
      </ToasrProvider>
    </>
  );
}

export default App;
