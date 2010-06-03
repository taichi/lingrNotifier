if(lingr) {
	if(lingr.getCookie('popup')) {
		if(webkitNotifications.checkPermission() == 0) {
			var target = $('popupNotify').down('a');
			target.removeClassName('disabled').addClassName('enabled');
			target.title = 'turn off popup notification';
		} else {
			lingr.clearCookie('popup');
		}
	}

	lingr.ui.togglePopup = function() {
		var target = $('popupNotify').down('a');
		if (target.hasClassName('disabled')) {
			if( webkitNotifications.checkPermission() != 0) {
				webkitNotifications.requestPermission();
			}
			if(webkitNotifications.checkPermission() == 0) {
				target.removeClassName('disabled').addClassName('enabled');
				target.title = 'turn off popup notification';
				lingr.setCookie('popup','on');
			}
		} else {
			target.removeClassName('enabled').addClassName('disabled');
			target.title = 'turn on popup notification';
			lingr.clearCookie('popup');
		}
	};

	lingr.ui._insertMessage = lingr.ui.insertMessage;
	lingr.ui.insertMessage = function(msg, bulk) {
		notifyMessage(msg);
		this._insertMessage(msg, bulk);
	}

	function notifyMessage(msg) {
		if(lingr.getCookie("popup") && webkitNotifications.checkPermission() == 0) {
			var notification = webkitNotifications.createNotification(
				msg.icon_url, msg.room, msg.nickname + ": " + msg.text
			);
			notification.show();
			
			setTimeout(function() {
				notification.cancel();
			}, 4000);
		}
	}
}
