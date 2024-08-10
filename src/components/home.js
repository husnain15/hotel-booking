import React, { useState } from 'react';
import propertiesData from '../properties.json'

const Home = () => {
    // State to keep track of the filter text input by the user
    const [filterText, setFilterText] = useState('');
    // State to keep track of the currently selected property ID
  const [selectedProperty, setSelectedProperty] = useState(null);
// Function to handle changes in the filter input field
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };
// Function to toggle the visibility of property details
  const handleImageClick = (property) => {
    // If the same property is clicked again, hide the details; otherwise, show the details for the clicked property
    setSelectedProperty(property.id === selectedProperty ? null : property.id);
  };

  // Filter the properties based on the filter text
  const filteredProperties = propertiesData.filter(property =>
    property.name.toLowerCase().includes(filterText.toLowerCase()) ||
    property.description.toLowerCase().includes(filterText.toLowerCase())
  );
      return (
        <div className="home-container">
      <h1>Explore Our Properties</h1>
      {/* Input field for filtering properties by name or description */}
      <input
        type="text"
        placeholder="Filter by name or description"
        value={filterText}
        onChange={handleFilterChange}
        className="filter-input"
      />
      <div className="properties-list">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="property-item">
              <div className="property-image-container">
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="property-image"
                  onClick={() => handleImageClick(property)}
                />
                {/* Overlay showing brief details about the property */}
                <div className = "text-mangage">
                  <div>
                    <h2>{property.name}</h2>
                    <p className="truncate-text" title={property.description}><strong>Details:</strong> {property.description}</p>
                  </div>
                </div>
              </div>
              {/* Show additional details if the property is selected */}
              {selectedProperty === property.id && (
                <div className="property-details">
                  
                  <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                  <p><strong>Standard Pax:</strong> {property.standardPax}</p>
                  <p><strong>Maximum Pax:</strong> {property.maximumPax}</p>
                  <p><strong>Floor Area:</strong> {property.floorArea} sqm</p>
                  <p><strong>Amenities:</strong></p>
                  <ul>
                    <li>Air Conditioning: {property.amenities.aircon ? 'Yes' : 'No'}</li>
                    <li>Apple TV: {property.amenities.appletv ? 'Yes' : 'No'}</li>
                    <li>BT Speakers: {property.amenities.btspeakers ? 'Yes' : 'No'}</li>
                    <li>Card Key: {property.amenities.cardkey ? 'Yes' : 'No'}</li>
                    <li>Chromecast: {property.amenities.chromecast ? 'Yes' : 'No'}</li>
                    <li>Fireplace: {property.amenities.fireplace ? 'Yes' : 'No'}</li>
                    <li>HDTV: {property.amenities.hdtv ? 'Yes' : 'No'}</li>
                    <li>Jacuzzi: {property.amenities.jacuzzi ? 'Yes' : 'No'}</li>
                    <li>Nespresso: {property.amenities.nespresso ? 'Yes' : 'No'}</li>
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No properties match your search.</p>
        )}
      </div>
    </div>
      );
}

export default Home;
