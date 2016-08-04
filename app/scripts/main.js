var LENGTH = 20,
    answer = [],
    user = [],
    strictMode = 0,
    turnON = 0,
    currentSetep = 0,
    test = [1,1,1,2,2,2],
    gamestartTimeout = null,
    play = 0;
var c = new Array(LENGTH);
c[0] = ['rgb(161, 220, 225)', 'rgb(200, 225, 225)']
c[1] = ['#A00', '#F00'];
c[2] = ['#006', '#00F'];
c[3] = ['#0A0', '#0F0'];
c[4] = ['#AA0', '#FF0'];
function reset() {
    $('#s-move').css('float', 'right');
    $('#counter').html('<p>00</p>');
    user.length = 0;
    answer.length = 0;
    play = 0;
}
function circleClick(id) {
    id = id || 0;
    $('.circle' + id).css('background-color', c[id][1]);
    document.getElementById('audio' + id).currentTime = 0;
    document.getElementById('audio' + id).play();
    setTimeout(function () {
        $('.circle' + id).css('background-color', c[id][0]);
    }, 100);
}
function wrong() {
    var _color = 'white',
        i = 0;
    $('#counter').html('<p><br></p>');
    $('#mark').html('WRONG');
    $('#counter').css('background-color', _color);
    $('.circle-sm-common').css('background-color', _color);
    $('.circle-sm-common').css('border-color', _color);
    setTimeout(function () {
        updateCounter();
        $('#mark').html('Simmon<br>Game');
        $('#counter').css('background-color', '#FFE');
        $('.circle-sm-common').css('background-color', 'rgb(161, 220, 225)');
        $('.circle-sm-common').css('border-color', 'rgb(161, 220, 225)');
    }, 500);
}
function updateCounter() {
    if (currentSetep < 10) {
        $('#counter').html('<p>0' + currentSetep + '</p>');
    } else {
        $('#counter').html('<p>' + currentSetep + '</p>');
    }
}
function termA(count) {
    var i = 0;
    play = 0;
    for (i = 0; i < count + 1; i++) {
        (function (i) {
            setTimeout(function () {
                if (i === count) {
                    play = 1;
                    console.log('---------------');
                } else {
                    console.log('answer:' + answer[i]);
                    circleClick(answer[i]);
                }
            }, 800 * i);
        } (i));
    }
}
function end() {
    setTimeout(function () {
        alert('All correct!');
        reset();
    }, 100);
}
function termB(input) {
    console.log('user press:' + input);
    if (input === answer[user.length]) {
        user.push(input);
        console.log('user:'+user);
        if (user.length === currentSetep) {
            console.log('correct!');
            user.length = 0;
            if (currentSetep === answer.length) {
                end();
                return;
            } else {
                play = 0;
                currentSetep++;
                user.length = 0;
                updateCounter();
                setTimeout(function() {
                    termA(currentSetep);
                }, 1000);
            }
        }
    } else {
        play = 0;
        if (strictMode) {
            console.log('Wrong! Let me show you again!');
            wrong();
            reset();
            setTimeout(function() {
                gamestart();
            }, 1000);
        } else {
            console.log('Wrong! Let me show you again!');
            wrong();
            user.length = 0;
            setTimeout(function() {
                termA(currentSetep);    
            }, 1000);
        }
    }

}
function gamestart() {
    var i = 0,
        tiemout;
    if (!turnON) return;
    reset();
    if (gamestartTimeout != null) {
        clearTimeout(gamestartTimeout);
    } 
    gamestartTimeout = setTimeout(function () {
        console.log('start');
        currentSetep = 0;
        answer.length = 0;
        updateCounter();
        while (i != LENGTH) {
            answer.push(~~(Math.random() * 4 + 1));
            i++;
        }
        // answer = test.slice();
        console.log(answer);
        currentSetep++;
        updateCounter();
        termA(currentSetep);
        gamestartTimeout = null;
    }, 800);
}
function setStrict() {
    if (!turnON) return;
    strictMode ^= 1;
    if (strictMode) {
        $('#strict-light').css('background-color', '#F00');
    } else {
        $('#strict-light').css('background-color', '#111');
    }
}
$('#start').click(function (e) {
    e.stopPropagation();
    gamestart();
});
$('#strict').click(function (e) {
    e.stopPropagation();
    setStrict();
});
$('#switch').click(function (e) {
    e.stopPropagation();
    turnON ^= 1;
    if (turnON) {
        reset();
    } else {
        $('#s-move').css('float', 'left');
        $('#counter').html('<p>&nbsp;</p>');
        $('#strict-light').css('background-color', '#111');
    }
});
$('.circle-sm-common').click(function (e) {
    e.stopPropagation();
});
$('.circle1').click(function () {
    if (play) {
        circleClick(1);
        termB(1);
    }
});
$('.circle2').click(function () {
    if (play) {
        circleClick(2);
        termB(2);
    }
});
$('.circle3').click(function () {
    if (play) {
        circleClick(3);
        termB(3);
    }
});
$('.circle4').click(function () {
    if (play) {
        circleClick(4);
        termB(4);
    }
});
