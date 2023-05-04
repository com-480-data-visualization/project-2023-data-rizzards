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


    const drivers = ["Alonso", "Hamiltons"]
    const d = {
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
    const driverOptions = drivers

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

    return (
        <Box
            display="grid"
            gridTemplateColumns="1fr 4fr"
            gridTemplateRows="2fr 1fr 4sfr"
            gridTemplateAreas={`"para para" 
              "inputs inputs"
              "list plot"`}
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
                        <FormLabel>Choose your driver:</FormLabel>
                        <Autocomplete
                            placeholder="Driver"
                            options={driverOptions}
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
                        {d.data.map(({name}) => (
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
                justifyContent="center"
                alignItems="center"
                padding="3em"
                height="360px"
            >
                {MyResponsiveBump(data)}
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
            Overview of drivers' seasons
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
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -36
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
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

        //startLabel= id
        //endLabel= "id"
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -36
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32
        }}
    />
)