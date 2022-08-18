import React from "react";
import { ToasrProvider } from "./common/toastr";
import { AuthProvider } from "./common/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Success from "./pages/success";
import PublicLayout from "./common/public-layout";
import ProtectedLayout from "./common/protected-layout";

function App() {
  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <ToasrProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>
              <Route element={<ProtectedLayout />}>
                <Route path="/success" element={<Success />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ToasrProvider>
    </main>
  );
}

export default App;
