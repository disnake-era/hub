import React from "react";
import styles from "./Search.module.css";
import { Repo } from "../types/Repo";

type SearchQuery = {}
//                           id     name    label
type CheckboxGroupInput = [string, string, string][];

export default function Search({ data }: { data: Repo[] }) {
    const [searchQuery, setSearchQuery]: [SearchQuery, (obj: SearchQuery) => void] = React.useState();

    const licenses: CheckboxGroupInput = data
        .filter(v => v.license !== undefined)
        .map(v => v.license)
        .filter((value, index, array) => { return array.indexOf(value) === index })
        .map(v => [v.toLowerCase(), "license", v]);

    return (
        <div className={ styles.Search }>
            This is the search panel.
            { licenses.length > 0 ? <CheckboxGroup name="License" input={licenses} /> : null }
        </div>
    )
}

function CheckboxGroup({ name, input }: { name: string, input: CheckboxGroupInput }) {
    return (
        <div className={styles.CheckboxGroup}>
            <span>{name}: </span>
            {
            input.map((item, key) => {
                const [id, name, label] = item;
                return <Checkbox id={id} name={name} label={label} key={key} />;
            })
            }
        </div>
    )
}

function Checkbox({ id, name, label }: { id: string, name: string, label: string }) {
    return (
        <div>
            <input type="checkbox" id={id} name={name} />
            <label htmlFor={id} className={styles.CheckboxLabel} >{label}</label>
        </div>
    )
}
