const path = require('path');
const fs = require('fs');
const acorn = require('acorn');

// console.log(process.argv[2]);
myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);
var read = fs.readFileSync(myArgs[0]);
// console.log('read: ',read);
var str = read.toString().split('\n');
// console.log('str: ', str);
var truArr = []
var truArr1 = []
var truArr2 = []
var truArr3 = []
var truArr4 = []
function isModule(){
  var req = /require\(\'\./;
  var req1 = /require\(\"\./;
  var req2 = /\)\./;
  var req3 = /require\(/;
  var req4 = /import/;
  for(var i = 0; i < str.length; i++) {
    if((req.test(str[i]) == true||req1.test(str[i]) == true)&& req2.test(str[i]) == true) {
      truArr.push(str[i]);
    }
    else if(req.test(str[i]) == true||req1.test(str[i]) == true){
      truArr1.push(str[i]);
    }
    else if(req3.test(str[i]) == true && req2.test(str[i]) == true) {
      truArr2.push(str[i]);
    }
    else if(req3.test(str[i]) == true) {
      truArr3.push(str[i]);
    }
    else if(req4.test(str[i]) == true) {
      truArr4.push(str[i]);
    }
  }
  // console.log('truArr: ',truArr);
  // console.log('truArr1: ',truArr1);
  // console.log('truArr2: ',truArr2);
  //  console.log('truArr3: ',truArr3);
}
isModule();
// console.log('test: ',r.test(str))
var parseMods = truArr.map(function(mod) {
  return acorn.parse(mod, {sourceType: 'module'})
})
// console.log('parseMods: ', parseMods)
var parseMods1 = truArr1.map(function(mod) {
  return acorn.parse(mod, { sourceType: 'module' })
})
// console.log('parseMods1: ', parseMods1)
var parseMods2 = truArr2.map(function(mod) {
  return acorn.parse(mod, { sourceType: 'module' })
})
// console.log('parseMods2: ', parseMods2)
var parseMods3 = truArr3.map(function(mod) {
  return acorn.parse(mod, { sourceType: 'module' })
})
// console.log('parseMods3: ', parseMods3)
var parseMods4 = truArr4.map(function(mod) {
  return acorn.parse(mod, { sourceType: 'module' })
})
// console.log('parseMods4: ', parseMods4)
// const parsing = acorn.parse(truArr[0]);
var result ;
var obj = {}
var name;
var val;
var jname;

for (var j = 0; j < parseMods.length; j++) {
  name = parseMods[j].body[0].declarations[0].id.name;
  val = "require('"+parseMods[j].body[0].declarations[0].init.object.arguments[0].value +"')."+parseMods[j].body[0].declarations[0].init.property.name;
  obj[name] = val
  result = Object.assign({}, obj)
  // console.log('name: ', name)
  // console.log('val: ', val)
  // console.log('obj :', obj)
  // console.log('result 0 :', result)
}

for (var k = 0; k < parseMods1.length; k++) {
  name = parseMods1[k].body[0].declarations[0].id.name;
  val = "require('"+parseMods1[k].body[0].declarations[0].init.arguments[0].value+"')";

  obj[name] = val
  result = Object.assign({}, obj)
  // console.log('name: ', name)
  // console.log('val: ', val)
  // console.log('obj :', obj)
  // console.log('result 1 :', result)
}

for (var l = 0; l < parseMods2.length; l++) {
  name = parseMods2[l].body[0].declarations[0].id.name;
  val = parseMods2[l].body[0].declarations[0].init.object.arguments[0].value+"."+parseMods2[l].body[0].declarations[0].init.property.name;

  obj[name] = val
  result = Object.assign({}, obj)
  // console.log('name: ', name)
  // console.log('val: ', val)
  // console.log('obj :', obj)
  // console.log('result 1 :', result)
}

for (var m = 0; m < parseMods3.length; m++) {
  name = parseMods3[m].body[0].declarations[0].id.name;
  val = parseMods3[m].body[0].declarations[0].init.arguments[0].value;

  obj[name] = val
  result = Object.assign({}, obj)
  // console.log('name: ', name)
  // console.log('val: ', val)
  //  console.log('obj :', obj)
  // console.log('result 1 :', result)
}

for (var n = 0; n < parseMods4.length; n++) {
  name = parseMods4[n].body[0].specifiers[0].local.name;
  val = parseMods4[n].body[0].source.value;
  obj[name] = val
  result = Object.assign({}, obj)
  // console.log('name: ', name)
  // console.log('val: ', val)
  //  console.log('obj :', obj)
  // console.log('result 1 :', result)
}
// console.log('result final: ',result)
console.log('json: ',JSON.stringify(result))
