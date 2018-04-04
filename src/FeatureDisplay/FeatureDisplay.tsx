import * as React from 'react';

import { Link } from 'react-router-dom';
import Images from '../images/javascriptGenImages';
import './FeatureDisplay.css';

type FeatureDisplayProps = {
  match: {
    url: string,
    params: {
      id: string,
    }
  }
};

class FeatureDisplay extends React.Component<FeatureDisplayProps> {
  getPreviousLink(id: string) {
    let nextFrame = (parseInt(id, 10) - 1);
    if (nextFrame < 0) {
      nextFrame = Images.length - 1;
    }
    return '/' + nextFrame; 
  }

  getNextLink(id: string) {
    let nextFrame = (parseInt(id, 10) + 1);
    if (nextFrame > Images.length - 1) {
      nextFrame = 0;
    }
    return '/' + nextFrame;
  }

  render() {
    window.scrollTo(0, 0);
    const {match} = this.props;
    return (
      <div className="featured_display">
        <div className="featured__links">
          <Link to={this.getPreviousLink(match.params.id)}>
            <a>back</a>
          </Link>
          <Link  to={this.getNextLink(match.params.id)}>
            <a>next</a>
          </Link>
        </div>
        {
          Images[match.params.id].images.map( (image: string) => 
            <img 
              className="featured__image"
              key={image}
              src={image}
            />
          )
        }
      </div>
    );
  }
}

export default FeatureDisplay;
