import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import ContactPage from '../ContactPage';

import './MainList.css';
import Images from '../images/javascriptGenImages';

import Analytics from '../Analytics';

type matchProps = {
  view: string;
}

class MainList extends React.Component<RouteComponentProps<matchProps>> {
    
  render () {
    if (this.props.match.params.view === 'contact') return (
      <ContactPage></ContactPage>
    )
    const folder = Images.find( folder => folder.name === this.props.match.params.view)
    const files = folder ? folder.contents : Images.reduce( (acc, folder) => {
        return [...acc, ...folder.contents];
      }, []);
    return (
      <div className={'container'}>
          {
            files.map((image, index) =>
            (
              <Link to={'#'+index} key={index} replace onClick={() => Analytics.track('pictureClick', {id: image.name})}>
                <div
                  className={'thumbnail'}
                  style={{backgroundImage: `url(${image.thumbnail}`}}
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

export default withRouter(MainList);
