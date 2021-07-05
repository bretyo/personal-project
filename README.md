# Personal Project -- Bretbox Games

This was a project I built by myself over the course of 3 weeks while learning Web Development at DevMountain. I was inspired by the makers of Jackbox to create my own website that would be a hub of games, starting with one - Motivational Poser, a game of my own creation. You can go to the website [here!](https://bretboxgames.com/)

## Technologies I used

Here is a list of the more important technologies I used to make the app.

### `React/React Hooks`

Most of my time at Devmountain has been spent within the React Library. 

Until the start of this project, I and my cohort utilized class components for our assignments and projects. For this project I decided to familiarize myself with React Hooks - a decision I am very thankful for, as it made the large amount of components more manageable. 

### `Socket.IO`

Bretbox games heavily utilize sockets, since Motivational Poser needs to send players images and prompts to go along with them. I also decided to use Socket.IO's Rooms for keeping separate games from communicating with each other.

### `Redux`

I needed to keep track of user information as well as game information (how many times a game is played, what the current game in play is, how many unused prompts are left, etc)

### `Unsplash API`

For Motivational Poser, I needed random images to send to players, and unsplash has a free API as well as an npm package ('unsplash-js') for fetching from it (node-fetch was also required to be used in conjunction with the server-side api). I have a collection of various images which the game will randomly select from [here.](https://unsplash.com/collections/vRNcKbAK9uQ/motivational-posers)

### `Sass`

All styling was done with .scss. I used a few mixins and variables, and heavily utilized nested styling - which in hindsight I would have used less because it made it more difficult to apply to different elements.

### `PostgreSQL`

For keeping track of user and game information. I use `massive` for communicating to my database.

### `Express`

Used to create the server. I also use `express-session` for cookies.

## Conclusion

I am very proud of completing as much as I did within the time-frame that was established, but there is still more that I would like to do with it. Namely animations, sound effects, perhaps a few style touch-ups, and a text-to-speech announcer. As for adding future games, I am far more tempted to rebuild this entire project from scratch, as I feel that I've learned how to do it better over the course of the completion of it. Either way, I hope you enjoy it!
