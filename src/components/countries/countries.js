import React, { Component } from 'react'
import { act } from 'react-dom/test-utils';
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

    closeDropdown(){
        document.addEventListener('click', () => {
            const dropdownContent = document.querySelector('.dropdown-content');
            if(dropdownContent  ){
                dropdownContent.style.display = 'none'        
            }
        });
    }

    componentDidMount() {
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

    toggleDropdown(event){
        const dropdownContent = document.querySelector('.dropdown-content');
        const isVisible = window.getComputedStyle(dropdownContent).display;
        dropdownContent.style.display = isVisible === 'none' ? 'block' : 'none';
        event.stopPropagation();
    }

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

    showDetailsComponent(countrie) {
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
            <div class="main-content">
                        <nav class="navigation">
                        <div class="search-box">
                            <i class="icon icon-search">
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="svg-icon">
                                <g id="Search_-_32" data-name="Search - 32">
                                    <path d="M0,12a12,12,0,0,0,18.94,9.77l9.65,9.64a2,2,0,0,0,2.82-2.82l-9.64-9.65A12,12,0,1,0,0,12Zm2,0A10,10,0,1,1,12,22,10,10,0,0,1,2,12Z"></path></g></svg>
                            </i>
                            <input id="search-box" value={search} type="text" class="search" onChange={this.handleChange.bind(this)} placeholder="Search for a country" />
                        </div>
                        
                        <div class="filter" onClick={this.toggleDropdown.bind(this)}>
                            <button class="btn btn-secondary">
                            <span>
                                Filter by Region
                            </span>
                            <i class="icon icon-arrow-down">
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="svg-icon carot-down">
                                <g id="Caret_Up_-_32" data-name="Caret Up - 32"><path d="M29,23a1,1,0,0,1-.71-.29L16,10.41,3.71,22.71a1,1,0,0,1-1.42-1.42l13-13a1,1,0,0,1,1.42,0l13,13a1,1,0,0,1,0,1.42A1,1,0,0,1,29,23Z"></path></g></svg>

                            </i>
                            </button>
                            <div class="dropdown dropdown-content">
                                {
                                    regions.map((region) => {
                                        return (<div class="dropdown-item" onClick={this.filter.bind(this)}>
                                            {region}
                                        </div>)
                                    })
                                }
                            </div>
                        </div>
                        </nav>
                        <main class="countries" tabindex="0">
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
