import { PageContainer, SideBar } from "../components/ui";
import LinkHome from "../components/LinkHome";
import MapArea from "../components/MapArea";
import CanvasContainer from "../components/CanvasContainer";

const rogainePage = () => {
  return (
    <PageContainer>
      <SideBar>
        <LinkHome />
      </SideBar>
      <MapArea>
        <CanvasContainer width={420} height={520}>
          <canvas width={420} height={520}></canvas>
        </CanvasContainer>
      </MapArea>
    </PageContainer>
  );
};

export default rogainePage;
