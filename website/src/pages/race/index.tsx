import React, { useMemo, useState } from "react";
import Typography from "@mui/joy/Typography";
import {
  Autocomplete,
  AutocompleteOption,
  Box,
  Button,
  FormLabel,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import { Track } from "./Track";

import circuits from "../../data/race/circuits.json";
import drivers from "../../data/race/drivers.json";
import allLapTimes from "../../data/race/lap_times.json";
import {
  Circuit,
  Circuits,
  Driver,
  Drivers,
  LapTimes,
  RawLapTimes,
} from "./data_types";
import { InfoList, RaceItems } from "./InfoList";

import "./index.css";

const Race: React.FC = () => {
  const [selectedCircuit, setSelectedCircuit] = useState<Circuit | null>();
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>();
  const [initialSelectedYears, setInitialSelectedYears] = useState<number[]>(
    []
  );
  const [items, setItems] = useState<RaceItems>();

  const lapTimes: LapTimes = useMemo(() => {
    if (!selectedDriver || !items) return {};

    const filteredData: LapTimes = {};
    for (const item of items) {
      const index = `(${selectedDriver.driverId}, ${item.raceId})`;
      const dataItem = (allLapTimes as RawLapTimes)[index];
      if (dataItem) {
        filteredData[item.raceId] = dataItem.milliseconds;
      }
    }
    return filteredData;
  }, [items, selectedDriver]);

  console.log("rendering race page");
  // make a grid using CSS grid, with 2 columns and 2 rows.
  // the first row is for the inputs, the second row is for the driver-list and track.
  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr"
      gridTemplateRows="6fr 1fr 4sfr"
      gridTemplateAreas={`"para" 
      "inputs"
      "vis"`}
      gap="4em"
      sx={{ padding: "2em" }}
    >
      <Box
        gridArea="para"
        padding="2em 20% 2em 20%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Typography level="h2" sx={{ textAlign: "center" }}>
            Visualizing driver's performance over the years
          </Typography>
          <br />
          <Typography
            level="body1"
            fontSize="xl"
            variant="outlined"
            sx={{
              borderRadius: "1em",
              padding: "1em",
            }}
          >
            <b>Formula 1</b> races mostly occur on the same few tracks every
            year. However, the performance of the drivers on the same track can
            vary from year to year. <br />
            This difference in performance can be due to a number of factors
            such as the weather, changes to the car, improvements/degradations
            in the driver's skill, etc. <br />
            This page allows you to select a driver and a track and see the
            relative difference in the driver's performance over different
            seasons. <br />{" "}
          </Typography>
          <br />
          <Typography
            level="body1"
            fontSize="l"
            variant="outlined"
            sx={{
              borderRadius: "1em",
              padding: "1em",
            }}
          >
            <Typography level="h4">Interesting examples</Typography>
            <List>
              <ListItem>
                <ListItemDecorator>
                  <Typography level="h4">1. </Typography>
                </ListItemDecorator>
                <ListItemContent>
                  In the 2022 season, there was a complete overhaul of the car
                  design regulations. <br />
                  The new car was smaller, with simplified front and rear wings.
                  Teams were also re-allowed to use ground effect aerodynamics.{" "}
                  <br />
                  This resulted in a complete shakeup of the grid, with the top
                  team from the previous season, Mercedes, and their lead
                  driver, Lewis Hamilton, taking a bit hit. <br />
                </ListItemContent>
                <Button
                  variant="soft"
                  color="danger"
                  onClick={(event) => {
                    event.preventDefault();
                    setSelectedCircuit(
                      circuits.find(
                        (circuit) => circuit.location === "Silverstone"
                      )
                    );
                    setSelectedDriver(
                      drivers.find((driver) => driver.code === "HAM")
                    );
                    setInitialSelectedYears([2021, 2022]);
                  }}
                >
                  VIEW
                </Button>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Typography level="h4">2. </Typography>
                </ListItemDecorator>
                <ListItemContent>
                  8-time Grand Prix winner, Daniel Ricciardo, is a very popular
                  driver in the paddock. <br /> In the 2019 season, he switched
                  teams from Red Bull Racing to new-comers Renault. In the 2021
                  season, he switched teams again, this time to McLaren. <br />{" "}
                  The pundits argue that the switch to Renault was a mistake,
                  while the switch to McLaren was a good move. <br /> We can
                  validate this claim by looking at his performance on the same
                  tracks while in different teams. <br />
                </ListItemContent>
                <Button variant="soft" color="danger">
                  VIEW
                </Button>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Typography level="h4">3. </Typography>
                </ListItemDecorator>
                <ListItemContent>
                  Charles Leclerc is a young driver who has been touted as the
                  next big thing in Formula 1. In the 2019 season, he was signed
                  by Ferrari, one of the top teams in the sport. <br /> He has
                  consistently gaining the admiration of the fans and the
                  respect of the paddock. <br />
                  We can visualize the change in his performance during the
                  2019-2021 seasons, while he was driving a relatively similar
                  car. <br />
                </ListItemContent>
                <Button variant="soft" color="danger">
                  VIEW
                </Button>
              </ListItem>
            </List>
          </Typography>
        </Box>
      </Box>
      {/* items inside this grid should be stacked horizontally */}
      <Box
        gridArea="inputs"
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
        gap={4}
      >
        <Box sx={{ width: "30%" }}>
          <FormLabel>Circuit</FormLabel>
          <Autocomplete
            placeholder="Select a circuit"
            value={selectedCircuit}
            onChange={(_, newValue) => {
              setSelectedCircuit(newValue);
            }}
            options={circuits as Circuits}
            getOptionLabel={(option) => `${option.name}, ${option.country}`}
            isOptionEqualToValue={(option, value) =>
              option.circuitId === value.circuitId
            }
            renderOption={(props, option) => (
              <AutocompleteOption {...props}>
                <ListItemContent sx={{ fontSize: "sm" }}>
                  {option.location}, {option.country}
                  <Typography level="body3">{option.name}</Typography>
                </ListItemContent>
              </AutocompleteOption>
            )}
          />
        </Box>

        <Box sx={{ width: "30%" }}>
          <FormLabel>Driver</FormLabel>
          <Autocomplete
            placeholder="Select a driver"
            value={selectedDriver}
            onChange={(_, newValue) => {
              setSelectedDriver(newValue);
            }}
            options={drivers as Drivers}
            getOptionLabel={(option) => `${option.name}`}
            isOptionEqualToValue={(option, value) =>
              option.driverId === value.driverId
            }
            renderOption={(props, option) => (
              <AutocompleteOption {...props}>
                <ListItemContent sx={{ fontSize: "sm" }}>
                  {option.name}
                  <Typography level="body3">
                    {option.code}&nbsp; #{option.number}
                  </Typography>
                </ListItemContent>
              </AutocompleteOption>
            )}
          />
        </Box>
      </Box>
      <Box
        gridArea="vis"
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Box sx={{ width: "20%" }}>
          {selectedCircuit && selectedDriver && (
            <InfoList
              initialSelection={initialSelectedYears}
              circuit={selectedCircuit}
              driver={selectedDriver}
              onSelectionChange={(items) => setItems(items)}
            />
          )}
        </Box>
        <Box sx={{ width: "60%" }}>
          {selectedDriver && selectedCircuit && items && (
            <Track
              driver={selectedDriver}
              circuit={selectedCircuit}
              markers={items.map((item) => ({
                color: item.colour,
                label: item.year.toString(),
                id: item.raceId,
              }))}
              lapTimes={lapTimes}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Race;
