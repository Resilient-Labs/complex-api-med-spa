README for Complex API #2
Goal: Build a simple front-end app that uses data returned from one api to make a request to another api to create something that would be beneficial to a Med Spa.

Idea: Create a page that will take users input of a beauty product they use and let you know if you should stop using it before your appointment based on flagged ingredients

API's Used
Beauty Facts API - https://world.openbeautyfacts.org/cgi/search.pl?search_terms=${product_query}&search_simple=1&json=1&page_size=1&fields=product_name,ingredients_text

- used to find ingredients in products

Test Products -
CeraVe Retinol Serum
CeraVe SA Smoothing Cleanser
CeraVe Moisturizing Cream

Wikipedia API - https://en.wikipedia.org/api/rest_v1/page/summary/${found_ingredients[0]}

- used to give quick facts about the flagged ingredient for the users
