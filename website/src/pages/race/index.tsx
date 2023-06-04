import React, { useCallback, useMemo, useState } from "react";
import Typography from "@mui/joy/Typography";
import {
  Autocomplete,
  AutocompleteOption,
  Box,
  Button,
  Checkbox,
  FormLabel,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Sheet,
} from "@mui/joy";
import { Track } from "./Track";

import circuits from "../../data/race/circuits.json";
import drivers from "../../data/race/drivers.json";
import allResults from "../../data/race/results.json";
import allLapTimes from "../../data/race/lap_times.json";
import {
  Circuit,
  Circuits,
  Driver,
  Drivers,
  LapTimes,
  RawLapTimes,
  Result,
  Results,
} from "./data_types";
import { ErrorBoundary } from "../../components/ErrorBoundary";

const Race: React.FC = () => {
  const [selectedCircuit, setSelectedCircuit] = useState<Circuit | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedItems, setSelectedItems] = useState<Result[]>([]);

  const races: Results = allResults as Results;

  const lapTimes: LapTimes = useMemo(() => {
    if (!selectedDriver || !selectedItems) return {};

    const filteredData: LapTimes = {};
    for (const item of selectedItems) {
      const index = `(${selectedDriver.driverId}, ${item.raceId})`;
      const dataItem = (allLapTimes as RawLapTimes)[index];
      if (dataItem) {
        filteredData[item.raceId] = dataItem.milliseconds;
      }
    }
    return filteredData;
  }, [selectedItems, selectedDriver]);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // This function will ensure all states are updated before the component rerenders
  const setPresetData = useCallback(
    async (
      driverCode: string,
      circuitLocation: string,
      raceYears: number[]
    ) => {
      const circuit = circuits.find(
        (circuit) => circuit.location === circuitLocation
      )!;
      setSelectedCircuit((_) => circuit);

      const driver = drivers.find((driver) => driver.code === driverCode)!;
      setSelectedDriver(() => driver);

      const items = races[`(${driver.driverId}, ${circuit.circuitId})`].filter(
        (race) => raceYears.includes(race.year)
      );
      setSelectedItems((_) => items);

      setIsDataLoaded(true);
    },
    [circuits, drivers, races]
  );

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
                    setPresetData("HAM", "Silverstone", [2021, 2022]);
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
                <Button
                  variant="soft"
                  color="danger"
                  onClick={(event) => {
                    event.preventDefault();
                    setPresetData("RIC", "Budapest", [2018, 2019, 2021]);
                  }}
                >
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
                <Button
                  variant="soft"
                  color="danger"
                  onClick={(event) => {
                    event.preventDefault();
                    setPresetData("LEC", "Abu Dhabi", [2019, 2020, 2021]);
                  }}
                >
                  VIEW
                </Button>
              </ListItem>
            </List>
          </Typography>
          <Typography level="body2" textAlign="center">
            <i>
              You might need to click the button a few times to get the
              animation to start properly.
            </i>
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
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <Box sx={{ width: "25%" }}>
          {selectedCircuit && selectedDriver && (
            <Sheet variant="soft" sx={{ padding: "1em", borderRadius: "1em" }}>
              {races == null ? (
                <Typography
                  level="body1"
                  textTransform="uppercase"
                  fontWeight="lg"
                  color="info"
                >
                  {selectedDriver.name ?? "This driver"} {" has not raced at "}
                  {selectedCircuit.name ?? "this circuit"}.
                </Typography>
              ) : (
                <>
                  <Typography
                    level="body1"
                    textTransform="uppercase"
                    fontWeight="lg"
                  >
                    Seasons
                  </Typography>
                  <List sx={{ padding: "5%" }}>
                    {races[
                      `(${selectedDriver.driverId}, ${selectedCircuit.circuitId})`
                    ]
                      .sort((a, b) => a.year - b.year)
                      .flatMap((item, index) => {
                        const didSwitchTeams =
                          index !== 0 &&
                          item.constructorName !==
                            races[
                              `(${selectedDriver.driverId}, ${selectedCircuit.circuitId})`
                            ][index - 1].constructorName;
                        return [
                          didSwitchTeams && (
                            <ListDivider
                              key={`divider-${item.raceId}`}
                            ></ListDivider>
                          ),
                          <ListItem key={item.raceId}>
                            <ListItemDecorator>
                              {/* render a small circle with a fixed colour */}
                              <Box
                                sx={{
                                  width: "1em",
                                  height: "1em",
                                  borderRadius: "1em",
                                  backgroundColor: item.color,
                                }}
                              />
                            </ListItemDecorator>
                            <ListItemContent>
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                paddingRight="1em"
                              >
                                <Typography level="body1" textAlign="left">
                                  {item.year}&nbsp;{item.constructorName}
                                </Typography>
                                <Typography level="body2" textAlign="end">
                                  <Typography level="body3">
                                    Final Pos.
                                  </Typography>
                                  &nbsp;
                                  {item.position === "\\N"
                                    ? "DNF"
                                    : item.position.toString().padStart(2, "0")}
                                </Typography>
                              </Box>
                            </ListItemContent>
                            <Checkbox
                              checked={selectedItems.some(
                                (selectedItem) =>
                                  selectedItem.raceId === item.raceId
                              )}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setSelectedItems((selectedItems) => [
                                    ...selectedItems,
                                    item,
                                  ]);
                                } else {
                                  setSelectedItems((selectedItems) =>
                                    selectedItems.filter(
                                      (selectedItem) =>
                                        selectedItem.raceId !== item.raceId
                                    )
                                  );
                                }
                              }}
                            />
                          </ListItem>,
                        ];
                      })}
                  </List>
                </>
              )}
            </Sheet>
          )}
        </Box>
        <Box sx={{ width: "70%" }}>
          <ErrorBoundary>
            {selectedDriver &&
              selectedCircuit &&
              selectedItems &&
              isDataLoaded && (
                <Track
                  key={`${selectedDriver.driverId}-${
                    selectedCircuit.circuitId
                  }-${selectedItems.map((item) => item.raceId).join("-")}`}
                  driver={selectedDriver}
                  circuit={selectedCircuit}
                  markers={selectedItems.map((item) => ({
                    color: item.color,
                    label: `${item.year.toString()} ${item.constructorName}`,
                    id: item.raceId,
                  }))}
                  lapTimes={lapTimes}
                />
              )}
          </ErrorBoundary>
        </Box>
      </Box>
    </Box>
  );
};

export default Race;
