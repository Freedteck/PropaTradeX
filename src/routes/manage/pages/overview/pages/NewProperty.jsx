
import React from "react";

function NewProperty() {
  return (
    <form action="">
      <input type="text" name="title" placeholder="Property Title" />
      <input
        type="text"
        name="description"
        placeholder="Property description"
      />
      <input type="text" name="address" placeholder="Property Address" />
      <input type="text" name="price" placeholder="Property Price" />
      <input type="text" name="rooms" placeholder="Number of Rooms" />

      <select name="typr">
        <option value="rent">For Rent</option>
        <option value="sale">For Sale</option>
      </select>

      <input type="file" multiple />

      <button type="submit">Submit</button>
    </form>
  );
}

export default NewProperty;
