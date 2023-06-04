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
      <Typography
            level="body1"
            fontSize="xl"
      >

          Welcome to our website, where you can discover and learn more about the exciting world of Formula 1.

          <br/><br/>

          Visit our dedicated page on drivers' performance which showcases the evolution of a given driver's performance over time.
          You can observe how drivers' rankings have changed over the years and compare their performance against other drivers.
          Explore the drivers' rankings across different years and their cumulative points, gaining valuable insights into their journey and achievements.
          <br/><br/>
          Immerse yourself in the thrilling world of Formula 1 with our animated race visualization.
          Select a track and driver to witness their performance across different seasons and years.
          Compare the performance of your favorite driver on the same track over multiple seasons.
          Experience the impact of car redesigns, or explore the performance of drivers who have changed teams.
          <br/><br/>
          Our transport visualization takes you on a global journey, showcasing the locations of circuits throughout the year.
          Watch an animated map display the position and country of each circuit, with travel animations guiding you through the season's race order.
          As the animations progress, you can observe the increasing number of kilometers traveled during the season.
          Choose your desired season to delve into the unique characteristics of each year.

      </Typography>
    </Box>
  );
};

export default Home;
