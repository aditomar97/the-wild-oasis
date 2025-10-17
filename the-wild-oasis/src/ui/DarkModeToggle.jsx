import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToogle() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  const handleToogle = () => {
    setIsDarkMode((isDark) => !isDark);
  };
  return (
    <ButtonIcon onClick={handleToogle}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkModeToogle;
