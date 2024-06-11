import json
import pycountry
from pycountry_convert import country_alpha2_to_country_calling_code

def get_country_info():
    country_info_list = []
    for country in pycountry.countries:
        country_code = country.alpha_2
        telephone_code = country_alpha2_to_country_calling_code(country_code)
        country_info = {
            "name": country.name,
            "country_code": country_code,
            "telephone_code": f"+{telephone_code}",
            "flag_image": f"https://www.countryflags.io/{country_code}/flat/64.png",
            "currency_code": country.currency.alpha_3 if hasattr(country, 'currency') else None,
            "currency_symbol": country.currency.symbol if hasattr(country, 'currency') else None,
            "currency_name": country.currency.name if hasattr(country, 'currency') else None
        }
        country_info_list.append(country_info)
    return country_info_list

if __name__ == "__main__":
    countries = get_country_info()
    with open('countries.json', 'w') as f:
        json.dump(countries, f, indent=4)
