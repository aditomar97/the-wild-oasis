import styled from "styled-components";
import img from "../data/img/logo-light.png";
import img1 from "../data/img/logo-dark.png";
import { useDarkMode } from "../context/DarkModeContext";
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? img1 : img;
  return (
    <StyledLogo>
      <Img src={img} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
