import React, { Component } from 'react';

export default class Pegavar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        resul: 0,
    };
    this.soma = this.soma.bind(this);
  }

  soma(a, b){
      a = parseInt(a);
      b = parseInt(b);
      return (a + b);
  }


  render() {
    return (
     <div>
        <h1>1° - {this.props.match.params.dom}</h1>
        <h1>2° - {this.props.match.params.doom}</h1>
        <h3>Soma: {this.soma(this.props.match.params.dom, this.props.match.params.doom)}</h3>
        {console.log(typeof(this.props.match.params.doom))}
    </div>
    );
  }
}
