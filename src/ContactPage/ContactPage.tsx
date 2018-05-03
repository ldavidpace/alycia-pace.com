import * as React from 'react';

require('./ContactPage.css')
const aboutImage = require('../aboutImage.jpeg');

class ContactPage extends React.Component {
  render() {
    return <div> 
      <img src={aboutImage} className={'contactImage'}></img>
      <div className={'contactBlurb'}>Alycia Pace lives in Utah with her husband, David, and her daughter, Colette. She studied Animation at Brigham Young University and is now working as a freelancer. Alycia loves fortune cookies, the smell of bookstores, and watching movies from the 50s.</div>
      <div className={'contactBlurb'}> <b>EMAIL</b>: inqury@alyciapace.com</div>
    </div>
  }
}

export default ContactPage;