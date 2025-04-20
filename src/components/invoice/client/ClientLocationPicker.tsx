
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { countries, getStatesByCountry, getCitiesByState } from "@/utils/locationData";

interface ClientLocationPickerProps {
  country: string;
  state: string;
  city: string;
  zip: string;
  onCountryChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onZipChange: (value: string) => void;
}

const ClientLocationPicker = ({ 
  country, 
  state, 
  city, 
  zip,
  onCountryChange,
  onStateChange,
  onCityChange,
  onZipChange
}: ClientLocationPickerProps) => {
  const [availableStates, setAvailableStates] = useState<{ code: string; name: string }[]>([]);
  const [availableCities, setAvailableCities] = useState<{ code: string; name: string }[]>([]);

  // Update available states when country changes
  useEffect(() => {
    if (country) {
      const filteredStates = getStatesByCountry(country);
      setAvailableStates(filteredStates);
      
      // If current state is not in the list of available states, reset it
      if (filteredStates.length > 0 && !filteredStates.some(s => s.code === state)) {
        onStateChange(filteredStates[0].code);
      }
    } else {
      setAvailableStates([]);
    }
  }, [country, state, onStateChange]);

  // Update available cities when state changes
  useEffect(() => {
    if (state) {
      const filteredCities = getCitiesByState(state);
      setAvailableCities(filteredCities);
      
      // If current city is not in the list of available cities, reset it
      if (filteredCities.length > 0 && !filteredCities.some(c => c.name === city)) {
        onCityChange(filteredCities[0].name);
      }
    } else {
      setAvailableCities([]);
    }
  }, [state, city, onCityChange]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="clientCountry">Country</Label>
          <Select 
            value={country || 'IN'} 
            onValueChange={onCountryChange}
          >
            <SelectTrigger id="clientCountry">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="clientState">State/Province</Label>
          <Select 
            value={state} 
            onValueChange={onStateChange}
            disabled={availableStates.length === 0}
          >
            <SelectTrigger id="clientState">
              <SelectValue placeholder={availableStates.length === 0 ? "Select country first" : "Select state"} />
            </SelectTrigger>
            <SelectContent>
              {availableStates.map((state) => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="clientCity">City</Label>
          {availableCities.length > 0 ? (
            <Select 
              value={city} 
              onValueChange={onCityChange}
            >
              <SelectTrigger id="clientCity">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {availableCities.map((city) => (
                  <SelectItem key={city.code} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id="clientCity"
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              placeholder="Enter city"
            />
          )}
        </div>
        
        <div>
          <Label htmlFor="clientZip">Zip/Postal Code</Label>
          <Input
            id="clientZip"
            value={zip}
            onChange={(e) => onZipChange(e.target.value)}
            placeholder="Enter postal code"
          />
        </div>
      </div>
    </>
  );
};

export default ClientLocationPicker;
