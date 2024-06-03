const Country = require('country-state-city').Country;
const State = require('country-state-city').State;

// Get all countries
const countries = Country.getAllCountries();

// Initialize an array to store all states
let allStates = [];

// Get all states for each country
countries.forEach((country) => {
  // Get states of the current country
  let states = State.getStatesOfCountry(country.isoCode);
  // Add each state to the allStates array
  states.forEach((state) => {
    allStates.push(state.name);
  });
});

console.log(allStates, "states");
