import styled from "styled-components";

const CanvasContainer = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
export default CanvasContainer;
