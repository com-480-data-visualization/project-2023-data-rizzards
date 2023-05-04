import React from "react";
import {ResponsiveAreaBump, ResponsiveBump} from "@nivo/bump";
import {useState} from "react";
import Box from "@mui/joy/Box";
import Button from '@mui/joy/Button';
import {Checkbox, FormLabel, ListItemContent, ListItemDecorator} from "@mui/joy";
import Autocomplete from "@mui/joy/Autocomplete";
import {Typography} from "@mui/joy";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";

const Driver: React.FC = () => {

    const [selectedDriver, setSelectedDriver] = useState("");


    const drivers = {
        id: "Drivers",
        data: [
            {
                name: "Alonso",
            },
            {
                name: "Hamiltons",
            },
        ],
    };
    const driverOptions = drivers.data

    const handleDriverSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const driver = e.target.value;
        setSelectedDriver(driver);
    };

    const handleClick = () => {
        console.log('The inner html was clicked.');
        // document.getElementById('output').innerHTML = '';
    };

    const data = [
        {
            id: "Alonso",
            data: [
                {
                    x: 2000,
                    y: 2,
                },
                {
                    x: 2001,
                    y: 3,
                },
                {
                    x: 2002,
                    y: 3,
                },
            ],
        },
        {
            id: "Hamilton",
            data: [
                {
                    x: 2000,
                    y: 1,
                },
                {
                    x: 2001,
                    y: 2,
                },
                {
                    x: 2002,
                    y: 1,
                },
            ],
        },
    ];

    const years = [
        {
            id: "Alonso",
            data: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 1,
                    y: 3,
                },
                {
                    x: 2,
                    y: 3,
                },
                {
                    x: 3,
                    y: 5,
                },
                {
                    x: 4,
                    y: 15,
                },
                {
                    x: 5,
                    y: 20,
                },
                {
                    x: 6,
                    y: 25,
                },
                {
                    x: 7,
                    y: 30,
                },
                {
                    x: 8,
                    y: 31,
                },
                {
                    x: 9,
                    y: 35,
                },
                {
                    x: 10,
                    y: 40,
                },
                {
                    x: 11,
                    y: 45,
                },
                {
                    x: 12,
                    y: 50,
                },
            ],
        },
        {
            id: "Hamilton",
            data: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 1,
                    y: 6,
                },
                {
                    x: 2,
                    y: 7,
                },
                {
                    x: 3,
                    y: 10,
                },
                {
                    x: 4,
                    y: 15,
                },
                {
                    x: 5,
                    y: 20,
                },
                {
                    x: 6,
                    y: 21,
                },
                {
                    x: 7,
                    y: 25,
                },
                {
                    x: 8,
                    y: 28,
                },
                {
                    x: 9,
                    y: 30,
                },
                {
                    x: 10,
                    y: 40,
                },
                {
                    x: 11,
                    y: 41,
                },
                {
                    x: 12,
                    y: 42,
                },
            ],
        },
    ];

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
                            options={["Alonso", "Hamilton"]}
                        />
                    </label>
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        size='sm'
                        color='danger'
                        onClick={handleClick}
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
                        {drivers.data.map(({name}) => (
                            <Box>
                                <ListItem>
                                    <ListItemContent>
                                        <Typography level="body1">{name}</Typography>
                                    </ListItemContent>
                                    <Checkbox color='danger' defaultChecked/>
                                </ListItem>
                                <Button
                                    variant="outlined"
                                    size='sm'
                                    color='danger'
                                    onClick={handleClick}
                                >
                                    Add teammates
                                </Button>
                            </Box>
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
                {MyResponsiveBump(data)}
            </Box>
            <Box
                gridArea="plot2"
                display="flex"
                flexDirection="column"
                padding="3em"
                height="360px"
            >
                <Typography level="body1" textTransform="uppercase" fontWeight="lg">
                    Year: 2019
                </Typography>
                {MyResponsiveAreaBump(years)}
            </Box>
        </Box>
    )
        ;
};

// <ResponsiveBump data={data}/>
//{MyResponsiveAreaBump(data)}
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

const MyResponsiveBump = (data: { id: string; data: { x: number | string; y: number }[]; }[]) => (
    <ResponsiveBump
        data={data}
        margin={{top: 40, right: 100, bottom: 40, left: 60}}
        axisRight={null}
        colors={{scheme: 'spectral'}}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{theme: 'background'}}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{from: 'serie.color'}}
        axisTop={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'year',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'ranking',
            legendPosition: 'middle',
            legendOffset: -40
        }}
    />
)

const MyResponsiveAreaBump = (data: { id: string; data: { x: number | string; y: number; }[]; }[]) => (
    <ResponsiveAreaBump
        data={data}
        margin={{top: 40, right: 100, bottom: 40, left: 100}}
        interpolation="linear"
        spacing={50} // line width
        xPadding={0}
        colors={{scheme: 'nivo'}}

        blendMode="multiply"

        axisTop={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'month',
            legendPosition: 'middle',
            legendOffset: 32
        }}
    />
)