import React, {useState} from "react"

export function Search( {searchMovies} ) {
   const [search, setSearch] = useState("")
   const [type, setType] = useState("all")

     const handleKey = (event) => {
        if (event.key === "Enter") {
            searchMovies(search, type)
        }
    };

     const handleFilter = (event) => {
        const newType = event.target.dataset.type;
        setType(newType);
        searchMovies(search, newType)
    };

        return ( 
            <div className="row">
                <div className="col s12">
                    <div className="input-field">
                        <input
                            className="validate"
                            placeholder="search"
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKey}
                        />
                        <button 
                            className="btn search-btn red accent-4"
                            onClick={() => searchMovies(search, type)}
                            >Search
                        </button>
                    </div>
                    <div>
                        <label>
                            <input 
                                type="radio" 
                                className="width-gap " 
                                name="type"
                                data-type="all"
                                onChange={handleFilter}
                                checked={type === 'all'} 
                                />
                            <span>All</span>
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                className="width-gap" 
                                name="type" 
                                data-type="movie"
                                onChange={handleFilter}
                                checked={type === 'movie'}/>
                            <span>Movies Only</span>
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                className="width-gap" 
                                name="type" 
                                data-type="series"
                                onChange={handleFilter}
                                checked={type === 'series'}/>
                            <span>Series Only</span>
                        </label>
                    </div>
                </div>
            </div>
           )
}
