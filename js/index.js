$(function() {
    var isBegin = false
    var u = 120
    var count = 3
    var awards = [
        { award: '1', text: '一等奖' },
        { award: '2', text: '二等奖' },
        { award: '3', text: '三等奖' }
    ]
    var currAward = 3
    $('.switAwards').text(awards[currAward - 1].text)
    $('.btn').click(function() {
        if (isBegin) {
            stop()
            return false
        }
        isBegin = true
        $('.num').css('backgroundPositionY', 0)
        action()
    })
    $('.switAwards').click(function() {
        currAward = (currAward - 1) % awards.length || awards.length
        $(this).text(awards[currAward - 1].text)
        $('.result').addClass('hide')
    })

    function numRand(count) {
        var max = 150 //上限
        var min = 1 //下限
        var rand = parseInt(Math.random() * (max - min + 1) + min)
        return ('0000000000000000000000' + rand).substr(0 - count)
    }
    function action() {
        $('.num_box').addClass('start')
        $('.action').text('停止抽奖')
    }

    function stop() {
        var result = numRand(count)
        $('.btn').css('display', 'none')
        $('.num').each(function(index) {
            var _num = $(this)
            if (index + 1 < count) {
                _num.animate(
                    {
                        backgroundPositionY:
                            u * 10 * (index + 1) - u * result.split('')[index]
                    },
                    {
                        duration: (index + 1) * 1000,
                        easing: 'easeInOutQuad',
                        complete: function() {
                            if (index === 0) {
                                setTimeout(() => {
                                    $('.num_box').removeClass('start')
                                }, 200)
                            }
                        }
                    }
                )
            } else {
                setTimeout(function() {
                    _num.animate(
                        {
                            backgroundPositionY:
                                u * 10 * (index + 1) -
                                u * numRand(count).split('')[index]
                        },
                        {
                            duration: (index + 1) * 1000,
                            easing: 'easeInOutQuad',
                            complete: function() {
                                $('.num_box').removeClass('start')
                                if (index == count - 1) {
                                    isBegin = false
                                    $('.btn').css('display', 'block')
                                    $('.action').text('开始抽取')
                                    $('.result').removeClass('hide')
                                }
                            }
                        }
                    )
                }, index * 100)
            }
        })
    }
})
