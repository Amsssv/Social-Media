import React from "react";
import { ToasrProvider } from "./components/toastr";
import { AuthProvider } from "./components/auth";
import { BrowserRouter } from "react-router-dom";
import Page from "./pages";

function App() {
  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <ToasrProvider>
        <BrowserRouter>
          <AuthProvider>
            <Page />
          </AuthProvider>
        </BrowserRouter>
      </ToasrProvider>
    </main>
  );
}

export default App;
