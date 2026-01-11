window.onload = function () {
    var pageTitle = document.title;
    var attentionMessage = "👋 Revenez vite !"; // Updated for a friendlier tone consistent with new portfolio

    document.addEventListener('visibilitychange', function (e) {
        var isPageActive = !document.hidden;

        if (!isPageActive) {
            document.title = attentionMessage;
        } else {
            document.title = pageTitle;
        }
    });
};
