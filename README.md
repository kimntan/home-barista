# Project Title

Home Barista

## Overview

Home Barista is an app designed to improve the home barista's dialing process by allowing you to record brew parameters for different coffee beans and also leave notes to improve your next brew.

### Problem

Whenever switching to a different coffee bean, you would need to dial in the new bean, often discarding the first couple of shots before reaching a balanced cup of coffee. Home barista allows you to record the brew parameters for different beans, so that the next time you brew with the same bean you might save some time, coffee, and frustration. It also allows you to build recipes for different beans and brew techniques so you don't have to try to remember what you did the last time to reach that perfect cup.

### User Profile

Any coffee lover who brews their own coffee.

### Features

- Add different coffee beans by name and brand. Optionally include roast (light, medium, dark), tasting notes, and product URL that will link to respective product pages to make repurchasing easier.
- Upload photo of coffee bean to improve home page aesthetic.
- Display different brewing techniques (espresso, Aeropress, pourover, moka pot, french press, siphon, cold brew); each method will have its own recipe template based on required parameters.
- Add recipes based on coffee bean and brew technique used. Lock and unlock (still dialing) recipes to allow edits. On dial mode, use note taking feature to record taste and previous brew settings to make improving the next cup easier. Lock recipe to minimize page content to only display perfect brew recipe.

## Implementation

### Tech Stack

React.js, node.js, express, cors, SASS, MySQL, knex, multer

### APIs

No external APIs at this point. Build own API for CRUD operations.

### Sitemap

User home page - show available coffee beans and brew equipment, contain buttons to add beans.

Coffee bean page - show brew methods with recorded recipes and button to add another method.

Recipe page - toggle dial to edit or lock recipe

Add new recipe page - similar to edit page but has empty input fields

### Mockups

![mobile mockup](./client/src/assets/mockups/mobile-mockup.png)
![tablet mockup](./client/src/assets/mockups/tablet-mockup.png)
![desktop mockup](./client/src/assets/mockups/desktop-mockup.png)

### Data

One-to-many

Coffee beans table (id, bean_name, brand, product_url, origin, roast(light, medium, dark), taste_notes, image)

Method table (id, method_name, dose, output, time, water, temp, grind_setting, method_notes, coffee_id)

### Endpoints

GET all coffee beans

GET all recipes/methods for single bean

GET single recipe

PUT single recipe

DELETE single recipe

POST single recipe

POST new coffee bean

DELETE single coffee bean

### Auth

Having users and authentication will be a nice-to-have.

## Roadmap

Sprint 1 (TIME ~ 2 weeks):

- Home page, coffee bean page, add coffee bean page, coffee methods page, coffee recipe page
- Build server side API
- Create database to store coffee bean data and recipe data

Sprint 2:

- Create landing page with sign/up and login
- Store user data and implement authentication

Sprint 3:

- Deploy application

## Nice-to-haves

- Landing page with login/signup
- Have users information stored and authentication
- Timer that user can use when brewing
- Make methods non-static: allow users to choose which methods they have on the home page based on the equipment that they own. Allow photo upload to change static equipment photos. Create Add method feature to achieve this.
- Deployment
