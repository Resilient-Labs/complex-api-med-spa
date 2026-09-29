# Beauty Product Ingredient Information

A JavaScript project that combines beauty product information with chemical ingredient data.

## About

This project allows a user to search for a beauty product using the Open Beauty Facts API.

The program retrieves product information and its ingredient list.

Each available ingredient is then searched using the ChEBI API to retrieve additional chemical information.

## Features

- Search for a beauty product by name
- Retrieve product and brand information
- Display the product ingredient list
- Search individual ingredients
- Retrieve chemical names
- Retrieve ChEBI identifiers
- Display available chemical descriptions
- Handle products without ingredient information

## Topics Practiced

### APIs

- Using multiple APIs
- Using `fetch()`
- Building API query URLs
- Reading JSON responses
- Making additional requests based on earlier API data

### Arrays

- Working with ingredient arrays
- Using `forEach()`
- Processing multiple ingredient records

### Objects

- Accessing nested object properties
- Reading API result objects
- Working with returned chemical information

### Strings

- Formatting search terms
- Replacing spaces
- Building dynamic query URLs

### Conditionals

- Checking for missing products
- Checking for missing ingredient information
- Checking for missing chemical search results

### DOM Manipulation

- Creating product information sections
- Creating ingredient information sections
- Adding headings
- Adding labels and values
- Clearing previous search results

## Technologies

- HTML5
- CSS3
- JavaScript
- Open Beauty Facts API
- ChEBI API

## Running the Project

1. Clone or download the repository.
2. Open `index.html`.
3. Enter a beauty product name.
4. Select the search button.
5. Review the product information and available chemical ingredient details.
6. Open the browser developer tools and select the Console to view logged data.

## Purpose

This project was created while practicing JavaScript APIs, arrays, objects, asynchronous requests, and DOM manipulation.

The focus is on using data from one API to create multiple searches in another API and combining the returned information in the browser.