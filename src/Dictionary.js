import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";

export default function Dictionary(props) {
let [keyword, setKeyword] = useState(props.defaultKeyword);
let [results, setResults] = useState(null);
let [loaded, setLoaded] = useState(false);
let [photos, setPhotos] = useState(null);

function handleDictionaryResponse(response) {
    setResults(response.data[0]);
}

function handlePexelsResponse(response) {
    //console.log(response.data);
    setPhotos(response.data.photos);
}

function handleSubmit(event) {
    event.preventDefault();
    search();
}

function search () {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    //console.log(apiUrl);
    axios.get(apiUrl).then(handleDictionaryResponse); 

    let pexelsApiKey = "563492ad6f9170000100000194d06b4a67e842099fe90bdccbb11d89";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=6`;
    axios.get(pexelsApiUrl, { headers: {"Authorization" : `Bearer ${pexelsApiKey}` }, }).then(handlePexelsResponse);
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
        <h1>What word do you want to look up?📚</h1>
        <form onSubmit={handleSubmit}>
            <input type="search" placeholder="Search for a word..." defaultValue={props.defaultKeyword} autoFocus={true} onChange={handleKeywordChange} />
        </form>
        </section>
        <Results results={results} />
        <Photos photos={photos} />
        </div>
    )

} else {
    load();
    return "Loading";
}}