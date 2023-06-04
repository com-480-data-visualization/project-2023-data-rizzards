import React, { useState, useEffect, useRef } from 'react';
import {CountUp} from 'countup.js';
import Season from "./index";


interface CurrentKmNb {
    km : number;
}

const CountUpComponent: React.FC<CurrentKmNb> = ({km}) => {
    //const [targetNumber, setTargetNumber] = useState(0);
    const countUpRef = useRef<CountUp | null>(null);

    useEffect(() => {
        if (countUpRef.current) {
            countUpRef.current.update(km);
        } else {
            countUpRef.current = new CountUp('countup', km);
            if (countUpRef.current) {
                countUpRef.current.start();
            }
        }
    }, [km]);

    return (
        <span>
            <span id="countup">{km}</span>
        </span>
    );
};


export default CountUpComponent;