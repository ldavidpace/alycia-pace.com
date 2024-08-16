import * as React from 'react';

import aboutImage from '../aboutImage.jpeg';
import './ContactPage.css';


class ContactPage extends React.Component {
  render() {
    return <div className={'contactContainer'}> 
      <img src={aboutImage} className={'contactImage'}></img>
      <div className={'contactBlurb'}>Alycia Pace lives in Utah with her husband and children. She studied Animation at Brigham Young University and is now working as a freelancer. Alycia loves fortune cookies, the smell of bookstores, and watching movies from the 50s.</div>
      <div className={'contactBlurb'}> <b>EMAIL</b>: inqury@alyciapace.com</div>
    </div>
  }
}

export default ContactPage;