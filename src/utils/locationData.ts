import { currencySymbols } from "@/components/dashboard/CurrencyUtils";

export type Country = {
  code: string;
  name: string;
  currency: keyof typeof currencySymbols;
};

export type State = {
  code: string;
  name: string;
  countryCode: string;
};

export type City = {
  code: string;
  name: string;
  stateCode: string;
};

// Countries with their ISO codes and default currencies
export const countries: Country[] = [
  { code: "IN", name: "India", currency: "INR" },  // Moved India to first position as default
  { code: "US", name: "United States", currency: "USD" },
  { code: "CA", name: "Canada", currency: "USD" },
  { code: "GB", name: "United Kingdom", currency: "GBP" },
  { code: "DE", name: "Germany", currency: "EUR" },
  { code: "FR", name: "France", currency: "EUR" },
  { code: "IT", name: "Italy", currency: "EUR" },
  { code: "ES", name: "Spain", currency: "EUR" },
  { code: "JP", name: "Japan", currency: "JPY" },
  { code: "AU", name: "Australia", currency: "USD" },
  { code: "CH", name: "Switzerland", currency: "CHF" },
  { code: "RU", name: "Russia", currency: "RUB" },
  { code: "BR", name: "Brazil", currency: "USD" },
  { code: "CN", name: "China", currency: "USD" },
  { code: "SG", name: "Singapore", currency: "USD" },
];

// States/provinces for select countries
export const states: State[] = [
  // United States
  { code: "AL", name: "Alabama", countryCode: "US" },
  { code: "AK", name: "Alaska", countryCode: "US" },
  { code: "AZ", name: "Arizona", countryCode: "US" },
  { code: "AR", name: "Arkansas", countryCode: "US" },
  { code: "CA", name: "California", countryCode: "US" },
  { code: "CO", name: "Colorado", countryCode: "US" },
  { code: "CT", name: "Connecticut", countryCode: "US" },
  { code: "DE", name: "Delaware", countryCode: "US" },
  { code: "FL", name: "Florida", countryCode: "US" },
  { code: "GA", name: "Georgia", countryCode: "US" },
  { code: "HI", name: "Hawaii", countryCode: "US" },
  { code: "ID", name: "Idaho", countryCode: "US" },
  { code: "IL", name: "Illinois", countryCode: "US" },
  { code: "IN", name: "Indiana", countryCode: "US" },
  { code: "IA", name: "Iowa", countryCode: "US" },
  { code: "KS", name: "Kansas", countryCode: "US" },
  { code: "KY", name: "Kentucky", countryCode: "US" },
  { code: "LA", name: "Louisiana", countryCode: "US" },
  { code: "ME", name: "Maine", countryCode: "US" },
  { code: "MD", name: "Maryland", countryCode: "US" },
  { code: "MA", name: "Massachusetts", countryCode: "US" },
  { code: "MI", name: "Michigan", countryCode: "US" },
  { code: "MN", name: "Minnesota", countryCode: "US" },
  { code: "MS", name: "Mississippi", countryCode: "US" },
  { code: "MO", name: "Missouri", countryCode: "US" },
  { code: "MT", name: "Montana", countryCode: "US" },
  { code: "NE", name: "Nebraska", countryCode: "US" },
  { code: "NV", name: "Nevada", countryCode: "US" },
  { code: "NH", name: "New Hampshire", countryCode: "US" },
  { code: "NJ", name: "New Jersey", countryCode: "US" },
  { code: "NM", name: "New Mexico", countryCode: "US" },
  { code: "NY", name: "New York", countryCode: "US" },
  { code: "NC", name: "North Carolina", countryCode: "US" },
  { code: "ND", name: "North Dakota", countryCode: "US" },
  { code: "OH", name: "Ohio", countryCode: "US" },
  { code: "OK", name: "Oklahoma", countryCode: "US" },
  { code: "OR", name: "Oregon", countryCode: "US" },
  { code: "PA", name: "Pennsylvania", countryCode: "US" },
  { code: "RI", name: "Rhode Island", countryCode: "US" },
  { code: "SC", name: "South Carolina", countryCode: "US" },
  { code: "SD", name: "South Dakota", countryCode: "US" },
  { code: "TN", name: "Tennessee", countryCode: "US" },
  { code: "TX", name: "Texas", countryCode: "US" },
  { code: "UT", name: "Utah", countryCode: "US" },
  { code: "VT", name: "Vermont", countryCode: "US" },
  { code: "VA", name: "Virginia", countryCode: "US" },
  { code: "WA", name: "Washington", countryCode: "US" },
  { code: "WV", name: "West Virginia", countryCode: "US" },
  { code: "WI", name: "Wisconsin", countryCode: "US" },
  { code: "WY", name: "Wyoming", countryCode: "US" },
  
  // Canada
  { code: "AB", name: "Alberta", countryCode: "CA" },
  { code: "BC", name: "British Columbia", countryCode: "CA" },
  { code: "MB", name: "Manitoba", countryCode: "CA" },
  { code: "NB", name: "New Brunswick", countryCode: "CA" },
  { code: "NL", name: "Newfoundland and Labrador", countryCode: "CA" },
  { code: "NS", name: "Nova Scotia", countryCode: "CA" },
  { code: "ON", name: "Ontario", countryCode: "CA" },
  { code: "PE", name: "Prince Edward Island", countryCode: "CA" },
  { code: "QC", name: "Quebec", countryCode: "CA" },
  { code: "SK", name: "Saskatchewan", countryCode: "CA" },
  
  // India
  { code: "AN", name: "Andaman and Nicobar Islands", countryCode: "IN" },
  { code: "AP", name: "Andhra Pradesh", countryCode: "IN" },
  { code: "AR", name: "Arunachal Pradesh", countryCode: "IN" },
  { code: "AS", name: "Assam", countryCode: "IN" },
  { code: "BR", name: "Bihar", countryCode: "IN" },
  { code: "CH", name: "Chandigarh", countryCode: "IN" },
  { code: "CT", name: "Chhattisgarh", countryCode: "IN" },
  { code: "DN", name: "Dadra and Nagar Haveli", countryCode: "IN" },
  { code: "DD", name: "Daman and Diu", countryCode: "IN" },
  { code: "DL", name: "Delhi", countryCode: "IN" },
  { code: "GA", name: "Goa", countryCode: "IN" },
  { code: "GJ", name: "Gujarat", countryCode: "IN" },
  { code: "HR", name: "Haryana", countryCode: "IN" },
  { code: "HP", name: "Himachal Pradesh", countryCode: "IN" },
  { code: "JK", name: "Jammu and Kashmir", countryCode: "IN" },
  { code: "JH", name: "Jharkhand", countryCode: "IN" },
  { code: "KA", name: "Karnataka", countryCode: "IN" },
  { code: "KL", name: "Kerala", countryCode: "IN" },
  { code: "LD", name: "Lakshadweep", countryCode: "IN" },
  { code: "MP", name: "Madhya Pradesh", countryCode: "IN" },
  { code: "MH", name: "Maharashtra", countryCode: "IN" },
  { code: "MN", name: "Manipur", countryCode: "IN" },
  { code: "ML", name: "Meghalaya", countryCode: "IN" },
  { code: "MZ", name: "Mizoram", countryCode: "IN" },
  { code: "NL", name: "Nagaland", countryCode: "IN" },
  { code: "OR", name: "Odisha", countryCode: "IN" },
  { code: "PY", name: "Puducherry", countryCode: "IN" },
  { code: "PB", name: "Punjab", countryCode: "IN" },
  { code: "RJ", name: "Rajasthan", countryCode: "IN" },
  { code: "SK", name: "Sikkim", countryCode: "IN" },
  { code: "TN", name: "Tamil Nadu", countryCode: "IN" },
  { code: "TG", name: "Telangana", countryCode: "IN" },
  { code: "TR", name: "Tripura", countryCode: "IN" },
  { code: "UP", name: "Uttar Pradesh", countryCode: "IN" },
  { code: "UT", name: "Uttarakhand", countryCode: "IN" },
  { code: "WB", name: "West Bengal", countryCode: "IN" },
  
  // UK
  { code: "EN", name: "England", countryCode: "GB" },
  { code: "SC", name: "Scotland", countryCode: "GB" },
  { code: "WL", name: "Wales", countryCode: "GB" },
  { code: "NI", name: "Northern Ireland", countryCode: "GB" },
];

// Major cities per state for a few countries
export const cities: City[] = [
  // A few US cities as examples
  { code: "NYC", name: "New York City", stateCode: "NY" },
  { code: "BUF", name: "Buffalo", stateCode: "NY" },
  { code: "ALB", name: "Albany", stateCode: "NY" },
  { code: "LA", name: "Los Angeles", stateCode: "CA" },
  { code: "SF", name: "San Francisco", stateCode: "CA" },
  { code: "SD", name: "San Diego", stateCode: "CA" },
  { code: "CHI", name: "Chicago", stateCode: "IL" },
  { code: "HOU", name: "Houston", stateCode: "TX" },
  { code: "DAL", name: "Dallas", stateCode: "TX" },
  { code: "AUS", name: "Austin", stateCode: "TX" },
  { code: "MIA", name: "Miami", stateCode: "FL" },
  { code: "ORL", name: "Orlando", stateCode: "FL" },
  { code: "ATL", name: "Atlanta", stateCode: "GA" },
  
  // More Indian cities
  { code: "MUM", name: "Mumbai", stateCode: "MH" },
  { code: "DEL", name: "Delhi", stateCode: "DL" },
  { code: "BLR", name: "Bangalore", stateCode: "KA" },
  
  // Added more cities for Telangana
  { code: "HYD", name: "Hyderabad", stateCode: "TG" },
  { code: "WGL", name: "Warangal", stateCode: "TG" },
  { code: "KRM", name: "Karimnagar", stateCode: "TG" },
  { code: "NZB", name: "Nizamabad", stateCode: "TG" },
  { code: "KHM", name: "Khammam", stateCode: "TG" },
  { code: "MLG", name: "Mahabubnagar", stateCode: "TG" },
  { code: "NLG", name: "Nalgonda", stateCode: "TG" },
  { code: "ADB", name: "Adilabad", stateCode: "TG" },
  { code: "MDB", name: "Medak", stateCode: "TG" },
  { code: "SRD", name: "Siddipet", stateCode: "TG" },
  
  { code: "CHE", name: "Chennai", stateCode: "TN" },
  { code: "KOL", name: "Kolkata", stateCode: "WB" },
  
  // A few UK cities
  { code: "LDN", name: "London", stateCode: "EN" },
  { code: "MAN", name: "Manchester", stateCode: "EN" },
  { code: "BIR", name: "Birmingham", stateCode: "EN" },
  { code: "EDI", name: "Edinburgh", stateCode: "SC" },
  { code: "GLA", name: "Glasgow", stateCode: "SC" },
  { code: "CDF", name: "Cardiff", stateCode: "WL" },
  { code: "BEL", name: "Belfast", stateCode: "NI" },
];

// Helper function to get states for a specific country
export const getStatesByCountry = (countryCode: string): State[] => {
  return states.filter(state => state.countryCode === countryCode);
};

// Helper function to get cities for a specific state
export const getCitiesByState = (stateCode: string): City[] => {
  return cities.filter(city => city.stateCode === stateCode);
};

// Helper function to get currency for a country
export const getCurrencyForCountry = (countryCode: string): string => {
  const country = countries.find(c => c.code === countryCode);
  return country ? country.currency : "USD"; // Default to USD if not found
};

// Client types for dropdown
export const clientTypes = [
  { value: "individual", label: "Individual" },
  { value: "business", label: "Business" },
  { value: "government", label: "Government" },
  { value: "nonprofit", label: "Non-Profit" },
  { value: "educational", label: "Educational" },
  { value: "healthcare", label: "Healthcare" },
  { value: "retail", label: "Retail" },
  { value: "tech", label: "Technology" },
  { value: "finance", label: "Financial" },
  { value: "consulting", label: "Consulting" },
];

// Client status options
export const clientStatus = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" }
];
