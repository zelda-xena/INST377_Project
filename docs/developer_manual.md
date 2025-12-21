# Developer Manual – Drink Genie

## Overview
This document is intended for future developers who may take over the Drink Genie project. It explains how to set up the application, run it locally, understand the server API, and continue development.

---

## Technology Stack
- Front-End: HTML, CSS, JavaScript
- Back-End: Node.js, Express
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
PORT=5500

### 4. Running the Application
Start the server:
```
node index.js
```
The server will then run locally at:
http://localhost:5500


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
