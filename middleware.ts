export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/author", "/blogs/create", "/category/create"],
};
