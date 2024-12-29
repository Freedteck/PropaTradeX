import Hero from "../../components/hero/Hero";
import PropertyList from "../../components/propertyList/PropertyList";
import { properties } from "../../samples/properties";
import "../../styles/demo.css";
import { useState } from "react";
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
        (filter.priceRange === "low" && property.price < 1) ||
        (filter.priceRange === "high" && property.price >= 1)) &&
      (filter.rooms === "" || property.rooms === parseInt(filter.rooms))
    );
  });

  
  return (
    <div className="rent-container">
      <div className="rent-hero">
        <h1 className="rent-title">Find Your Ideal Rental Property</h1>
        <p className="rent-description">
          Explore a curated selection of rental properties tailored to your
          lifestyle. Whether you're looking for a cozy apartment, a spacious
          house, or a unique space, we make finding your perfect home simple and
          secure. Start your journey to secure and comfortable living today.
        </p>
        <div className="filters-container">
          <input type="text" name="location" placeholder="Enter location"  value={filter.location} onChange={handleFilterChange} />
          <select name="priceRange" value={filter.priceRange} onChange={handleFilterChange}>
            <option value="">Select Price Range</option>
            <option value="low">Below 1 RLC</option>
            <option value="high">Above 1 RLC</option>
          </select>
          <select
            name="rooms"
            value={filter.rooms}
            onChange={handleFilterChange}
          >
            <option value="">Select Bedrooms</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
        </div>
      </div>

      <div>
        <PropertyList
          showViewAll={false}
          properties={filteredProperties}
          heading={"Discover a World of Possibilities"}
          desc={
            "Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home"
          }
        />
      </div>
    </div>
  );
};

export default Rent;
