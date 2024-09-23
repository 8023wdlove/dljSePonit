


 //图片的左上，左下，右上的坐标
const privateOptions = {
    // 瑞园
    'ruiyuan':{
        coord:{
            maxLon: '116.9775831699371338',
            minLon: '116.9735705852508545',
            maxLat: '35.1839236988747714',
            minLat: '35.1813894910295772',
        }
    },
    // 世林
    'shilin':{
        coord:{
            maxLon: '109.2379885911941528',
            minLon: '109.2286759614944458',
            maxLat: '38.6313084417332391',
            minLat: '38.6245026280102479',
        }
    },
    // 实华
    'dezhoushihua':{
        // coord:{
        //     maxLon: '116.382056',
        //     minLon: '116.362411',
        //     maxLat: '37.5242522',
        //     minLat: '37.517166',
        // }
        coord:{
            maxLon: '116.3694941997528076',
            minLon: '116.3500213623046875',
            maxLat: '37.5176275623595359',
            minLat: '37.5134833499188005',
        }
    },
    //久泰
    'jiutai':{
        coord:{
            maxLon: '111.32476866',
            minLon: '111.30615950',
            maxLat: '40.19816882',
            minLat: '40.18838754',
        }
    },

    // 弘达生物
    'hongdashengwu':{
        coord:{
            maxLon: '118.6033076047897339',
            minLon: '118.5994255168',
            maxLat: '35.7621583253021669',
            minLat: '35.7535130633',
        }
    },
    
    // 昆达生物
    'hongdakunda':{
        coord:{
            maxLon: '118.6069822311401367',
            minLon: '118.5982875315',
            maxLat: '35.7578792535690866',
            minLat: '35.7500474774660901',
        }
    },
    
    // 铎迈石化
    'hongdaduomai':{
        coord:{
            maxLon: '118.5779929161071777',
            minLon: '118.5731749828',
            maxLat: '35.7105416428446958',
            minLat: '35.7071945922',
        }
    },
    // 山东道恩降解材料有限公司
    'daoen':{
        coord:{
            maxLon: '120.3297505403',
            minLon: '120.3264442702',
            maxLat: '37.6802876875',
            minLat: '37.6770228988',
        }
    },
    // 淄博林德 2#
    '31_2': {
        name: 'zibolinde_2',
        coord:{
            maxLon: '118.2088404893875122',
            minLon: '118.2068663835525513',
            maxLat: '36.7800391879352873',
            minLat: '36.7790939351582651',
        }
    },

    // 淄博林德 3#
    '31_3': {
        name: 'zibolinde_3',
        coord:{
            maxLon: '118.2691848278045654',
            minLon: '118.2670390605926514',
            maxLat: '36.7955096001262945',
            minLat: '36.7947062982130433',
        }
    },



}



/**
 * 
 * 
 */
//     yuandian:{lon:116.3500213623046875,lat:37.5105513713377690},
//     east:{lon:116.3694941997528076,lat:37.5105513713377690},
//     north:{lon:116.3500213623046875,lat:37.5176275623595359},

//转换常数
var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
var pi = 3.14159265358979324;
var a = 6378245.0;
var ee = 0.00669342162296594323;
// Google地图经纬度转百度地图经纬度
function google_bd_encrypt(gg_lat, gg_lon){
    var point={};
    var x = gg_lon;
    var y = gg_lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi); 
    var bd_lon = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    point.lat=bd_lat;
    point.lon=bd_lon;
    return point;
};

let point = google_bd_encrypt(116.3500213623046875,37.5105513713377690)

console.log(point)



function transformLon(x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
    return ret;
};

function transformLat(x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return ret;
}

function outOfChina(lat, lon) {
    if (lon < 72.004 || lon > 137.8347)
        return true;
    if (lat < 0.8293 || lat > 55.8271)
        return true;
    return false;
}

/*    
* WGS-84：是国际标准，GPS坐标（Google Earth使用、或者GPS模块、天地图）
* GCJ-02：中国坐标偏移标准，Google Map、高德、腾讯使用
* BD-09：百度坐标偏移标准，Baidu Map使用
*/

/**
 * wgLat 纬度
 * wgLon 经度
 * WGS-84 到 GCJ-02 的转换（即 GPS 加偏）
 * */
function wgs_gcj_encrypts(wgLat, wgLon) {
    var point={};
    if (outOfChina(wgLat, wgLon)) {
        point.lat=wgLat;
        point.lng=wgLon;
        return point;
    }
    var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
    var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
    var radLat = wgLat / 180.0 * pi;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    var lat = wgLat + dLat;
    var lon = wgLon + dLon;
    point.lat=lat;
    point.lon=lon;
    return point;
};

let point2 = wgs_gcj_encrypts(116.3500213623046875,37.5105513713377690)
console.log(point2)


