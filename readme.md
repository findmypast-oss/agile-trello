<h1><img src="https://user-images.githubusercontent.com/1492173/58547259-f692c180-81fe-11e9-8d2a-46a48ef9aa2d.png" alt="Agile Trello logo" width="32" /> Agile Trello</h1>

A Chrome extension which provides all the Scrum/Kanban tools

## Get Started

[Get started tutorial](https://developer.chrome.com/extensions/getstarted), first step shows how to setup the developer version to test it out.

- Main file is `agile-trello.js`

## API Key and Token

Some features require access to the Trello API, for this a Trello token and API key are required. Add them to the file `trello-api.js`.

See https://trello.com/app-key on how to get your token and api key. As they are personal, DO NOT commit them.

## Dynamic importing

- Add new file to manifest.json in `web_accessible_resources`
- Import using `import { nameOfFunc } from './random-file.js'` **important to end with file extension**

## Features:

> Add more things to the list

### Board view

- [x] Total card count per column (Richard)
- [x] Total story points per column (Richard)
- [x] Implement dynamic importing of js modules (Richard)
- [x] Implement an observer for when cards move (Richard)
- [x] Logo/icon for extension (Laura)
- [x] Show card number (Richard and Laura)
- [x] When a story point has changed on a card update all the totals (column and card points) (Richard)
- [x] Age of card from when it was moved/created (Steffi)
- [x] Update age of card after initial load (Steffi)
- [ ] Story limit per column highlight with colour e.g. red if over or under limits, orange if on limit
- [ ] Update card age if it changes 'out of sight' (e.g. checklist is changed in another browser)
- [ ] When changing to another board the Agile Trello stats are not visible/created

### Card is open

- [ ] List of buttons story points (_Fib numbers_)
- [ ] Display points on card <- **Fix** needs to hide the points in the title. (Toby)
- [x] **Fix** story points disappearing (Richard)
- [x] Show card number near title <- **TO FIX:** _does not work page reloads on open card_ (Richard & Laura)
- [ ] If card has links to other cards in checklist, show sum of all the points

### General

- [x] Have a settings pop-up (Steffi)
- [x] Simplify Trello API login (Steffi)

### Customise

- [ ] Custom colour for card ids via popup (Richard)

### Build tools

To publish on the chrome extension store a zip file of the app needs to be uploaded. Read more about [publishing](https://developer.chrome.com/webstore/publish)

- [ ] Create a script to zip files for upload to chrome store maybe use [ADM-ZIP](https://www.npmjs.com/package/adm-zip)

### [Provide store content](https://developer.chrome.com/webstore/publish#provide-store-content)

- [x] 128 x 128 app icon (Laura)
- [ ] Create screenshots/video to show off what the app does (Laura)
- [ ] Write a detailed description
- [ ] 440 x 280 small tile icon for Web Store wall (Laura)
