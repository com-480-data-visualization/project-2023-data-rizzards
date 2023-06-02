import React from "react";
import {useState} from "react";
import Box from "@mui/joy/Box";
import Button from '@mui/joy/Button';
import {Checkbox, FormLabel, ListItemContent, ListItemDecorator} from "@mui/joy";
import Autocomplete from "@mui/joy/Autocomplete";
import {Typography} from "@mui/joy";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";
import {MyResponsiveAreaBump} from "./MyResponsiveAreaBump";
import {MyResponsiveBump} from "./MyResponsiveBump";
import data_rank from "../../data/data_rank.json";
import data_points from "../../data/data_points.json";
import driver_teammates from "../../data/driver_teammates.json";

const Driver: React.FC = () => {

    const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(2022);
    const [selectedYearRange, setSelectedYearRange] = useState<number[]>(Array.from({ length: 2022 - 1950 + 1 }, (_, i) => 1950 + i));

    //const year_list = data_points.map(item => item.year).sort((a, b) => b - a);
    const name_list = data_rank.map(item => item.id);

    function updateSelectedYearRange (drivers: string[]) {
        const yearRange = new Set(
            data_rank
                .filter((item) => drivers.includes(item.id))
                .flatMap((item) =>
                    item.data
                        .filter((item) => item.y != null)
                        .map((item) => {
                    return item.x
                }))
        );

        console.log('yearRange',yearRange);
        setSelectedYearRange(Array.from(yearRange).sort());
        console.log('selectedYearRange',selectedYearRange)
    }

    function handleDriverSelectChange (event: React.ChangeEvent<{}>, value: string | null) {
        console.log('The driver was selected: ', value);
        if (value !== null && !selectedDrivers.includes(value)) {
            setSelectedDrivers([...selectedDrivers, value]);
            updateSelectedYearRange([...selectedDrivers, value]);
        }
        console.log('The drivers selected are now: ', selectedDrivers);
    };

    function handleClickReset () {
        console.log('The Reset button was clicked.');
        setSelectedDrivers([]);
        console.log('The drivers selected are now: ', selectedDrivers);
    };

    function handleClickCheckbox(driver: string) {
        console.log('The Checkbox of ', driver, ' was clicked.');
        if (selectedDrivers.length === 0) {
            console.log('Cannot remove the last driver.');
            return;
        }
        const updatedSelectedDrivers = selectedDrivers.filter((item) => item !== driver);

        setSelectedDrivers(updatedSelectedDrivers);
        console.log('The drivers selected are now: ', updatedSelectedDrivers);
        updateSelectedYearRange(updatedSelectedDrivers);
    };


    function handleClickTeammates(driver : string) {
        console.log('The Add teammates button of ', driver,' was clicked.');
        const teammates = driver_teammates.find((item) => item.id === driver)?.data || [];
        const newDrivers = teammates.filter(value => value !== null && !selectedDrivers.includes(value));
        console.log('The 5 teammates are ', newDrivers);
        setSelectedDrivers([...selectedDrivers, ...newDrivers]);
        console.log('The drivers selected are now: ', selectedDrivers);
        updateSelectedYearRange([...selectedDrivers, ...newDrivers])
    };
    function addDriverToList(driver : string) {
        if (driver !== null) {
            return (
                <Box>
                    <ListItem>
                        <ListItemContent>
                            <Typography level="body1">{driver}</Typography>
                        </ListItemContent>
                        <Checkbox
                            color='danger'
                            defaultChecked
                            onClick={() => handleClickCheckbox(driver)}
                        />
                    </ListItem>
                    <Button
                        variant="outlined"
                        size='sm'
                        color='danger'
                        onClick={() => handleClickTeammates(driver)}
                    >
                        Add teammates
                    </Button>
                </Box>);
        };
    };


    function handleYearSelectChange (event: React.ChangeEvent<{}>, value: number | null) {
        console.log('The year was selected: ', value);
        if (value !== null) {
            setSelectedYear(value);
        }
    };



    return (
        <Box
            display="grid"
            gridTemplateColumns="1fr 4fr"
            gridTemplateRows="2fr 1fr 4sfr 4sfr"
            gridTemplateAreas={`"para para" 
              "inputs inputs"
              "list plot"
              "list plot2"`}

        >
            <Box gridArea="para" padding="2em">
                {PageExplanation}
            </Box>

            <Box
                gridArea="inputs"
                display="flex"
                justifyContent="space-evenly"
                alignItems="end"
            >
                <Box>
                    <label>
                        <FormLabel>Select a driver:</FormLabel>
                        <Autocomplete
                            placeholder="Driver"
                            options={name_list}
                            onChange={handleDriverSelectChange}
                        />
                    </label>
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        size='sm'
                        color='danger'
                        onClick={handleClickReset}
                    >
                        Reset
                    </Button>
                </Box>
            </Box>
            <Box
                gridArea="list"
                display="flex"
                justifyContent="column"
                textAlign="center"
                sx={{padding: "5%"}}
            >
                <Sheet variant="soft" sx={{padding: "1em"}} style={{maxHeight: 800, overflow: 'auto'}}>
                    <Typography level="body1" textTransform="uppercase" fontWeight="lg">
                        List of selected drivers
                    </Typography>
                    <List sx={{padding: "5%"}}>
                        {selectedDrivers.map((item) => (
                            addDriverToList(item)
                        ))}
                    </List>
                </Sheet>
            </Box>
            <Box
                gridArea="plot"
                display="flex"
                flexDirection="column"
                padding="1em"
                height="360px"
            >
                <Box gridArea="para" padding="2em">
                    {Plot1Explanation}
                </Box>
                <MyResponsiveBump data={
                    data_rank
                        .filter((item)=> selectedDrivers.includes(item.id))
                        .map((item) => {
                            if (selectedYearRange && selectedYearRange.length > 0) {
                                const pointsPerYear = new Map(item.data.map(entry => [entry.x, entry.y]));
                                item.data = selectedYearRange.map(year => ({
                                    x: year,
                                    y: pointsPerYear.get(year) ?? null
                                }));
                            }
                            return item;
                        })
                }/>
            </Box>
            <Box
                gridArea="plot2"
                display="flex"
                flexDirection="column"
                padding="3em"
                height="360px"
            >
                <Box gridArea="para" padding="2em">
                    {Plot2Explanation}
                </Box>
                <label>
                    <FormLabel>Select a year:</FormLabel>
                    <Autocomplete
                        placeholder="Year"
                        options={selectedYearRange}
                        getOptionLabel={(option) => String(option)}
                        onChange={handleYearSelectChange}
                    />
                </label>

                <MyResponsiveAreaBump data={data_points.filter((item) =>
                    item.year === selectedYear)
                    [0]?.year_data
                    .filter((item)=> selectedDrivers.includes(item.id))
                }/>
            </Box>
        </Box>
    )
        ;
};

export default Driver;

const PageExplanation = (
    <>
        <Typography level="h2" sx={{textAlign: "center"}}>
            Overview of the drivers' seasons
        </Typography>
        <br/>
        <Typography level="body1">

            Here you can explore the performance evolution of various drivers over time.
            Gain insights into their rankings across different years or track their cumulative points throughout a selected year.

            <br/> <br/>
            Select a driver or multiples, add their teammates or uncheck some, or reset all selections.

        </Typography>
    </>
);

const Plot1Explanation = (
    <>
        <Typography level="body1">
            Here is the evolution of rankings during the years for the selected drivers.
        </Typography>
    </>
);

const Plot2Explanation = (
    <>
        <Typography level="body1">
            Here is the evolution of cumulative points during a year for the selected drivers.
            You can visualize how they performed against others during a season.
        </Typography>
    </>
);