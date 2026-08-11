import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMAGE, USER_PHOTO_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  // useRef
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // validate the form data
    const message = checkValidData(
      isSignInForm ? "" : name.current.value,
      email.current.value,
      password.current.value,
      isSignInForm,
    );
    setErrorMessage(message);
    if (message) return;

    // Sign/Sign Up
    if (!isSignInForm) {
      // Sign In Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // update user profile and takes user name
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_PHOTO_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              );
            })
            .catch((error) => {
              setErrorMessage(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
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
          src={BACKGROUND_IMAGE}
          alt="Background"
        />
      </div>

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/50 -z-10"></div>

      {/* Login Form Container */}
      <div className="min-h-screen w-full flex justify-center items-start sm:items-center px-4 pt-24 pb-8">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-sm p-5 sm:p-8 md:p-10 lg:p-12 bg-black/75 text-white rounded-lg">
          {/* Heading */}
          <h1 className="font-bold text-2xl sm:text-3xl py-3 sm:py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {/* Full Name */}
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-3 my-3 w-full bg-gray-700 rounded text-sm sm:text-base"
            />
          )}

          {/* Email */}
          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="p-3 my-3 w-full bg-gray-700 rounded text-sm sm:text-base "
          />

          {/* Password */}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 my-3 w-full bg-gray-700 rounded text-sm sm:text-base"
          />

          {/* Error */}
          <p className="text-red-500 font-bold text-sm">{errorMessage}</p>

          {/* Button */}
          <button
            type="submit"
            onClick={handleButtonClick}
            className="p-3 my-3 bg-red-700 hover:bg-red-800 w-full rounded font-semibold text-sm sm:text-base">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          {/* Toggle */}
          <p
            className=" py-2 cursor-pointer text-sm sm:text-base text-gray-300 hover:text-white"
            onClick={toggleSignInForm}>
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
