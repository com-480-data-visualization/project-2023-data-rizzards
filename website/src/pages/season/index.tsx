import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import React, {useState} from "react";
import GlobePlot from "./GlobePlot";
import CountUpComponent from './MyCountup'
import {Container, FormLabel} from "@mui/joy";
import Autocomplete from "@mui/joy/Autocomplete";



const Season: React.FC = () => {

    const [seasonYear, setSeasonYear] = useState("2023");

    function handleSeasonChange (event: React.ChangeEvent<{}>, value: string | null) {
        if(value != null){
            setSeasonYear(value);
        }
    }

    const centerItems: React.CSSProperties = {
        justifyContent: "center",
        display: "flex"
    };


    const p30width : React.CSSProperties = {
        width : "30%"
    }

    const smallMargin : React.CSSProperties = {
        marginLeft : "20px"
    }



    return (
        <div style={smallMargin}>
            <div>{PageExplanation}</div>
            <div style={p30width}>
                <FormLabel>Season</FormLabel>
                <Autocomplete
                    placeholder="Year"
                    options={["1950", "1951", "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959", "1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]}
                    onChange={handleSeasonChange}
                    defaultValue={"2023"}
                />
            </div>
            <Container>

                <div style={centerItems}>
                    <GlobePlot
                        selectedS={seasonYear}/>
                </div>

            </Container>
        </div>
    )
};

export default Season;

const PageExplanation = (
    <>
        <Typography level="h2" sx={{ textAlign: "center" }}>
            Logistics of an F1 Season
        </Typography>
        <br />
        <Typography level="body1"> In this page, you will see how the season goes from a country to another.<br/> Select a year and see the countries where the races take place and the number of kilometers to travel to complete the season.<br/> </Typography>
    </>
);

