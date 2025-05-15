import axiosIntance from "../libs/axios";

export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await axiosIntance.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};


export const profileRequest = async () => {
  try {
      const response = await axiosIntance.get("/profile")
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
}

export const registerRequest = async (name: string, email: string, password: string) => {

  console.log("registerRequest", name, email, password);

  const res = await axiosIntance.post('/register', { name, email, password });
  return res.data;
};