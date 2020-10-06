import React from 'react';
import './App.css';

export default class Book extends React.Component {
    render() {
        return (
            <div className="book">
                <a href={this.props.link} target="_blank" rel="noopener noreferrer"><img src={this.props.image} alt="Click for more info!"/></a>
                <h1>{this.props.title}</h1>
                <h2>by {this.props.authors}</h2>
                <h3>${this.props.amount}</h3>
                <p>{this.props.description}</p>
                <hr/>
            </div>
        )
    }
}