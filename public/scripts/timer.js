$(function () {
    // countdownStart
    var storageCountdownReset = "countdownResetMonokular",
        storageCountdownTime = "countdownTimeMonokular",
        countdownResetTimeVal = 41,
        nowDateTime = new Date().getTime(),
        countdownReset = localStorage.getItem(storageCountdownReset);
    if (countdownReset == null) {
        localStorage.setItem(storageCountdownReset, nowDateTime)
    } else {
        if (nowDateTime - countdownReset > countdownResetTimeVal * 60 * 1000) {
            var countdownTime = (new Date).getTime() + 24e5;
            localStorage.setItem(storageCountdownTime, countdownTime);
            localStorage.setItem(storageCountdownReset, nowDateTime);
        }
    }

    if (localStorage.getItem(storageCountdownTime)) {
        var countdownTime = localStorage.getItem(storageCountdownTime);
    } else {
        countdownTime = (new Date).getTime() + 24e5;
    }

    $(".countdown").countdown(countdownTime, function (s) {
        $(this).html(s.strftime('' +
            '<div class="countdown__item"><span class="hour">%H</span> часов</div>' +
            '<div class="cocountdown__item dots"><span class="dot"></span> <span class="dot"></span></div>' +
            '<div class="countdown__item"><span class="minute">%M</span> минут</div>' +
            '<div class="cocountdown__item dots"><span class="dot"></span> <span class="dot"></span></div>' +
            '<div class="countdown__item"><span class="second">%S</span> секунд</div>'
        ));
    }).on('update.countdown', function (e) {
        countdownTime = e.finalDate.getTime();
        localStorage.setItem(storageCountdownTime, countdownTime);
    }).on('finish.countdown', function (e) {
        $('.countdown').countdown('stop');
    });
    // countdownEnd
})