import React, { useState } from "react";
import styles from "./NewProperty.module.css";

function NewProperty({ onSubmit }) {
  const [property, setProperty] = useState({
    title: "",
    description: "",
    location: "",
    rooms: "",
    price: "",
    category: "rent",
    images: [],
  });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProperty({ ...property, images: [...property.images, reader.result] });
    };
    reader.readAsDataURL(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(property);
    alert("Property Added");
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Property Title"
        value={property.title}
        required
        onChange={handleChange}
        className={styles.input}
      />
      <textarea
        type="text"
        name="description"
        placeholder="Property description"
        value={property.description}
        required
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="text"
        name="location"
        placeholder="Property Address"
        value={property.location}
        required
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="number"
        name="price"
        placeholder="Property Price"
        value={property.price}
        required
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="number"
        name="rooms"
        placeholder="Number of Rooms"
        value={property.rooms}
        required
        onChange={handleChange}
        className={styles.input}
      />

      <select name="category" className={styles.select}>
        <option value="rent">For Rent</option>
        <option value="sale">For Sale</option>
      </select>

      <input
        className={styles.fileInput}
        type="file"
        name="images"
        multiple
        required
        onChange={handleImageUpload}
      />

      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
}

export default NewProperty;
