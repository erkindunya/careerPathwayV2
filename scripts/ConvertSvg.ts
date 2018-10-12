import * as $ from "jquery";
import { sp, Web } from "./lib/sp";

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

$(document).on("click", "#btnComplete", function() {
	var svgText = $("#txtInput").val() as string;

	var svgDom = $.parseHTML(svgText);
	$("circle", svgDom).each(function() {
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

				$("#txtOuput").val($(svgDom).html());
			});
	});
});
