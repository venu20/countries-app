import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Countries from './components/countries/countries';

const changeTheme = () => {
  const body = document.querySelector('body');

  if (body.classList.contains('lights-off')) {
    body.classList.add('lights-on')
    body.classList.remove('lights-off')
  } else {
    body.classList.add('lights-off')
    body.classList.remove('lights-on')
  }
}

changeTheme()

ReactDOM.render(
  <React.StrictMode>
    <div className="content">
    <header>
      <h1>
        Where in the world?
      </h1>
      <button onClick={changeTheme} className="btn btn-secondary">
        <i className="icon icon-lightsOff">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="svg-icon"><g id="ico-moon-32"><path d="M30.7,22.54a1,1,0,0,0-1.21-.15A10.65,10.65,0,0,1,24,24,11,11,0,0,1,21,2.44a1,1,0,0,0,0-1.94A16.35,16.35,0,0,0,17,0,16,16,0,1,0,30.87,23.74,1,1,0,0,0,30.7,22.54Z"></path></g></svg>
        </i>
        <span>Dark Mode</span>
      </button>
      </header>
      <Countries />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
