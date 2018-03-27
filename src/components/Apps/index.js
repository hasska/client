import React, { Component } from 'react';
import { Popover, Message, Progress, Dialog, Loading, Tabs, Form, Input,
   Checkbox, Card, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import Title from '../Title';
import fb from '../../dist/img/apps/facebook.png';
import tw from '../../dist/img/apps/twitter.png';
import insta from '../../dist/img/apps/instagram.png';
import linkedin from '../../dist/img/apps/linkedin.png';
import github from '../../dist/img/apps/linkedin.png';
import mailchimp from '../../dist/img/apps/mailchimp.png';
import mandrill from '../../dist/img/apps/mandrill.png';
import mailerlite from '../../dist/img/apps/mailerlite.png';
import mailgun from '../../dist/img/apps/mailgun.png';
import gmail from '../../dist/img/apps/gmail.png';
import messagebird from '../../dist/img/apps/messagebird.png';
import parse from '../../dist/img/apps/parse.png';
import clicksend from '../../dist/img/apps/clicksend.png';
import twillo from '../../dist/img/apps/twillo.png';
import firebase from '../../dist/img/apps/firebase.jpg';
import onesignal from '../../dist/img/apps/onesignal.png';
import dropbox from '../../dist/img/apps/dropbox.png';
import drive from '../../dist/img/apps/drive.png';
import s3 from '../../dist/img/apps/s3.png';
import onedrive from '../../dist/img/apps/onedrive.png';
import box from '../../dist/img/apps/box.png';
import gls from '../../dist/img/apps/gls.png';
import shopfiy from '../../dist/img/apps/shopify.png';
import sheets from '../../dist/img/apps/sheets.png';
import wordpress from '../../dist/img/apps/wordpress.png';
import youtube from '../../dist/img/apps/youtube.png';
import excell from '../../dist/img/apps/excell.png';
import getresponse from '../../dist/img/apps/getresponse.png';
import customerio from '../../dist/img/apps/customerio.png';
import gc from '../../dist/img/apps/gc.png';
import bitly from '../../dist/img/apps/bitly.png';
import callendy from '../../dist/img/apps/callendy.png';
import paypal from '../../dist/img/apps/paypal.png';
import square from '../../dist/img/apps/square.png';
import stripe from '../../dist/img/apps/stripe.png';
import recurly from '../../dist/img/apps/recurly.png';





class Apps extends Component {

  render() {
    return (
      <div className="app-window">
        <div className="app-preview">
          <div className="database-single">
            <div className="database-config-wrapper apps-list">
              <Title contnet="Apps & Integrations" />
              <div className="hint-apps"><Icon name="warning" /> Apps integrations dosnt ready yet for beta version. we are integrating these apps to having more tools in your services.</div>

              <div className="database-config-form">
                <ul>
                  <li>
                    <img src={fb} />
                    <p>Facebook</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={tw} />
                    <p>Twitter</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={insta} />
                    <p>Instagram</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={linkedin} />
                    <p>Linkedin</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={youtube} />
                    <p>Youtube</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={github} />
                    <p>Github</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={mailchimp} />
                    <p>Mailchimp</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={gmail} />
                    <p>Gmail</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={mandrill} />
                    <p>Mandrill</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={mailgun} />
                    <p>MailGun</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={mailerlite} />
                    <p>Mailerlite</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={customerio} />
                    <p>CustomerIO</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={getresponse} />
                    <p>GetResponse</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={parse} />
                    <p>Parse</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={onesignal} />
                    <p>OneSignal</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={firebase} />
                    <p>Firebase</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={messagebird} />
                    <p>MessageBird</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={twillo} />
                    <p>Twillo</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={clicksend} />
                    <p>ClickSend</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={callendy} />
                    <p>Callendy</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={gc} />
                    <p>Google Calendar</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={drive} />
                    <p>Google Drive</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={dropbox} />
                    <p>Dropbox</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={onedrive} />
                    <p>OneDrive</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={s3} />
                    <p>Amazon S3</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={sheets} />
                    <p>Google Sheets</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={excell} />
                    <p>Google Excel</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={box} />
                    <p>Box</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={paypal} />
                    <p>Paypal</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={stripe} />
                    <p>Stripe</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={square} />
                    <p>Sqaure</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={recurly} />
                    <p>Recurly</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={shopfiy} />
                    <p>Shopify</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={wordpress} />
                    <p>Wordpress</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={gls} />
                    <p>Google Link Shortner</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                  <li>
                    <img src={bitly} />
                    <p>Bitly</p>
                    <button className="integrate">Integrate</button>
                    <button className="docs">Read Documentation</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Apps;
