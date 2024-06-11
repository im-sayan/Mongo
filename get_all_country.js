const countryDataCodes = require("country-data-codes");
const fs = require("fs");

const countryInfoList = [];

countryDataCodes.getCountryList().forEach((country) => {
  const countryCode = country.isoAlpha2;
  const telephoneCode = countryDataCodes.getCallingCode(countryCode);
  const flagImage = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`; // Using flagcdn.com for flag images
  const flagEmoji = getFlagEmoji(countryCode); // Function to get flag emoji
  const currencyInfo = countryDataCodes.getCurrency(countryCode);

  const countryInfo = {
    countryName: country.name,
    countryCode: countryCode,
    telephoneCode: `+${telephoneCode.code}`,
    countryFlag: flagImage,
    flagEmoji: flagEmoji,
    currencyCode: currencyInfo.code,
    currencySymbol: currencyInfo.symbol,
    currencyName: currencyInfo.name,
  };

  countryInfoList.push(countryInfo);
});

const jsonData = JSON.stringify(countryInfoList, null, 2);

fs.writeFileSync("countries.json", jsonData);

console.log("Country data saved to countries.json");

// Function to get flag emoji
function getFlagEmoji(countryCode) {
  const codePoints = countryCode
 .toUpperCase()
 .split('')
 .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}