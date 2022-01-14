const $siteList = $('.siteList')
const $LastLi = $siteList.find('li.last')
const Cookie = localStorage.getItem('Cookie')
const CookieObject = JSON.parse(Cookie)

const hashMap = CookieObject || [
    {
        logo: '听歌',
        url: 'http://tool.liumingye.cn/music/?page=homePage',
    },
    {
        logo: '观影',
        url: 'http://www.gotobt.com',
    },
    {
        logo: '游戏',
        url: 'http://h.4399.com/',
    },
    
]

const UUU = (url) => {
    return url.replace('https://', '')     //把网址当中的https:// 替换成空字符串
              .replace('http://','')       //把网址当中的http:// 替换成空字符串
              .replace('www.','')       //把网址当中的www. 替换成空字符串
              .replace(/\/.*/,'')       //把网址当中第一个/后面的字符 替换成空字符串
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        const $li = $ (`<li>
          <div class="site">
            <div class="logo" >${node.logo}</div>
            <div class="link">${UUU(node.url)}</div>       
            <div class="close">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-guanbi"></use>
                </svg>
            </div>             
          </div>
        <li>`).insertBefore($LastLi)
        $li.on('click', (e) => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()   //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton').on('click', () => {
    let urlName = window.prompt('先先先先先先先先输入网址名称')
    let url = window.prompt('再再再再再再再再输入网址')
    if (url.indexOf('http') !== 0) {
            url = 'https://' + url
    }
    hashMap.push({
        logo: urlName,
        logoType: 'text',
        url: url
    }
    );
    render()
});

window.onbeforeprint = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('Cookie',string)
}