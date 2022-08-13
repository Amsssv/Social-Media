import React, { useState } from "react";
import Logo from "../components/logo";
import Container from "../components/container";
import SignUpForm from "../components/sign-up-form";
import Toastr from "../components/toastr/toastr";

const SignUp = () => {
  const [list, setList] = useState([]);
  let toastProperties = null;

  const handleClick = () => {
    toastProperties = {
      id: list.length + 1,
    };
    setList([...list, toastProperties]);
  };

  return (
    <Container>
      <div className="border border-gray-100 rounded-lg shadow-lg flex items-center flex-col">
        <Logo />
        <h1 className="uppercase my-4 text-3xl text-center">
          Welcome to calibre
        </h1>
        <p className="uppercase text-xl text-slate-500 w-64 text-center mb-2">
          Try new experience messaging with calibre
        </p>
        <SignUpForm />
        <button onClick={handleClick}>Click me</button>
        <Toastr list={list} setList={setList} />
      </div>
    </Container>
  );
};

export default SignUp;
