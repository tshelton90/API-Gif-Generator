$(document).ready(function($) {
    // array for subjects to be added to 
    var subjects = []

    function insertSubjectGif() {
        var subject = $(this).text().trim();
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + subject + '&api_key=8X9vY0Twxp3XBNjJ3BfmLj3kRiVKlHxi';


        //ajax for the subject button
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            for (var i = 0; i < 5; i++) {
                $('#gif-div').append(`<img class="gif" id="giphy-gif${i}" src="${response.data[i].images.fixed_width_still.url}">`);

            };
        });
    };

    function renderButtons() {
        //empty the div id so that the new buttons don't stack
        $('#new-button').empty();
        //looping thru subject array
        for (var i = 0; i < subjects.length; i++) {
            var button = `<button class="added-button" data="${subjects[i]}">${subjects[i]}</button>`;
            $('#new-button').append(button);
        }
    };


    $('#add-subject').on('click', function(event) {
        event.preventDefault();
        var subject = $('#search-input').val().trim();
        console.log(subject)
        subjects.push(subject);
        renderButtons();
    });

    $(document).on('click', '.added-button', insertSubjectGif);

    console.log(subjects)

//end of documents
});