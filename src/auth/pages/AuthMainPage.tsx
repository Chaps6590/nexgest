import { loginRequest, profileRequest, registerRequest, resendCodeRequest, verifyCodeRequest } from "@/api/auth";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export const AuthMainPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [awaitingVerification, setAwaitingVerification] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");
  const [needVerification, setNeedVerification] = useState(false);


  const navigate = useNavigate();

  const setToken = useAuthStore((state) => (state.setToken));
  const setProfile = useAuthStore((state) => state.setProfile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    if (awaitingVerification) {
      try {
        // Aquí haces la petición a tu endpoint de verificación
        const resVerify = await verifyCodeRequest(email, verificationCode);
        const token = resVerify.token;
        setToken(token);
        const resProfile = await profileRequest();
        setProfile(resProfile);
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Invalid code or verification failed.");
      }
      return;
    }

    if (isLogin) {

      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }

      try {
        const resLogin = await loginRequest(email, password);
        setToken(resLogin.token);
        const resProfile = await profileRequest();
        setProfile(resProfile);
        navigate("/");
      } catch (err: any) {
        console.error(err);
        // ⛔ si requiere verificación
        if (err.response?.data?.needVerification) {
          setAwaitingVerification(true);
          setNeedVerification(true);
        } else {
          alert("Login failed. Check your credentials.");
        }
      }

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
        await registerRequest(name, email, password);
        setAwaitingVerification(true);
      } catch (err) {
        console.error(err);
        alert("Registration failed. Try again.");
      }
    }


  };

  const handleResendCode = async () => {
    try {
      console.log("Verification code resent ✅")
      setNeedVerification(false)
      const response = await resendCodeRequest(email)

      console.log(response)
      if (response.ok) {
        alert("Verification code resent ✅");
      } else {
        alert("Error resending code");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-[#050505]">
      <div className="bg-black p-8 rounded-xl shadow-lg w-full max-w-sm backdrop-white">
        {/* Título dinámico */}
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Botones tipo pestaña */}
        <div className="flex bg-gray-200 rounded-full p-1 mb-6">
          <button
            onClick={() => {
              if (!awaitingVerification) setIsLogin(true);
            }}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors ${isLogin
              ? "bg-gradient-to-r from-blue-600 to-cyan-400 text-white"
              : "text-gray-700"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              if (!awaitingVerification) setIsLogin(false);
            }}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors ${!isLogin
              ? "bg-gradient-to-r from-blue-600 to-cyan-400 text-white"
              : "text-gray-700"
              }`}
          >
            Signup
          </button>
        </div>

        {/* Formulario dinámico */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {awaitingVerification ? (
            <>
              <p className="text-white text-sm">
                We’ve sent a verification code to <strong>{email}</strong>. Please enter it below:
              </p>
              <div className="flex justify-center text-white">
                <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={(value) => setVerificationCode(value)}
                    className="flex justify-center text-white"
                  >
                    <InputOTPGroup>
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="text-white bg-transparent border-gray-500 focus:border-blue-400 text-2xl"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>

                </div>
              
              <button
                type="submit"
                className="w-full py-2 mt-2 text-white rounded-full bg-gradient-to-r from-blue-800 to-blue-400 hover:opacity-90 transition"
              >
                Verify Account
              </button>

              {needVerification && (
                <div className="text-sm text-white text-center mt-2">
                  Didn’t get the code?{" "}
                  <button onClick={handleResendCode} className="text-blue-400 underline ml-1">
                    Resend code
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-50 placeholder-gray-400"
                />
              )}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-50 placeholder-gray-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-50 placeholder-gray-400"
              />
              {!isLogin && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-50 placeholder-gray-400"
                />
              )}
              {isLogin && (
                <div className="text-right text-sm text-white">
                  <a href="#">Forgot password?</a>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2 mt-2 text-white rounded-full bg-gradient-to-r from-blue-800 to-blue-400 hover:opacity-90 transition"
              >
                {isLogin ? "Login" : "Signup"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

