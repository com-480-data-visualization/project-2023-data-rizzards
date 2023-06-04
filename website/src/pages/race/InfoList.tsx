import {
  Box,
  Checkbox,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Typography,
} from "@mui/joy";

import allResults from "../../data/race/results.json";
import allConstructors from "../../data/race/constructors.json";
import {
  Circuit,
  Constructor,
  Constructors,
  Driver,
  Result,
  Results,
} from "./data_types";
import { useEffect, useMemo, useState } from "react";

export interface InfoListProps {
  circuit: Circuit;
  driver: Driver;

  initialSelection: number[];
  onSelectionChange: (items: RaceItems) => void;
}

export type RaceItems = Array<
  Result & { colour: string; constructorName: string }
>;

export const InfoList: React.FC<InfoListProps> = ({
  circuit,
  driver,
  initialSelection,
  onSelectionChange: onItemsChange,
}) => {
  const races: RaceItems | null = useMemo(() => {
    // get all results for the selected driver and circuit
    const index = `(${driver.driverId}, ${circuit.circuitId})`;
    const results: Result[] | null = (allResults as Results)[index];

    const races: RaceItems | null = results?.map((race) => {
      const constructor: Constructor | null = (allConstructors as Constructors)[
        race.constructorId.toString()
      ];

      // generate a random colour for each race
      const colour = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`.padEnd(7, "0");

      return {
        ...race,
        constructorName: constructor?.name ?? "Unknown",
        colour,
      };
    });

    return races;
  }, [circuit, driver]);

  const [selectedItems, setSelectedItems] = useState<RaceItems>([]);

  useEffect(() => {
    onItemsChange(selectedItems ?? []);
  }, [selectedItems, onItemsChange]);

  console.log("rendering InfoList");
  return (
    // round the corners of the sheet
    <Sheet variant="soft" sx={{ padding: "1em", borderRadius: "1em" }}>
      {races == null ? (
        <Typography
          level="body1"
          textTransform="uppercase"
          fontWeight="lg"
          color="info"
        >
          {driver.name ?? "This driver"} {" has not raced at "}
          {circuit.name ?? "this circuit"}.
        </Typography>
      ) : (
        <>
          <Typography level="body1" textTransform="uppercase" fontWeight="lg">
            Seasons
          </Typography>
          <List sx={{ padding: "5%" }}>
            {races
              .sort((a, b) => a.year - b.year)
              .flatMap((item, index) => {
                const didSwitchTeams =
                  index !== 0 &&
                  item.constructorId !== races[index - 1].constructorId;
                return [
                  didSwitchTeams && (
                    <ListDivider key={`divider-${item.raceId}`}></ListDivider>
                  ),
                  <ListItem key={item.raceId}>
                    <ListItemDecorator>
                      {/* render a small circle with a fixed colour */}
                      <Box
                        sx={{
                          width: "1em",
                          height: "1em",
                          borderRadius: "1em",
                          backgroundColor: item.colour,
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
                          <Typography level="body3">Final Pos.</Typography>
                          &nbsp;
                          {item.position === "\\N"
                            ? "DNF"
                            : item.position.toString().padStart(2, "0")}
                        </Typography>
                      </Box>
                    </ListItemContent>
                    <Checkbox
                      defaultChecked={initialSelection.includes(item.year)}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setSelectedItems([...selectedItems, item]);
                        } else {
                          setSelectedItems(
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
  );
};
