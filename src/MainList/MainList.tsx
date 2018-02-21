import * as React from 'react';
import { Link } from 'react-router-dom';

import './MainList.css';
import Images from '../images/javascriptGenImages';
export default class MainList extends React.Component {
  handleClick (index: number) {
    console.warn('hello', event, this);
  }
  render () {
    return (
      <div className={'container'}>
          {
            Images.map((image, index) =>
            (
              <Link to={'/' + index} key={index}>
                <div 
                  className={'thumbnail'}
                  style={{backgroundImage: `url(${image.thumbnail}`}}
                  onClick={this.handleClick.bind({index})}
                />
              </Link>
              )
            )          
          }
          <div className="filler"/>
          <div className="filler"/>
          <div className="filler"/>
      </div>
    );
  }
}
