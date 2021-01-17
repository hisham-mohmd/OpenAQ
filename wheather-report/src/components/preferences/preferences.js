import React, { Component } from 'react';
import axios from "../../axios";
import './preferences.css';
import { withRouter } from "react-router-dom";
import Chart from '../../common/graph/graph';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class preferences extends Component {
    state = {
        loading: true,
        cities: [],
        currentCity: '',
        cityData: [],
        loadGraph: false,
        date: '',
        disabled: false
    }
    componentDidMount() {
        this.getCities();
    }
    getCities = async () => {
        await axios.get('/report/cities').then(response => {
            if (response.status === 200) {
                this.setState({ loading: false, cities: response.data });
            } else {
                this.setState({ loading: false, cities: [] });
            }
        });
    }
    formatDateForInput = (date) => {
        return moment(date).format('yyyy-MM-DD')
    }
    onSelectCity = async () => {
        this.setState({ loadGraph: true, disabled: true })
        let date = this.formatDateForInput(this.state.date);
        await axios.get('/report/measurements', { params: { city: this.state.currentCity, date_from: date, date_to: date } }).then(response => {
            if (response.status === 200) {
                this.setState({ loadGraph: false, cityData: response.data, disabled: false });
            } else {
                this.setState({ loadGraph: false, cityData: [], disabled: false });
            }
        })
    }
    render() {
        const { loading, cities, loadGraph, cityData, date } = this.state;
        return (
            <div className="container preferences">
                <div className="row justify-content-center d-flex">
                    <form className="pref-form col-10 col-md-10 col-lg-5 col-xl-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="d-flex align-items-end justify-content-center mt-3 mb-2">
                            <img className="nav-icon" src={require('../../assets/icons/clouds.svg')} alt="" />
                            <h2 className="ml-2 nav-logo logo-text">OpenAQ wheather reports</h2>
                        </div>
                        {
                            loading
                                ? <div className="d-flex justify-content-center">
                                    <div className="loader"></div>
                                </div>
                                : <>
                                    <h5 className="sub-text">Select your preferences</h5>
                                    <div className="form-group d-flex flex-column">
                                        <label className="form-field text-left pb-2">Select city</label>
                                        <select className="form-control" onChange={(e) => this.setState({ currentCity: e.target.value })}>
                                            <option value="">-Select city-</option>
                                            {
                                                cities.length && cities.map((city, i) => {
                                                    return (
                                                        <option key={i} value={city.city}>{city.city}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group d-flex flex-column pt-3">
                                        <label className="form-field text-left pb-2">Select Date</label>
                                        <div className="date-picker">
                                            <DatePicker dateFormat="dd/MM/yyyy" selected={date} onChange={date => this.setState({ date: date })} />
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mt-3" onClick={this.onSelectCity} disabled={this.state.disabled}>Get wheather</button>
                                </>
                        }
                    </form>
                </div>
                {
                    cityData.length
                        ? < div className="d-flex flex-column justify-content-center graph-chart">
                            <h4>{this.state.currentCity}</h4>
                            {
                                loadGraph
                                    ? <div className="loader"></div>
                                    : <Chart data={this.state.cityData} />
                            }
                        </div>
                        : <></>
                }
            </div>
        );
    }
}
export default withRouter(preferences);