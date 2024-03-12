'use client';
import { useAuth } from "@/context/AuthContext";
const PasswordInput = () => {
    const { password, setPassword } = useAuth();

  return (
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
    </div>
  );
};

export default PasswordInput;
