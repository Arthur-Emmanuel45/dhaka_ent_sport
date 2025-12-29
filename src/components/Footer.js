import React from 'react';
import './Footer.css';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="site-footer">
            <Header></Header>
            <div className="container">
                <div className='footer-inner'>
                    <h5>Stay Connected with Us</h5>
                    <div className="footer-social-links">
                         <div className="facebook-socials footer-socials">
                            <a href="www.google.com"><FontAwesomeIcon icon={faXTwitter} size='1x'></FontAwesomeIcon></a>
                            <p>#number</p>
                        </div>
                        <div className="twitter-socials footer-socials">
                            <a href="www.google.com"><FontAwesomeIcon icon={faTiktok} color='#000' size='1x'></FontAwesomeIcon></a>
                            <p>#number</p>
                        </div>
                        <div className="youtube-socials footer-socials">
                            <a href="www.google.com"><FontAwesomeIcon icon={faYoutube} color='#ff0000ff' size='1x'></FontAwesomeIcon></a>
                            <p>#number</p>
                        </div>
                         <div className="facebook-socials footer-socials">
                            <a href="www.google.com"><FontAwesomeIcon icon={faFacebook} size='1x'></FontAwesomeIcon></a>
                            <p>#number</p>
                        </div>
                    </div>
                </div>
                <div className="about">
                    <h5>ABOUT</h5>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem</p>
                </div>
            </div>
            <div className='footer-bottom'>
                <p>© {new Date().getFullYear()} Dhaka Entertainment News (DEN). All rights reserved.</p>
                <p className="small">Designed &amp; built by Dhaka Art</p>
            </div>
        </footer>
    );
}

export default Footer;
