import {ResponsiveAreaBump} from "@nivo/bump";
import React from "react";

interface MyResponsiveBumpProps {
    data: { id: string; data: { x: number | string; y: number }[] }[];
}

export const MyResponsiveAreaBump = (props : MyResponsiveBumpProps) => {
    return(
    <ResponsiveAreaBump
        data={props.data}
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
    );
};