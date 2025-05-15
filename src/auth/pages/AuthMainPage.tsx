import { loginRequest, profileRequest, registerRequest } from "@/api/auth";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthMainPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const setToken = useAuthStore((state) => (state.setToken));
  const setProfile = useAuthStore((state) => state.setProfile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí podrías llamar a tu función de login/signup
    if (isLogin) {
      // Validar el email y la contraseña
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }
      // Aquí podrías llamar a tu función de login
      const resLogin = await loginRequest(email, password)
      setToken(resLogin.token);

      const resProfile = await profileRequest()
      setProfile(resProfile);

      navigate("/"); // ← redirigís a la ruta principal
    } else {
      
      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Invalid email format");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const resRegister = await registerRequest(name, email, password);
        setToken(resRegister.token); // si el backend devuelve token
        console.log("Register",resRegister);
        const resProfile = await profileRequest();
        setProfile(resProfile);    
        
        navigate("/"); // ← redirigís a la ruta principal
      } catch (err) {
        console.error(err);
        alert("Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#fafafa] p-8 rounded-xl shadow-lg w-full max-w-sm">
        {/* Título dinámico */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Botones tipo pestaña */}
        <div className="flex bg-gray-200 rounded-full p-1 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors ${isLogin
                ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white"
                : "text-gray-700"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors ${!isLogin
                ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white"
                : "text-gray-700"
              }`}
          >
            Signup
          </button>
        </div>

        {/* Formulario dinámico */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          )}

          {isLogin && (
            <div className="text-right text-sm text-purple-500">
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 mt-2 text-white rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:opacity-90 transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-2">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-purple-500 underline"
                >
                  Signup now
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-purple-500 underline"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

