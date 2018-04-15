import React from "react";
import Input from "./Input"

export default function Form() {
    return(
        <form className="form-input-data">
            <Input type="text" name="title" placeholder="Title" />
            <Input type="text" name="description" placeholder="Description" />
            <button className="button-add-item">Add item</button>
        </form>
    )

}