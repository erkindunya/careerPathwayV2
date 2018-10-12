import * as $ from "jquery";
import { sp, Web } from "./lib/sp";

var pageid = +getParameterByName("ids");

console.log(pageid);

sp.web.lists
	.getByTitle("Job Roles")
	.items.getById(pageid)
	.usingCaching()
	.get()
	.then((item: any) => {
		console.log(item);
		$("#pathway-breadcrumb").html(
			item["JobFamily"] + "&nbsp;&gt;&nbsp;" + item["Title"]
		);
		$("#job-pathway").html(item["JobFamily"]);
		$("#job-title").html(item["Title"]);
		$("#job-description").html(item["Description"]);

		switch (item["JobFamily"]) {
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

function getParameterByName(name) {
	var url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
