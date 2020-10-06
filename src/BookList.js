import React from 'react';
import Book from './Book'

export default class BookList extends React.Component {
    render() {
        return (
            <div className='booklist'>
                {this.props.books.map(book => {

                    let authors = book.volumeInfo.authors
                    if (authors) {
                        authors = authors.join(', ')
                    } else {
                        authors = 'N/A'
                    }

                    let image = "https://images-na.ssl-images-amazon.com/images/I/41AzTyfn3SL._SX258_BO1,204,203,200_.jpg"
                    if (book.volumeInfo.imageLinks) {
                        image = book.volumeInfo.imageLinks.thumbnail
                    }
                    
                    let amount = 'N/A'
                    if (book.saleInfo.saleability !== "NOT_FOR_SALE") {
                        amount = book.saleInfo.saleability === "FREE"?"0": book.saleInfo.listPrice.amount;
                    }

                    return <Book
                    key={book.volumeInfo.previewLink}
                    link={book.volumeInfo.previewLink}
                    image={image}
                    title={book.volumeInfo.title}
                    authors={authors}
                    amount={amount}
                    description={book.volumeInfo.description}
                    />
                })}
            </div>
        )
    }
}