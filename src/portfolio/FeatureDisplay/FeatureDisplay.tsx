// import { createPortal } from 'react-dom';
import * as $ from 'jquery';
import * as React from 'react';
// import { parse } from 'qs'
import {
  Link, useParams,
} from 'react-router-dom';

import Analytics from '../Analytics';
import Images from '../images/javascriptGenImages';
// import PictureShow from '../PictureShow';
import history from '../myHistory';
import './FeatureDisplay.css';


const FeatureDisplay = () => {
  const params = useParams<{view: string}>();
  const nodeRef = React.useRef($(`<div id="modalContainer"></div>`));

  const getPreviousLink = (id: string) => {
    let nextFrame = (parseInt(id, 10) - 1);
    if (nextFrame < 0) {
      nextFrame = getCurrentFolderList().length - 1;
    }
    return '#' + nextFrame;
  }

  const getNextLink = (id: string) => {
    let nextFrame = (parseInt(id, 10) + 1);
    if (nextFrame > getCurrentFolderList().length - 1) {
      nextFrame = 0;
    }
    return '#' + nextFrame;
  }

  React.useEffect(() => {
    $('body').append(nodeRef.current);
    window.addEventListener('keyup', handleKeyPress);

    return () => {
      nodeRef.current.remove();
      window.removeEventListener('keyup', handleKeyPress);
    }
  }, [])

  const handleHide = () => {
    history.push('/');
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      handleHide();
    }
  }

  const getCurrentFolderList = () => {
    const folder = Images.find(folder => folder.name === params.view)


    const files = folder ? folder.contents : Images.reduce((acc: any, folder) => {
      return [...acc, ...folder.contents];
    }, []);
    return files;
  }

  const handleClose = () => {
    if (history.replace) {
      history.replace(window.location.pathname + window.location.search);
    } else {
      window.location.href = window.location.href.split('#')[0];
    }
  }

    const currentId = window.location.hash.substr(1);
    const folders = getCurrentFolderList();

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
          <Link to={getPreviousLink(currentId)} onClick={() => {
            Analytics.track('featurePreviousClick');
            const root = document.querySelector('#root');
            root && root.scrollTo(0,0);
          }}>
            back
          </Link>
          <Link to={getNextLink(currentId)} onClick={() => {
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

export default FeatureDisplay;
