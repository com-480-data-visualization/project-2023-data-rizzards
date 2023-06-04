import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { select as d3Select } from "d3-selection";
import "d3-transition";
import names from "./world-country-names.json";
import races from "./race_f1_new.json";
import CountUpComponent from './MyCountup'
import {totalmem} from "os";

const Title = styled.h1`
  position: absolute;
  top: 500px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 18px;
  text-align: center;
  width: 720px;
`;

interface CurrentSeason {
    selectedS : string;
}

interface JsSeason {
    round: number;
    year: number;
    location: string;
    country: string;
    lat: number;
    lng: number;
    id: number;
    show_c : boolean;
}

const GlobePlot: React.FC<CurrentSeason> = ({selectedS}) => {
    const globeRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const jsonData: { [key: string]: JsSeason[] } = races;

    const [currentKmNb, setCurrentKmNb] = useState(0);
    let cumulTotalKm = 0;


    let is = [0], n = 0;


    const getKm: (lon1: number, lat1: number, lat2: number, lon2:number) => number = (lon1, lat1, lon2, lat2 ) => {

        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres

        return Math.floor(d/1000);

    };



    useEffect(() => {
        if (!globeRef.current) return;

        console.debug("GlobePlot useEffect");

        const width = 720;
        const height = 720;

        const projection = d3
            .geoOrthographic()
            .translate([width / 2, height / 2])
            .scale(width / 2 - 20)
            .clipAngle(90)
            .precision(0.6);

        const canvas = d3Select(globeRef.current)
            .append("canvas")
            .attr("width", width)
            .attr("height", height);

        const c = canvas.node()?.getContext("2d");

        if (c == null) {
            console.log("Could not get canvas 2d context");
            throw new Error("Could not get canvas context");
        } else {
            const path = d3.geoPath().projection(projection).context(c);

            const title = d3Select(titleRef.current);

            type World = TopoJSON.Topology<{
                land: TopoJSON.MultiPolygon;
                countries: TopoJSON.GeometryCollection<{ name?: string }>;
            }>;

            const fetchWorld = async () => {
                try {
                    const response = await d3.json<World>(
                        "https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-110m.json"
                    );
                    if (response == null) throw new Error("Could not load world data");
                    else return response;
                } catch (error) {
                    console.log(
                        `Error while loading TopoJSON world data: ${JSON.stringify(error)}`
                    );
                    throw error;
                }
            };

            fetchWorld().then((world) => {
                console.debug("loaded data");


                let globe: d3.GeoSphere = { type: "Sphere" },
                    land = topojson.feature(world, world.objects.land),
                    countries = topojson.feature(world, world.objects.countries).features,
                    borders = topojson.mesh(
                        world,
                        world.objects.countries,
                        function (a, b) {
                            return a !== b;
                        }
                    ),
                    i = -1;


                let p1 = [0, 0] as [number, number],
                    p2 = [0, 0] as [number, number];

                let ip = d3.geoInterpolate(p1, p2);


                countries = countries
                    .filter(function (d) {
                        return names.some(function (n) {
                            if (d.id == n.id) return (d.properties.name = n.name);
                        });
                    })
                    .sort(function (a, b) {
                        if (a.properties.name && b.properties.name)
                            return a.properties.name.localeCompare(b.properties.name);
                        else return 0;
                    });


                //here we try to find matching countries
                //const currentSeasonYear = parseInt(selectedS);
                let ids_of_the_season : number[] = [];

                let countries_not_found: string[] = [];


                for(let i = 0; i < jsonData[selectedS].length; i++){

                    let has_been_found = false;
                    for(let j = 0; j < countries.length; j++){
                        if(countries[j].id == jsonData[selectedS][i].id.toString()){
                            ids_of_the_season.push(j);
                            has_been_found = true;
                        }

                    }

                    if(!has_been_found){
                        countries_not_found.push(jsonData[selectedS][i].country);
                    }

                }

                if(countries.length != 0){
                    console.log(countries_not_found);
                }


                is = ids_of_the_season;
                n = is.length;



                console.debug("starting transition");

                (function transition() {
                    console.debug("transition");



                    d3.transition("traverse_countries")
                        .duration(1250)
                        .on("start", function () {
                            i = (i + 1) % n;

                            title.text(
                                //countries[is[(i = (i + 1) % n)]]?.properties.name || "Unknown"
                                jsonData[selectedS][i % n]?.location + " - " + jsonData[selectedS][i % n]?.country || "Unknown"
                            );
                            p1 = p2;
                            p2 = d3.geoCentroid(countries[is[i]]);

                            ip = d3.geoInterpolate(p1, p2);


                            //calcul the Kms
                            if(i != 0){
                                const lon1 = jsonData[selectedS][i-1].lng;
                                const lat1 = jsonData[selectedS][i-1].lat;

                                const lon2 = jsonData[selectedS][i].lng;
                                const lat2 = jsonData[selectedS][i].lat;

                                const diff = getKm(lon1, lat1, lon2, lat2);
                                console.log(diff);
                                cumulTotalKm += diff;
                                setCurrentKmNb(cumulTotalKm);

                            } else {
                                cumulTotalKm = 0;
                                setCurrentKmNb(cumulTotalKm);
                            }





                        })
                        .tween("rotate", function () {

                            const p = d3.geoCentroid(countries[is[i]]),
                                r = d3.interpolate<[number, number]>(projection.rotate(), [
                                    -p[0],
                                    -p[1],
                                ]);

                            return function (t) {

                                projection.rotate(r(t) as [number, number]);
                                c.clearRect(0, 0, width, height);
                                /* eslint-disable @typescript-eslint/no-unused-expressions */
                                (c.fillStyle = "#ccc"), c.beginPath(), path(land), c.fill();

                                if(jsonData[selectedS][i].show_c){
                                    (c.fillStyle = "#f00"), c.beginPath(), path(countries[is[i]]), c.fill();
                                }
                                (c.strokeStyle = "#fff"), (c.lineWidth = 0.5), c.beginPath(), path(borders), c.stroke();
                                (c.strokeStyle = "#000"), (c.lineWidth = 2), c.beginPath(), path(globe), c.stroke();

                                if(i != 0){
                                    (c.lineWidth = 1), c.beginPath(), path(
                                        {type: "LineString", coordinates: [p1, ip(t)]}
                                    ), c.stroke();
                                }
                                /* eslint-enable @typescript-eslint/no-unused-expressions */
                            };
                        })
                        .transition()
                        .tween("render", () => t => {

                            const ip = d3.geoInterpolate(p1, p2);

                            /* eslint-disable @typescript-eslint/no-unused-expressions */
                            c.clearRect(0, 0, width, height);
                            (c.fillStyle = "#ccc"), c.beginPath(), path(land), c.fill();
                            if(jsonData[selectedS][i].show_c){
                                (c.fillStyle = "#f00"), c.beginPath(), path(countries[is[i]]), c.fill();
                            }
                            (c.strokeStyle = "#fff"), (c.lineWidth = 0.5), c.beginPath(), path(borders), c.stroke();
                            (c.strokeStyle = "#000"), (c.lineWidth = 2), c.beginPath(), path(globe), c.stroke();

                            if(i != 0){
                                (c.lineWidth = 1), c.beginPath(), path(
                                    {type: "LineString", coordinates: [ip(t), p2]}
                                ), c.stroke();
                            }

                            /* eslint-enable @typescript-eslint/no-unused-expressions */
                        })
                        .on("end", transition);
                })();

                console.debug("finished transition");
            });

            return () => {
                console.debug("GlobePlot useEffect cleanup");
                canvas.remove();
            };
        }
    }, [selectedS]);


    const countupStyle: React.CSSProperties = {
        color: 'red',
        fontSize: '50px',
        textAlign: 'center'
    };

    const centerItems: React.CSSProperties = {
        textAlign: "center"
    }

    return (

        <div>
            <div ref={globeRef}>
                <h2 style={centerItems} ref={titleRef}></h2>
            </div>

            <div style={countupStyle}>
                <b><CountUpComponent km={currentKmNb}></CountUpComponent></b> km
            </div>



        </div>
    );
};

export default GlobePlot;
