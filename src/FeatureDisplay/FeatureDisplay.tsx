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
  render() {
    window.scrollTo(0, 0);
    const {match} = this.props;
    return (
      <div className="featured_display">
        <div className="featured__links">
          <Link to={'/' + (parseInt(match.params.id, 10) - 1)}>
            <a>back</a>
          </Link>
          <Link  to={'/' + (parseInt(match.params.id, 10) + 1)}>
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
