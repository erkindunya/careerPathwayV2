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
			"/sites/hrcareerpathways/_catalogs/masterpage/images/operational-finance.png"
		);
		$(".operationalfinance-pathway").addClass("greyscale");
		break;
	case 3:
		$("#page_image").attr(
			"src",
			"/sites/hrcareerpathways/_catalogs/masterpage/images/fssc.png"
		);
		$(".fssc-pathway").addClass("greyscale");
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

//createSvgLinks();
// AUTOMAGICALLY CREATE LINKS WITHIN SVG
function createSvgLinks() {
	$("svg circle").each(function() {
		var urlName = encodeURI(
			$(this)
				.parent()
				.find("text")
				.html()
				.replace("\n", "")
				.replace(/<(?:.|\n)*?>/gm, "")
				.trim()
				.replace(/ +(?= )/g, "")
		)
			.replace("%0A%20", "")
			.replace("%0A%20", "");

		var jobId = 0;

		sp.web.lists
			.getByTitle("Job Roles")
			.items.filter("Title eq '" + urlName + "'")
			.usingCaching()
			.get()
			.then((items: any[]) => {
				try {
					jobId = items[0]["Id"];
					console.log("Job Found: " + jobId);
				} catch {
					console.log(
						"Job not found: " + urlName + " (" + decodeURI(urlName) + ")"
					);
				}

				var newLink = $("<a/>").attr(
					"xlink:href",
					"https://uat-ext.kier.group/sites/hrcareerpathways/Pages/Job-Role.aspx?ids=" +
						jobId
				);
				wrap($(this), newLink);
			});
	});
}
function wrap(el, wrapper) {
	$(wrapper).insertBefore($(el));
	$(wrapper).append($(el));
	$(wrapper).append($(wrapper).next());
}
