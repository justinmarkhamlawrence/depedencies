const path = require('path');
const fs = require('fs');
const acorn = require('acorn');

myArgs = process.argv.slice(2);
var read = fs.readFileSync(myArgs[0]);
var str = read.toString().split('\n');

var yup = [];
var result;
var obj = {};
var req = /require\(\'\./;
var req1 = /require\(\"\./;
var req2 = /\)\./;
var req3 = /require\(/;
var req4 = /import/;
str.forEach(function(line) {
  var name = '';
  var val = '';
  if((req.test(line)||req1.test(line))&&req2.test(line)) {
    name = acorn.parse(line).body[0].declarations[0].id.name;
    val = acorn.parse(line).body[0].declarations[0].init.object.arguments[0].value;
    fileVal = `require('${val}')`;
    obj[name] = fileVal;
    result = Object.assign({}, obj);
  }
  else if (req3.test(line)&&req2.test(line)) {
    name = acorn.parse(line).body[0].declarations[0].id.name;
    val = acorn.parse(line).body[0].declarations[0].init.object.arguments[0].value;
    obj[name] = val;
    result = Object.assign({}, obj);
  }
  else if (req.test(line)||req1.test(line)) {
    name = acorn.parse(line).body[0].declarations[0].id.name;
    val = acorn.parse(line).body[0].declarations[0].init.arguments[0].value;
    fileVal = `require('${val}')`;
    obj[name] = fileVal;
    result = Object.assign({}, obj);
  }
  else if (req3.test(line)) {
    name = acorn.parse(line).body[0].declarations[0].id.name;
    val = acorn.parse(line).body[0].declarations[0].init.arguments[0].value;
    obj[name] = val;
    result = Object.assign({}, obj);
  }
  else if (req4.test(line)) {
    name = acorn.parse(line, {sourceType: 'module'}).body[0].specifiers[0].local.name;
    val = acorn.parse(line, {sourceType: 'module'}).body[0].source.value;
    obj[name] = val;
    result = Object.assign({}, obj);
  }
});
console.log(JSON.stringify(result));
