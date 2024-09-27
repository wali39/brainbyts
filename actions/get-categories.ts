import { db } from "@/lib/db";
import axios from "axios";
const baseUrl = process.env.BASE_URL;

const getCategories = async () => {
  try {
    const categories = await axios.get(`${baseUrl}/api/blogs/categories`);
    return categories.data;
  } catch (error) {
    return [];
  }
};

export default getCategories;
