import cheerio from 'cheerio'
export const search =(html,author) => {
    const $ = cheerio.load(html);
    const result = $(".result-list>div").get().map(o => {
        const info = $(o).find('.result-game-item-detail a');
        const getAuthor = $(o).find('.result-game-item-info p').eq(0).find('span').eq(1);
        let regChin = str => str.match(/([\u4e00-\u9fa5]+)/g);
        const oneAuthor = regChin(getAuthor.text()) || [""];
        return {
            name:info.attr("title"),
            href:info.attr("href"),
            author:oneAuthor[0]
        }
    })
    const book = result.find(o => o.author === author);
    return book;
}

export const chapter =html => {
    const $ = cheerio.load(html);
    var chapterDom = $('.chapterlist dd a').get();
    const numReg = /(\d+).html/;
    var chapter = chapterDom.map(function(o) {
        return {
            href: $(o).attr('href').match(numReg)[1],
            text: $(o).text()
        }
    });
    return chapter;
}

export const read = html => {
    const $ = cheerio.load(html);
    const text = $("#content").html();
    const title = $(".inner h1").text();
    const reg = /\S+/g;
    const result = text.match(reg);
    return {
        title,
        text:result
    }
}