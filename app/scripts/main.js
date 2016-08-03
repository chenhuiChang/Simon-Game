var LENGTH = 5,
    answer = [],
    user = [],
    strictMode = 0,
    turnON = 0,
    currentSetep = 0,
    play = 0;
var c = new Array(5);
c[0] = ['rgb(161, 220, 225)', 'rgb(200, 225, 225)']
c[1] = ['#D00', '#F00'];
c[2] = ['#009', '#00F'];
c[3] = ['#0E0', '#0F0'];
c[4] = ['#EE0', '#FF0'];
function circleClick(id) {
    id = id || 0;
    $('.circle' + id).css('background-color', c[id][1]);
    setTimeout(function () {
        $('.circle' + id).css('background-color', c[id][0]);
    }, 100);
}
function wrong() {
    var _color = 'white',
        i = 0;
    $('#counter').html('<p>!!!!</p>');
    $('#counter').css('background-color', _color);
    $('.circle-sm-common').css('background-color', _color);
    $('.circle-sm-common').css('border-color', _color);
    setTimeout(function () {
        updateCounter();
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
            }, 500 * i);
        } (i));
    }
}
function end() {
    setTimeout(function () {
        alert('All correct!');
        $('#switch').click().click();
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
                currentSetep++;
                user.length = 0;
                updateCounter();
                termA(currentSetep);
            }
        }
    } else {
        if (strictMode) {
            console.log('Wrong! Let me show you again!');
            wrong();
            $('#switch').click().click();
            setTimeout(function() {
                gamestart();
            }, 1000);
        } else {
            console.log('Wrong! Let me show you again!');
            wrong();
            updateCounter
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
    console.log('start');
    currentSetep = 0;
    answer.length = 0;
    updateCounter();
    while (i != LENGTH) {
        answer.push(~~(Math.random() * 4 + 1));
        i++;
    }
    console.log(answer);
    currentSetep++;
    updateCounter();
    termA(currentSetep);
}
function setStrict() {
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
        $('#s-move').css('float', 'right');
        $('#counter').html('<p>00</p>');
        user.length = 0;
        answer.length = 0;
        play = 0;
    } else {
        $('#s-move').css('float', 'left');
        $('#counter').html('<p>&nbsp;</p>');
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
        termB(4)
    }
});
