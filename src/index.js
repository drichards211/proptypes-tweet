import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import moment from 'moment';
import { runInThisContext } from 'vm';
/* import mainImage from './logo512.png'; */

function Tweet({ tweet }) {
  return (
    <div className="tweet">
      <Avatar hash={tweet.gravatar}/>
      <div className='content'>
        <Author author={tweet.author}/>
        <Time time={tweet.timestamp}/>
        <Message text={tweet.message}/>
        <div className='buttons'>
          <ReplyButton/>
          <RetweetButton count={tweet.retweets}/>
          <LikeButton count={tweet.likes}/>
          <MoreOptionsButton/>
        </div>
      </div>
    </div>
  );
}
Tweet.propTypes = {
  tweet: PropTypes.shape({
    message: PropTypes.string.isRequired,
    gravatar: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    likes: PropTypes.number.isRequired,
    retweets: PropTypes.number.isRequired,
    timestamps: PropTypes.string.isRequired
  }).isRequired
};

const testTweet = {
  message: 'Something about cats.',
  gravatar: 'xyz',
  author: {
    handle: 'catperson',
    name: 'IAMA Cat Person'
  },
  likes: 2,
  retweets: 17,
  timestamps: '2016-07-30 21:24:37'
};

function Message({ text }) {
  return (
    <div className='message'>
      {text}
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string
};

function Author({ author }) {
  const { name, handle } = author;
  return (
    <span className='author'>
      <span className='name'>{name}</span>
      <span className='handle'>@{handle}</span>
    </span>
  );
}
Author.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired
  }).isRequired
};

function Avatar({ hash }) {
  const url = `https://www.gravatar.com/avatar/${hash}`;
  return (
    <img
      src={url}
      className="avatar"
      alt="avatar" />
  );
}

Avatar.propTypes = {
  hash: PropTypes.string
};

const Time = ({ time }) => {
  const timeString = moment(time).fromNow();
  return (
    <span className='time'>{timeString}</span>
  );
}

Time.propTypes = {
  time: PropTypes.string
};

const ReplyButton = () => (
  <i className='fa fa-reply reply-button'/>
);

function getRetweetCount(count) {
  if (count > 0) {
    return (
      <span className="retweet-count">
        {count}
      </span>
    );
  } else {
    return null;
  }
}

const RetweetButton = ({ count }) => (
  <span className="retweet-button">
    <i className='fa fa-retweet'/>
    {getRetweetCount(count)}
  </span>
);

RetweetButton.propTypes = {
  count: PropTypes.number
};

const LikeButton = ({ count }) => (
  <span className='like-button'>
    <i className='fa fa-heart'/>
    <span className='like-count'>
        {count ? count : null}
    </span>
  </span>
);

LikeButton.propTypes = {
  count: PropTypes.number
};

const MoreOptionsButton = () => (
  <i className='fa fa-ellipsis-h more-options-button'/>
);

/* ReactDOM.render(<Tweet tweet={testTweet}/>,
  document.querySelector('#root')); */

// EXERCISES

function RenderMe({ data }) {
  return (
    <div>
      <ul>
        <li>{data.potato}</li>
      </ul>

    </div>
  );
}

const testData = {
  potato: 'fries',
  vegetable: 'ketchup',
  number: 42
}

// Exercise 1:
const AddressLabel = ({ person }) => {
  let { firstName, lastName, streetAddress, city, state, zip } = person;
  return (
    <div className='mailing-label'>
      <div className='ex1-name'>{firstName} {lastName}</div>
      <div className='addressLine1'>{streetAddress}</div>
      <div className='addressLine2'>{city} {state} {zip}</div>
    </div>
  );
}
AddressLabel.propTypes = {
  person: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    streetAddress: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired
  }).isRequired
}

const testPerson1 = {
  firstName: 'Samuel',
  lastName: 'Potatohead',
  streetAddress: '123 Fake St.',
  city: 'Boston',
  state: 'MA',
  zip: '02118'
}

// Exercise 2:
const Envelope = ({ toPerson, fromPerson }) => {
  return (
    <div className='envelope'>
      <div className='from-label'>
        <AddressLabel person={fromPerson}/>
      </div>
      <div className='to-label'>
        <AddressLabel person={toPerson}/>
      </div>
      <Stamp/>
    </div>
  );
}

const Stamp = () => {
  return (
    <div className='stamp'>
      <span className='text'>STAMP</span>
    </div>
  );
}

const testPerson2 = {
  firstName: 'Spuds',
  lastName: 'Mackenzie',
  streetAddress: '456 Fake St.',
  city: 'San Francisco',
  state: 'CA',
  zip: '94101'
}

/* ReactDOM.render(<Envelope fromPerson={testPerson1} toPerson={testPerson2}/>,
  document.querySelector('#root')); */

// Exercise 3:
const CreditCard = ({ cardInfo }) => {
  let {name, expDate, number, bankName} = cardInfo;
  return (
    <div className='credit-card'>
      <div className='bank-name'>{bankName}</div>
      <div className='card-number'>{number}</div>
      <div className='first-four-digits'>{number.substring(0, 4)}</div>
      <div className='expiration'>
        <span className='valid-thru'>Valid Thru</span> {expDate}
      </div>
      <div className='cc-name'>{name}</div>
    </div>
  );
}
CreditCard.propTypes = {
  cardInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    expDate: PropTypes.string.isRequired,
    bankName: PropTypes.string.isRequired
  }).isRequired
};

const CcData = {
  name: 'John Smiley',
  expDate: '02/24',
  number: '1234 5678 8765 4321',
  bankName: 'Potato Bank'
}

  /* ReactDOM.render(<CreditCard cardInfo={CcData}/>,
    document.querySelector('#root')); */

// Exercise 4:
let Poster = ({ posterData }) => {
  const { image, title, text } = posterData;
  return (
    <div className='poster'>
      <div className='image-container'>
        <img src={image} alt='React logo'/>
      </div>
      <div className='title'>
        <span className='first-letter'>
          {title.substring(0,1)}
        </span>
        <span className="center">
          {title.substring(1, title.length - 1)}
        </span>
        <span className="last-letter">
          {title.substring(title.length - 1)}
        </span>
      </div>
      <div className='caption'>{text}</div>
    </div>
  );
}
Poster.propTypes = {
  posterData: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired
};

let testPoster = {
  image: require("../src/images/logo192.png"),
  title: 'React is Magic',
  text: '9 out of 10 potatoes agree!'
}

/* ReactDOM.render(<Poster posterData={testPoster}/>,
  document.querySelector('#root')); */

// Exercise 5:

let emailData = {
  sender: 'John Potatohead',
  subject: 'French fries',
  date: '01/15/2020',
  message: 'French fries are bad. Let\'s have salad instead.' 
}

const Email = ({ contents }) => {
  let { sender, subject, date, message } = contents;
  return (
    <div className='email'>
      <input type='checkbox'/>
      <i className='fa fa-thumb-tack pin'/>
      <div className='content'>
        <div className='top-line'>
          <div className='sender'>{sender}</div>
          <div className='subject'>{subject}</div>
          <div className='date'>{date}</div>
        </div>
        <div className='message'>{message}</div>
      </div>
    </div>
    );
}
Email.propTypes = {
  contents: PropTypes.shape({
    sender: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired
};

function Everything() {
  return (
    <div>
      <h2>Example: Tweet with proptypes</h2>
      <Tweet tweet={testTweet}/>
      <br/>
      <h2>Exercise #1 - Create an address label component</h2>
      <AddressLabel person={testPerson1}/> 
      <br/>
      <h2>Exercise #2 - Create an envelope component</h2>
      <Envelope fromPerson={testPerson1} toPerson={testPerson2}/>
      <br/>
      <h2>Exercise #3 - Create a credit card component</h2>
      <CreditCard cardInfo={CcData}/>
      <br/>
      <h2>Exercise #4 - Create a poster component</h2>
      <Poster posterData={testPoster}/>
      <br/>
      <h2>Exercise #5 - Create a single-line email</h2>
      <Email contents={emailData}/>
    </div>
  )
}
ReactDOM.render(<Everything/>,
  document.querySelector('#root'));