# Emoji Book Recommendation Finder

A web application that takes a selected emoji, converts its name into search keywords, and finds matching book recommendations using the Open Library API.

---

## Features

- **Emoji Keyword Search:** Converts selected emojis into search terms based on their API slug or unicode name.
- **Smart Word Filtering:** Extracts meaningful keywords from emoji descriptions to improve search relevance.
- **Book Recommendations:** Fetches up to 5 matching books from Open Library and displays the title alongside author information.

---

## APIs Used

- **Emoji API:** `https://emoji-api.com/emojis`
- **Open Library Search API:** `https://openlibrary.org/search.json`

---

## How It Works

1. The user selects an emoji from a dropdown menu and clicks the search button (`#emojiBtn`).
2. The app queries the Emoji API to get metadata (such as the slug and unicode name) for the selected emoji.
3. It parses the emoji's metadata to extract a key term for search.
4. The key term is sent to the Open Library API to search for books.
5. The results are rendered in the `#placeHere` container, showing book titles, author names, and the original emoji header.

---

<img width="2833" height="1559" alt="image" src="https://github.com/user-attachments/assets/a24eef94-0813-4f69-a8d4-f5c3e45f8069" />

Example:
```
I completed the challenge: 5
I feel good about my code: 4
I'm not sure if my constructors are setup cleanly...
```
