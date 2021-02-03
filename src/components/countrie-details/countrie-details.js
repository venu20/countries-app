import React, { Component } from 'react'

export default class CountrieDetails extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {

    }

    goBack(){
        this.props.showAll();
    }

    showDetails(event){
        console.log(event.target.textContent, 'border code');
        this.props.showBorders(event.target.textContent);
    }
    
    render() {
        const { 
            name,
            flag,
            borders,
            population,
            region,
            subregion,
            capital,
            languages,
            topLevelDomain,
            nativeName,
            currencies } = this.props.countrie;
            const content  = [region, subregion, capital, languages, currencies]
        return (
            <div className="countrie-details">
                <button className="btn btn-secondary" onClick={this.goBack.bind(this)}>
                    <i className="icon">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="svg-icon"><g id="Arrow_Left_-_32" data-name="Arrow Left - 32"><path d="M32,16a1,1,0,0,1-1,1H3.41l10.3,10.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-12-12a1,1,0,0,1,0-1.42l12-12a1,1,0,1,1,1.42,1.42L3.41,15H31A1,1,0,0,1,32,16Z"></path></g></svg>
                    </i>
                    Back
                    </button>
                <div className="about">
                    <figuare>
                        <img src={flag} />
                    </figuare>
                    <section className="details">
                        <h2 className="header">{name}</h2>
                        <div className="countrie-content">
                            <div className="single-items">
                            <p><strong>Native Name:</strong> {nativeName}</p>
                            <p><strong>Population:</strong> {population}</p>
                            <p><strong>Region:</strong> {region}</p>
                            <p><strong>Sub Region:</strong> {subregion}</p>
                            <p><strong>Capital:</strong> {capital}</p>
                            </div>
                            <div className="multiple-items">
                            <p><strong>Languages:</strong> {languages.map((language) =>language.name).join(',')}</p>
                            <p><strong>currencies:</strong> {currencies.map((currencie) => currencie.name).join(',')}</p>
                            <p><strong>Top Level Domain:</strong> {topLevelDomain}</p>
                            </div>
                        </div>
                        <div className="footer">
                            <h5><strong>Border Countries:</strong></h5>
                            {
                                borders.map((border) => {
                                    return <span onClick={this.showDetails.bind(this)}>{border}</span>
                                })
                            }
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
