

// 获取企业Id
let id = location.hash.slice(1)
console.log(id)

// 没有的就看实例
if(!id) {
    alert('请正确填写路径,当前显示实例模板！')
    id = 'ruiyuan'
}

// 根据数字或字符串来判断公版或定制
// 有些分东西厂区，不能使用单纯的数组按照定制计算
let isPrivate = isNaN(id - 0)

// 获取公版或者定制的配置项
let allProjects = isPrivate? privateOptions: publicOptions
let curentPro = allProjects[id]
// 解决没有配置项的情况
if(!curentPro){
    alert('请正查看配置项config是否填写完整,当前显示实例模板！')
    curentPro = isPrivate['ruiyuan']
}


const { maxLon, minLon, maxLat, minLat } = curentPro.coord

// if(!leftTop || !leftBottomP || !rightTopP) {
//     alert('请完整填写坐标！')
// }

if(!maxLon || !minLon || !maxLat || !minLat){
    alert('请完整填写坐标！')
}

// 图片中经纬度差
// 点击的位置信息
let xLen,yLen,pointInfo

//数据初始化
const init = () => {
    // xLen = rightTopP[0] - leftTop[0]
    // yLen = leftTop[1] - leftBottomP[1]

    
    xLen = maxLon - minLon
    yLen = maxLat - minLat


    $('#planarImg').attr('src', `./imgs/${isPrivate? 'private': 'public'}/${id}.png`)
}
init()




 //屏幕缩放比例
const detectZoom = () => {
    var ratio = 0,//浏览器当前缩放比
        screen = window.screen,//获取屏幕
        ua = navigator.userAgent.toLowerCase();//判断登陆端是pc还是手机

    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }
    return ratio || 1;
}

// 图片点击事件
const selectPoint = e => {
    let planarW = $('#planarImg').width()
    let planarH = $('#planarImg').height()
    let signX = e.offsetX
    let signY = e.offsetY
    let zoomV = detectZoom()


    pointInfo = {
        scaleX: (signX / planarW).toFixed(4),  //x轴坐标的占比
        scaleY: (signY / planarH).toFixed(4),  //Y轴坐标的占比
    }
    
    $('#seIcon')[0].style.top = `${signY}px`
    $('#seIcon')[0].style.left = `${signX}px`
    
    $('#seIcon')[0].style.width = (30 / zoomV).toFixed(0) + 'px'
    $('#seIcon')[0].style.height = (30 / zoomV).toFixed(0) + 'px'
    
    
    $('#seIcon')[0].style.display = 'block'
    
    console.log(pointInfo)
}


//保存数据
const submitData = () => {
    //点位的比例
    // console.log(pointInfo)
    // console.log(xLen,yLen)

    let lon = minLon - 0 + xLen * pointInfo.scaleX
    let lat = maxLat - 0 - yLen * pointInfo.scaleY


    let params = {
        scaleX: pointInfo.scaleX,
        scaleY: pointInfo.scaleY,
        lon,
        lat,
    }
    // console.log(params)
    console.log(JSON.stringify(params))
    
    contact.showMsg(JSON.stringify(params));
            
}