import * as $ from "jquery";
import { sp, Web } from "./lib/sp";

$(document).ready(function() {
	sp.web.lists
		.getByTitle("Career Stories")
		.items.usingCaching()
		.get()
		.then((items: any[]) => {
			console.log(items);

			for (var i in items) {
				var template = $("#templateItemContainer .story-item").clone();
				template.find(".temp_Name").html(items[i]["Title"]);
				template.find(".temp_title").html(items[i]["JobTitle"]);
				template
					.find(".temp_link")
					.attr(
						"href",
						"https://uat-ext.kier.group/sites/hrcareerpathways/Pages/Career-Story.aspx?ids=" +
							items[i]["Id"]
					);

				template.find(".temp_img").attr("src", items[i]["Photo"]["Url"]);
				console.log(template.find(".temp_title").html());
				template.appendTo("#career-story-container");
			}
		});
});

// $.ajax({
// 	url:
// 		"https://uat-ext.kier.group/sites/hrcareerpathways/_api/web/lists/getByTitle('Career%20Stories')/items(1)",
// 	cache: false,
// 	headers: {
// 		Accept: "application/json; odata=verbose"
// 	},
// 	success: function(response) {
// 		console.log(response);
// 	}
// });
