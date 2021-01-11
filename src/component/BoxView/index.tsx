
import React, { useEffect, useRef, useState } from 'react';
import './style.css';
const BoxView: React.FC<any> = (props) => {

    const { selected = null, onClick, id = "", name = "", zIndex = 0, keyboardEvent = false }: any = props;
    const selectedView = useRef(null);
    let parentNodeBound: any = {};
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
        yAxis: 0,
        x: 0,
        y: 0,
        left: 0,
        bottom: 0,
        right: 0

    })

    useEffect(() => {
        const { parentNode = "" }: any = selectedView.current!;
        const { x, y, left, bottom, right } = parentNode.getBoundingClientRect();
        chnageAxis({ ...axis, x, y, left, bottom, right })
    }, [])
    function onKeyPress(e: any) {
        if (!keyboardEvent) {
            return;
        }
        const { x, y, left, bottom, right } = axis;
        let { xAxis, yAxis } = axis;

        switch (e.keyCode) {
            //W
            case 87:
                yAxis = (0 < axis.yAxis) ? axis.yAxis - 1 : yAxis;
                break;
            //A
            case 65:
                xAxis = (0 < axis.xAxis) ? axis.xAxis - 1 : xAxis;

                break;
            //s
            case 83:
                yAxis = (axis.yAxis < bottom - (y + 70)) ? axis.yAxis + 1 : yAxis;
                break;
            //d
            case 68:
                xAxis = (axis.xAxis < right - (left + 70)) ? axis.xAxis + 1 : xAxis;
                break;
            default: return;
        }

        chnageAxis({
            ...axis,
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

        } id={id} onClick={onClick} onKeyDown={onKeyPress} tabIndex={0}>{name}</div>;
    }

    return <div style={style} id={id} ref={selectedView} onClick={onClick} onKeyDown={onKeyPress} tabIndex={0} >{name}</div>;

}

export default BoxView;