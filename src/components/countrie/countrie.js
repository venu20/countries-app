import React, { Component } from 'react'
import { isElementVisible } from "../../helpers/helper";
export default class Countrie extends Component {
    componentDidMount() {
        const { alpha3Code } = this.props.details;
        const ele = document.querySelector(`#${alpha3Code}`);
        if(ele && isElementVisible(ele)){
            const imageEle = document.querySelector(`#${alpha3Code} img`);
            const source = imageEle.getAttribute('data-src');
            imageEle.setAttribute('src', source);
        }
    }

    showDetails(event){
        this.props.showCountrieDetails(event, this.props.details);
        return false;
    }

    
    render() {
        const {name, population, flag, alpha3Code, region, capital} = this.props.details;
        return (
             // eslint-disable-next-line
            <a className="card" href="#" id={alpha3Code} onClick={this.showDetails.bind(this)}>
                <div className="card-image">
                    <img data-src={flag} loading="lazy" alt={`${name} flag`}  />
                </div>
                <div className="card-content">
                    <h3>{name}</h3>
                    <div className="sub-details">
                    <p> <strong>Population:</strong> {population}</p>
                    <p> <strong>Region:</strong> {region}</p>
                    <p> <strong>Capital:</strong> {capital}</p>
                    </div>
                </div>
            </a>
        )
    }
}
