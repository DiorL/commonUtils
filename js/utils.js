  //rdme  处理千分符
// val待处理数据 digits保留几位小数
export const moneyFixed = (val, digits = 0) => {
  let num = 0;
  if (digits === 0) {
    num = val ? Math.round(val) : 0;
  } else {
    num = val ? +val.toFixed(digits) : 0;
  }

  let returnArr = (num + "").split(".");
  let temp0 = returnArr[0];
  // let count = Math.floor(temp0.length / 3)
  let firstNum = (temp0 + "").length % 3;
  console.log(firstNum, "firstNumfirstNum");

  let tempArr = [];
  for (let i = 0; i < temp0.length; i++) {
    if (i === firstNum - 1 || (i + 1) % 3 === firstNum) {
      tempArr.push(temp0[i]);

      tempArr.push(",");
    } else {
      tempArr.push(temp0[i]);
    }
  }

  if (tempArr[tempArr.length - 1] == ",") {
    tempArr.pop();
  }

  returnArr[0] = tempArr.join("");
  return returnArr.join(".");
};


//rdme  千分符
function numFormat(num){
  var res=num.toString().replace(/\d+/, function(n){ // 先提取整数部分
       return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
          return $1+",";
        });
  })
  return res;
}

//rdme 处理小数 如果是整数,取整,如果是小数,保留两位
/**
 * 处理小数 如果是整数,取整,如果是小数,保留两位
 * 233->233
 * 233.12222->233.12
 * */
function cutNum(v: number, dg: number = 2): number {
  if (!v) return 0;
  if (!isNumber(v)) v = Number(v);
  return String(v).includes(".") ? Number(v.toFixed(dg)) : v;
}

//rdme 不丢失精度 取余
export const accMod = (arg1, arg2) => {
  // 修正取余精度
  const ACCURACY_CORRECT = 10000000000;
  return (
    ((arg1 * ACCURACY_CORRECT) % (arg2 * ACCURACY_CORRECT)) / ACCURACY_CORRECT
  );
};

//rdme  不丢失精度乘法
export const accMul = (arg1 = 0, arg2 = 0) => {
  let m = 0;
  let s1 = arg1.toString();
  let s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
};

//rdme  不丢失精度加法
export const addNum = (num1, num2) => {
  let sq1 = 0;
  let sq2 = 0;
  let m = 0;
  try {
    sq1 = num1.toString().split(".")[1].length;
  } catch (e) {
    sq1 = 0;
  }
  try {
    sq2 = num2.toString().split(".")[1].length;
  } catch (e) {
    sq2 = 0;
  }
  m = Math.pow(10, Math.max(sq1, sq2));
  return (num1 * m + num2 * m) / m;
};

//rdme  不丢失精度减法
export const accSub = (num1, num2) => {
  let r1 = 0;
  let r2 = 0;
  let m = 0;
  let n = 0;
  try {
    r1 = num1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
};


//rdme  金额转汉字
export const convertCurrency = money => {
  //汉字的数字
  let cnNums = new Array(
    "零",
    "壹",
    "贰",
    "叁",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖"
  );
  //基本单位
  let cnIntRadice = new Array("", "拾", "佰", "仟");
  //对应整数部分扩展单位
  let cnIntUnits = new Array("", "万", "亿", "兆");
  //对应小数部分单位
  let cnDecUnits = new Array("角", "分", "毫", "厘");
  //整数金额时后面跟的字符
  let cnInteger = "整";
  //整型完以后的单位
  let cnIntLast = "元";
  //最大处理的数字
  let maxNum = 999999999999999.9999;
  //金额整数部分
  let integerNum;
  //金额小数部分
  let decimalNum;
  //输出的中文金额字符串
  let chineseStr = "";
  //分离金额后用的数组，预定义
  let parts;
  if (money == "") {
    return "";
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return "";
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf(".") == -1) {
    integerNum = money;
    decimalNum = "";
  } else {
    parts = money.split(".");
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    let IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if (n == "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != "") {
    let decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1);
      if (n != "0") {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == "") {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == "") {
    chineseStr += cnInteger;
  }
  return chineseStr;
};

//rdme  去左右空格;
function trim(s){
  return s.replace(/(^\s*)|(\s*$)/g, "");
}

