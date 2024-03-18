'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import ImageUpload from '@/components/profile/ImageUpload';
import PaymentMethod from '@/components/profile/PaymentMethod';
import { FaLock, FaLockOpen } from 'react-icons/fa';

const Form = () => {
  const { currentUser, unlinkSocialAccount } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      setValue('name', currentUser.displayName || '');
      setValue('username', currentUser.username || ''); // Placeholder for username, adjust as needed
      setValue('email', currentUser.email || '');
    }
  }, [currentUser, setValue]);

  const formSubmit = async (data) => {
    console.log(data);
    // Placeholder for form submission logic
  };

  const hasSocialAccountLinked =
    currentUser && currentUser.providerData && currentUser.providerData.length > 1;

  return (
    <div className="w-full max-w-xl mx-auto bg-white card p-6 border-8 shadow-4xl">
      <div className="flex justify-between items-center mb-4">
        <div onClick={() => setIsEditMode(!isEditMode)} className="cursor-pointer">
          {isEditMode ? <FaLockOpen className="text-xl" /> : <FaLock className="text-xl" />}
        </div>
      </div>
      <form onSubmit={handleSubmit(formSubmit)}>
        {/* Profile Picture Upload */}
        <div className="flex justify-center my-4">
          <ImageUpload />
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div className="form-control">
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              readOnly={!isEditMode}
              className={`input input-bordered ${!isEditMode ? 'cursor-not-allowed' : ''}`}
            />
          </div>

          <div className="form-control">
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register('username')}
              readOnly={!isEditMode}
              className={`input input-bordered ${!isEditMode ? 'cursor-not-allowed' : ''}`}
            />
          </div>

          <div className="form-control">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              readOnly={!isEditMode}
              className={`input input-bordered ${!isEditMode ? 'cursor-not-allowed' : ''}`}
            />
          </div>

          <div className="form-control">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              readOnly={!isEditMode}
              className={`input input-bordered ${!isEditMode ? 'cursor-not-allowed' : ''}`}
            />
          </div>
        </div>

        {hasSocialAccountLinked && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold">Linked Account</h2>
            <button
              type="button"
              className="btn btn-error mt-2"
              onClick={unlinkSocialAccount}
            >
              Disconnect
            </button>
          </div>
        )}

        {/* Payment Method */}
        <div className="mt-6">
          <PaymentMethod />
        </div>
      </form>
    </div>
  );
};

export default Form;