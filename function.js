// JavaScript Document
function enCaesar(n){
  var letter = "abcdefghijklmnopqrstuvwxyz";
  var input = document.getElementById("input1").value.trim().toLowerCase();   //去掉输入两侧的空格，再转换为小写
  var output = "";
  for(var i=0; i<input.length; i++){
    output += letter[(letter.indexOf(input[i])+n)%26]   //找到该字母在字母表中的位置，加上位移参数，超过26的取余以从头再来
  }
  document.getElementById("output1").innerHTML = output;
}

function deCaesar(n){
  var letter = "abcdefghijklmnopqrstuvwxyz";
  var input = document.getElementById("input1").value.trim().toLowerCase();
  var output = "";
  for(var i=0; i<input.length; i++){
    var position = letter.indexOf(input[i])-n;
    if(position<0){
      position += 26;
    }
    output += letter[position]   //找到该字母在字母表中的位置，减去位移参数，小于零加上26以从头再来
  }
  document.getElementById("output1").innerHTML = output;
}

//倒排加密解密所用函数相同
function Reverse(){
  var letter = "abcdefghijklmnopqrstuvwxyz";
  var input = document.getElementById("input1").value.trim().toLowerCase();
  var output = "";
  for(var i=0; i<input.length; i++){
    output += letter[25-letter.indexOf(input[i])]   //原字母表与倒排过字母表两字母位置序号之和为一常数25
  }
  document.getElementById("output1").innerHTML = output;
}

function enReplacement(key){
  var letter = "abcdefghijklmnopqrstuvwxyz";
  var ciphertext = "";
  var input = document.getElementById("input1").value.trim().toLowerCase();
  var output = "";
  for(var i=0; i<key.length; i++){
    if(ciphertext.indexOf(key[i])==-1){   //key中的字母如果不在密文表中则添加
      ciphertext += key[i]
    }
  }
  for(i=0; i<26; i++){
    if(ciphertext.indexOf(letter[i])==-1){    //剩余原字母表中的字母如果不在密文表中则添加
      ciphertext += letter[i];
    }
  }
  for(i=0; i<input.length; i++){
    output += ciphertext[letter.indexOf(input[i])]    //待加密字母在原字母表中序号对应密文表中加密字母
  }
  document.getElementById("output1").innerHTML = output;
}

function deReplacement(key){
  var letter = "abcdefghijklmnopqrstuvwxyz";
  var ciphertext = "";
  var input = document.getElementById("input1").value.trim().toLowerCase();
  var output = "";
  for(var i=0; i<key.length; i++){
    if(ciphertext.indexOf(key[i])==-1){   //key中的字母如果不在密文表中则添加
      ciphertext += key[i]
    }
  }
  for(i=0; i<26; i++){
    if(ciphertext.indexOf(letter[i])==-1){    //剩余原字母表中的字母如果不在密文表中则添加
      ciphertext += letter[i];
    }
  }
  for(i=0; i<input.length; i++){
    output += letter[ciphertext.indexOf(input[i])]    //待解密字母在密文表中序号对应原字母表中字母
  }
  document.getElementById("output1").innerHTML = output;
}

function enVirginia(key){
  var letter = "abcdefghijklmnopqrstuvwxyz";
  var ciphertext = "";
  var input = document.getElementById("input1").value.trim().toLowerCase();
  var n = input.length;
  var output = "";
  for(var i=0; i<Math.floor(n/key.length); i++){   //加密字母表加上整数倍密钥
    ciphertext += key;
  }
  for(i=0; i<key.length; i++){    //加上剩余非整数部分密钥得到完整加密字母表
    if(ciphertext.length>=n){
      break;
    }
    ciphertext += key[i];
  }
  //console.log(ciphertext);    //查看加密字母表是否正确
  for(i=0; i<input.length; i++){
    output += letter[(letter.indexOf(input[i])+letter.indexOf(ciphertext[i]))%26]
  }
  document.getElementById("output1").innerHTML = output;
}

function deVirginia(key){
  var letter = "abcdefghijklmnopqrstuvwxyz";
  var ciphertext = "";
  var input = document.getElementById("input1").value.trim().toLowerCase();
  var n = input.length;
  var output = "";
  for(var i=0; i<Math.floor(n/key.length); i++){   //加密字母表加上整数倍密钥
    ciphertext += key;
  }
  for(i=0; i<key.length; i++){    //加上剩余非整数部分密钥得到完整加密字母表
    if(ciphertext.length>=n){
      break;
    }
    ciphertext += key[i];
  }
  //console.log(ciphertext);    //查看加密字母表是否正确
  for(i=0; i<input.length; i++){
    var position = letter.indexOf(input[i])-letter.indexOf(ciphertext[i]);
    if(position<0){
      position += 26;
    }
    output += letter[position];
  }
  document.getElementById("output1").innerHTML = output;
}

function enTransform(key){
  var letter = "abcdefghijklmnopqrstuvwxyz";
  var input = document.getElementById("input1").value.trim().toLowerCase();
  input = input.split(' ').toString().replace(/,/g,'');   //实现去掉明文中空格：先将字符串以空格分割，再将分割后的数组转换成字符串再去掉逗号即可。replace(/,/g,'')中/,/g为正则表达式，g表示全局匹配以实现全部替换
  //  console.log(input);   //查看明文是否去掉空格
  var output = "";
  var n = key.length;
  var row = Math.ceil(input.length/n);
  var ciphertext = new Array();   //采用数组存储改变次序后的明文
  for(var i=0; i<Math.floor(input.length/n); i++){
    ciphertext.push(input.substr(i*n,n));   //push方法从尾端添加数组元素，substr(n1,n2)方法实现从n1位置开始提取n2长度子字符串
  }
  ciphertext.push(input.substr(i*n));   //提取剩余明文得到最终密文表，即从i*n位置起到末尾所有字符
  //  console.log(ciphertext);    //查看密文表是否正确
  for(i=0; i<26; i++){
    if(key.indexOf(letter[i])>=0){
      var k = key.indexOf(letter[i]);   //按字母表顺序第几列
      for(var j=0; j<row; j++){
        if(ciphertext[j][k]==undefined){    //如果该数组元素中的字符不存在则跳过（涉及最后一组不完整的数组元素）
          continue;
        }
        output += ciphertext[j][k];   //先列后行查找密文字母
      }
    }
  }
  document.getElementById("output1").innerHTML = output;
}

function deTransform(key){
  var letter = "abcdefghijklmnopqrstuvwxyz";
  var input = document.getElementById("input1").value.trim().toLowerCase();
  var output = "";
  var n = key.length;
  var row1 = Math.ceil(input.length/n);   //向上取整的行数
  var row2 = Math.floor(input.length/n);    //向下取整的行数
  var count1 = 0;   //向上取整的列数计数
  var count2 = 0;   //向下取整的列数计数
  var ciphertext = new Array();   //采用数组存储改变次序后的密文
  var order = "";    //记录密钥中字母顺序

  for(var i=0; i<26; i++){
    if(key.indexOf(letter[i])>=0){
      var k = key.indexOf(letter[i]);   //按字母表顺序第几列
      if(k<(input.length%n)){
        ciphertext.push(input.substr(count1*row1+count2*row2,row1));   //看该密钥字母对应列是否为向上取整行数
        count1++;
      }
      else{
        ciphertext.push(input.substr(count1*row1+count2*row2,row2));   //看该密钥字母对应列是否为向下取整行数
        count2++;
      }
      order += k.toString();
    }
  }
  // console.log(ciphertext);    //查看密文数组是否正确
  // console.log(order);   //查看顺序是否有误

  for(i=0; i<row1; i++){
    for(var j=0; j<n; j++){   //先行后列
      if(ciphertext[order.indexOf(j.toString())][i]==undefined){    //如果该数组元素中的字符不存在则跳过（涉及最后一组不完整的数组元素）
          continue;
        }
      output += ciphertext[order.indexOf(j.toString())][i];
    }
  }

  document.getElementById("output1").innerHTML = output;
}

//清除所有输入
function clear(){
  document.getElementById("key").value = "";
  document.getElementById("input1").value = "";
  document.getElementById("tips").innerHTML = "";
  document.getElementById("output1").innerHTML = "";
}

function radioCaesar(){
  clear();
  document.getElementById("keyinput").style.display = "block";    //显示输入密钥功能
}

function radioReverse(){
  clear();
  document.getElementById("keyinput").style.display = "none";     //关闭输入密钥功能
}

function radioReplacement(){
  clear();
  document.getElementById("keyinput").style.display = "block";
}

function radioVirginia(){
  clear();
  document.getElementById("keyinput").style.display = "block";
}

function radioTransform(){
  clear();
  document.getElementById("keyinput").style.display = "block";
}

function encrypt(){
  var value = "";
  var key = document.getElementById("key").value.trim().toLowerCase();
  //console.log(key);     //查看密钥是否正确
  var radio = document.getElementsByName("ways");
  for(var i=0; i<radio.length; i++){
    if(radio[i].checked==true){
      value = radio[i].value;
      break;
    }
  }
  if(value==""){
    document.getElementById("tips").innerHTML = "请选择加密方法！";
    return;
  }
  document.getElementById("tips").innerHTML = "加密后密文为：";

  switch(value){
    case "1":
      key = parseInt(key);    //密钥为数字
      enCaesar(key);   //凯撒加密
      break;
    case "2":
      Reverse();
      break;
    case "3":
      enReplacement(key);   //置换加密
      break;
    case "4":
      enVirginia(key);   //维吉尼亚加密
      break;
    case "5":
      enTransform(key);    //转换加密
      break;
  }
}

function decrypt(){
  var value = "";
  var key = document.getElementById("key").value.trim().toLowerCase();
  var radio = document.getElementsByName("ways");
  for(var i=0; i<radio.length; i++){
    if(radio[i].checked==true){
      value = radio[i].value;
      break;
    }
  }
  if(value==""){
    document.getElementById("tips").innerHTML = "请选择加密方法！";
    return;
  }
  document.getElementById("tips").innerHTML = "加密后密文为：";

  switch(value){
    case "1":
      key = parseInt(key);
      deCaesar(key);   //凯撒解密
      break;
    case "2":
      Reverse();
      break;
    case "3":
      deReplacement(key);   //置换解密
      break;
    case "4":
      deVirginia(key);   //维吉尼亚解密
      break;
    case "5":
      deTransform(key);    //转换解密
      break;
  }
}