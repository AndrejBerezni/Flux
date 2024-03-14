# FLUX

(work in progress)

Flux is a full stack web application for renting electrical vehicles (cars, bikes, and scooters) in Portugal. Apart from renting vehicles, it gives user option to purchase gift cards for spending on this platform, or to subscribe to monthly subscriptions that come with certain benefits when renting vehicles.

It is still under construction. Some of the finished functionalities and their explanation you may find in the documentation below. In general, current progress is:

#### Completed features:

- Authentication implemented.
- UI created: home page, vehicle search results page, subscriptions page, gift cards page, several menus and modals (sign in, sign up, user menu, side nav...), user page(not fully completed - account and subscription sections are created so far).
- Integrated Google Maps API for searching nearby locations.
- Database populated with vehicles, locations, and subscriptions related data.
- Vehicle search implemented - users are able to search, filter, and sort vehicles on different locations and dates.
- Subscriptions feature completed - users can subscribe to one of three subscription plans, and cancel, renew, or change subscription.

#### Currently working on:

- Implementing Gift Cards feature - users should be able to buy gift cards and send them to designated email address.

## Table of Contents

1. [Stack](#stack)
2. [State](#state)
   1. [authentication slice](#authentication-slice)
   2. [vehicleSearch slice](#vehicleSearch-slice)
   3. [modal slice](#modal-slice)
3. [Database](#database)
4. [Authentication](#authentication)
5. [Components](#components)
6. [Credits](#credits)

## Stack

- Next.js
- TypeScript
- Vercel Postgres - database
- Tailwind CSS - styling
- Firebase - image storage and authentication
- Redux toolkit - global state

## State

### authentication slicer

Authentication is handled with Firebase Authentication, but we use this state to hold information that is passed to UI (like displaying name or email of current user), or passed to API calls to retrieve user information.
It contains user id, user name, user email, authentication status, and email input that is passed through authentication forms (from sign in to sign up, if user needs to be created).

### modal slicer

This slicer handles displaying modals.
We have primary and secondary modals. Secondary modal was introduced for situations in which we would like to open another modal on top the already open one.
Next to modals, in this slicer we have outerType property in state, which determines whether background around open modal will be dark or remain the same.
Reducers are showModal, hideModal (hides both primary and secondary modals), showSecondaryModal, hideSecondaryModal.

### vehicleSearch slicer

This slicer keeps information that user selects when starting a search and that is sent to back end to fetch available vehicles. User selects type of vehicle, pick-up location, return location, whether pick-up and return locations are the same, pick-up date, return date, pick-up time, and return time.

## Database

Database is still being defined, but this is the initial idea of tables, their columns, and their relationships:

1. users:
   id VARCHAR(255) PRIMARY KEY,
   auth_type VARCHAR(255) NOT NULL,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255),
   email VARCHAR(255) NOT NULL UNIQUE,
   country_code INTEGER,
   phone_number INTEGER,
   street VARCHAR(255),
   street_number INTEGER,
   additional_address_line VARCHAR(255),
   zip_code VARCHAR(255),
   city VARCHAR(255),
   country VARCHAR(255)

2. rents:
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
   user_id VARCHAR(255) NOT NULL,
   vehicle_id VARCHAR(255) NOT NULL,
   pickup_date DATE NOT NULL,
   return_date DATE NOT NULL,
   pickup_location VARCHAR(255) NOT NULL,
   return_location VARCHAR(255) NOT NULL,
   pickup_time TIME NOT NULL,
   return_time TIME NOT NULL,
   total_price NUMERIC NOT NULL

3. subscriptions:
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
   type VARCHAR(255) NOT NULL,
   user_id VARCHAR(255) NOT NULL,
   start_date DATE NOT NULL,
   end_date DATE NOT NULL,
   selected_vehicle VARCHAR(255) NOT NULL

4. subscription_type:
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   selected_vehicle_discount NUMERIC NOT NULL,
   all_vehicles_discount NUMERIC,
   gift_card_discount NUMERIC,
   insurance VARCHAR(255)

5. subscription_description:
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
   subscription_id VARCHAR(255) NOT NULL,
   text TEXT NOT NULL

6. cars_details:
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   price_per_day NUMERIC NOT NULL,
   gearshift VARCHAR(255) NOT NULL,
   passengers NUMERIC NOT NULL,
   bags NUMERIC NOT NULL,
   doors NUMERIC NOT NULL

7. bikes_details:
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   price_per_day NUMERIC NOT NULL

8. scooters_details:
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   price_per_day NUMERIC NOT NULL

9. vehicles:
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
   type VARCHAR(255) NOT NULL,
   vehicle_details VARCHAR(255) NOT NULL,
   location VARCHAR(255) NOT NULL

10. locations:
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    street_number VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    latitude NUMERIC NOT NULL,
    longitude NUMERIC NOT NULL,
    always_open BOOLEAN NOT NULL,
    opening_hour_working_day INT,
    opening_hour_weekend INT,
    closing_hour_working_day INT,
    closing_hour_weekend INT,
    airport BOOLEAN NOT NULL

11. gift_cards:
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    used BOOLEAN NOT NULL,
    code VARCHAR(255) NOT NULL

12. gift_card_type:
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    amount NUMERIC NOT NULL,
    stripe_coupon_id VARCHAR(255) NOT NULL,
    stripe_full_price_id VARCHAR(255) NOT NULL,
    stripe_price_id_5_off VARCHAR(255) NOT NULL,
    stripe_price_id_7_off VARCHAR(255) NOT NULL,
    stripe_price_id_12_off VARCHAR(255) NOT NULL,

13. vehicle_images:
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vehicle_id VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    main_image BOOLEAN NOT NULL

#### Relationships:

##### **>** many to one, **<** one to many, **-** one to one

rents.user_id > users.id,
rents.vehicle_id > vehicles.id,
cars_details.id < vehicles.vehicle_details,
bikes_details.id < vehicles.vehicle_details,
scooters_details.id < vehicles.vehicle_details,
users.id - subscriptions.user_id,
subscriptions.type > subscription_type.id,
subscription_description.subscription_id > subscription_type.id,
gift_cards.type > gift_card_type.id,
gift_cards.user_id > users.id,
vehicle_images.vehicle_id > cars_details.id,
vehicle_images.vehicle_id > bikes_details.id,
vehicle_images.vehicle_id > scooters_details.id,
locations.id < rents.pickup_location,
locations.id < rents.return_location,
locations.id < vehicles.location

## Authentication

- This application uses Firebase authentication to enable users to log in using Google or Email/Password authentication methods.
- Apart from Firebase, users are also stored in database for storing additional information and interacting with other data.
- Searching for users or adding new users to database is handled through Next.js Route Handlers, defined under \src\app\api\auth
- All the logic related to authentication is then encapsulated in two custom hooks - useEmailAuth and useGoogleAuth, to be used across the application where needed. These hooks return functions for signing in, signing up, and checking if user exists.

## Credits

### Subscriptions page photos:

- Tesla Photo by[alex](https://unsplash.com/@alexzahn?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/blue-porsche-911-parked-on-sidewalk-during-daytime-re8FigEQ4eQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
- Harley Davidson Photo by [Harley-Davidson](https://unsplash.com/@harleydavidson?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/black-and-orange-motorcycle-52UeZUkp3Hs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

### Gift Cards page photos:

- Electric Scooter Photo by [Antonio Sokic](https://unsplash.com/@antesoki?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/black-and-red-bicycle-near-red-wall-VieCBZ_9bOU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

### Illustrations:

- Web illustrations by [Storyset](https://storyset.com/web)
- People illustrations by [Storyset](https://storyset.com/people)
- Business illustrations by [Storyset](https://storyset.com/business)
- App illustrations by [Storyset](https://storyset.com/app)
