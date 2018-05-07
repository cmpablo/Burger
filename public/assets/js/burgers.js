// make sure we wait to attach our handlers until the DOM is fully loaded
$(document).ready(function() {
    $(function () {
        $(".create-form").on("submit", function (event) {
            // make sure to preventDefault on a submit event
            event.preventDefault();

            //console.log("Clicked");
            var newBurger = {
                burger_name: $("#orderInput").val().trim(),
                devoured: false
            };
            console.log(newBurger);
            // send the POST request
            $.ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(
                function () {
                    console.log("created new burger");
                    // reload the page to get the updated list
                    location.reload();
                }
            );
        });

        $(".devourBtn").on("click", function (event) {
            var id = $(this).data("id");
            var newStatus = 1;

            var newStatusState = {
                devoured: newStatus
            };
            console.log(newStatusState);
            // send the PUT request
            $.ajax("/api/burgers/" + id, {
                type: "PUT",
                data: newStatusState
            }).then(
                function () {
                    console.log("changed status to", newStatus);
                    // reload the page to get the updated list
                    location.reload();
                }
            );
        });

        $(".deleteBtn").on("click", function (event) {
            var id = $(this).data("id");

            // send the DELETE request
            $.ajax("/api/burgers/" + id, {
                type: "DELETE"
            }).then(
                function () {
                    console.log("deleted burger", id);
                    location.reload();
                }
            );
        });
    });
});