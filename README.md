# 👩🏾‍⚕️ Project: Complex API 2 - Med Spa
GlowCheck is a front-end web application designed to help medspa clients prepare for an appointment by organizing information about cosmetic products they currently use.

Users can search for makeup products by brand or product type, select a product, and view a structured product summary. The app then uses the selected product information returned by the Makeup API to search openFDA public cosmetic adverse-event records.

> This project is for educational and appointment-preparation purposes only. It does not diagnose skin conditions, determine product safety, provide treatment recommendations, or replace advice from a licensed healthcare provider.

### Goal
Build a simple front-end app that uses data returned from one api to make a request to another api to create something that would be beneficial to a Med Spa.

## How It Works
- User searches for cosmetic products by brand or product type
- Makeup API returns product results
- User selects a product
- The app extracts product information: name, brand, product type, tags
- The product name is sent to openFDA
- openFDA returns public cosmetic adverse-event records
- GlowCheck creates a pre-appointment product summary

## Features
- Search cosmetic products by brand.
- Filter products by product type.
- Display product cards with image, name, brand, type, and price.
- Select a product from Makeup API results.
- View product tags and description.
- Use the selected product name to search openFDA public cosmetic-event records.
- Use brand or product type as fallback search terms when needed.
- Display a public-record search result or a no-results state.
- Add an optional note for a medspa provider.

## APIs Used
- Makeup API: The Makeup API provides public cosmetic product information.
 [http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&product_type=foundation]
- openFDA Cosmetic Adverse Events API
  [https://api.fda.gov/cosmetic/event.json?search=products:product_name="maybelline"&limit=10]

## Technologies Used
- HTML
- CSS
- JavaScript
- Makeup API
- openFDA Cosmetic Adverse Events API

## Future Improvements
- Add a comparison view for two cosmetic products.
- Add more product filters, including category, tags, and price range.
- Add a product-list builder for users with multiple products.
- Add a clinic logo, contact information, and custom consultation checklist.

