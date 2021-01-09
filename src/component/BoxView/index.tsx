
import React, { useEffect, useRef, useState } from 'react';
import './style.css';
const BoxView: React.FC<any> = (props) => {

    const { selected = null, onClick, id = "", name = "", zIndex = 0, keyboardEvent = false }: any = props;
    const selectedView = useRef(null);
    const [style, chnageStyle]: any = useState({
        position: "absolute",
        boxShadow: "0 0 15px rgb(158, 158, 158)",
        backgroundColor: "rgb(10, 50, 271)",
        height: "70px",
        width: "70px",
        color: "white",
        zIndex
    }
    );
    const [axis, chnageAxis]: any = useState({
        xAxis: 0,
        yAxis: 0
    })

    function getData(e: any) {

        const { x, y, left } = e.target.getBoundingClientRect();
        onClick(e);
        chnageAxis({
            xAxis: x,
            yAxis: y
        })
    }

    function onKeyPress(e: any) {
        if (!keyboardEvent) {
            return;
        }
        const { x, y, left, bottom, right } = e.target.parentNode.getBoundingClientRect();

        let { xAxis, yAxis } = axis;

        console.log("PARENT DIV", x, y, left, bottom, right)
        switch (e.keyCode) {
            //W
            case 87:
                yAxis = (y < axis.yAxis) ? axis.yAxis - 1 : y;
                break;
            //A
            case 65:
                xAxis = (x < axis.xAxis) ? axis.xAxis - 1 : xAxis;

                break;
            //s
            case 83:
                yAxis = (axis.yAxis < left) ? axis.yAxis + 1 : axis.yAxis;
                break;
            //d
            case 68:
                xAxis = (axis.xAxis < right) ? axis.xAxis + 1 : axis.xAxis;
                break;
            default: return;
        }

        chnageAxis({
            xAxis,
            yAxis
        })
        chnageStyle({
            ...style,
            transform: `translate(${axis.xAxis}px, ${axis.yAxis}px)`
        })
    }
    if (!!selected && selected === id) {
        console.log("selected", selected)
        return <div style={
            style

        } id={id} onClick={getData} ref={selectedView} onKeyDown={onKeyPress} tabIndex={0}>{name}</div>;
    }

    return <div style={style} id={id} onClick={getData} onKeyDown={onKeyPress} tabIndex={0} >{name}</div>;

}

export default BoxView;