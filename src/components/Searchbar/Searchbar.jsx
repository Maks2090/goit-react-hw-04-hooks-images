import { useState } from "react";
import PropTypes from 'prop-types';


export default function Searchbar({onSubmitForm}) {
    const [searchQuery, setSearchQuery] = useState('');

   const handleSearchQueryChange = e => {
        setSearchQuery(e.target.value.toLowerCase())
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
            return;
        }
        
        onSubmitForm({ image: searchQuery, page: 1, hits: 0 })
        setSearchQuery('');
    }
    return (
        <header className="Searchbar">

            <form className="SearchForm" onSubmit={handleSubmit}>

                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>

                <input
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    className="SearchForm-input"
                    type="text"
                    
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>

        </header>
    )
}

Searchbar.propTypes = {
    onSubmitForm: PropTypes.func,
  };