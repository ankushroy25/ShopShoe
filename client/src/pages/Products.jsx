import React, { useState } from "react";
import data from "../data.js";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import { AiFillStar } from "react-icons/ai";

const Products = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortingOrder, setSortingOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    setPage(0);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
    setPage(0);
  };

  const handleSortingChange = (event) => {
    setSortingOrder(event.target.value);
    setPage(0);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(0);
  };

  const colorOptions = [...new Set(data.map((item) => item.color))];
  const ratingOptions = [...new Set(data.map((item) => item.rating))];
  const categoryOptions = [...new Set(data.map((item) => item.category))];

  // Function to sort the data based on price
  const sortDataByPrice = (a, b) => {
    if (sortingOrder === "lowToHigh") {
      return a.newPrice - b.newPrice;
    } else {
      return b.newPrice - a.newPrice;
    }
  };

  // Filter and sort the data
  let filteredData = data.filter(
    (item) =>
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedColor === "All" ||
        item.color.toLowerCase() === selectedColor.toLowerCase()) &&
      (selectedRating === "All" || item.rating === parseInt(selectedRating)) &&
      (selectedCategory === "All" || item.category === selectedCategory)
  );

  // Apply sorting
  filteredData = filteredData.sort(sortDataByPrice);

  const slicedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="py-8 px-16">
      <div className="py-4 mb-4 mx-auto lg:flex lg:flex-row justify-center shadow-gray-400 shadow-md bg-slate-300 rounded-md">
        <p className="flex justify-center mt-3 mr-4 font-semibold text-2xl">
          Filter
        </p>

        {/* On small screens, stack elements vertically */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Search input field */}
          <span className="m-2 lg:mb-0 lg:mr-4">
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 border rounded-md"
            />
          </span>

          {/* Color filter dropdown */}
          <span className="m-2 lg:mb-0 lg:mr-4">
            <select
              value={selectedColor}
              onChange={handleColorChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="All">All Colors</option>
              {colorOptions.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </span>

          {/* Sorting filter dropdown */}
          <span className="m-2 lg:mb-0 lg:mr-4">
            <select
              value={sortingOrder}
              onChange={handleSortingChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Sort by price</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </span>

          {/* Category filter dropdown */}
          <span className="m-2 lg:mb-0 lg:mr-4">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="All">All Categories</option>
              {categoryOptions.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </span>
        </div>

        {/* Rating filter */}
        <div className="mt-2 flex justify-center">
          <label>Rating: </label>
          <label>
            <input
              type="radio"
              value="All"
              checked={selectedRating === "All"}
              onChange={handleRatingChange}
            />
            All
          </label>
          {ratingOptions.map((rating, index) => (
            <label key={index}>
              <input
                type="radio"
                value={rating}
                checked={selectedRating == rating}
                onChange={handleRatingChange}
                className="ml-2"
              />
              {rating}
            </label>
          ))}
        </div>
      </div>

      <Grid container spacing={4}>
        {slicedData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <div className="shadow-lg shadow-slate-500 hover:shadow-blue-500 rounded-lg p-4">
              <div className="mx-auto flex justify-center">
                <img src={item.img} alt={item.title} className="w-auto h-40" />
              </div>
              <Typography variant="h6" className="mt-2">
                {item.title}
              </Typography>
              <div className="flex items-center mt-2">
                {item.rating} <AiFillStar color="orange" />
                <p className="text-gray-600 ml-2">{item.reviews}</p>
              </div>
              <div className="flex justify-start mt-2">
                <p className=" font-semibold mr-2">${item.newPrice}</p>
                <p className=" text-gray-500 line-through">{item.prevPrice}</p>
              </div>
              <p className="text-gray-700 mt-2">Company: {item.company}</p>
              <p className="text-gray-700">Color: {item.color}</p>
              <p className="text-gray-700">Category: {item.category}</p>
            </div>
          </Grid>
        ))}
      </Grid>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Items per page:"
        className="flex justify-center bg-blue-200 rounded-full mt-8"
      />
    </div>
  );
};

export default Products;
