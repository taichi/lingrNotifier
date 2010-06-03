{
if(webkitNotifications) {
	var avatar = document.getElementById("avatar");
	if(avatar) {
		var img = document.createElement("img");
		img.src = chrome.extension.getURL("notifyMessage.png");
		img.alt = "popup notify";
		var na = document.createElement("a");
		na.setAttribute("class", "disabled");
		na.href = "#";
		na.title = "turn on popup notification";
		na.setAttribute("onclick","lingr.ui.togglePopup(); return false;");
		na.appendChild(img);
		
		var div = document.createElement("div");
		div.id = "popupNotify";
		div.appendChild(na);
	
		avatar.insertBefore(div, document.getElementById("sound"));
		
		var script = document.createElement("script");
		script.src = chrome.extension.getURL("onMessage.js");
		script.type = "text/javascript";
		document.body.appendChild(script);
	}
}
}

