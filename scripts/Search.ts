import * as $ from "jquery";
import { sp, Web } from "./lib/sp";

var search = decodeURI(getParameterByName("search"));
$("#search-term").html(search);

sp.web.lists
	.getByTitle("Job Roles")
	.items.filter("substringof('" + search + "',Title)")
	.get()
	.then((items: any[]) => {
		for (var i in items) {
			var itemtemplate = $("#template-container .search-result").clone();
			itemtemplate.find("#temp_title").html(items[i]["Title"]);
			itemtemplate.find("#temp_desc").html(items[i]["Description"]);
			itemtemplate
				.find("#temp_link")
				.attr(
					"href",
					"https://uat-ext.kier.group/sites/hrcareerpathways/Pages/Job-Role.aspx?ids=" +
						items[i]["Id"]
				);

			switch (items[i]["JobFamily"]) {
				case "Group Finance and Technical Specialisms":
					$("#temp_img").attr(
						"src",
						"/sites/hrcareerpathways/_catalogs/masterpage/images/group-finance-large.png"
					);
					break;
				case "Operational Finance":
					$("#temp_img").attr(
						"src",
						"/sites/hrcareerpathways/_catalogs/masterpage/images/operational-finance.png"
					);
					break;
				case "Finance Shared Service Centre (FSSC)":
					$("#temp_img").attr(
						"src",
						"/sites/hrcareerpathways/_catalogs/masterpage/images/fssc.png"
					);
					break;
			}

			$("#results-container").append(itemtemplate);
		}
	});

function getParameterByName(name) {
	var url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
