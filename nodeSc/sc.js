const fs = require('fs')
const path = require('path')
const readline = require('readline');
const os = require('os');

let readFir = `# commonUtils
commonUtils for project
！！！注意：每次添加完函数需执行upReadme`

const fRead = fs.createReadStream(path.join(__dirname,'../js/utils.js'))
const fWrite = fs.createWriteStream(path.join(__dirname,'../README.md'))

fRead.on('end',()=>{
  console.log('end')
  enableWriteIndex = false
})

let objReadline = readline.createInterface({
  input: fRead,
  terminal: true
})

let index = 1
fWrite.write(readFir + os.EOL)
objReadline.on('line',(line)=>{
  let str = trim(line.toString())
  console.log(str)
  if(str.startsWith('//rdme')){
    let temp = 'line' + index.toString() + ':' + trim(str).split('//rdme')[1];
    fWrite.write(temp + os.EOL)
  }
  index++;
})

objReadline.on('close',()=>{
  console.log('ok')
})

//rdme  去左右空格;
function trim(s){  
  if(s == null) {  
      return "";  
  }  
  var whitespace = new String(" \t\n\r");  
  var str = new String(s);  
  if (whitespace.indexOf(str.charAt(0)) != -1) {  
      var j=0, i = str.length;  
      while (j < i && whitespace.indexOf(str.charAt(j)) != -1){  
          j++;  
      }  
      str = str.substring(j, i);  
  }  
  return str;  
}  