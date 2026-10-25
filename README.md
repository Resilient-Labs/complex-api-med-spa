# 🌿 &nbsp;Med Spa Skin Care Tips

A skin care tips app for a med spa. You type in a U.S. zip code, and it shows the city, today's UV index, and the current humidity, along with skin care tips based on those numbers. It uses two APIs: Zippopotam.us to turn the zip code into a location, and Open-Meteo for the UV and humidity data.

**Live Demo:** https://medspa-api-project.netlify.app

[![Screenshot-2026-09-30-at-3-16-13-AM.png](https://i.postimg.cc/C5VjRnZZ/Screenshot-2026-09-30-at-3-16-13-AM.png)](https://postimg.cc/R6X38FL9)

## How It's Made:

**Tech used:**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

When you search a zip code, I first call the Zippopotam.us API. It sends back the city name and the latitude and longitude for that zip code. I show the city on the page, then use the latitude and longitude to call Open-Meteo for the max UV index for the day and the current humidity.

Once I have those numbers, I use `if` statements to pick which tips to show:

- If the UV index is 6 or higher, it shows the high UV tip. Otherwise it shows the low UV tip.
- If the humidity is below 30%, it shows a tip for dry air. Otherwise it shows a tip for humid air.

I looked up the skin care tips for high and low UV and humidity myself.

## Optimizations

Things I want to improve:

- Show a message on the page when a zip code isn't found, instead of only logging the error in the console.
- Add a `.catch()` to the first fetch too, so errors from the Zippopotam.us API get handled.
- Let the user press Enter to search, not just click the button.

## Lessons Learned:

I learned that when a key in the JSON data has a space in it, like `place name`, I can't use dot notation. I have to use square brackets and quotes instead, like `data.places[0]["place name"]`. This project also showed me how to take numbers from an API and use them to make decisions in my code, instead of just showing the data on the page.
