import React, { Fragment, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { fetchCountries } from './../actions';
import { connect } from "react-redux";

function Countries({ countries, fetchCountries }) {

  const [countryData, setCountryData] = useState(countries);

  useEffect(() => {
    if (!countries.length) {
      fetchCountries();
    }
  }, []);

  const handleChange = (event) => {
    const search = event.target.value;
    if (search) {
      const regex = new RegExp('^' + search, 'i');
      const filteredData = countries.filter(country => regex.test(country.name));
      setCountryData(filteredData);
    } else {
      setCountryData(countries);
    }
  };

  return (
    <Fragment>
      <div className="row header">
        <h2>Countries</h2>
        <div className="input-field col s6">
          <input
            placeholder="Search Country"
            type="text"
            className="search-input"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row">
        {
          countryData.map(country => {
            return (
              <div key={country.name} className="col s12 m6 l4">
                <div className="card">
                  <div className="card-image">
                    <img src={country.flag} />
                    <a className="btn-floating halfway-fab waves-effect waves-light red">
                      {country.currencies[0].symbol}
                    </a>
                  </div>
                  <div className="card-content">
                    <span className="card-title">{country.name}</span>
                    <pre>Region: {country.region}</pre>
                    <pre>Capital: {country.capital}</pre>
                    <pre>Population: {country.population.toLocaleString()}</pre>
                    <pre>Currency: {country.currencies[0].name} - {country.currencies[0].code}</pre>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </Fragment>
  );
}

Countries.defaultProps = {
  countries: [],
  fetchCountries: null
};
Countries.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.any),
  fetchCountries: PropTypes.func
};

const loadData = store => store.dispatch(fetchCountries());

const mapStateToProps = state => ({ countries: state.countries });
const mapDispatchToProps = { fetchCountries }

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(Countries),
  loadData
};
