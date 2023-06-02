import {ResponsiveBump} from "@nivo/bump";
import React from "react";

export interface MyResponsiveBumpProps {
    data: { id: string; data: { x: number ; y: number | null }[] }[];
}

export const MyResponsiveBump = (props : MyResponsiveBumpProps) => {
    return (
        <ResponsiveBump
            data={props.data}
            margin={{top: 40, right: 100, bottom: 60, left: 100}}
            axisRight={null}
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
            //{scheme: 'category10'}}
            //nivo(light) category10(dark) dark2(dark) set2
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
                tickRotation: -45,
                legend: 'year',
                legendPosition: 'middle',
                legendOffset: 50
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
    );
};