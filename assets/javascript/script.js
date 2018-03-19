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
            console.log(response)
            console.log(response.data[0].images.fixed_width.url)
            for (var i = 0; i < 10; i++) {
                $('#gif-div').prepend(`<div class="col s6 m3" id="gifs">
                                        <p>Rating: ${response.data[i].rating}</p>
                                        <img src="${response.data[i].images.fixed_width_still.url}" data-still="${response.data[i].images.fixed_width_still.url}" data-animate="${response.data[i].images.fixed_width.url}" data-state="still" class="responsive-image gif">
                                        </div>`)
            };
        });
    };

    function playPause(){
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        };
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

    $(document).on('click', '.added-button', insertSubjectGif)

    $(document).on('click', '.gif', playPause);
     
    console.log(subjects)

//end of documents
});