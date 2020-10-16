import React, { Fragment, useEffect } from "react";
import PropTypes from 'prop-types';
import { fetchCountries } from './../actions';
import { connect } from "react-redux";

function Countries({ countries, fetchCountries }) {

  useEffect(() => {
    if (!countries.length) {
      fetchCountries();
    }
  }, []);

  return (
    <Fragment>
      <h2>Countries</h2>
      <div className="row">
        {
          countries.map(country => {
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
