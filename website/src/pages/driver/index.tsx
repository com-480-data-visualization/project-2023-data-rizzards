import React from "react";
import { ResponsiveBump } from "@nivo/bump";
import Box from "@mui/joy/Box";
import { Typography } from "@mui/joy";

const Driver: React.FC = () => {
  const data = [
    {
      id: "Serie 1",
      data: [
        {
          x: 2000,
          y: 2,
        },
        {
          x: 2001,
          y: 3,
        },
        {
          x: 2002,
          y: 4,
        },
      ],
    },
  ];
  return (
    <Box
      display="grid"
      gridTemplateRows="1fr 5fr"
      gridTemplateAreas={`"para"
    "plot"`}
    >
      <Box gridArea="para" padding="2em">
        <Typography level="h2">Driver page</Typography>
        <Typography level="body1">Lorem ipsum...</Typography>
      </Box>
      <Box gridArea="plot" padding="3em" height="360px">
        <ResponsiveBump data={data} />
      </Box>
    </Box>
  );
};

export default Driver;
