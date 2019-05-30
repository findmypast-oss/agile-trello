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
- Import using `import { nameOfFunc } from './random-file.js'` **important of end with file extension**

## Features:

> Add more things to the list

- [x] Total card count per column (Richard)
- [x] Total story points per column (Richard)
- [x] Implement dynamic importing of js modules (Richard)
- [x] Implement an observer for when cards move (Richard)
- [x] Logo/icon for extension (Laura)
- [x] Show card id (Richard and Laura)
- [ ] Display points on card <- still needs to hide the points in the title. (Toby)
- [ ] List of buttons story points (_Fib numbers_) in open card view to add
- [ ] Story limit per column
- [ ] Age of card from when it was moved/created (Steffi)
- [ ] When a story point has changed on a card update all the totals (column and card points) (Richard)
- [ ] When changing to another board the Agile Trello stats are not visible/created
