import * as $ from "jquery";
import { sp, Web } from "./lib/sp";

var search = decodeURI(getParameterByName("search"));
$("#search-term").html(search);

// search sharepoint
sp.web.lists
  .getByTitle("Job Roles")
  .items.select("Id", "Title", "Description", "JobFamily/Title")
  .expand("JobFamily")
  .filter("substringof('" + search + "',Title)")
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

      switch (items[i]["JobFamily"]["Title"]) {
        case "Group Finance and Technical Specialisms":
          itemtemplate
            .find("#temp_img")
            .attr(
              "src",
              "/sites/hrcareerpathways/_catalogs/masterpage/images/group-finance.png"
            );
          break;
        case "Operational Finance":
          itemtemplate
            .find("#temp_img")
            .attr(
              "src",
              "/sites/hrcareerpathways/_catalogs/masterpage/images/operational-finance.png"
            );
          break;
        case "Finance Shared Service Centre (FSSC)":
          itemtemplate
            .find("#temp_img")
            .attr(
              "src",
              "/sites/hrcareerpathways/_catalogs/masterpage/images/fssc.png"
            );
          break;
      }

      $("#results-container").append(itemtemplate);
    }

    if (items.length == 0) {
      $(".error-container").show();
    }
  });

//get query string parameter
function getParameterByName(name) {
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
