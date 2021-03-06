// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var result = '';
  var isArray = Array.isArray(obj);
  var isObj = !isArray && typeof obj === 'object' && obj;
  if(isObj){
    result+='{';
    for(const key in obj){
      const element = obj[key];
      if(isUnstringifiable(element)) continue;
      result+=`"${key}":${stringifyJSON(element)},`;
    }
    result+='}';
    result=result.replace(',}','}');
    return result;
  }else if(isArray){
    result+='[';
    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      if(isUnstringifiable(element)) continue;
      result+=`${stringifyJSON(element)},`;
    }
    result+=']';
    result=result.replace(',]',']');
    return result;
  }else{
    if(isUnstringifiable(obj)) return;
    const stringifiedElement = 
      typeof obj === 'string' 
        ? `"${obj}"` 
        : `${obj}`;
      
    result+=stringifiedElement;
    return result;
  }
};

var isUnstringifiable = (obj) => {
  return typeof obj === 'function' || typeof obj === 'undefined';
}