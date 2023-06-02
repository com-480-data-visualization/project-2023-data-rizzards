import {ResponsiveAreaBump} from "@nivo/bump";
import React from "react";

interface MyResponsiveBumpProps {
    data: { id: string; data: { x: number | string; y: number }[] }[];
}

export const MyResponsiveAreaBump = (props : MyResponsiveBumpProps) => {
    return(
    <ResponsiveAreaBump
        data={props.data}
        margin={{top: 40, right: 100, bottom: 80, left: 100}}
        interpolation="linear"
        spacing={50} // line width
        xPadding={0}
        colors={["#a17e92",
        "#7db01e",
        "#9e58e3",
        "#56a03a",
        "#d24fbc",
        "#479d5b",
        "#d95286",
        "#3fa28d",
        "#dd4249",
        "#737ed4",
        "#e05f21",
        "#718bb4",
        "#aa8f29",
        "#b56cac",
        "#708f5e",
        "#ca6d62",
        "#678e87",
        "#c5723a",
        "#a57f6f",
        "#958647"]}

        blendMode="multiply"

        axisTop={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legendPosition: 'middle',
            legendOffset: 60
        }}
    />
    );
};