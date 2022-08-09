import React from "react";
import CheckBox from "./checkbox";

const Typeform = () => {
  return (
    <div className="mb-2 self-start px-8">
      <CheckBox id="Terms">
        I agree to Typeform’s{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>
      </CheckBox>
      <CheckBox id="Privacy">
        I accept Typeform's use of my data for the service and everything else
        described in the{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Data Processing Agreement
        </a>
      </CheckBox>
    </div>
  );
};

export default Typeform;
