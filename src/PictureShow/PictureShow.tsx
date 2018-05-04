import * as React from 'react';
import './PictureShow.css';

import * as cx from 'classnames';

import { setUpSwipe, directions } from './swipeUtility';

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
  stopPropagation: () => void;
}

type PictureShowProps = {
  folderContents: any;
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
      nextPicture = this.props.folderContents.images.length - 1;
    }
    this.setState({number: nextPicture});
  }

  handleRight = () => {
    let nextPicture = ++this.state.number;
    if (this.props.folderContents.images.length <= nextPicture) {
      nextPicture = 0;
    }
    this.setState({number: nextPicture});
  }

  dotClick = (index:number) => {
    this.setState({number: index});
  }

  render() {
    if (!this.props.folderContents) return null;
    console.log(this.props.folderContents);
    return (
      <div ref={ref => this.node = ref} className="PictureShowContainer" onClick={this.onClick}>
        { this.props.folderContents.images.length > 1 && 
            <div className="pictureShowNav left" onClick={this.handleLeft}>&lt;</div>}
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
        { 
          this.props.folderContents.images.length > 1 &&
            <div className="pictureShowNav right" onClick={this.handleRight}>&gt;</div>
        }
      </div>
    );
  }
}

export default PictureShow;