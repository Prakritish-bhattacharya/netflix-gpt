import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // useRef
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // validate the form data
    const message = checkValidData(
      name.current.value,
      email.current.value,
      password.current.value,
    );
    setErrorMessage(message);

    // Sign/Sign Up
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <Header />

      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0ce6c17e-e188-4f13-aaf2-6366e12ba739/web/IN-en-20260803-TRIFECTA-perspective_7730cca2-6324-4104-bf66-1a1f6e1a3e61_large.jpg"
          alt="Background"
        />
      </div>

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/50 -z-10"></div>

      {/* Login Form Container */}
      <div className="min-h-screen flex justify-center items-center px-4 pt-20">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12 p-12 bg-black/75 text-white rounded-lg">
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {/* Full Name - Only for Sign Up */}
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-2.5 my-4 w-full bg-gray-700"
            />
          )}

          {/* Email */}
          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="p-2.5 my-4 w-full bg-gray-700"
          />

          {/* Password */}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-2.5 my-4 w-full bg-gray-700"
          />

          <p className="text-red-500 font-bold ">{errorMessage}</p>
          {/* Button */}
          <button
            type="submit"
            className="p-2.5 my-3 bg-red-700 w-full"
            onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          {/* Toggle */}
          <p className="py-2.5 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already registered? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
