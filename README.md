# **_Operational Dashboard FE_**

This repo containes the Operational-dashboard platform's client-side.
This is a React-based web application that uses DeckGL and MapBox to display the world's commercial ports and provide extended information about each one.

# **_Background_**

The purpose of the Operational-dashboard app is to display information about all cargo ports in the world, both in a list view and in a map view.
The application is intended for DockTech’s existing customers and/or for marketing purposes - allawing access only to registerd users.

# **_Getting started_**

## Prerequisites:

- Node V 16.15 or higher
- Mapbox access token

## Installation:

```bash
npm install
```

## Environment Variables:

In order to run the app - the following environment variables are required:

- **REACT_APP_MAP_BOX_TOKEN** - [Map box access token](https://account.mapbox.com/auth/signup/) \<string>

- **REACT_APP_URL** - URL of the REST API (App's server).

## Run localy

To run the program localy - add a '.env' file in the repo root. Use the '.env.example' file (also in the root) for reference.

```bash
# To start the app in whtch mode on localhost:
npm start

```

## Deploy

**You will need to provide the environment variables specified above**

```bash
#Build:
react-scripts build

#Like in any react app - access '/public/index.html'
```

# The app

## General architecture

### Component structure

![Component structure](asets/img//DockTech%20-%20Frame%203.jpg)

## Login and logout

![Login and logout flow](asets/img/DockTech%20-%20auth%20flow1.jpg 'Login and logout flow')

## Get ports flow

![Get ports flow](asets/img/DockTech%20-%20auth%20flow2.jpg 'Get ports flow')
