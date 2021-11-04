import styled from "styled-components";

const BlurredBackground = styled.div`
  background-image: url("${(props) => props.image}");
  filter: blur(10px);
  position: fixed;
  top: -80%;
  left: -50%;
  width: 200%;
  height: 200%;
  z-index: -1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default BlurredBackground;
