import EmailInput from '@/components/forms/EmailInput';
import GoogleSignInButton from '@/components/forms/GoogleSignInButton'; // Importing GoogleSignInButton component
import LoginButton from '@/components/forms/LoginButton';
import PasswordInput from '@/components/forms/PasswordInput';

import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
            <EmailInput /> {/* Email Input */}
            <div className="form-control">
            <PasswordInput /> {/* Password Input */}
              <Link href="/forgot-password" className="text-xs text-right text-blue-600">
                  Forgot password?               
              </Link>
            </div>
            <LoginButton /> {/* Login Button */}
            <div className="divider">OR</div> {/* Divider */}
            <GoogleSignInButton /> {/* Google Sign In Button */}
            <div className="divider"></div> {/* Divider */}
              <div className="form-control mt-6">
              <Link href="/signup" className="btn btn-secondary">
                Don't have an account? Sign up
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;