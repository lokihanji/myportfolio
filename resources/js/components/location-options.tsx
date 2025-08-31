import React from 'react';

export const locationOptions = [
    "United States",
    "Canada", 
    "United Kingdom",
    "Australia",
    "New Zealand",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Switzerland",
    "Austria",
    "Belgium",
    "Portugal",
    "Greece",
    "Poland",
    "Czech Republic",
    "Hungary",
    "Romania",
    "Bulgaria",
    "Croatia",
    "Slovenia",
    "Slovakia",
    "Estonia",
    "Latvia",
    "Lithuania",
    "Japan",
    "South Korea",
    "China",
    "India",
    "Brazil",
    "Mexico",
    "Argentina",
    "Chile",
    "Colombia",
    "Peru",
    "Venezuela",
    "Uruguay",
    "Paraguay",
    "Ecuador",
    "Bolivia",
    "Guyana",
    "Suriname",
    "Other"
];

interface LocationOptionsProps {
    searchValue: string;
    onLocationSelect: (location: string) => void;
}

export const LocationOptions: React.FC<LocationOptionsProps> = ({ 
    searchValue, 
    onLocationSelect 
}) => {
    const filteredLocations = locationOptions.filter(location => 
        location.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            {filteredLocations.map(location => (
                <option key={location} value={location}>
                    {location}
                </option>
            ))}
        </>
    );
};

export default LocationOptions;
