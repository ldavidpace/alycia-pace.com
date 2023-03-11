import * as React from 'react';
import './PictureShow.css';

import * as cx from 'classnames';

import { setUpSwipe, directions } from './swipeUtility';
import Analytics from '../Analytics';

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
  stopPropagation: () => void;
}

type PictureShowProps = {
  folderContents: any;
  currentId: string;
  folderCount: number;
};

class PictureShow extends React.Component<PictureShowProps> {
  state = {
    number: 0
  };
  node: HTMLDivElement | null;

  onClick(event: SyntheticEvent<HTMLDivElement>) {
    event.stopPropagation();
  }
  offSwipe: () => void;
  componentDidMount(){
    this.offSwipe = setUpSwipe(this.node, (direction: directions) => {
      switch(direction) {
        case directions.LEFT:
          this.handleLeft();
          return;
        case directions.RIGHT: 
          this.handleRight();
          return;
      }
    });
  }

  componentWillUnmount() {
    this.offSwipe && this.offSwipe(); 
  }

  handleLeft = () => {
    let nextPicture = --this.state.number;
    if (nextPicture < 0) {
      window.location.hash = `#${(parseInt(this.props.currentId) - 1 + this.props.folderCount) % this.props.folderCount}`
    }
    this.setState({number: nextPicture});
    Analytics.track('PictureShowLeft');
  }

  handleRight = () => {
    let nextPicture = ++this.state.number;
    if (this.props.folderContents.images.length <= nextPicture) {
      window.location.hash = `#${(parseInt(this.props.currentId) + 1 % this.props.folderCount)}`
    }
    this.setState({number: nextPicture});
    Analytics.track('PictureShowRight');
  }

  dotClick = (index:number) => {
    this.setState({number: index});
    Analytics.track('Dot_Click', {id: index});
  }

  render() {
    if (!this.props.folderContents) return null;
    console.log(this.props.folderContents);
    return (
      <div ref={ref => this.node = ref} className="PictureShowContainer" onClick={this.onClick}>
        <div className="pictureShowNav left" onClick={this.handleLeft}>&lt;</div>
        <div className="PictureShowCenterContainer">
          <div className="pictureContainer">
            <div 
            // ref={ref => {if (ref) ref.draggable = false}}
            style={{backgroundImage: `url(${this.props.folderContents.images[this.state.number]}` }}/>
          </div>
          <div className={'dotContainer'}>
            {  this.props.folderContents.images.length > 1 && 
              this.props.folderContents.images.map((image: Object, index: number) => {
                return <div
                  key={index}
                  className={cx('dot', {selected: this.state.number === index })}
                  style={{backgroundImage: `url(${image})`}}
                  onClick={this.dotClick.bind(this, index)}
                ></div>
              })
            }
          </div>
        </div>
        <div className="pictureShowNav right" onClick={this.handleRight}>&gt;</div>
      </div>
    );
  }
}

export default PictureShow;