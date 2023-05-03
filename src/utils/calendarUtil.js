/* eslint-disable */

/**
 * @1900-2100区间内的公历、农历互转
 * @charset UTF-8
 * @Author  jiangjiazhi
 * @公历转农历：calendar.solarToLunar(1987,11,01); //[you can ignore params of prefix 0]
 * @农历转公历：calendar.lunarToSolar(1987,09,10); //[you can ignore params of prefix 0]
 */

/**
 * 农历1900-2100的润大小信息表
 * @Array Of Property
 * @return Hex
 */

const lunarInfo = [
  0x04BD8,
  0x04AE0,
  0x0A570,
  0x054D5,
  0x0D260,
  0x0D950,
  0x16554,
  0x056A0,
  0x09AD0,
  0x055D2, // 1900-1909

  0x04AE0,
  0x0A5B6,
  0x0A4D0,
  0x0D250,
  0x1D255,
  0x0B540,
  0x0D6A0,
  0x0ADA2,
  0x095B0,
  0x14977, // 1910-1919

  0x04970,
  0x0A4B0,
  0x0B4B5,
  0x06A50,
  0x06D40,
  0x1AB54,
  0x02B60,
  0x09570,
  0x052F2,
  0x04970, // 1920-1929

  0x06566,
  0x0D4A0,
  0x0EA50,
  0x06E95,
  0x05AD0,
  0x02B60,
  0x186E3,
  0x092E0,
  0x1C8D7,
  0x0C950, // 1930-1939

  0x0D4A0,
  0x1D8A6,
  0x0B550,
  0x056A0,
  0x1A5B4,
  0x025D0,
  0x092D0,
  0x0D2B2,
  0x0A950,
  0x0B557, // 1940-1949

  0x06CA0,
  0x0B550,
  0x15355,
  0x04DA0,
  0x0A5B0,
  0x14573,
  0x052B0,
  0x0A9A8,
  0x0E950,
  0x06AA0, // 1950-1959

  0x0AEA6,
  0x0AB50,
  0x04B60,
  0x0AAE4,
  0x0A570,
  0x05260,
  0x0F263,
  0x0D950,
  0x05B57,
  0x056A0, // 1960-1969

  0x096D0,
  0x04DD5,
  0x04AD0,
  0x0A4D0,
  0x0D4D4,
  0x0D250,
  0x0D558,
  0x0B540,
  0x0B6A0,
  0x195A6, // 1970-1979

  0x095B0,
  0x049B0,
  0x0A974,
  0x0A4B0,
  0x0B27A,
  0x06A50,
  0x06D40,
  0x0AF46,
  0x0AB60,
  0x09570, // 1980-1989

  0x04AF5,
  0x04970,
  0x064B0,
  0x074A3,
  0x0EA50,
  0x06B58,
  0x05AC0,
  0x0AB60,
  0x096D5,
  0x092E0, // 1990-1999

  0x0C960,
  0x0D954,
  0x0D4A0,
  0x0DA50,
  0x07552,
  0x056A0,
  0x0ABB7,
  0x025D0,
  0x092D0,
  0x0CAB5, // 2000-2009

  0x0A950,
  0x0B4A0,
  0x0BAA4,
  0x0AD50,
  0x055D9,
  0x04BA0,
  0x0A5B0,
  0x15176,
  0x052B0,
  0x0A930, // 2010-2019

  0x07954,
  0x06AA0,
  0x0AD50,
  0x05B52,
  0x04B60,
  0x0A6E6,
  0x0A4E0,
  0x0D260,
  0x0EA65,
  0x0D530, // 2020-2029

  0x05AA0,
  0x076A3,
  0x096D0,
  0x04AFB,
  0x04AD0,
  0x0A4D0,
  0x1D0B6,
  0x0D250,
  0x0D520,
  0x0DD45, // 2030-2039

  0x0B5A0,
  0x056D0,
  0x055B2,
  0x049B0,
  0x0A577,
  0x0A4B0,
  0x0AA50,
  0x1B255,
  0x06D20,
  0x0ADA0, // 2040-2049

  0x14B63,
  0x09370,
  0x049F8,
  0x04970,
  0x064B0,
  0x168A6,
  0x0EA50,
  0x06B20,
  0x1A6C4,
  0x0AAE0, // 2050-2059

  0x0A2E0,
  0x0D2E3,
  0x0C960,
  0x0D557,
  0x0D4A0,
  0x0DA50,
  0x05D55,
  0x056A0,
  0x0A6D0,
  0x055D4, // 2060-2069

  0x052D0,
  0x0A9B8,
  0x0A950,
  0x0B4A0,
  0x0B6A6,
  0x0AD50,
  0x055A0,
  0x0ABA4,
  0x0A5B0,
  0x052B0, // 2070-2079

  0x0B273,
  0x06930,
  0x07337,
  0x06AA0,
  0x0AD50,
  0x14B55,
  0x04B60,
  0x0A570,
  0x054E4,
  0x0D160, // 2080-2089

  0x0E968,
  0x0D520,
  0x0DAA0,
  0x16AA6,
  0x056D0,
  0x04AE0,
  0x0A9D4,
  0x0A2D0,
  0x0D150,
  0x0F252, // 2090-2099

  0x0D520,
] // 2100

const solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * 天干地支之天干速查表
 * @Array Of Property trans['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']
 * @return Cn string
 */
const Gan = ['\u7532', '\u4E59', '\u4E19', '\u4E01', '\u620A', '\u5DF1', '\u5E9A', '\u8F9B', '\u58EC', '\u7678']

/**
 * 天干地支之地支速查表
 * @Array Of Property
 * @trans['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']
 * @return Cn string
 */
const Zhi = [
  '\u5B50',
  '\u4E11',
  '\u5BC5',
  '\u536F',
  '\u8FB0',
  '\u5DF3',
  '\u5348',
  '\u672A',
  '\u7533',
  '\u9149',
  '\u620C',
  '\u4EA5',
]

/**
 * 天干地支之地支速查表<=>生肖
 * @Array Of Property
 * @trans['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']
 * @return Cn string
 */
const Animals = [
  '\u9F20',
  '\u725B',
  '\u864E',
  '\u5154',
  '\u9F99',
  '\u86C7',
  '\u9A6C',
  '\u7F8A',
  '\u7334',
  '\u9E21',
  '\u72D7',
  '\u732A',
]

/**
 * 24节气速查表
 * @Array Of Property
 * @trans['小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至']
 * @return Cn string
 */
const solarTerm = [
  '\u5C0F\u5BD2',
  '\u5927\u5BD2',
  '\u7ACB\u6625',
  '\u96E8\u6C34',
  '\u60CA\u86F0',
  '\u6625\u5206',
  '\u6E05\u660E',
  '\u8C37\u96E8',
  '\u7ACB\u590F',
  '\u5C0F\u6EE1',
  '\u8292\u79CD',
  '\u590F\u81F3',
  '\u5C0F\u6691',
  '\u5927\u6691',
  '\u7ACB\u79CB',
  '\u5904\u6691',
  '\u767D\u9732',
  '\u79CB\u5206',
  '\u5BD2\u9732',
  '\u971C\u964D',
  '\u7ACB\u51AC',
  '\u5C0F\u96EA',
  '\u5927\u96EA',
  '\u51AC\u81F3',
]

/**
 * 1900-2100各年的24节气日期速查表
 * @Array Of Property
 * @return 0x string For splice
 */
const sTermInfo = [
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f',

  '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',

  '97bcf97c359801ec95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f',

  'b027097bd097c36b0b6fc9274c91aa',
  '9778397bd19801ec9210c965cc920e',
  '97b6b97bd19801ec95f8c965cc920f',

  '97bd09801d98082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd197c36c9210c9274c91aa',

  '97b6b97bd19801ec95f8c965cc920e',
  '97bd09801d98082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2',

  '9778397bd097c36c9210c9274c91aa',
  '97b6b97bd19801ec95f8c965cc920e',
  '97bcf97c3598082c95f8e1cfcc920f',

  '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',

  '97bcf97c3598082c95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',

  '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',

  '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd07f595b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9210c8dc2',
  '9778397bd19801ec9210c9274c920e',
  '97b6b97bd19801ec95f8c965cc920f',

  '97bd07f5307f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c920e',

  '97b6b97bd19801ec95f8c965cc920f',
  '97bd07f5307f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2',

  '9778397bd097c36c9210c9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bd07f1487f595b0b0bc920fb0722',

  '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',

  '97bcf7f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f531b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',

  '97bcf7f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c9274c920e',
  '97bcf7f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',

  '9778397bd097c36b0b6fc9210c91aa',
  '97b6b97bd197c36c9210c9274c920e',
  '97bcf7f0e47f531b0b0bb0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c920e',

  '97b6b7f0e47f531b0723b0b6fb0722',
  '7f0e37f5307f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2',

  '9778397bd097c36b0b70c9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f595b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc9210c8dc2',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',

  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',

  '97b6b7f0e47f531b0723b0787b0721',
  '7f0e27f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',

  '9778397bd097c36b0b6fc9210c91aa',
  '97b6b7f0e47f149b0723b0787b0721',
  '7f0e27f0e47f531b0723b0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2',
  '977837f0e37f149b0723b0787b0721',

  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e37f5307f595b0b0bc920fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2',

  '977837f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f595b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc9210c8dc2',
  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '977837f0e37f14998082b0787b06bd',

  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',

  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0787b06bd',

  '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',

  '977837f0e37f14998082b0723b06bd',
  '7f07e7f0e37f149b0723b0787b0721',
  '7f0e27f0e47f531b0723b0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721',

  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b0723b02d5',

  '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e37f1487f531b0b0bb0b6fb0722',

  '7f0e37f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e37f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd',

  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b072297c35',

  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',

  '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f149b0723b0787b0721',

  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0723b06bd',

  '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35',

  '7ec967f0e37f14998082b0723b06bd',
  '7f07e7f0e37f14998083b0787b0721',
  '7f0e27f0e47f531b0723b0b6fb0722',

  '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14898082b0723b02d5',
  '7f07e7f0e37f14998082b0787b0721',

  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e36665b66aa89801e9808297c35',
  '665f67f0e37f14898082b0723b02d5',

  '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e36665b66a449801e9808297c35',

  '665f67f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e36665b66a449801e9808297c35',
  '665f67f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd',

  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e26665b66a449801e9808297c35',
  '665f67f0e37f1489801eb072297c35',

  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
]

/**

   * 数字转中文速查表
  * @Array Of Property
  * @trans ['日','一','二','三','四','五','六','七','八','九','十']
  * @return Cn string
   */
const nStr1 = [
  '\u65E5',
  '\u4E00',
  '\u4E8C',
  '\u4E09',
  '\u56DB',
  '\u4E94',
  '\u516D',
  '\u4E03',
  '\u516B',
  '\u4E5D',
  '\u5341',
]

/**

  * 日期转农历称呼速查表
  * @Array Of Property
  * @trans ['初','十','廿','卅']
  * @return Cn string
  */
const nStr2 = ['\u521D', '\u5341', '\u5EFF', '\u5345']

/**
 * 月份转农历称呼速查表
 * @Array Of Property
 * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
 * @return Cn string
 */
const nStr3 = [
  '\u6B63',
  '\u4E8C',
  '\u4E09',
  '\u56DB',
  '\u4E94',
  '\u516D',
  '\u4E03',
  '\u516B',
  '\u4E5D',
  '\u5341',
  '\u51AC',
  '\u814A',
]

/**
 * 返回农历y年一整年的总天数
 * @param lunar Year
 * @return Number
 * @eg:var count = calendar.lYearDays(1987) ;//count=387
 */
function lYearDays(y) {
  let i

  let sum = 348

  for (i = 0x8000; i > 0x8; i >>= 1)
    sum += lunarInfo[y - 1900] & i ? 1 : 0

  return sum + leapDays(y)
}

/**
 * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
 * @param lunar Year
 * @return Number (0-12)
 * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
 */
function leapMonth(y) {
  // 闰字编码 \u95f0

  return lunarInfo[y - 1900] & 0xF
}

/**
 * 返回农历y年闰月的天数 若该年没有闰月则返回0
 * @param lunar Year
 * @return Number (0、29、30)
 * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
 */
function leapDays(y) {
  if (leapMonth(y))
    return lunarInfo[y - 1900] & 0x10000 ? 30 : 29

  return 0
}

/**
 * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
 * @param lunar Year
 * @return Number (-1、29、30)
 * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
 */
function monthDays(y, m) {
  if (m > 12 || m < 1)
    return -1
  // 月份参数从1至12，参数错误返回-1

  return lunarInfo[y - 1900] & (0x10000 >> m) ? 30 : 29
}

/**
 * 返回公历(!)y年m月的天数
 * @param solar Year
 * @return Number (-1、28、29、30、31)
 * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
 */
function solarDays(y, m) {
  if (m > 12 || m < 1)
    return -1
  // 若参数错误 返回-1

  const ms = m - 1

  if (ms === 1) {
    // 2月份的闰平规律测算后确认返回28或29

    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28
  }
  else {
    return solarMonth[ms]
  }
}

/**
 * 农历年份转换为干支纪年
 * @param  lYear 农历年的年份数
 * @return Cn string
 */
function toGanZhiYear(lYear) {
  let ganKey = (lYear - 3) % 10

  let zhiKey = (lYear - 3) % 12

  if (ganKey === 0)
    ganKey = 10 // 如果余数为0则为最后一个天干

  if (zhiKey === 0)
    zhiKey = 12 // 如果余数为0则为最后一个地支

  return Gan[ganKey - 1] + Zhi[zhiKey - 1]
}

/**
 * 公历月、日判断所属星座
 * @param  cMonth [description]
 * @param  cDay [description]
 * @return Cn string
 */
function toAstro(cMonth, cDay) {
  const s
    = '\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF'

  const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22]

  return `${s.substring(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2)}\u5EA7` // 座
}

/**
 * 传入offset偏移量返回干支
 * @param offset 相对甲子的偏移量
 * @return Cn string
 */
function toGanZhi(offset) {
  return Gan[offset % 10] + Zhi[offset % 12]
}

/**
 * 传入公历(!)y年获得该年第n个节气的公历日期
 * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
 * @return day Number
 * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
 */
function getTerm(y, n) {
  if (y < 1900 || y > 2100)
    return -1

  if (n < 1 || n > 24)
    return -1

  const _table = sTermInfo[y - 1900]

  const _info = [
    parseInt(`0x${_table.substring(0, 5)}`).toString(),

    parseInt(`0x${_table.substring(5, 5)}`).toString(),

    parseInt(`0x${_table.substring(10, 5)}`).toString(),

    parseInt(`0x${_table.substring(15, 5)}`).toString(),

    parseInt(`0x${_table.substring(20, 5)}`).toString(),

    parseInt(`0x${_table.substring(25, 5)}`).toString(),
  ]

  const _calday = [
    _info[0].substring(0, 1),
    _info[0].substring(1, 2),
    _info[0].substring(3, 1),
    _info[0].substring(4, 2),
    _info[1].substring(0, 1),
    _info[1].substring(1, 2),
    _info[1].substring(3, 1),
    _info[1].substring(4, 2),
    _info[2].substring(0, 1),
    _info[2].substring(1, 2),
    _info[2].substring(3, 1),
    _info[2].substring(4, 2),
    _info[3].substring(0, 1),
    _info[3].substring(1, 2),
    _info[3].substring(3, 1),
    _info[3].substring(4, 2),
    _info[4].substring(0, 1),
    _info[4].substring(1, 2),
    _info[4].substring(3, 1),
    _info[4].substring(4, 2),
    _info[5].substring(0, 1),
    _info[5].substring(1, 2),
    _info[5].substring(3, 1),
    _info[5].substring(4, 2),
  ]

  return parseInt(_calday[n - 1])
}

/**
 * 传入农历数字月份返回汉语通俗表示法
 * @param lunar month
 * @return Cn string
 * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
 */
function toChinaMonth(m) {
  // 月 => \u6708

  if (m > 12 || m < 1)
    return -1
  // 若参数错误 返回-1

  let s = nStr3[m - 1]

  s += '\u6708' // 加上月字

  return s
}

/**
 * 传入农历日期数字返回汉字表示法
 * @param lunar day
 * @return Cn string
 * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
 */
function toChinaDay(d) {
  // 日 => \u65e5

  let s

  switch (d) {
    case 10:
      s = '\u521D\u5341'

      break

    case 20:
      s = '\u4E8C\u5341'

      break

    case 30:
      s = '\u4E09\u5341'

      break

    default:
      s = nStr2[Math.floor(d / 10)]

      s += nStr1[d % 10]
  }

  return s
}

/**
 * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
 * @param y year
 * @return Cn string
 * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
 */
function getAnimal(y) {
  return Animals[(y - 4) % 12]
}

/**
 * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
 * @param y  solar year
 * @param m  solar month
 * @param d  solar day
 * @return JSON object
 * @eg:console.log(calendar.solarToLunar(1987,11,01));
 */
function solarToLunar(y, m, d) {
  // 参数区间1900.1.31~2100.12.31

  // 年份限定、上限

  if (y < 1900 || y > 2100)
    return -1 // undefined转换为数字变为NaN

  // 公历传参最下限

  if (y === 1900 && m === 1 && d < 31)
    return -1

  // 未传参  获得当天

  let objDate = null

  if (!y)
    objDate = new Date()

  else
    objDate = new Date(y, parseInt(m) - 1, d)

  let i

  let leap = 0

  let temp = 0

  // 修正ymd参数

  y = objDate.getFullYear()

  m = objDate.getMonth() + 1

  d = objDate.getDate()

  let offset
    = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000

  for (i = 1900; i < 2101 && offset > 0; i++) {
    temp = lYearDays(i)

    offset -= temp
  }

  if (offset < 0) {
    offset += temp
    i--
  }

  // 是否今天

  const isTodayObj = new Date()

  let isToday = false

  if (isTodayObj.getFullYear() === y && isTodayObj.getMonth() + 1 === m && isTodayObj.getDate() === d)
    isToday = true

  // 星期几

  let nWeek = objDate.getDay()

  const cWeek = nStr1[nWeek]

  // 数字表示周几顺应天朝周一开始的惯例

  if (nWeek === 0)
    nWeek = 7

  // 农历年

  const year = i

  leap = leapMonth(i) // 闰哪个月

  let isLeap = false

  // 效验闰月

  for (i = 1; i < 13 && offset > 0; i++) {
    // 闰月

    if (leap > 0 && i === leap + 1 && isLeap === false) {
      --i

      isLeap = true
      temp = leapDays(year) // 计算农历闰月天数
    }
    else {
      temp = monthDays(year, i) // 计算农历普通月天数
    }

    // 解除闰月

    if (isLeap === true && i === leap + 1)
      isLeap = false

    offset -= temp
  }

  // 闰月导致数组下标重叠取反

  if (offset === 0 && leap > 0 && i === leap + 1) {
    if (isLeap) {
      isLeap = false
    }
    else {
      isLeap = true
      --i
    }
  }

  if (offset < 0) {
    offset += temp
    --i
  }

  // 农历月

  const month = i

  // 农历日

  const day = offset + 1

  // 天干地支处理

  const sm = m - 1

  const gzY = toGanZhiYear(year)

  // 当月的两个节气

  // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`

  const firstNode = getTerm(y, m * 2 - 1) // 返回当月「节」为几日开始

  const secondNode = getTerm(y, m * 2) // 返回当月「节」为几日开始

  // 依据12节气修正干支月

  let gzM = toGanZhi((y - 1900) * 12 + m + 11)

  if (d >= firstNode)
    gzM = toGanZhi((y - 1900) * 12 + m + 12)

  // 传入的日期的节气与否

  let isTerm = false

  let Term = null

  if (firstNode === d) {
    isTerm = true

    Term = solarTerm[m * 2 - 2]
  }

  if (secondNode === d) {
    isTerm = true

    Term = solarTerm[m * 2 - 1]
  }

  // 日柱 当月一日与 1900/1/1 相差天数

  const dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10

  const gzD = toGanZhi(dayCyclical + d - 1)

  // 该日期所属的星座

  const astro = toAstro(m, d)

  return {
    lYear: year,
    lMonth: month,
    lDay: day,
    Animal: getAnimal(year),
    IMonthCn: (isLeap ? '\u95F0' : '') + toChinaMonth(month),
    IDayCn: toChinaDay(day),
    cYear: y,
    cMonth: m,
    cDay: d,
    gzYear: gzY,
    gzMonth: gzM,
    gzDay: gzD,
    isToday,
    isLeap,
    nWeek,
    ncWeek: `\u661F\u671F${cWeek}`,
    isTerm,
    Term,
    astro,
  }
}

export const calendarFormatter = {
  // 传入阳历年月日获得详细的公历、农历object信息 <=>JSON

  solarToLunar(y, m, d) {
    // 参数区间1900.1.31~2100.12.31

    return solarToLunar(y, m, d)
  },

  /**
   * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
   * @param y  lunar year
   * @param m  lunar month
   * @param d  lunar day
   * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
   * @return JSON object
   * @eg:console.log(calendar.lunarToSolar(1987,9,10));
   */
  lunarToSolar(y, m, d, isLeapMonth) {
    // 参数区间1900.1.31~2100.12.1

    isLeapMonth = !!isLeapMonth

    if (isLeapMonth && leapMonth !== m)
      return -1
    // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同

    if ((y === 2100 && m === 12 && d > 1) || (y === 1900 && m === 1 && d < 31))
      return -1
    // 超出了最大极限值

    const day = monthDays(y, m)

    let _day = day

    // bugFix 2016-9-25

    // if month is leap, _day use leapDays method

    if (isLeapMonth)
      _day = leapDays(y, m)

    if (y < 1900 || y > 2100 || d > _day)
      return -1
    // 参数合法性效验

    // 计算农历的时间差

    let offset = 0

    for (var i = 1900; i < y; i++)
      offset += lYearDays(i)

    let leap = 0

    let isAdd = false

    for (i = 1; i < m; i++) {
      leap = leapMonth(y)

      if (!isAdd) {
        // 处理闰月

        if (leap <= i && leap > 0) {
          offset += leapDays(y)
          isAdd = true
        }
      }

      offset += monthDays(y, i)
    }

    // 转换闰月农历 需补充该年闰月的前一个月的时差

    if (isLeapMonth)
      offset += day

    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)

    const stmap = Date.UTC(1900, 1, 30, 0, 0, 0)

    const calObj = new Date((offset + d - 31) * 86400000 + stmap)

    const cY = calObj.getUTCFullYear()

    const cM = calObj.getUTCMonth() + 1

    const cD = calObj.getUTCDate()

    return solarToLunar(cY, cM, cD)
  },
}
