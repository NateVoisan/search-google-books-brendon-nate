import React from 'react';
import './App.css';
import BookList from './BookList';

class App extends React.Component {
  state = {
    type: 'all',
    cost: '',
    input: '',
    books: [],
    error: ''
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleTypeFilter = event => {
    this.setState({
      type: event.target.value
    })
  }

  handleCostFilter = event => {
    this.setState({
      cost: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const APIKEY = `AIzaSyA4EVODAV2VuoatGUwfonzsOmB89gW1tAU`
    let endpoint = `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(this.state.input)}&printType=${this.state.type}${this.state.cost.length>1?"&filter="+this.state.cost:""}&key=${APIKEY}`
    console.log(endpoint);
    fetch(endpoint)
    .then(response => response.json())
    .then(displayRes => this.setState({ books : displayRes.items?displayRes.items:[]}))
    .then(books => this.state.books.length>=1?this.setState({error:""}):this.setState({error:'No books found!'}))
    .catch(e => {
      console.log(e);
    })
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <h1>Search for Books</h1>
      </header>
      <form onSubmit={this.handleSubmit}>
      <div className="search-form">
        <label htmlFor="search"> Search: </label>
        <input type="text" name="search" id="name" value={this.state.input} onChange={this.handleInput} placeholder="Book Title"/>
        <button type="submit" className="submit-button" onSubmit={this.handleSubmit} >Search</button>
      </div>
      <div className="filter-form">
        <label htmlFor="print-type"> Print Type: </label>
        <select defaultValue={this.state.type} onChange={this.handleTypeFilter} className="print-type-control" name="print-type" id="print-type-filter">
          <option value="all">All</option>
          <option value="books">Books</option>
          <option value="magazines">Magazines</option>
        </select>
        <label htmlFor="book-type"> | Book Type: </label>
        <select defaultValue={this.state.cost} onChange={this.handleCostFilter} className="book-type-control" name="book-type" id="book-type-filter">
          <option value="">No Filter</option>
          <option value="partial">Partial</option>
          <option value="full">Full</option>
          <option value="free-ebooks">Free eBooks</option>
          <option value="paid-ebooks">Paid eBooks</option>
          <option value="ebooks">eBooks</option>
        </select>
        <hr/>        
        {this.state.error.length>1?`${this.state.error}`:""}
      </div>
      </form>
      <div className="book-container">

        <BookList 
          books={this.state.books}
        />

      </div>
    </div>
  );
  }
  
}

export default App;
