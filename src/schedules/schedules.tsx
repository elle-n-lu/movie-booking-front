"use client";
import React, { useState, useEffect } from "react";
interface schedulesProps { }
const getDateList = () => {
    const datelist = [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const thisweek = [];
    const secondweek = [];
    const thirdweek = [];
    const forthweek = [];
    for (let i = 7; i--; i >= 0) {
        const d = new Date();
        const today = new Date();
        d.setDate(d.getDate() + (i - d.getDay()));
        if (today.getDate() === d.getDate()) {
            break;
        } else {
            thisweek.push(
                d.getDate() + "-" + (d.getMonth() + 1) + " " + days[d.getDay()]
            );
        }
    }
    thisweek.reverse();
    datelist.push(thisweek);
    for (let i = 7; i <= 13; i++) {
        const d = new Date();
        d.setDate(d.getDate() + (i - d.getDay()));
        secondweek.push(
            d.getDate() + "-" + (d.getMonth() + 1) + " " + days[d.getDay()]
        );
    }
    datelist.push(secondweek);

    const d = new Date();
    d.setDate(d.getDate() + (7 - d.getDay()));
    for (let i = 7; i <= 13; i++) {
        const date_2week = new Date();
        date_2week.setDate(d.getDate() + (i - d.getDay()));
        thirdweek.push(
            date_2week.getDate() +
            "-" +
            (date_2week.getMonth() + 1) +
            " " +
            days[d.getDay()]
        );
    }
    datelist.push(thirdweek);

    const d2 = new Date();
    d2.setDate(d.getDate() + (7 - d.getDay()));
    for (let i = 7; i <= 13; i++) {
        const date_2week = new Date();
        date_2week.setDate(d2.getDate() + (i - d2.getDay()));
        forthweek.push(
            date_2week.getDate() +
            "-" +
            (date_2week.getMonth() + 1) +
            " " +
            days[d.getDay()]
        );
    }
    datelist.push(forthweek);

    return datelist;
};
const Schedules: React.FC<schedulesProps> = () => {
    const [item, setItem] = useState(0);
    const [leftBtn, setleftBtn] = useState(true);
    const [rightBtn, setrightBtn] = useState(true);
    const dates = getDateList();
    useEffect(() => {
        if (item <= 0) {
            setleftBtn(false);
        } else if (item >= dates.length - 1) {
            setrightBtn(false);
        } else {
            setleftBtn(true);
            setrightBtn(true);
        }
    }, [item]);
    return (
        <div className="flex">
            {leftBtn && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setItem(item - 1);
                    }}
                >
                    &lt;
                </button>
            )}
            <div className="flex">
                {dates[item].map((i,index) => (
                    <div className="p-2" key={index}>{i}</div>
                ))}
            </div>
            {rightBtn && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setItem(item + 1);
                    }}
                >
                    &gt;
                </button>
            )}
        </div>
    );
};
export default Schedules;
