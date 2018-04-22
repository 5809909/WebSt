import React from "react";

export default function Input({type,name,placeholder}) {
    return(
        <div className="textfield">
            <input
            type={type}
            name={name}
            className="sdfsd"
            placeholder={placeholder}
            />
        </div>
    )

}