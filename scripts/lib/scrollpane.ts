var jScroll = document.getElementById.bind(document),
	container = jScroll("scrollbar-container"),
	content = jScroll("scrollbar-content"),
	scrollableBar = jScroll("scrollbar"),
	scrollLower = jScroll("scrollbar-lower");

content.addEventListener("scroll", function(e) {
	// get scrollable width (the amount hanging off the edge of the screen)
	var scrollableWidth = content.scrollWidth - content.clientWidth;
	// get percentage content scrolled
	var percentScrolled = 100 / (scrollableWidth / content.scrollLeft);
	//apply percentage to remaining scrollable width and set scrollLeft to result
	scrollableBar.style.left =
		((container.clientWidth - scrollableBar.clientWidth) / 100) *
			percentScrolled +
		"px";
	scrollLower.style.left =
		((container.clientWidth - scrollLower.clientWidth) / 100) *
			percentScrolled +
		"px";
});

//depricated but needed to work in IE11
var event = document.createEvent("Event");
event.initEvent("scroll", true, true);

// newer way of doing it but not supported by IE
//var event = new Event("scroll");

window.addEventListener("resize", content.dispatchEvent.bind(content, event));
content.dispatchEvent(event);

function addScrollbarEvent(scrollbar) {
	scrollbar.addEventListener("mousedown", function(start) {
		start.preventDefault();
		var y = scrollbar.offsetLeft;
		var onMove = function(end) {
			var delta = end.pageX - start.pageX;
			scrollbar.style.left =
				Math.min(
					container.clientWidth - scrollbar.clientWidth,
					Math.max(0, y + delta)
				) + "px";

			// percent of scrollbar moved
			var percentScrolled =
				100 /
				((container.clientWidth - scrollbar.clientWidth) /
					scrollbar.offsetLeft);
			content.scrollLeft =
				((content.scrollWidth - content.clientWidth) / 100) * percentScrolled;
		};
		console.log(start);
		document.addEventListener("mousemove", onMove);
		document.addEventListener("mouseup", function() {
			document.removeEventListener("mousemove", onMove);
		});
	});
}

// touchscreens
function addScrollbarTouchEvent(scrollbar) {
	scrollbar.addEventListener("touchstart", function(start) {
		start.preventDefault();
		var y = scrollbar.offsetLeft;
		var onMove = function(end) {
			var delta = end.touches[0].pageX - start.touches[0].pageX;
			scrollbar.style.left =
				Math.min(
					container.clientWidth - scrollbar.clientWidth,
					Math.max(0, y + delta)
				) + "px";

			// percent of scrollbar moved
			var percentScrolled =
				100 /
				((container.clientWidth - scrollbar.clientWidth) /
					scrollbar.offsetLeft);
			content.scrollLeft =
				((content.scrollWidth - content.clientWidth) / 100) * percentScrolled;
		};
		console.log(start);
		document.addEventListener("touchmove", onMove);
		document.addEventListener("touchend", function() {
			document.removeEventListener("touchmove", onMove);
		});
	});
}

//desktop
addScrollbarEvent(scrollableBar);
addScrollbarEvent(scrollLower);

// mobile
addScrollbarTouchEvent(scrollableBar);
addScrollbarTouchEvent(scrollLower);
