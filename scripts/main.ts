import * as $ from "jquery";

$(document).on("click", ".js-toggle-subnav", () => {
	$(".subnav-link").toggleClass("active");
	$(".subnav").slideToggle(200);
});

$(document).on("click", "#exploreCareer .arrow", () => {
	$("#s4-workspace").animate(
		{
			scrollTop: $("#exploreCareer").offset().top
		},
		1000
	);
});

$(document).on("click", ".js-toggle-admin", () => {
	$("#ms-designer-ribbon").slideToggle(200);
});
