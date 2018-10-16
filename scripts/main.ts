import * as $ from "jquery";
import { sp, Web } from "./lib/sp";
import "./lib/PathwayPopups";

//subnav button is clicked
$(document).on("click", ".js-toggle-subnav", () => {
  $(".subnav-link").toggleClass("active");
  $(".subnav").slideToggle(200);
});

// scroll arrow is clicked
$(document).on("click", "#exploreCareer .arrow", () => {
  $("#s4-workspace").animate(
    {
      scrollTop: $("#exploreCareer").offset().top
    },
    1000
  );
});

//toggle for sharepoint ribbon
$(document).on("click", ".js-toggle-admin", () => {
  $("#ms-designer-ribbon").slideToggle(200);
  $(".js-toggle-admin span").toggleClass("active");
});

//search button is clicked
$(document).on("click", ".search-button", () => {
  search();
});

$("#search-input").on("keypress", function(e) {
  //search if enter is pressed
  if (e.which === 13) {
    e.preventDefault();
    $(this).attr("disabled", "disabled");
    search();
    $(this).removeAttr("disabled");
  }
});

// timer to limit API calls
var timer;

// search with search subnav
$("#search-input").on("keyup", function(e) {
  clearTimeout(timer); //cancel previous search

  timer = setTimeout(function() {
    if ($("#search-input").val() != "") {
      $(".sub-search").empty(); //get rid of existing results

      //search sharepoint
      sp.web.lists
        .getByTitle("Job Roles")
        .items.select("Id", "Title", "JobFamily/Title")
        .expand("JobFamily")
        .filter(
          "substringof('" +
            encodeURI($("#search-input").val() as string) +
            "',Title)"
        )
        .top(4)
        .get()
        .then((items: any[]) => {
          for (var i in items) {
            var template = $("<a>", { class: "nav-search-result" });

            template.attr(
              "href",
              "/sites/hrcareerpathways/Pages/Job-Role.aspx?ids=" +
                items[i]["Id"]
            );
            template.append(getImageByPathway(items[i]["JobFamily"]["Title"]));
            template.append($("<span>").html(items[i]["Title"]));

            $(".sub-search").append(template);
          }

          if (items.length > 0) {
            $(".search").addClass("active");
          }
        });
    } else {
      $(".search").removeClass("active");
    }
  }, 600);
});

// search with search page
function search() {
  if ($("#search-input").val() != "") {
    window.location.href =
      "/sites/hrcareerpathways/Pages/search.aspx?search=" +
      encodeURI($("#search-input").val() as string);
  }
}

//get image object based on pathway name
function getImageByPathway(pathway) {
  switch (pathway) {
    case "Group Finance and Technical Specialisms":
      return $("<img>", {
        src:
          "/sites/hrcareerpathways/_catalogs/masterpage/images/group-finance.png"
      });
    case "Operational Finance":
      return $("<img>", {
        src:
          "/sites/hrcareerpathways/_catalogs/masterpage/images/operational-finance.png"
      });
    case "Finance Shared Service Centre (FSSC)":
      return $("<img>", {
        src: "/sites/hrcareerpathways/_catalogs/masterpage/images/fssc.png"
      });
  }
}
