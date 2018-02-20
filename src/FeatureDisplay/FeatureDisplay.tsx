import * as React from 'react';

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
    const {match} = this.props;
    return (
      <div>
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
