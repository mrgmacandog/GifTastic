// Code is executed in strict mode
"use strict";

// Wrap all code in an anonymous function so functions cannot be called externally
(function() {
    $(document).ready(function() {
        const API_KEY = "28lAjGKNf0GPp5tY9oP31j3cTYi2EbzU";

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
            sportButton.addClass("btn btn-info")
            
            // Set the type attribute to button
            sportButton.attr("type", "button")    
            
            // Set the text to be the sport name
            sportButton.text(sportName);

            // Query the API withe the sport name
            sportButton.on("click", function() {
                queryAPI(sportName);
            })

            // Append the button to the #button-area div
            $("#button-area").append(sportButton);
        }

        // Queries the Giphy API with the sportname
        function queryAPI(sportName) {
            let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sportName + "&api_key=" + API_KEY;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
            })
        }

        // Creates the existing buttons
        createExistingButtons();
    });
})();