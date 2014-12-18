function process(code) {
 var res=[], cc=0, stack=[], lvl=0, print='', i, tmp='';
 var cycle=function() {
  var icp=0;
  while (res[cc]>0) {
   if (icp==100000000) if (!confirm("It look's like an infinite loop. Do you want to continue?")) break;
   stack[lvl].forEach(function(f){funcs[f]()});
   icp++;
  }
 };
 var funcs={
  Oink: function() { if (!res[cc]) res[cc]=0; res[cc]++; },
  oink: function() { if (!res[cc]) res[cc]=0; res[cc]--; },
  Hriu: function() { cc++; },
  hriu: function() { cc--; },
  squeal: function() { print+=String.fromCharCode(res[cc]); },
  Hro: function() { stack[++lvl]=[]; },
  hro: function() { cycle(); lvl--; }
 }

 for (i=0;i<code.length;i++) {
  if (!code[i].match(/[aehHiklnoOqrsou]/)) continue;
  //if (!code[i].match(/[adehkKoOru]/)) continue;
  tmp+=code[i];
  if (funcs[tmp]) {
   if (lvl>0 && tmp!='Hro' && tmp!='hro') {
    stack[lvl].push(tmp);
   } else {
    funcs[tmp]();
   }
   tmp='';
  }
 }
console.log(res);
 
 return print;
}

window.onload=function() {
 document.getElementById('run').onclick=function() { document.getElementById('out').innerHTML=process(document.getElementById('code').value); };
}
