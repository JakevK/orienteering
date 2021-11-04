import styled from "styled-components";

const StyledImg = styled.img`
  width: ${(props) => props.width};
`;

const Logo = ({ width }) => (
  <StyledImg src={process.env.PUBLIC_URL + "/images/logo.png"} width={width} />
);

export default Logo;
