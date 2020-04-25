import * as React from 'react';
// import { createPortal } from 'react-dom';
import * as $ from 'jquery';

// import PictureShow from '../PictureShow';

import history from '../history';
import Analytics from '../Analytics';
// import { parse } from 'qs'

import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
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
    return '#' + nextFrame;
  }

  getNextLink(id: string) {
    let nextFrame = (parseInt(id, 10) + 1);
    if (nextFrame > this.getCurrentFolderList(this.props.match.params.view).length - 1) {
      nextFrame = 0;
    }
    return '#' + nextFrame;
  }
  node = $(`<div id="modalContainer"></div>`);
  componentWillMount() {
    $('body').append(this.node);
    window.addEventListener('keyup', this.handleKeyPress);
  }

  componentWillUnmount() {
    this.node.remove();
    window.removeEventListener('keyup', this.handleKeyPress);
  }

  handleHide = () => {
    this.props.history.push('/');
  }

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      this.handleHide();
    }
  }

  getCurrentFolderList(view: string) {
    const folder = Images.find(folder => folder.name === this.props.match.params.view)


    const files = folder ? folder.contents : Images.reduce((acc, folder) => {
      return [...acc, ...folder.contents];
    }, []);
    return files;
  }

  handleClose = () => {
    if (history.replace) {
      history.replace(window.location.pathname + window.location.search);
    } else {
      window.location.href = window.location.href.split('#')[0];
    }
  }

  render() {
    const currentId = window.location.hash.substr(1);
    const folders = this.getCurrentFolderList(this.props.match.params.view);

    if (!folders[currentId]) return null;
    // return createPortal(<div className={'Modal-Backdrop'}>
    //     <div className={'Modal-Close'} onClick={this.handleClose}>x</div>
    //     <PictureShow folderContents={folders[currentId]} currentId={currentId} folderCount={folders.length}/>
    //   </div>, this.node[0]);
    return (
      <div className="featured_display">
        {
          folders[currentId].images.map((image: string) =>
            <img
              className="featured__image"
              key={image}
              src={image}
            />
          )
        }
        <div className="featured__links">
          <Link to={this.getPreviousLink(currentId)} onClick={() => {
            Analytics.track('featurePreviousClick');
            const root = document.querySelector('#root');
            root && root.scrollTo(0,0);
          }}>
            back
          </Link>
          <Link to={this.getNextLink(currentId)} onClick={() => {
            Analytics.track('featureNextClick');
            const root = document.querySelector('#root');
            root && root.scrollTo(0,0);
          }}>
            next
          </Link>
        </div>
      </div>
    )


    // <Modal
    //   onEnter={this.modalOpen}
    //   onHide={this.handleHide}
    //   show={this.state.open}
    //   backdrop={true}
    //   backdropClassName={'Modal-Backdrop'}
    // >
    //   {/* <div className={'Modal-Contents'}> */}
    //     <PictureShow/>
    //   {/* </div> */}
    // </Modal>

  }
}

export default withRouter(FeatureDisplay);
