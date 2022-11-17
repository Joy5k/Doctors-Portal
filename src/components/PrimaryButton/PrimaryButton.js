import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button className="btn  bg-gradient-to-r from-secondary to-primary btn-primary text-white">{children }</button>
    );
};

export default PrimaryButton;