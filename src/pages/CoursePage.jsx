import { useState } from "react";
import BlurredBackground from "../components/BlurredBackground";
import RadioMenu from "../components/RadioMenu";
import { SideBar, PageContainer } from "../components/ui";
import Map from "../components/Map";
import LinkHome from "../components/LinkHome";
import Button from "react-bootstrap/Button";

const splitFrequencies = (s) =>
  s.map((f) => ({ frequency: f[0], strength: f[1] }));
const mapLocations = [
  {
    name: "forest",
    vegetations: [
      [0.05, 0.09],
      [0.015, 0.5],
      [0.01, 0.4],
    ],
    heights: [
      [0.05, 0.06],
      [0.015, 0.5],
      [0.002, 0.34],
    ],
  },
  {
    name: "farmland",
    vegetations: [
      [0.05, 0.09],
      [0.015, 0.5],
      [0.01, 0.8],
    ],
    heights: [
      [0.05, 0.02],
      [0.015, 0.03],
      [0.005, 1.2],
    ],
  },
].map((location) => ({
  ...location,
  vegetations: splitFrequencies(location.vegetations),
  heights: splitFrequencies(location.heights),
}));

const CoursePage = () => {
  const [locationIndex, setLocationIndex] = useState(0);
  const [reload, setReload] = useState(false);

  return (
    <>
      <BlurredBackground
        image={
          process.env.PUBLIC_URL +
          "/images/backdrops/" +
          mapLocations[locationIndex].name +
          ".jpg"
        }
      ></BlurredBackground>

      <PageContainer>
        <SideBar>
          <LinkHome />
          <hr />
          <RadioMenu
            title="map location"
            options={mapLocations.map((location, i) => ({
              label: location.name,
              onSelect: () => setLocationIndex(i),
            }))}
            defaultIndex={locationIndex}
          />
          <Button variant="primary" onClick={() => setReload(!reload)}>
            generate again
          </Button>
        </SideBar>
        <Map
          location={mapLocations[locationIndex]}
          width={400}
          height={500}
          reload={reload}
        />
      </PageContainer>
    </>
  );
};

export default CoursePage;
