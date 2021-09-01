import React, { useState } from "react";

export default function Dictionary() {
let [keyword, setKeyword] = useState(null);

function search(event) {
    event.preventDefault();
    alert(`Searching for the definition of ${keyword}`);
}

function handleKeywordChange(event) {
    console.log(event.target.value);
    setKeyword(event.target.value);

}

    return (
        <div className="Dictionary">
        
        <form onSubmit={search}>
            <input type="search" autoFocus={true} onChange={handleKeywordChange} />
        </form>
        </div>
    )
}