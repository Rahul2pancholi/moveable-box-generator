import React, { Component } from 'react';
import { sortAndDeduplicateDiagnostics } from 'typescript';
import BoxView from '../../component/BoxView';
import ButtonItemView from '../../component/ButtonItemView'
import { getUniqID } from '../../utilities/utils';
import './style.css';

class MainScreen extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            boxArray: [{ id: getUniqID(), name: new Date().getTime() }],
            selectedItem: null,
            keyboardEvent: false
        };
    }


    _renderDynamicBoxView = (): any => {
        const { boxArray, selectedItem } = this.state;
        // console.log(name)
        if (!boxArray) {
            return null;
        }
        console.log("_renderDynamicBoxView");

        return boxArray.map((item: any, index: number) => {
            if (!(!!item && !!item.id)) {
                return [];
            }
            return <BoxView name={item.id} zIndex={index} key={index} id={item.id} onClick={this._hadelBoxSelection} selected={selectedItem} keyboardEvent={this.state.keyboardEvent} ></BoxView>
        });
    }


    _handelAddBox = (): any => {

        const { boxArray } = this.state;
        boxArray.push({ id: getUniqID(), name: new Date().getTime() });
        this.setState({ boxArray })
    }

    _hadelBoxSelection = (e: any): any => {
        let { id } = e.target;
        const { selectedItem } = this.state;
        if (selectedItem === id) {
            id = null;
        }
        this.setState({ selectedItem: id })
    }

    _handelKeyboardEvent = (e: any): any => {
        const { keyboardEvent } = this.state;
        this.setState({ keyboardEvent: !(keyboardEvent) });
        // console.log(this.state)
    }

    _handelDeleteEvent = (e: any) => {
        const { selectedItem, keyboardEvent } = this.state;
        let { boxArray } = this.state;

        // console.log("_handelDeleteEvent", e.target.getBoundingClientRect())
        if (!keyboardEvent) {
            return;
        }


        switch (e.keyCode) {

            case 46:
                let index = boxArray.find((item: any, index: any) => selectedItem === boxArray.id)
                boxArray.splice(index, 1);
                this.setState({ boxArray });
        }
        return;

    }
    render() {
        return <div className="container">
            <div className="header">
                <ButtonItemView label="AddBox" onClick={this._handelAddBox} />
                <ButtonItemView label={this.state.keyboardEvent ? "KeyOFF" : "KeyON"} onClick={this._handelKeyboardEvent} />
            </div>
            <div className="box-container" onKeyDown={this._handelDeleteEvent} >
                {this._renderDynamicBoxView()}
            </div>
        </div>
    }


}

export default MainScreen;