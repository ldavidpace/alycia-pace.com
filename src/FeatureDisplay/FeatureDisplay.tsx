import * as React from 'react';
import { parse } from 'qs'

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import Images from '../images/javascriptGenImages';
import './FeatureDisplay.css';

type matchProps = {
  view: string;
}

class FeatureDisplay extends React.Component<RouteComponentProps<matchProps>> {
  getPreviousLink(id: string) {
    let nextFrame = (parseInt(id, 10) - 1);
    if (nextFrame < 0) {
      nextFrame = this.getCurrentFolderList(this.props.match.params.view).length - 1;
    }
    return '?id=' + nextFrame; 
  }

  getNextLink(id: string) {
    let nextFrame = (parseInt(id, 10) + 1);
    if (nextFrame > this.getCurrentFolderList(this.props.match.params.view).length - 1) {
      nextFrame = 0;
    }
    return '?id=' + nextFrame;
  }
  getCurrentFolderList(view: string) {
    const folder = Images.find( folder => folder.name === this.props.match.params.view)
      
    
    const files = folder ? folder.contents : Images.reduce( (acc, folder) => {
        return [...acc, ...folder.contents];
      }, []);
    return files;
  }


  render() {
    window.scrollTo(0, 0);
    const params = parse(window.location.search);
    console.log(params);
    const folders = this.getCurrentFolderList(this.props.match.params.view);
    const currentId = params['?id'];
    if (!folders[currentId]) return null;
    return (
      <div className="featured_display">
        <div className="featured__links">
          <Link to={this.getPreviousLink(currentId)}>
            back
          </Link>
          <Link  to={this.getNextLink(currentId)}>
            next
          </Link>
        </div>
        {
          folders[currentId].images.map( (image: string) => 
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

export default withRouter(FeatureDisplay);
