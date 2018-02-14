import * as React from 'react';

import './MainList.css';
import Images from '../images/aaImages';
export default class MainList extends React.Component {
  handleClick () {
    console.warn('hello', event);
  }
  render () {
    return (
      <div className={'container'}>
          {
            Images.map((image, index) => 
              <div 
                className={'thumbnail'}
                style={{backgroundImage: `url(${image.thumbnail}`}}
                key={index}
                onClick={this.handleClick}
              />
            )
          }
      </div>
    );
  }
}
