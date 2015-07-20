// scripts.js for Pomodoro clock

$(document).ready(function() {

/*
Add controls for session and break length.  The minimum value is 1
Update the value shown in the control
When the session legnth changes, update the value in the timeer
Disable the controls while the timer is running
Click on the timer to start and pause it
Start the break timer as soon as the session timer is done
Start the session timer as soon as the break timer is done
Play a sound when the break or session timer starts, except for the first
time (i.e., when first loaded or after the session or break settings have
been changed)
Fill the timer according to the percentage of the time that has passed.  Update it when the timer is updated.
Reset the fill and change the fill color when tranitioning from session to break
*/

    var pxPerSec;
    var nInterval;

    var timerType = "Session";
    var running = false;
    var breakTime = 0.1;
    var sessionTime = 0.1;
    var duration = 0;
    var remaining = 0;

    var fillStart = 476;
    var fillEnd = 166;
    var newTop = 0;
    var oldTop = 0;

    initialize();

    function initialize() {
        timerType = "Session";
        duration = sessionTime * 60;
        remaining = duration;
        $( '.timerType' ).html('').html(timerType);
        $( '#break-value' ).html('').html(breakTime);
        $( '#session-value' ).html('').html(sessionTime);
        $( '.timer' ).html('').html(timeStr(remaining));
        $( '.fill-div' ).css("top", fillStart);
        $( '.fill-div' ).removeClass('break').addClass('session');
    }

    $( '#break-minus' ).click(function(event) {
        if (running || breakTime <= 1) return;
        breakTime--;
        initialize();
    });

    $( '#break-plus' ).click(function(event) {
        if (running) return;
        breakTime++;
        initialize();
    });

    $( '#session-minus' ).click(function(event) {
        if (running || sessionTime <= 1) return;
        sessionTime--;
        initialize();
    });

    $( '#session-plus' ).click(function(event) {
        if (running) return;
        sessionTime++;
        initialize();
    });

    $( '.data-div' ).click(function(event) {
        if (running) {
            running = false;
            clearInterval(nInterval);
        } else {
            running = true;
            pxPerSec = (fillEnd - fillStart) / duration;
            nInterval = setInterval(countdown, 1000);
        }
    });

    function countdown() {
        if (remaining <= 0) {
            switchType();
        }
        remaining--;
        $( '.timer' ).html('').html(timeStr(remaining));
        newTop = fillStart + Math.round(pxPerSec * (duration - remaining));
        if (newTop !== oldTop) {
            $( '.fill-div' ).css("top", newTop + 'px');
            oldTop = newTop;
        }
    }

    function switchType() {
        if (timerType === "Session") {
            timerType = "Break!";
            remaining = breakTime * 60;
            $( '.fill-div ').removeClass('session').addClass('break');
        } else {
            timerType = "Session";
            remaining = sessionTime * 60;
            $( '.fill-div ').removeClass('break').addClass('session');
        }
        duration = remaining;
        pxPerSec = (fillEnd - fillStart) / duration;
        $( '.timerType' ).html('').html(timerType);
        $( '.fill-div' ).css("top", fillStart + 'px');
        $( '.timer' ).html('').html(timeStr(remaining));
    }

    function timeStr(time) {
        /* The argument is in units of seconds */
        var hr = Math.floor(time / 3600);
        var min = Math.floor((time % 3600) / 60);
        var sec = Math.round(time - (3600 * hr) - (60 * min));
        if (sec < 10) sec = '0' + sec;
        if (hr > 0) {
            if (min < 10) min = '0' + min;
            return hr + ':' + min + ':' + sec;
        } else {
            return min + ':' + sec;
        }
    }



});
