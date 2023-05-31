import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import React from "react";
import GlobePlot from "./GlobePlot";

const Season: React.FC = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr "
      gridTemplateRows="1fr 1fr 8fr"
      gridTemplateAreas={`"para"
        "inputs"
        "plot"`}
      gap={4}
    >
      <Box gridArea="para" padding="2em">
        {PageExplanation}
      </Box>

      <Box
        gridArea="inputs"
        display="flex"
        justifyContent="space-evenly"
        alignItems="end"
      ></Box>

      <Box
        gridArea="plot"
        display="flex"
        justifyContent="space-evenly"
        padding="3em"
      >
        <GlobePlot />
      </Box>
    </Box>
  );
};

export default Season;

const PageExplanation = (
  <>
    <Typography level="h2" sx={{ textAlign: "center" }}>
      Logistics of an F1 Season
    </Typography>
    <br />
    <Typography level="body1"> Explain how to use this page </Typography>
  </>
);
