import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import React from "react";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: "4em",
      }}
    >
      <Typography level="display2">
        Visualizations for Formula-1 data
      </Typography>
      <Typography level="h3" textColor="text.secondary">
        Built for the COM-480 Data Visualization course at EPFL
      </Typography>
    </Box>
  );
};

export default Home;
