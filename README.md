# UV Reminder

A small front-end app that checks today's UV index for a U.S. city and emails a physical (mineral) SPF reminder when the UV is high.

<img width="602" height="577" alt="Screenshot 2026-10-25 at 10 38 56 PM" src="https://github.com/user-attachments/assets/95afc7f9-a80a-4b60-a922-25cf492e4999" />



## What it does

1. You pick a city and state, and type in an email address.
2. You click **Check UV & send**. The app asks the EPA for that city's daily UV index and shows it on the page.
3. If the UV is **6 or higher**, it sends a reminder email through EmailJS.
4. If the UV is lower, it shows "UV is Low, so no email" and sends nothing.

## Built with

- HTML, CSS, and vanilla JavaScript (no frameworks, no backend)
- [EPA Envirofacts UV Index API](https://www.epa.gov/enviro/web-services) for the UV data
- [EmailJS](https://www.emailjs.com/) for sending email straight from the browser

## Setup

### 1. Set up EmailJS

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Add an email service (for example, Gmail). This gives you a **Service ID**.
3. Create an email template. This gives you a **Template ID**.
   - In the template body, use `{{message}}` where the reminder text should go.
   - In the template's **Settings** tab, set **To Email** to `{{to_email}}`. This is what sends each email to the address typed into the page.
4. Find your **Public Key** in your EmailJS account settings.

### 2. Add your keys

In `js/main.js`, replace the placeholders with your own values:

```javascript
emailjs.init("YOUR_PUBLIC_KEY")

emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { ... })
```

### 3. Run it on a local server

Don't open `index.html` by double-clicking it. Pages opened that way (`file://`) send requests with an origin of `null`, and browsers often block API calls from them with a CORS error. Serve the folder instead:

- **VS Code:** install the Live Server extension, then right-click `index.html` and choose **Open with Live Server**.
- **Python:** run `python -m http.server` in the project folder, then visit `http://localhost:8000`.

## How to use

1. Type a city (for example, `Los Angeles`).
2. Choose the state from the dropdown.
3. Enter the email address that should get the reminder.
4. Click **Check UV & send**.

## How it works

When you click **Check UV & send**, `getWeather()` in `main.js`:

1. Reads the city and state, then builds the request URL:
   `https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/CITY/{city}/STATE/{state}/JSON`
2. Fetches the data. The EPA returns an **array** of records, so the code reads the first one with `data[0]`:
   ```json
   [{ "CITY": "Los Angeles", "STATE": "CA", "UV_INDEX": "7", "UV_ALERT": "0", "DATE": "Sep/29/2026" }]
   ```
3. Shows the city name and UV index on the page.
4. Compares the UV index to the threshold. If it's high enough and an email address was entered, `sendEmail()` sends the reminder with EmailJS. Either way, the status message on the page says what happened.

## Customizing

- **UV threshold:** change `const UV = 6` in `main.js`. On the standard UV scale, 6 and above counts as "high."
- **Email wording:** edit the `message` text inside `sendEmail()`.
- **Look and feel:** edit `css/style.css`.

## Known limitations and ideas

- The EPA data only covers U.S. cities, and a state is required.
- Possible next steps: a customer list instead of a single email box, and an extra aftercare message for chemical peel clients.
