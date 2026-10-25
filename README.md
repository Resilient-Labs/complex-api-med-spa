# UV Aftercare Checker

Enter a city, pick a med spa treatment (chemical peel, microneedling, laser, facial), and get today's max UV plus aftercare advice tailored to that treatment.

![UV Checker screenshot](screenshot.jpg)

## How the code works

`getAftercare()` starts with the city name, but the UV API only speaks coordinates, so the first fetch hits Open-Meteo's free geocoding API to convert "Miami" into a latitude and longitude. That fetch is `return`ed inside the first `.then`, so the next `.then` in the same chain receives the UV response from OpenUV. No nested callbacks, no pyramid of doom, just one flat chain where each step hands its result to the next. The code reads `uv_max` and runs it through a threshold ladder: 2 or under is Low, 5 or under Moderate, 7 or under High, anything above Very High, each with its own aftercare advice for the chosen treatment. One `.catch` at the end covers the whole chain.

I like this pattern a lot. Returning the second fetch from inside the first `.then` is the trick that keeps sequential async code readable, and the geocoding step is a nice example of an adapter: it exists purely to translate between what the user types (a city name) and what the API accepts (coordinates). Two different APIs, each speaking its own language, glued together by one intermediate step.

The hardest part was that OpenUV won't take a city name, so the geocoding step exists purely as a translator between what the user types and what the API accepts.

Open-Meteo and OpenUV APIs, plain JavaScript. My code is on the `answer` branch.
