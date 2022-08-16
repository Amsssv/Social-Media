import React from "react";
import SignUp from "./pages/sign-up";
import { ToasrProvider } from "./components/toastr";
import Login from "./pages/login";

function App() {
  return (
    <>
      <ToasrProvider>
        <main className="px-4 py-12 sm:px-6 lg:px-8">
          <Login />
        </main>
      </ToasrProvider>
    </>
  );
}

export default App;
