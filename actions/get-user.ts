import axios from "axios";
export const getUser = async (id: string) => {
  try {
    const res = await axios.get(`${process.env.BASE_URL}/api/user/${id}`);
    return res.data;
  } catch (error) {
    console.log("GET_USER", error);
    return {
      name: "",
      email: "",
      role: "",
      bio: "",
      imageUrl: "",
      publicId: "",
    };
  }
};
