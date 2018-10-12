import * as $ from "jquery";
import { sp, Web } from "./sp";

$(document).on("click", ".popup", function() {
	var jobFamilyId = $(this).data("pathway");
	$("#popup-list").empty();

	sp.web.lists
		.getByTitle("Job Families")
		.items.getById(jobFamilyId)
		.get()
		.then((item: any) => {
			$("#popup-title").html(item["Title"]);

			var listItems = item["Competencies"].split("\n");
			for (var i in listItems) {
				var listitem =
					'<li class="col-sm-6"><span>' + listItems[i] + "</span></li>";
				$("#popup-list").append(listitem);
			}

			$(".popup-container").fadeIn();
		});
});

$(document).on("click", ".close-popup", () => {
	$(".popup-container").fadeOut();
});

document.addEventListener("click", function(event) {
	// If user clicks inside the element, do nothing
	//if (event.target.closest(".popup-content")) return;

	$(".popup-container").fadeOut();
});
