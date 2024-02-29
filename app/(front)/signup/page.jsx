"use client";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, userName, email, password, confirmPassword]);

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!userName.trim()) newErrors.userName = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return; // Don't submit if form is invalid

    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", user);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(FIREBASE_AUTH, provider);
      const user = userCredential.user;
      console.log("User signed in with Google:", user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="firstName" className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="input input-bordered"
                value={firstName}
                onChange={handleInputChange}
                aria-describedby="firstNameError"
              />
              {errors.firstName && (
                <p
                  id="firstNameError"
                  className="text-red-500 text -xs italic"
                  role="alert"
                >
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="form-control mt-4">
              <label htmlFor="lastName" className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="input input-bordered"
                value={lastName}
                onChange={handleInputChange}
                aria-describedby="lastNameError"
              />
              {errors.lastName && (
                <p
                  id="lastNameError"
                  className="text-red-500 text -xs italic"
                  role="alert"
                >
                  {errors.lastName}
                </p>
              )}
              <div className="form-control mt-4">
                <label htmlFor="userName" className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="Username"
                  className="input input-bordered"
                  value={userName}
                  onChange={handleInputChange}
                  aria-describedby="userNameError"
                />
                {errors.userName && (
                  <p
                    id="userNameError"
                    className="text-red-500 text -xs italic"
                    role="alert"
                  >
                    {errors.userName}
                  </p>
                )}
              </div>
              <div className="form-control mt-4">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  value={email}
                  onChange={handleInputChange}
                  aria-describedby="emailError"
                />
                {errors.email && (
                  <p
                    id="emailError"
                    className="text-red-500 text -xs italic"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="form-control mt-4">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                  value={password}
                  onChange={handleInputChange}
                  aria-describedby="passwordError"
                />
                {errors.password && (
                  <p
                    id="passwordError"
                    className="text-red-500 text -xs italic"
                    role="alert"
                  >
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="form-control mt-4">
                <label htmlFor="confirmPassword" className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  aria-describedby="confirmPasswordError"
                />
                {errors.confirmPassword && (
                  <p
                    id="confirmPasswordError"
                    className="text-red-500 text -xs italic"
                    role="alert"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isFormValid}
              >
                Sign Up
              </button>
            </div>
            <div className="form-control mt-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn btn-secondary"
              >
                Sign Up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
