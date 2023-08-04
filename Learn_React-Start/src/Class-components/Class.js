import React, { Component } from 'react'
//class base componants is hard so that way devloper 
// invent hooks with function base components

export class Class extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        };
        this.increase = this.increase.bind(this)
    }

    increase() {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        return (
            <div className='container'>
                <h1>{this.state.count}</h1>
                <button onClick={this.increase}>+</button>
            </div>
        )
    }
}

export default Class
