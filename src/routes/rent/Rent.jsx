import { useState } from "react";
import { properties } from "../../samples/properties";
import bgImage from "../../assets/image.png";

const Rent = () => {
  const [filter, setFilter] = useState({
    location: "",
    priceRange: "",
    rooms: "",
  });

  const handleFilterChange = (event) => {
    setFilter({...filter,[event.target.name]: event.target.value});
  }

  const filteredProperties = properties.filter((property) => {
    return (
      (filter.location === "" ||
        property.location.toLowerCase().includes(filter.location.toLowerCase())) &&
      (filter.priceRange === "" ||
        (filter.priceRange === "low" && (property.price) < 200) ||
        (filter.priceRange === "high" && (property.price) >= 200)) &&
      (filter.rooms === "" || property.rooms === parseInt(filter.rooms))
    );
  });
  return (
    <div className="rent-container">
      <h1 className="rent-title">Find Your Perfect Rental Home Today</h1>
      <p className="rent-description">
        Browse thousands of properties available for rent at your fingertips
      </p>

      <div className="filters">
        <input type="text" name="location" placeholder="Enter location" value={filter.location} onChange={handleFilterChange} />
        <select name="price-range" value={filter.priceRange} onChange={handleFilterChange}>
          <option value="">Select Price Range</option>
          <option value="low">Below $200</option>
          <option value="high">Above $200</option>

        </select>
        <select name="rooms" value={filter.rooms} onChange={handleFilterChange}>
          <option value="">Select Bedrooms</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4+ Bedrooms</option>
        </select>
      </div>
      <div className="filtered-properties"> 
        {filteredProperties.map((property) => (
          <div key={property.id} className="property-card">
            <img src={bgImage} alt="property-image" />
            <div className="property-details">
              <h3 className="property-title">{property.title}</h3>
              <p className="property-location">{property.location}</p>
              <p className="property-price">${property.price}</p>
              <p className="property-bedroom">{property.rooms}</p>
              <button className="view-details-btn">View Details</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rent;
