import React, { Component } from 'react';

class Card extends Component {
    state = {  }

    render_header = () => {
        if (this.props.header) {
            return (
                <div className='card-header'>
                    {this.props.header}
                </div>
            );
        }
    }

    render() {
        return (
            <div className="card" style={{marginTop: '20px'}}>
                {this.render_header()}
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Card;