import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { isElementVisible } from "../../helper";
export default class Countrie extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        const { alpha3Code } = this.props.details;
        const ele = document.querySelector(`#${alpha3Code}`);
        if(ele && isElementVisible(ele)){
            const imageEle = document.querySelector(`#${alpha3Code} img`);
            const source = imageEle.getAttribute('data-src');
            imageEle.setAttribute('src', source);
        }
    }

    showDetails(){
        this.props.showCountrieDetails(this.props.details);
    }

    
    render() {
        const {name, population, flag, alpha3Code, region, capital} = this.props.details;
        return (
            <a class="card" href="javascript:void(0)" id={alpha3Code} onClick={this.showDetails.bind(this)}>
                <div class="card-image">
                    <img data-src={flag} loading="lazy" alt={`${name} flag`}  />
                </div>
                <div class="card-content">
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
