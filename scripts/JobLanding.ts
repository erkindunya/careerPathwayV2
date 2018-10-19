import "es6-promise";
import "whatwg-fetch";
import * as $ from "jquery";
import { sp, Web } from "./lib/sp";
import "./lib/scrollpane";

var pageid = +getParameterByName("ids");

sp.web.lists
	.getByTitle("Job Families")
	.items.getById(pageid)
	.usingCaching()
	.get()
	.then((item: any) => {
		console.log(item);
		$("#pathway-breadcrumb").html(item["Title"]);
		$("#pathway-title").html(item["Title"]);
		$("#pathway-description").html(item["Description"]);

		var listItems = item["Competencies"].split("\n");
		for (var i in listItems) {
			var listitem =
				'<li class="col-sm-6"><span>' + listItems[i] + "</span></li>";
			$("#top-competencies").append(listitem);
		}
	});

switch (pageid) {
	case 1:
		$("#page_image").attr(
			"src",
			"/sites/hrcareerpathways/_catalogs/masterpage/images/group-finance-large.png"
		);
		$(".groupfinance-pathway").addClass("greyscale");
		loadSvg("/sites/hrcareerpathways/JobRoleCharts/GroupFinance.svg");
		break;

	case 2:
		$("#page_image").attr(
			"src",
			"/sites/hrcareerpathways/_catalogs/masterpage/images/operational-finance-large.png"
		);
		$(".operationalfinance-pathway").addClass("greyscale");
		loadSvg("/sites/hrcareerpathways/JobRoleCharts/OperationalFinance.svg");
		break;

	case 3:
		$("#page_image").attr(
			"src",
			"/sites/hrcareerpathways/_catalogs/masterpage/images/fssc-large.png"
		);
		$(".fssc-pathway").addClass("greyscale");
		// loadSvg("/sites/hrcareerpathways/JobRoleCharts/FSSC.svg");
		break;
}

document.getElementById("scrollbar").style.left = "0";
document.getElementById("scrollbar-lower").style.left = "0";

$("#chart-container").show();

function getParameterByName(name) {
	var url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function loadSvg(image_uri) {
	var img = $("#svg-map");

	$.get(
		image_uri,
		function(data) {
			var svg = $(data).find("svg");
			svg.removeAttr("xmlns:a");
			img.replaceWith(svg);
		},
		"xml"
	);
}
