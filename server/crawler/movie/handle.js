export const movieParse = ($, num) => {
    var main = $('#main');

    if ($('#main').get().length === 0) {
        return {
            _id:num,
            id: num,
            name: 'none'
        };
    };

    let isMovieSubject = main.find('.location a').get().map(o => $(o).text())[2];
    if (isMovieSubject === '电影专题') {
        console.log(num + ':电影专题');
        return {
            id: num,
            name: 'subject'
        }
    };

    var info = $('.info ul li');
    //url 解析
    const getUrl = () => {
        let urlArr = [];
        $('.mox').get().forEach((o, i) => {
            if ($(o).find('.down_list').get().length === 1) {
                var res = $(o).find('.down_list li').get().map((o, j) => {
                    return {
                        num: j,
                        title: $(o).find('.down_part_name a').text(),
                        url: $(o).find('.down_url').val(),
                        size: $(o).find('.file-size').text(),
                        ed2k: 0
                    }
                })
                urlArr.push(res);
            };
        })
        return urlArr;
    }

    //info 解析
    const getInfo = () => {

        let firstLabel = info.eq(0).find('span').eq(0).text();
        let infoRes;

        //冒号 正则
        let regNum = str => str.match(/\d+/)[0];
        let regChin = str => str.match(/([\u4e00-\u9fa5]+)/g);
        let resultArr = dom => dom.find('a').get().map(o => $(o).text())
        let otherName = str => str.slice(3, str.length);
        //连续剧
        if (firstLabel === '更新状态：' || firstLabel === '更新至：') {
            //完结设置
            let isFinish = true;
            if (regChin(info.eq(0).text())[1] !== '全集可下载') {
                isFinish = false;
            };

            infoRes = {
                isFinish: isFinish,
                year: regNum(info.eq(1).text()),
                area: regChin(info.eq(1).text())[2],
                classify: resultArr(info.eq(2)),
                director: resultArr(info.eq(3)),
                actor: resultArr(info.eq(4)),
                othername: otherName(info.eq(5).text()),
                imdb: 'none',
                intro: main.find('.endtext').text()
            }
            //电影    
        } else if (firstLabel === '上映年代：') {

            infoRes = {
                isFinish: true,
                year: regNum(info.eq(0).text()),
                area: regChin(info.eq(0).text())[2],
                classify: resultArr(info.eq(1)),
                director: resultArr(info.eq(2)),
                actor: resultArr(info.eq(3)),
                othername: otherName(info.eq(4).text()),
                imdb: info.eq(5).find('span').eq(1).text(),
                intro: main.find('.endtext').text()
            }
        };
        return infoRes;
    }

    //解析
    var myInfo = getInfo();
    let imgSrc = main.find('.pic img').attr('original');
    if(!imgSrc){
        imgSrc = main.find('.pic img').attr('src');
    };
    var mymovie = {
        _id:num,
        id: num,
        name: $('#name').text(),
        year: myInfo.year,
        score: 0,
        area: myInfo.area,
        othername: myInfo.othername,
        img: imgSrc,
        imdb: myInfo.imdb,
        isFinish: myInfo.isFinish,
        classify: myInfo.classify,
        actor: myInfo.actor,
        catalog: main.find('.location a').get().map(o => $(o).text()),
        director: myInfo.director,
        intro: myInfo.intro,
        url: getUrl()
    }
    return mymovie;
}