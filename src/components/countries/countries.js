import React, { Component } from 'react'
import CountrieDetails from '../countrie-details/countrie-details';
import Countrie from "../countrie/countrie";
import { addClass, removeClass } from '../../helpers/helper';
import {END_POINTS, BASE_URL} from '../../constants/urlEndpoints';
export default class Countries extends Component {
    constructor(props){
        super(props);
        this.state = {
            countries: [],
            regions: [],
            search: '',
            selectedRegion: '',
            showDetails: false,
            countrieDetail: {}
        };
    }

    /**
     * Function to close drodown items on document(outside click)
     */
    closeDropdown(){
        document.addEventListener('click', () => {
            const dropdownContent = document.querySelector('.dropdown-content');
            if(dropdownContent){
                dropdownContent.style.display = 'none'        
            }
        });
    }

    stopAnchorHref(){
        document.querySelectorAll("a[href^='#']").forEach(node => {
            node.addEventListener('click', e => {
              e.preventDefault();
              console.log(e.target.href);
              //this.props.history.push(e.target.href);
            });
          });
    }

    componentDidMount() {
        this.stopAnchorHref();

        this.updateData()
        .then((res) => {
            // filter all regions
            const {countries} = this.state;
            const regions = countries
            .map((countrie) => countrie.region)
            .reduce((list, current)=>{
                if(!list.includes(current)){
                    list.push(current);
                }
                return list;
            }, []);
            this.setState({regions: regions});
        });
        this.closeDropdown();
    }

    /**
     * Function to show cards on initial load and search
     * @param {*} url 
     */
    updateData(url = `${BASE_URL}/all`){
    return fetch(url)
        .then((res) => {
            if(res.status === 404){
                return [];
            }
            return res.json();
        })
        .then((countries) => {
            this.setState({countries: countries});
        })
        .catch((err) => {
            return new Error(err)
        })
    }

    /**
     * Function to show search results based on user input
     * @param {*} event 
     */
    handleChange(event){
        event.preventDefault();
        const searchValue = event.target.value;
        let url;
        this.setState({search: searchValue, selectedRegion: ''});
        const activeEle = document.querySelector('.dropdown-item.active')
        if(activeEle){
            activeEle.remove('active')
        }
        if(searchValue.length){
            url = `https://restcountries.eu/rest/v2/name/${searchValue}`;
        }
        this.updateData(url);
    }

    /**
     * Toggle dropdown , open and close dropdown items
     * @param {*} event 
     */
    toggleDropdown(event){
        const dropdownContent = document.querySelector('.dropdown-content');
        const isVisible = window.getComputedStyle(dropdownContent).display;
        dropdownContent.style.display = isVisible === 'none' ? 'block' : 'none';
        event.stopPropagation();
    }

    /**
     * Function to filter based on country region
     * @param {*} event 
     */
    filter(event){
        const activeEle = document.querySelector('.dropdown-item.active')
        if(event.target.classList.contains('active')){
            this.updateData();
            removeClass(activeEle, 'active')
            return;
        }
        const selected = event.target.textContent;
        this.setState({selectedRegion: selected, search: ''});
        if(activeEle){
            removeClass(activeEle, 'active')
        }
        addClass(event, 'active');
        const url = `https://restcountries.eu/rest/v2/region/${selected}`;
        this.updateData(url);
    }

    showDetailsComponent(event, countrie) {
        if(event){
            event.stopPropagation();
        }
        this.setState({showDetails: true, countrieDetail: countrie})
    }

    showAll(){
        this.setState({showDetails: false});
    }

    showCountrie(alphaCode){
        const URL = `${BASE_URL}${END_POINTS.alphaCode}/${alphaCode}`;
        fetch(URL)
        .then((res) => {
            if(res.status === 404){
                return [];
            }
            return res.json();
        })
        .then((countrie) => {
            this.setState({showDetails: true, countrieDetail: countrie})
        })
        .catch((err) => {
            return new Error(err)
        })
    }

    render() {
        const {countries, search, regions, showDetails, countrieDetail} = this.state;
        if(showDetails){
            return (
                <CountrieDetails countrie={countrieDetail} showAll={this.showAll.bind(this)} showBorders={this.showCountrie.bind(this)}></CountrieDetails>
            )
        }
        return (
            <div className="main-content">
                        <nav className="navigation">
                        <div className="search-box">
                            <i className="icon icon-search">
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="svg-icon">
                                <g id="Search_-_32" data-name="Search - 32">
                                    <path d="M0,12a12,12,0,0,0,18.94,9.77l9.65,9.64a2,2,0,0,0,2.82-2.82l-9.64-9.65A12,12,0,1,0,0,12Zm2,0A10,10,0,1,1,12,22,10,10,0,0,1,2,12Z"></path></g></svg>
                            </i>
                            <input id="search-box" value={search} type="text" className="search" onChange={this.handleChange.bind(this)} placeholder="Search for a country" />
                        </div>
                        
                        <div className="filter" onClick={this.toggleDropdown.bind(this)}>
                            <button className="btn btn-secondary">
                            <span>
                                Filter by Region
                            </span>
                            <i className="icon icon-arrow-down">
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="svg-icon carot-down">
                                <g id="Caret_Up_-_32" data-name="Caret Up - 32"><path d="M29,23a1,1,0,0,1-.71-.29L16,10.41,3.71,22.71a1,1,0,0,1-1.42-1.42l13-13a1,1,0,0,1,1.42,0l13,13a1,1,0,0,1,0,1.42A1,1,0,0,1,29,23Z"></path></g></svg>

                            </i>
                            </button>
                            <div className="dropdown dropdown-content">
                                {
                                    regions.map((region) => {
                                        return (<div className="dropdown-item" onClick={this.filter.bind(this)}>
                                            {region}
                                        </div>)
                                    })
                                }
                            </div>
                        </div>
                        </nav>
                        <main className="countries" tabIndex="0">
                            {
                            countries.map((countrie) => {
                                return <Countrie key={countrie.name} details={countrie} showCountrieDetails={this.showDetailsComponent.bind(this)}></Countrie>;
                            })
                            }
                        </main>
                    </div>
        )
    }
}
