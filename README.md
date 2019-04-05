# GifTastic


Homework 06: GifTastic

Use the sport text input box to type in a sport and click 'Add Sport' to create a button for it. If the sport you typed in is already a button, the button fill flash. Once you click a button, the screen displays 12 gifs realting to the sport. If you like a particular gif, click the star below it and it will be added to the 'Favorites' section located in the navbar. To remove a gif from the favorites section, click the yellow star below either in the 'Search' section of 'Favorites' section.

## Implementation

### Bootstrap
- Layout
    - Rows
    - Columns
    - Buttons
    - Cards
    - Input

### jQuery
- Add, modify, and delete elements from the DOM.
- Use `.ajax` method to call an API.

### GIPHY API
- Utilize the [GIPHY API](https://developers.giphy.com/docs/) to get gifs that realate to a specific search criteria.

## Image Sources
- All gifs are sourced from the GIPHY API.

---

## Future Improvements

1. Add ability to store favorite gifs into local storage so that when a user exits the browser and returns they will be able to see their favorite gifs.
2. Keep track of the gifs UID so that when a gif is favorited, the gif that it is associated will know that favorites status (Either currently in the favorites section and has a yellow star or not in the favorites section and has a hollow star).
3. Add a download button that will donwload the gif to the user's machine.