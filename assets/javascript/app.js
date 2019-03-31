// Code is executed in strict mode
"use strict";

// Wrap all code in an anonymous function so functions cannot be called externally
(function() {
    $(document).ready(function() {
        // My API key for the GIPHY API
        const API_KEY = "28lAjGKNf0GPp5tY9oP31j3cTYi2EbzU";
        // The limit of how many gifs are accessed from the API
        const LIMIT = 12;
        // The maximum rating of a gif
        const RATING = "pg-13"

        // Offset for GIPHY API
        let offset = 0;

        // Array of sports
        let sports = ["baseball", "basketball", "football"];

        // Create and display the pre-exisiting sports as buttons
        function createExistingButtons() {
            // Loop through all the sports
            for (let i = 0; i < sports.length; i++) {
                // Create a button for the sport
                createButton(sports[i]);
            }
        }

        function createButton(sportName) {
            // Create a button element
            let sportButton = $("<button>")

            // Add boostrap class to the button
            sportButton.addClass("btn btn-info sport-button")

            // Set the sport name as the id
            sportButton.attr("id", sportName);
            
            // Set the type attribute to button
            sportButton.attr("type", "button");
            
            // Set the text to be the sport name
            sportButton.text(sportName);

            // Query the API withe the sport name
            sportButton.on("click", function() {
                queryAPI(sportName);
            })

            // Append the button to the #button-area div
            $("#button-area").append(sportButton);
        }

        // Queries the GIPHY API with the sport name
        function queryAPI(sportName) {
            // Empty the gifs area
            $("#gifs-area").empty();

            // URL used to reach and endpoint in the GIPHY API
            let queryURL = "https://api.giphy.com/v1/gifs/search" +
                                "?q=" + sportName +
                                "&limit=" + LIMIT +
                                "&rating=" + RATING +
                                "&api_key=" + API_KEY;

            // jQuery method for calling the API
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response.data);
                
                // Display the gifs on the page
                displayGifs(response.data);

                // Set the load more button as a variable
                let loadMore = $("#load-more");

                // Remove on click for the load more button
                loadMore.off("click");

                // When the load more button is clicked
                loadMore.on("click", function() {
                    // Query the API more for gifs
                    queryMoreAPI(queryURL);
                });

                // Show the load more button
                loadMore.show();
            });
        }

        // Loads more gifs from the GIPHY API
        function queryMoreAPI(queryURL) {
            // Increase the offset by the limit so that the the call to the API doesn't get back
            //     the gifs already displayed on the webpage.
            offset+=LIMIT;

            // Add the offset parameter to the query
            queryURL += "&offset=" + offset;

            // jQuery method for calling the API
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response.data);

                // Display the gifs on the page
                displayGifs(response.data);
            });
        }

        /*
        <div class="card">
            <img class="card-img-top" src="..." alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
            </div>
        </div>
        */

        // Displays all the gifs from the API call
        function displayGifs(gifObjectArray) {
            // Loop through all the objcets in the the array
            for (let i = 0; i < gifObjectArray.length; i++) {
                // Create a div for each card
                let div = $("<div>").addClass("col-md-4 d-flex align-items-stretch");
                // Append the card div to the the gifs area
                $("#gifs-area").append(div);

                // Create the card
                let card = $("<div>").addClass("card");
                // Set the width of the card to be the whole width of the div
                card.css("width", "100%");
                // Append it to the div
                div.append(card);

                // Create image element
                let cardImage = $("<img>").addClass("card-img-top");
                // Set the data-still url
                cardImage.attr("data-still", gifObjectArray[i].images.original_still.url);
                // Set the data-animate url
                cardImage.attr("data-animate", gifObjectArray[i].images.original.url);
                // Set the src to the data-still url
                cardImage.attr("src", cardImage.attr("data-still"));
                // Set the data state to still
                cardImage.attr("data-state", "still");
                // Set the alt attribute to the title of the gif
                cardImage.attr("alt", gifObjectArray[i].title);
                // Set on click handler to the image
                cardImage.on("click", function() {
                    changeState($(this));
                })
                // Append the image to the card
                card.append(cardImage);

                let cardBody = $("<div>").addClass("card-body");
                card.append(cardBody);

                let cardTitle = $("<h5>").addClass("card-title");
                cardTitle.text(gifObjectArray[i].rating);
                cardBody.append(cardTitle);
                
            }
        }

        // Change the state of the image
        function changeState(thisImage) {
            // If the state of the image is still
            if (thisImage.attr("data-state") === "still") {
                // Change the state to animate
                thisImage.attr("data-state", "animate");
            } else {  // If the state of the image is animate
                // Change the state to still
                thisImage.attr("data-state", "still");
            }

            // Change the src attribute of the image to the url of the new state
            thisImage.attr("src", thisImage.attr("data-" + thisImage.attr("data-state")));
        }

        // Creates the existing buttons
        createExistingButtons();

        // When the Add Sport button is clicked
        $("#add-sport").on("click", function() {
            // Prevent the page from refreshing
            event.preventDefault();

            let sportName = $("#sport-input").val();
            console.log(sports.indexOf(sportName));

            if (sportName !== "") {

                // If the sport entered is not already a button
                if (sports.indexOf(sportName) === -1) {
                    // Add the sport to the sports array
                    sports.push(sportName);

                    // Create a button for the sport the user inputted
                    createButton(sportName);

                    // Clear the user input
                    $("#sport-input").val("");
                } else {  // The sport is already a button
                    // Flash the previously created sport button
                    $("#" + sportName).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);

                }
            }
        })
    });
})();