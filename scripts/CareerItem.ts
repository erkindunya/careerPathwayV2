import * as $ from "jquery";
import { sp, Web } from "./lib/sp";

var pageid = +getParameterByName("ids");
var name = "";

$(document).ready(function() {
  getPageContent();
  getNextCareerStory();
});

function getPageContent() {
  sp.web.lists
    .getByTitle("Career Stories")
    .items.getById(pageid)
    .usingCaching()
    .get()
    .then((item: any[]) => {
      console.log("Parent item:");
      console.log(item);
      name = item["Title"];
      $("#career-name").html(item["Title"]);
      $("#career-jobtitle").html(item["JobTitle"]);
      $("#career-desc").html(item["Description"]);
      $(".sun-container .inner-circle").css(
        "background-image",
        "url('" + item["Photo"]["Url"] + "')"
      );

      getPageItems();
    });
}

function getPageItems() {
  sp.web.lists
    .getByTitle("Career Story Details")
    .items.filter("Title eq '" + name + "'")
    .orderBy("SequenceNo")
    .usingCaching()
    .get()
    .then((items: any[]) => {
      console.log("Items for " + name + ":");
      console.log(items);

      for (var i in items) {
        var template = $("#template-container .story-point").clone();

        var dateOrQuote =
          items[i]["TimelineorQuote"].toLowerCase() == "timeline"
            ? "year"
            : "quote";

        template.find(".temp_title").html(items[i]["DisplayTitle"]);
        template.find(".temp_content").html(items[i]["DisplayText"]);
        template.find(".temp_itemtype").addClass(dateOrQuote + "-item");

        $("#story-timeline").append(template);

        calculateBgHeight();
      }
    });
}

function getNextCareerStory() {
  sp.web.lists
    .getByTitle("Career Stories")
    .items.usingCaching()
    .get()
    .then((items: any[]) => {
      var index = 0;
      for (var i in items) {
        if (items[i]["Id"] == pageid) {
          try {
            console.log(items[i + 1]["Id"]);
            index = +i + 1;
          } catch {
            console.log("No next available, defaulting to first career");
          }
        }
      }

      $(".tempnext_name").html(items[index]["Title"]);
      $(".tempnext_jobtitle").html(items[index]["JobTitle"]);
      $(".tempnext_link").attr(
        "href",
        "https://uat-ext.kier.group/sites/hrcareerpathways/Pages/Career-Story.aspx?ids=" +
          items[index]["Id"]
      );
      $(".tempnext_image").attr("src", items[index]["Photo"]["Url"]);
    });
}

function calculateBgHeight() {
  // below ensures the background isnt cut off and doesnt go further than it should.
  var backgroundElement = document.getElementById("story-background");
  var elementToFill = document.getElementById("story-timeline");
  var wholeBgSectorCount = Math.floor(elementToFill.clientHeight / 751);

  //751 being the natural height of the arrows background.
  backgroundElement.style.height = wholeBgSectorCount * 751 + "px";
}

function getParameterByName(name) {
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
