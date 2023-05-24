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


const Driver: React.FC = () => {

    const [selectedDrivers, setSelectedDrivers] = useState<string[]>(['Hamilton']);
    const [selectedYear, setSelectedYear] = useState<number>(2012);

    const handleDriverSelectChange = (event: React.ChangeEvent<{}>, value: string | null) => {
        console.log('The driver was selected: ', value);
        if (value !== null && !selectedDrivers.includes(value)) {
            setSelectedDrivers([...selectedDrivers, value]);
        }
        console.log('The drivers selected are now: ', selectedDrivers);
    };

    const handleClickReset = () => {
        console.log('The Reset button was clicked.');
        setSelectedDrivers(['Hamilton']);
        console.log('The drivers selected are now: ', selectedDrivers);
    };

    function handleClickCheckbox(driver: string) {
        console.log('The Checkbox of ', driver, ' was clicked.');
        if (selectedDrivers.length === 1) {
            console.log('Cannot remove the last driver.');
            return;
        }
        setSelectedDrivers(selectedDrivers.filter((item) => item !== driver));
        console.log('The drivers selected are now: ', selectedDrivers);
    };

    const driver_teammates = [
        {
            id: "Hamilton",
            data: [
                "Alonso"
            ],
        },
        {
            id: "Alonso",
            data: [
                "Hamilton"
            ],
        },];

    function handleClickTeammates(driver : string) {
        console.log('The Add teammates button of ', driver,' was clicked.');
        const teammates = driver_teammates.find((item) => item.id === driver)?.data || [];
        console.log('The teammates are ', teammates);
        for (const value of teammates){
            if (value !== null && !selectedDrivers.includes(value)) {
                setSelectedDrivers([...selectedDrivers, value]);
            }
        }
        console.log('The drivers selected are now: ', selectedDrivers);
    };
    function addDriverToList(driver : string) {
        return(
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



    const data_rank = [
        {
            id: "Alonso",
            data: [
                {x: 2000, y: 2},
                {x: 2001,y: 3},
                {x: 2002,y: 3},
            ],
        },
        {
            id: "Hamilton",
            data: [
                {x: 2000,y: 1,},
                {x: 2001,y: 2,},
                {x: 2002,y: 1,},
            ],
        },];
    const name_list = data_rank.map(item => item.id);

    const handleYearSelectChange = (event: React.ChangeEvent<{}>, value: number | null) => {
        console.log('The year was selected: ', value);
        if (value !== null) {
            setSelectedYear(value);
        }

    };

    const data_points = [
        {
            year: 2012,
            year_data: [
                {
                    id: "Alonso",
                    data: [
                        {x: 0, y: 0,},
                        {x: 1, y: 3,},
                        {x: 2, y: 3,},
                        {x: 3, y: 5,},
                        {x: 4, y: 15,},
                        {x: 5, y: 20,},
                        {x: 6, y: 25,},
                        {x: 7, y: 30,},
                        {x: 8, y: 31,},
                        {x: 9, y: 35,},
                        {x: 10, y: 40,},
                        {x: 11, y: 45,},
                        {x: 12, y: 50,},
                    ],
                },
                {
                    id: "Hamilton",
                    data: [
                        {x: 0, y: 0,},
                        {x: 1, y: 6,},
                        {x: 2, y: 7,},
                        {x: 3, y: 10,},
                        {x: 4, y: 15,},
                        {x: 5, y: 20,},
                        {x: 6, y: 21,},
                        {x: 7, y: 25,},
                        {x: 8, y: 28,},
                        {x: 9, y: 30,},
                        {x: 10, y: 40,},
                        {x: 11, y: 41,},
                        {x: 12, y: 42,},
                    ],
                },
            ],
        },
        {
            year: 2013,
            year_data: [
                {
                    id: "Alonso",
                    data: [
                        {x: 0,y: 0,},
                        {x: 1,y: 3,},
                        {x: 2,y: 3,},
                        {x: 3,y: 5,},
                        {x: 4,y: 15,},
                        {x: 5,y: 20,},
                        {x: 6,y: 25,},
                        {x: 7,y: 30,},
                        {x: 8,y: 31,},
                        {x: 9,y: 35,},
                        {x: 10,y: 40,},
                        {x: 11,y: 45,},
                        {x: 12,y: 50,},
                    ],
                },
            ],
        },
    ];
    const year_list = data_points.map(item => item.year);

    return (
        <Box
            display="grid"
            gridTemplateColumns="1fr 4fr"
            gridTemplateRows="2fr 1fr 4sfr 4sfr"
            gridTemplateAreas={`"para para" 
              "inputs inputs"
              "list plot"
              "plot2 plot2"`}
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
                <Sheet variant="soft" sx={{padding: "1em"}}>
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
                padding="3em"
                height="360px"
            >
                <MyResponsiveBump data={data_rank.filter((item)=>
                    selectedDrivers.includes(item.id))}/>
            </Box>
            <Box
                gridArea="plot2"
                display="flex"
                flexDirection="column"
                padding="3em"
                height="360px"
            >
                <label>
                    <FormLabel>Select a year:</FormLabel>
                    <Autocomplete
                        placeholder="Year"
                        options={year_list}
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
        <Typography level="body1"> Explain how to use this page </Typography>
    </>
);

