import { useTheme } from "next-themes";

import { Button } from "antd";

import { RiMoonLine, RiSunLine } from "react-icons/ri";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      shape="circle"
      className="icon_button"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme == "light" ? <RiMoonLine /> : <RiSunLine />}
    </Button>
  );
};

export default DarkModeToggle;
