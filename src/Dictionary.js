import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";

export default function Dictionary(props) {
let [keyword, setKeyword] = useState(props.defaultKeyword);
let [results, setResults] = useState(null);
let [loaded, setLoaded] = useState(false);

function handleResponse(response) {
    setResults(response.data[0]);
}

function handleSubmit(event) {
    event.preventDefault();
    search();
}

function search () {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    //console.log(apiUrl);
    axios.get(apiUrl).then(handleResponse); 
}

function handleKeywordChange(event) {
    setKeyword(event.target.value);
}

function load() {
    setLoaded(true);
    search();
}

if (loaded) {
    return (
        <div className="Dictionary">
        <section>
        <h1>What word do you want to look up?</h1>
        <form onSubmit={handleSubmit}>
            <input type="search" placeholder="Search for a word..." defaultValue={props.defaultKeyword} autoFocus={true} onChange={handleKeywordChange} />
        </form>
        </section>
        <Results results={results} />
        </div>
    )

} else {
    load();
    return "Loading";
}}