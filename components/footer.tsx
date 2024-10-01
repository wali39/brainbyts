import { MdCopyright } from "react-icons/md";

const Footer = () => {
  return (
    <div className="text-center  px-4 py-7 flex justify-center items-center gap-x-2  mb mt-10">
      <MdCopyright size={20} /> 2024 All rights reserved |
      <p>
        Developed by &nbsp;
        <a href="https://github.com/wali39" target="_blank">
          Wali Ullah
        </a>
      </p>
    </div>
  );
};

export default Footer;
