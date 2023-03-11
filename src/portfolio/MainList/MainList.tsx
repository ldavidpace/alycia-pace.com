import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import ContactPage from '../ContactPage';

import Images from '../images/javascriptGenImages';
import * as styles from './MainList.module.css';

import Analytics from '../Analytics';

const MainList = () => {
    const params = useParams<{view: string}>();
    if (params.view === 'contact') return (
      <ContactPage></ContactPage>
    )
    const folder = Images.find( folder => folder.name === params.view)
    const files = folder ? folder.contents : Images.reduce( (acc, folder) => {
        return [...acc, ...folder.contents];
      }, []);

      console.log(styles, styles.container);
    return (
      <div className={styles.container}>
          {
            files.map((image, index) =>
            (
              <div className={styles.imageLink} key={index}>
                <Link to={'#'+index} key={index} replace  onClick={() => {
                  Analytics.track('pictureClick', {id: image.name}); 
                  const root = document.querySelector('#root');
                  root && root.scrollTo(0,0);
                }}>
                  <div
                    className={styles.thumbnail}
                    style={{backgroundImage: `url(${image.thumbnail}`}}
                  />
                </Link>
              </div>
              )
            )          
          }
          <div className={styles.filler}/>
          <div className={styles.filler}/>
          <div className={styles.filler}/>
      </div>
    );
}

export default MainList;
