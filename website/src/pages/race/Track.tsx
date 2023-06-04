import { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import { select, transition, easeLinear } from "d3";

import { Circuit, Driver, LapTimes } from "./data_types";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Typography,
} from "@mui/joy";

interface Marker {
  id: number;
  color: string;
  label: string;
}

interface TrackProps {
  driver: Driver;
  circuit: Circuit;
  markers: Marker[];
  lapTimes: LapTimes;
}

export const Track: React.FC<TrackProps> = ({
  markers,
  driver,
  circuit,
  lapTimes,
}) => {
  const trackWrapperRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef(new Map<number, SVGCircleElement | null>());
  const [pathRef, setPathRef] = useState<SVGPathElement | null>(null);

  // query dom for the path and store it in state
  // also add a circle for each driver
  useEffect(() => {
    const path = trackWrapperRef.current?.querySelector("path");
    if (path) {
      setPathRef(path);
    }

    const svg = trackWrapperRef.current?.querySelector("svg");
    if (svg) {
      // remove all the dots from the previous animation
      svg.querySelectorAll("circle").forEach((dot) => dot.remove());

      const path = svg.querySelector("path");
      if (!path) return;

      // Add a circle for each driver.
      markers.forEach((marker) => {
        const dot = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        dot.setAttribute("r", "20");
        dot.setAttribute("fill", marker.color);

        // Get the start point of the path.
        const pathStart = path.getPointAtLength(0);
        // Set the initial position of the dot to the start of the path using transform
        dot.setAttribute(
          "transform",
          `translate(${pathStart.x},${pathStart.y})`
        );

        svg.appendChild(dot);
        dotRefs.current.set(marker.id, dot);
      });
    }
  }, [trackWrapperRef, markers, dotRefs]);

  const totalLaps = Math.max(
    ...markers.map((marker) => lapTimes[marker.id]?.length ?? 0)
  );

  // number of ms to animate the slowest lap, the other lap times will be scaled to this
  const singleLapDuration = 4000;
  // Find the slowest lap time, (in ms)
  const slowestLapTime = Math.max(
    ...markers.map((marker) => lapTimes[marker.id]?.[0] ?? 60000)
  );
  // Calculate the scale factor based on the desired total animation duration
  const scaleFactor = slowestLapTime / singleLapDuration;

  const [lapData, setLapData] = useState<
    Record<number, { elapsedTime: number; currentLap: number }>
  >(() =>
    markers.reduce(
      (acc, { id }) => ({ ...acc, [id]: { elapsedTime: 0, currentLap: 0 } }),
      {}
    )
  );

  const [isAnimating, setIsAnimating] = useState(false);
  const [pausingAfterLap, setPausingAfterLap] = useState(false);

  const animateMarker = (marker: Marker) => {
    const dot = dotRefs.current.get(marker.id);
    const currentLap = lapData[marker.id]?.currentLap ?? 0;
    const lapTime = lapTimes[marker.id]?.[currentLap];

    if (!pathRef || !dot || !lapTime) return;

    const pathLength = pathRef.getTotalLength();
    const t = transition()
      .duration(lapTime / scaleFactor)
      .ease(easeLinear);

    select(dot)
      .transition(t)
      .attrTween("transform", () => (t: number) => {
        const point = pathRef.getPointAtLength(t * pathLength);
        return `translate(${point.x},${point.y})`;
      })
      .on("end", () => {
        setLapData((lapData) => ({
          ...lapData,
          [marker.id]: {
            ...lapData[marker.id],
            elapsedTime: (lapData[marker.id]?.elapsedTime ?? 0) + lapTime,
            currentLap: (lapData[marker.id]?.currentLap ?? 0) + 1,
          },
        }));

        // if all drivers have finished last lap, stop the the animation
        if (
          Object.values(lapData).some(
            (lapData) => lapData.currentLap === totalLaps - 1
          )
        ) {
          setIsAnimating(false);
        }
      });
  };

  // animate the markers when the lap data changes
  useEffect(() => {
    if (!isAnimating) return;

    // create set of current laps
    const currentLaps = new Set(
      Object.values(lapData).map((lapData) => lapData.currentLap)
    );

    // if all drivers are on the same lap, start the animation again
    if (currentLaps.size === 1) {
      markers.forEach(animateMarker);
    }
  }, [lapData]);

  // animate the markers when the animation state changes
  useEffect(() => {
    if (!isAnimating) return;

    markers.forEach(animateMarker);
  }, [isAnimating, markers]);

  return (
    <Box
      className="track_wrapper"
      ref={trackWrapperRef}
      display="flex"
      justifyContent="space-evenly"
      gap={4}
    >
      <Box sx={{ width: "30%" }}>
        <ReactSVG
          src={`https://raw.githubusercontent.com/f1laps/f1-track-vectors/main/f1_2020/${circuit.svg_url_suffix}.svg`}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{ width: "30%" }}
        gap={4}
      >
        <Button
          variant="soft"
          color="danger"
          onClick={(event) => {
            event.preventDefault();
            if (isAnimating) {
              setPausingAfterLap(true);
              setTimeout(() => setPausingAfterLap(false), 3000);
              setIsAnimating(false);
            } else {
              setIsAnimating(true);
            }
          }}
          loading={pausingAfterLap}
        >
          {isAnimating ? "Pause" : "Play"}
        </Button>
        <RaceInfo markers={markers} lapData={lapData} totalLaps={totalLaps} />
      </Box>
    </Box>
  );
};

const RaceInfo = (props: {
  markers: Marker[];
  lapData: Record<number, { elapsedTime: number; currentLap: number }>;
  totalLaps: number;
}) => {
  const { markers, lapData, totalLaps } = props;

  return (
    <Sheet variant="soft" sx={{ padding: "1em", borderRadius: "1em" }}>
      <Typography
        level="body1"
        textTransform="uppercase"
        fontWeight="lg"
        textAlign="center"
      >
        {`Lap ${
          Math.max(...Object.values(lapData).map((lap) => lap.currentLap), 0) +
          1
        } of ${totalLaps}`}
      </Typography>
      <List sx={{ padding: "5%" }}>
        <ListItem key={"header"}>
          <ListItemContent>
            <Typography level="body1" fontWeight="bold">
              Season
            </Typography>
          </ListItemContent>
          <Typography level="body1" textAlign="end">
            <b>Elapsed </b> Time | Lap
          </Typography>
        </ListItem>
        {Object.entries(lapData)
          .sort((a, b) => a[1].elapsedTime - b[1].elapsedTime)
          .map(([id, { elapsedTime, currentLap }]) => {
            const marker = markers.find((marker) => marker.id === +id)!;
            return (
              <ListItem key={id}>
                <ListItemDecorator>
                  <Box
                    sx={{
                      width: "1em",
                      height: "1em",
                      borderRadius: "1em",
                      backgroundColor: marker.color,
                    }}
                  />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography level="body1" fontWeight="bold">
                    {marker.label}
                  </Typography>
                </ListItemContent>
                <Typography level="body1">
                  {new Date(lapData[marker.id]?.elapsedTime ?? 0)
                    .toISOString()
                    .slice(11, -5)}{" "}
                  |{" "}
                  {(lapData[marker.id]?.currentLap ?? 0)
                    .toString()
                    .padStart(3, "0")}
                </Typography>
              </ListItem>
            );
          })}
      </List>
    </Sheet>
  );
};
