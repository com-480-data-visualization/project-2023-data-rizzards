import { Stack } from "@mui/joy";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/joy/styles";
import { useEffect, useRef, useState } from "react";
import { svgPathProperties } from "svg-path-properties";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 10,
  color: theme.vars.palette.text.secondary,
}));

const Race: React.FC = () => {
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      <Box gridColumn="span 4">
        <Stack spacing={2}>
          <Item variant="outlined">
            <Typography level="h1" fontSize="md">
              Race: Brazil 2013
            </Typography>
            <Divider />
            <Typography level="body1">
              Interlagos
              <br />
              24 July
            </Typography>
          </Item>
          <Item variant="outlined">
            <Typography
              id="decorated-list-demo"
              level="body3"
              textTransform="uppercase"
              fontWeight="lg"
              mb={1}
            >
              Drivers
            </Typography>
            <List
              aria-labelledby="decorated-list-demo"
              sx={{ "--ListItemDecorator-size": "32px" }}
            >
              <ListItem>
                <ListItemDecorator>
                  <svg width="10" height="10">
                    <circle cx="5" cy="5" r="5" fill="red" />
                  </svg>
                </ListItemDecorator>
                John Doe
              </ListItem>
            </List>
          </Item>
        </Stack>
      </Box>
      <Box
        gridColumn="span 8"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Track />
      </Box>
    </Box>
  );
};

const Track = () => {
  const [progress, setProgress] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const lapTime = 10000; // 10 seconds in milliseconds

  useEffect(() => {
    if (pathRef.current && dotRef.current) {
      const pathProperties = new svgPathProperties(
        pathRef.current.getAttribute("d") || ""
      );
      const pathLength = pathProperties.getTotalLength();

      const updateDotPosition = () => {
        const { x, y } = pathProperties.getPropertiesAtLength(
          progress * pathLength
        );
        if (dotRef.current) {
          dotRef.current.setAttribute("cx", x.toString());
          dotRef.current.setAttribute("cy", y.toString());
        }
      };

      updateDotPosition();

      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + 1 / lapTime;
          if (nextProgress >= 1) {
            return 0;
          }
          return nextProgress;
        });
      }, 1);

      return () => clearInterval(interval);
    }
  }, [progress, lapTime]);

  useEffect(() => {
    if (progress > 0 && pathRef.current && dotRef.current) {
      const pathProperties = new svgPathProperties(
        pathRef.current.getAttribute("d") || ""
      );
      const pathLength = pathProperties.getTotalLength();
      const { x, y } = pathProperties.getPropertiesAtLength(
        progress * pathLength
      );
      dotRef.current.setAttribute("cx", x.toString());
      dotRef.current.setAttribute("cy", y.toString());
    }
  }, [progress]);

  return (
    <Item>
      <svg viewBox="0 0 800 400" width="600">
        <path
          ref={pathRef}
          // Replace with your track's SVG path
          d="M21.6,617.3c6.8-135,11.8-270.3,17.4-405.4c1.7-41.7,3.7-83.8,5-125.4  C46,65,43.4,42.6,49,21.6c3.7-12.8,18.5-17.2,29.1-9.1c9.2,9.2,17,20.3,27.4,28.2c13.9,9.4,31.8,13.6,48.2,9.1  c16.1-2.3,31.5-10,47.4-14.1c32.8-7.6,66.2,0.8,98.9,5.8c83.6,16.7,167.7,32.1,251.7,47.4c26.7,5.2,53.8,10.3,80.6,15  c37,5.2,58.9,21.1,41.5,60.6c-7.5,19.1-27.4,28-43.2,39c-17,9.4-32,22.8-45.7,36.6c-14.8,16.4-31.3,32.7-41.5,52.3  c-12.1,18.3-19.9,40.3-39,52.3c-43.9,29.4-71.8-8.7-123.8,24.9c-19.8,13.6-34.6,32.7-47.4,52.3c-13.6,20.1-44.7,92.3-73.9,76.4  c-23.6-15.1-12.7-46.1-8.3-68.1c6.2-26.6,13.9-53.1,17.4-79.8c8.1-49.4,25.8-100.9,10-149.5c-8.1-21.1-30.5-57.1-56.5-45.7  c-11.1,11-10.1,28.5-12.5,42.4c-8.3,62.6-11.9,125.7-14.1,188.6c-3.1,77.7-5.5,155.5-10,232.6c-1.8,20.8-2.3,42-3.3,62.3  c-2.3,21.5-1.9,46.9,15.8,61.5c34.4,27.1,85.6,10.2,111.3-20.8c30.1-37.5,32.3-92.2,70.6-123c42.7-39,103.2-33.7,151.2-9.1  c25,12,53.3,23.3,69,46.6c16,23.6,10.1,53.8-10.9,71.4c-21.2,16.5-46.8,25.5-69,39c-54.7,29.8-108.8,60.4-162.8,89.7  c-68.1,38.2-136.2,76.1-203.5,113.8c-18.5,9.5-35.9,20.2-53.2,29.9c-15.6,8.8-31.9,19.3-49.8,14.9c-59.3-18.6-39.3-119.6-39.8-167  C14.5,757.4,15.3,687.5,21.6,617.3z"
          fill="none"
          stroke="black"
        />
        <circle ref={dotRef} r="5" fill="red" />
      </svg>
    </Item>
  );
};
export default Race;
