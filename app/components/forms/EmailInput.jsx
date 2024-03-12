'use client';
import { useAuth } from "@/context/AuthContext";
const EmailInput = () => {
    const { email, setEmail } = useAuth();

  return (
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
  );
}; 
export default EmailInput;