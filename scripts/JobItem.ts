import * as $ from "jquery";
import { sp, Web } from "./lib/sp";

// get id from query string
var pageid = +getParameterByName("ids");

//search sharepoint
sp.web.lists
	.getByTitle("Job Roles")
	.items.getById(pageid)
	.select(
		"Title",
		"Description",
		"Job_x0020_Level",
		"Knowledge_x0020_Required",
		"Experience",
		"Skills_x0020_Needed",
		"JobFamily/Id",
		"JobFamily/Title",
		"Progression1/Title",
		"Progression2/Title",
		"Progression3/Title",
		"Progression1/Id",
		"Progression2/Id",
		"Progression3/Id"
	)
	.expand("JobFamily", "Progression1", "Progression2", "Progression3")
	.usingCaching()
	.get()
	.then((item: any) => {
		console.log(item);

		//breadcrumb
		$("#pathway-breadcrumb").html(
			item["JobFamily"]["Title"] + "&nbsp;&gt;&nbsp;" + item["Title"]
		);
		$("#job-pathway").html(item["JobFamily"]["Title"]);
		$("#job-pathway-lower").html(item["JobFamily"]["Title"]);
		$("#job-pathway-button").attr(
			"href",
			"/sites/hrcareerpathways/Pages/Job-Role-Landing.aspx?ids=" +
				item["JobFamily"]["Id"]
		);
		$("#job-title").html(item["Title"]);
		$("#job-description").html(item["Description"]);
		$("#job-rolefamily").html(item["JobFamily"]["Title"]);
		$("#job-level").html(item["Job_x0020_Level"]);
		$("#job-knowledge").html(
			returnListFromDiv(item["Knowledge_x0020_Required"])
		);
		$("#job-experience").html(returnListFromDiv(item["Experience"]));
		$("#job-skills").html(returnListFromDiv(item["Skills_x0020_Needed"]));

		//progression
		var isProgressable = false;
		if (item["Progression1"]["Title"] != undefined) {
			$("#progression1-circle").show();
			$("#progression1-circle")
				.find("span")
				.html(item["Progression1"]["Title"]);
			$("#progression1-circle")
				.parent()
				.attr(
					"href",
					"/sites/hrcareerpathways/Pages/Job-Role.aspx?ids=" +
						item["Progression1"]["Id"]
				);
			isProgressable = true;
		}

		if (item["Progression2"]["Title"] != undefined) {
			$("#progression2-circle").show();
			$("#progression2-circle")
				.find("span")
				.html(item["Progression2"]["Title"]);
			$("#progression2-circle")
				.parent()
				.attr(
					"href",
					"/sites/hrcareerpathways/Pages/Job-Role.aspx?ids=" +
						item["Progression2"]["Id"]
				);
			isProgressable = true;
		}

		if (item["Progression3"]["Title"] != undefined) {
			$("#progression3-circle").show();
			$("#progression3-circle")
				.find("span")
				.html(item["Progression3"]["Title"]);
			$("#progression3-circle")
				.parent()
				.attr(
					"href",
					"/sites/hrcareerpathways/Pages/Job-Role.aspx?ids=" +
						item["Progression3"]["Id"]
				);
			isProgressable = true;
		}

		if (!isProgressable) {
			$(".role-progression").hide();
		}

		//page image
		switch (item["JobFamily"]["Title"]) {
			case "Group Finance and Technical Specialisms":
				$("#job-pathway-img").attr(
					"src",
					"/sites/hrcareerpathways/_catalogs/masterpage/images/group-finance-large.png"
				);
				break;
			case "Operational Finance":
				$("#job-pathway-img").attr(
					"src",
					"/sites/hrcareerpathways/_catalogs/masterpage/images/operational-finance.png"
				);
				break;
			case "Finance Shared Service Centre (FSSC)":
				$("#job-pathway-img").attr(
					"src",
					"/sites/hrcareerpathways/_catalogs/masterpage/images/fssc.png"
				);
				break;
		}
	});

// convert sharepoint generated div into list
function returnListFromDiv(content) {
	var returnString = "";

	var innercontent = $($.parseHTML(content)).find("p");
	var listItems = innercontent.html().split("<br>");

	for (var i in listItems) {
		var listitem = "<li>" + listItems[i] + "</li>";
		returnString += listitem;
	}

	return returnString;
}

//get querystring parameter
function getParameterByName(name) {
	var url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
