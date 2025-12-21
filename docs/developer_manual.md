# Developer Manual – Drink Genie

## Overview
This document is intended for future developers who may take over the Drink Genie project. It explains how to set up the application, run it locally, understand the server API, and continue development.

---

## Technology Stack
- Front-End: HTML, CSS, JavaScript
- Back-End: Node.js
- Database: Supabase
- External API: TheCocktailDB
- Deployment: Vercel

---

## Installation Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/drink-genie.git
cd drink-genie
```

### 2. Install Dependencies
```
npm install
```

### 3. Environment Variables
Create a .env file in the root directory with the following values:
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000

### 4. Running the Application
Start the server:
```
node index.js
```
The server will then run locally at:
http://localhost:3000


### 5. API's Information
GET /drinks
Description:
Retrieves all saved drinks from the Supabase database.
Response Example:
```
[
  {
    "id": 1,
    "drink_name": "Margarita",
    "drink_img": "https://...",
    "drink_instructions": "Mix and serve",
    "drink_ingredients": "Tequila, Lime Juice, Triple Sec"
  }
]
```

POST /drinks
Description:
Adds a new drink to the database.
Response Example:
```
{
  "drink_name": "Margarita",
  "drink_img": "https://...",
  "drink_instructions": "Mix and serve",
  "drink_ingredients": "Tequila, Lime Juice, Triple Sec"
}
```

### 6. Testing
You can test the website by performing one of these actions:
- Generating random drinks
- Searching drinks by ingredient
- Viewing drink details
- Saving drinks to the database
- Verifying saved drinks in Supabase

### 7. Limitations and Known Bugs
- No user authentication or accounts
- Have not tested on mobile application
- Minimal error handling for failed network requests

### 8. Future Development Roadmap
- Add user authentication and profiles
- Improve mobile responsiveness
- Add animations and UI transitions
- Allow users to rate and favorite drinks
