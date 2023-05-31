import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { select as d3Select } from "d3-selection";
import "d3-transition";
import names from "./world-country-names.json";

const Title = styled.h1`
  position: absolute;
  top: 500px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 18px;
  text-align: center;
  width: 720px;
`;

const GlobePlot: React.FC = () => {
    const globeRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);

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
                    i = -1,
                    n = countries.length;

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

                console.debug("starting transition");

                (function transition() {
                    console.debug("transition");

                    d3.transition("traverse_countries")
                        .duration(1250)
                        .on("start", function () {
                            title.text(
                                countries[(i = (i + 1) % n)]?.properties.name || "Unknown"
                            );
                            p1 = p2;
                            p2 = d3.geoCentroid(countries[i]);

                            ip = d3.geoInterpolate(p1, p2);


                        })
                        .tween("rotate", function () {
                            const p = d3.geoCentroid(countries[i]),
                                r = d3.interpolate<[number, number]>(projection.rotate(), [
                                    -p[0],
                                    -p[1],
                                ]);

                            return function (t) {
                                projection.rotate(r(t) as [number, number]);
                                c.clearRect(0, 0, width, height);
                                /* eslint-disable @typescript-eslint/no-unused-expressions */
                                (c.fillStyle = "#ccc"), c.beginPath(), path(land), c.fill();
                                (c.fillStyle = "#f00"), c.beginPath(), path(countries[i]), c.fill();
                                (c.strokeStyle = "#fff"), (c.lineWidth = 0.5), c.beginPath(), path(borders), c.stroke();
                                (c.strokeStyle = "#000"), (c.lineWidth = 2), c.beginPath(), path(globe), c.stroke();
                                (c.lineWidth = 1), c.beginPath(), path(
                                    {type: "LineString", coordinates: [p1, ip(t)]}
                                ), c.stroke();
                                /* eslint-enable @typescript-eslint/no-unused-expressions */
                            };
                        })
                        .transition()
                        .tween("render", () => t => {

                            const ip = d3.geoInterpolate(p1, p2);

                            /* eslint-disable @typescript-eslint/no-unused-expressions */
                            c.clearRect(0, 0, width, height);
                            (c.fillStyle = "#ccc"), c.beginPath(), path(land), c.fill();
                            (c.fillStyle = "#f00"), c.beginPath(), path(countries[i]), c.fill();
                            (c.strokeStyle = "#fff"), (c.lineWidth = 0.5), c.beginPath(), path(borders), c.stroke();
                            (c.strokeStyle = "#000"), (c.lineWidth = 2), c.beginPath(), path(globe), c.stroke();
                            (c.lineWidth = 1), c.beginPath(), path(
                                {type: "LineString", coordinates: [ip(t), p2]}
                            ), c.stroke();
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
    }, []);

    return (
        <div ref={globeRef}>
            <Title ref={titleRef}></Title>
        </div>
    );
};

export default GlobePlot;
