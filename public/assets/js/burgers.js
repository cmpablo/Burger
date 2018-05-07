// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $("#submitOrder").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            burger_name: $("#orderInput").val().trim()
        };

        // Send the POST request.
        $.ajax("/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $("#devourBtn").on("click", function (event) {
        var id = $(this).data("id");

        // Send the POST request
        $.ajax("/burgers/:id" + id, {
            type: "POST"
        }).then(
            function () {
                console.log("devoured burger", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});