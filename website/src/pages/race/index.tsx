import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Track, TrackProps } from "./Track";
import Autocomplete from "@mui/joy/Autocomplete";
import {
  Checkbox,
  FormLabel,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";

const Race: React.FC = () => {
  const header = (str: string) => <Typography level="h4">{str}</Typography>;

  const trackProps: TrackProps = {
    items: [
      { name: "2016", colour: "#FFAABB" },
      { name: "2017", colour: "#FFEE22" },
      { name: "2018", colour: "#CC8800" },
      { name: "2019", colour: "#AA1234" },
      { name: "2020", colour: "#FFC107" },
      { name: "2021", colour: "#FEBA43" },
    ],
  };

  // make a grid using CSS grid, with 2 columns and 2 rows.
  // the first row is for the inputs, the second row is for the driver-list and track.
  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr 2fr"
      gridTemplateRows="2fr 1fr 4sfr"
      gridTemplateAreas={`"para para" 
      "inputs inputs"
      "list track"`}
      gap={4}
    >
      <Box gridArea="para" padding="2em">
        {PageExplanation}
      </Box>
      {/* items inside this grid should be stacked horizontally */}
      <Box
        gridArea="inputs"
        display="flex"
        justifyContent="space-evenly"
        alignItems="end"
      >
        <Box sx={{ width: "30%" }}>
          <FormLabel>Track</FormLabel>
          <Autocomplete placeholder="Track" options={["Brazil", "Monaco"]} />
        </Box>
        {header("→")}

        <Box sx={{ width: "30%" }}>
          <FormLabel>Season</FormLabel>
          <Autocomplete
            disabled
            placeholder="Year"
            options={["2020", "2021"]}
          />
        </Box>
        {header("||")}
        <Box sx={{ width: "30%" }}>
          <FormLabel>Driver</FormLabel>
          <Autocomplete
            placeholder="Driver"
            options={["Alonso", "Hamiltons"]}
          />
        </Box>
      </Box>
      <Box
        gridArea="list"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
      >
        <Sheet variant="soft" sx={{ padding: "1em" }}>
          <Typography level="body1" textTransform="uppercase" fontWeight="lg">
            Years
          </Typography>
          <List sx={{ padding: "5%" }}>
            {trackProps.items.map(({ name, colour }) => (
              <ListItem>
                <ListItemDecorator>
                  {/* render a small circle with a fixed colour */}
                  <Box
                    sx={{
                      width: "1em",
                      height: "1em",
                      borderRadius: "50%",
                      backgroundColor: colour,
                      marginRight: "1em",
                    }}
                  />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography level="body1">{name}</Typography>
                </ListItemContent>
                <Checkbox />
              </ListItem>
            ))}
          </List>
        </Sheet>
      </Box>
      <Box
        gridArea="track"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Track {...trackProps} />
      </Box>
    </Box>
  );
};

export default Race;

const PageExplanation = (
  <>
    <Typography level="h2" sx={{ textAlign: "center" }}>
      Visualizing driver's performance over the years
    </Typography>
    <br />
    <Typography level="body1"> Explain how to use this page </Typography>
  </>
);
