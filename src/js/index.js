var userToken = ''
var cubes = 3;
var rats = [];
var points;
var hp;
var interval;
var t,t2;
var hsRats = []

window.onload = function(){
    $('#music')[0].play()
      //initGame();//初始化游戏
    $('#toggleJY').click(function () {
        if ($('#music')[0].paused) {
            $('#music')[0].play()
        } else {
            $('#music')[0].pause()
        }
    })
};
function initGame(){
    $('#music')[0].play()
    points = 0;
    hp = 3;
    interval = 100;
    $("#grade").text(0)
    t = setInterval(function(){
        generateRats();//产生地鼠的方法
        maintanceRats();//维护地鼠的方法
    },interval);
}
drawPannel()
function drawPannel(){//画出方格，每个方格放一个地鼠并且隐藏
    var items = document.getElementsByClassName('dd-item')
    for (var i = 0; i < items.length; i++) {
        var rat = []
        items[i].getElementsByClassName('ms-img')[0].addEventListener("mousedown",clicked);
        items[i].getElementsByClassName('ra-img')[0].addEventListener('touchstart', touched);
        rat.push([items[i].getElementsByClassName('ms-img')[0], items[i].getElementsByClassName('ra-img')[0]])
        rats.push(rat)
    }
}
function touched(){//触摸中了
    chosen(this);
}
function clicked(){//点击中了
    chosen(this);
}
function chosen(rat){
    if($(rat).hasClass('active')){//如果地鼠显示出来了
        if ($(rat).hasClass('ms-img')) {
            points = points + 5
            $(rat).siblings('.f-score').show()
        } else {
            $(rat).siblings('.t-score').show()
            points = points + 10
        }
        $(rat).siblings('.cz').show()
        $("#grade").text(points)
        rat.classList.remove("active");//隐藏
        setTimeout(function(){
            $(rat).siblings('.f-score').hide()
            $(rat).siblings('.t-score').hide()
        }, 300)
        setTimeout(function(){
            $(rat).siblings('.cz').hide()
        }, 500)
        interval -= interval*0.03>2?interval*0.03:interval*0.015;//增加游戏难度
    }
}
function generateRats(){//产生地鼠的方法
    if(parseInt(Math.random()*100)%parseInt(((interval/12)>2?(interval/12):2))==0){//产生的几率越来越大
        var ID = Math.ceil(Math.random()*8);
        var type = Math.round(Math.random());
        if(!$(rats[ID][0][type]).hasClass('active') && !$(rats[ID][0][type == 0 ? 1 : 0]).hasClass('active')){//如果没有出现
            // hsRats
            rats[ID][0][type].classList.add("active");
            rats[ID][0][type].id = interval/4;//用id表示地鼠自动消失的时间，和游戏难度相关
        }
    }
}
function maintanceRats(){//维护地鼠的方法
    var activeRats = document.getElementsByClassName("active");//获取所有出现的地鼠
    for(var i=0;i<activeRats.length;i++){//用id表示剩余时间
        activeRats[i].id --;
        if(activeRats[i].id<0){//如果到时间了
            activeRats[i].classList.remove("active");//当前地鼠隐藏
            hp --;//掉血
            interval *= 1.08;//回退一点游戏难度
            if(hp == 0){
                lose();
            }
        }
    }
}
function lose(){//如果输了
    $('#music')[0].pause()
    clearInterval(t);//停止计时器，等待游戏重新开始
    clearTimeout(t2);
    $('#mask').show()
    $('#panl').show()
    $('#panlGrade').text(points)
    setTimeout(function(){//延时一点
        $('.active').removeClass('active')
        $('.t-score').hide()
        $('.f-score').hide()
        $('.cz').hide()
    },10);
}
function getRank () {
    $.post('https://www.topasst.com/projectCommon/pokeMole/rankList', {
        memberId: userToken
    }, function(res) {
        if (res.returnCode == 200) {
            if (userToken) {
                $('#myRank').html('<span style="width: 45%">第'+res.data.rank+'名</span><span style="width: 30%">'+res.data.name+'</span><span style="width: 35%;text-align: right">'+res.data.score+'分</span>')
            } else {
                $('#single').show()
            }
            var $list = ''
            res.data.list.forEach(function(item, index) {
                $list += '<li class="rank-item">' +
                    '<span style="width: 45%">第'+(index+1)+'名</span>' +
                    '<span style="width: 30%">'+item.name+'</span>' +
                    '<span style="width: 35%;text-align: right">'+item.score+'分</span>' +
                    '</li>'
            })
            $('#rankList').html($list)
        } else {
            alert(res.message)
        }
    })
}
$('#startGame').on('click', function () {
    $("#gameNav").hide()
    $("#gameContainer").show()
    setTimeout(initGame, 1000)
})
$('#goGameRule').on('click', function () {
    $("#gameRulePage").show()
    $("#gameNav").hide()
})
$('#goLookRank').on('click', function () {
    getRank()
    $("#gameRankPage").show()
    $("#gameNav").hide()
})
$('#goPanlRank').on('click', function () {
    $("#gameInfoPage").show()
    $("#gameContainer").hide()
    $('#mask').hide()
    $('#panl').hide()
})
$('#panlAgain').on('click', function () {
    $('#mask').hide()
    $('#panl').hide()
    setTimeout(initGame, 1000)
})
$('#ruleBackBtn').on('click', function () {
    $("#gameNav").show()
    $("#gameRulePage").hide()
})
$('#rankPlay').on('click', function () {
    $("#gameContainer").show()
    $("#gameRankPage").hide()
    setTimeout(initGame, 1000)
})
$('#rankBack').on('click', function () {
    $("#gameNav").show()
    $("#gameRankPage").hide()
})
$('#infoConfirm').on('click', function () {
    var name = $('#name').val()
    var tel = $('#tel').val()
    var code = $('#code').val()
    if (!name && !tel && !code) {
        alert('请填写信息')
        return false
    }

    $.post('https://www.topasst.com/projectCommon/pokeMole/addPokeMole', {
        name: name,
        mobile: tel,
        inviteCode: code
    }, function(res) {
        if (res.returnCode == 200) {
            userToken = res.data
            $('#name').val('')
            $('#tel').val('')
            $('#code').val('')
            $.post('https://www.topasst.com/projectCommon/pokeMole/updateScore', {
                memberId: userToken,
                score: points
            }, function(res) {
                if (res.returnCode == 200) {

                    getRank()
                } else {
                    alert(res.message)
                }
            })
            $("#gameRankPage").show()
            $("#gameInfoPage").hide()
        } else {
            alert(res.message)
        }
    })

})