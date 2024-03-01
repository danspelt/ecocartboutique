"use client";
import React, { useState } from 'react';
import userService from '@/lib/services/userServices';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa'; // Importing Google icon

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email, 'Password:', password);
    userService.login(email, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link href="/forgot-password" className="text-xs text-right text-blue-600">
                  Forgot password?               
              </Link>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div className="divider">OR</div> {/* Divider */}
            <div className="form-control">
              <button className="btn btn-outline flex justify-center items-center gap-2">
                <FaGoogle /> {/* Google Icon */}
                Sign In with Google
              </button>
            </div>
            <div className="divider"></div> {/* Divider */}
              <div className="form-control mt-6">
              <Link href="/signup" className="btn btn-secondary">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;