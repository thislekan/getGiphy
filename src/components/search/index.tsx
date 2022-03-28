import React, {useState} from "react";
import { ISearchProps } from "../../utils/interfaces";

const Search = ({searchData, setIsSearch, setSearchTerm, searchTerm = ''}: ISearchProps): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const {value} = (document.getElementById('search') as HTMLInputElement);

    if (value === searchTerm && isSubmitted) {
      setIsSubmitted(false);
      setSearchTerm('');
      return setIsSearch(false);
    }

    setIsSubmitted(true);
    setIsSearch(true);
    searchData();
  }

  const handleInput = (e: any) => {
    const {value} = e.target;
    setSearchTerm(value);
    value.trim() && isSubmitted && setIsSubmitted(false);

    if (!value.trim()) {
      setIsSearch(false)
      setSearchTerm('')
      setIsSubmitted(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search for gif here"
        onChange={handleInput}
        value={searchTerm}
      />
      <button>{isSubmitted ? 'CANCEL' : 'SEARCH'}</button>
    </form>
  )
}

export default Search;