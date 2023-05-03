import React from "react";
import {ResponsiveBump} from "@nivo/bump";
import {useState} from "react";
import Box from "@mui/joy/Box";
import Button from '@mui/joy/Button';
import {FormLabel} from "@mui/joy";
import Autocomplete from "@mui/joy/Autocomplete";
import {Typography} from "@mui/joy";

const Driver: React.FC = () => {

    const [selectedDriver, setSelectedDriver] = useState("");


    const drivers = ["Alonso", "Hamiltons"]
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
            id: "Serie 1",
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
                    y: 4,
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
                id='output'
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
                sx={{ padding: "5%" }}
            >
                list of selected drivers
            </Box>
            <Box
                gridArea="plot"
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding="3em"
                height="360px"
            >
                <ResponsiveBump data={data}/>
            </Box>
        </Box>
    );
};

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