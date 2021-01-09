import React from 'react';
import './style.css';

const ButtonItemView: React.FC<any> = (props) => {

    const { label = "", onClick }: any = props;

    return < button className="button" onClick={onClick} > {label}</button>
}

export default ButtonItemView;