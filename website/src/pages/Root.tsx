import React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Home from "./home";
import { TabPanel } from "@mui/joy";
import Season from "./season";
import Driver from "./driver";
import Race from "./race";
import logo from "../assets/logo512.png";

const Root: React.FC = () => {
  return (
    <Tabs aria-label="tabs" defaultValue={"home"}>
      <TabList
        variant="plain"
        sx={{
          "--List-padding": "0px",
          "--List-radius": "0px",
          "--ListItem-minHeight": "48px",
          [`& .${tabClasses.root}`]: {
            boxShadow: "none",
            fontWeight: "md",
            [`&.${tabClasses.selected}::before`]: {
              content: '""',
              display: "block",
              position: "absolute",
              left: "0", // change to `0` to stretch to the edge.
              right: "0", // change to `0` to stretch to the edge.
              bottom: 0,
              height: 3,
              bgcolor: "primary.400",
            },
          },
        }}
      >
        <Tab value={"home"}>
          <img src={logo} alt="logo" height="48px" />
        </Tab>
        <Tab value={"driver"}>Driver</Tab>
        <Tab value={"race"}>Race</Tab>
        <Tab value={"season"}>Transport</Tab>
      </TabList>

      <TabPanel value="home">
        <Home />
      </TabPanel>
      <TabPanel value="season">
        <Season />
      </TabPanel>
      <TabPanel value="driver">
        <Driver />
      </TabPanel>
      <TabPanel value="race">
        <Race />
      </TabPanel>
    </Tabs>
  );
};

export default Root;
