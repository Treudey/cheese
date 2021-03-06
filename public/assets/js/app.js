// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".eat-cheese").on("click", function(event) {
		let id = $(this).data("id");

        // Send the PUT request.
		$.ajax("/api/cheese/" + id, {
			type: "PUT"
		}).then(
			() => {
				console.log("Cheese has been devoured");
				// Reload the page to get the updated list
				location.reload();
			}
		);
	});

	$(".add-btn").on("click", function(event) {
		// Make sure to preventDefault on a submit event.
		event.preventDefault();

		const newCheese = {
			cheese: $("#cheese-name").val().trim()
		};

		// Send the POST request.
		$.ajax("/api/cheese", {
			type: "POST",
			data: newCheese
		}).then(() => {
				console.log("created new cheese");
				// Reload the page to get the updated list
				location.reload();
			}
		);
    });
});