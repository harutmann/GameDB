import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const inputChange = (e) => {
    setSearchValue(e.target.value);
  }

  const submitFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    setSearchValue('');
  }

  return (
    <div className="col1">
      <form>
        <div className="form-row">
          <div className="col">
            <input value={searchValue}
             className="form-control"
             onChange={inputChange}
             type="text"
             placeholder="search..."/>
          </div>

          <div className="col">
            <input
            className="btn btn-primary"
            onClick={submitFunction}
            type="submit"
            value="Search"/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search;
