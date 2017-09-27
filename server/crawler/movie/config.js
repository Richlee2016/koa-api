const baseUrl = "http://www.idyjy.com"
export default{
    reqUrl:{
        movie: id => `${baseUrl}/sub/${id}.html`,
        bili:s => `https://search.bilibili.com/all?keyword=${s}&from_source=banner_search`
    },
    reqApi: [{
        name: "index",
        api: "http://api.shenjian.io/?appid=dfcae28639fd6c342fe000c565a8dea1"
    }, {
        name: "test",
        api: "http://api.shenjian.io/?appid=dfcae28639fd6c342fe000c565a8dea1"
    }]
}