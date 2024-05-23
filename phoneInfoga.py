import phonenumbers
from geopy.geocoders import Nominatim

phone_number = '+917718123112' # replace with your phone number

# Parse the phone number
parsed_number = phonenumbers.parse(phone_number, "US")

# Print phone number details
print('Phone number:', phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL))
print('Country:', phonenumbers.region_code_for_country_code(parsed_number.country_code))
print('Carrier:', phonenumbers.carrier_for_phone_number(parsed_number))
print('National number:', phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.NATIONAL))
print('National number (raw):', parsed_number.national_number)
print('Extension:', parsed_number.extension)
print('Is valid:', phonenumbers.is_valid_number(parsed_number))
print('Is possible:', phonenumbers.is_possible_number(parsed_number))

# Format the phone number as international
international_number = phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL)

# Get the area code
area_code = international_number[:3]

# Use the Nominatim geocoder to get the latitude and longitude of the area code
geolocator = Nominatim(user_agent="phoneNumberExercises")
location = geolocator.geocode(area_code)

# Print the latitude and longitude
print('Latitude:', location.latitude)
print('Longitude:', location.longitude)