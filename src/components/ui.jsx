import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-around;
  width: 100%;
  height: 100vh;
`;

const SideBar = styled.div`
  background-color: #f8fcf8;
  max-width: 300px;
  width: 30%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
`;

export { SideBar, PageContainer };
