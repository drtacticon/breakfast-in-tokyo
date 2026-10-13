const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');const element=()=>({showModal(){},close(){},append(){},querySelectorAll(){return[]}});const ctx=vm.createContext({document:{body:{},getElementById:element,createElement:element},localStorage:{getItem(){return null},setItem(){}}});vm.runInContext(fs.readFileSync('dist/game.js','utf8'),ctx);const run=s=>vm.runInContext(s,ctx);
run('state=fresh();state.enemies=[];act("move",22)');assert.equal(run('state.damage[22]'),10);
run('state=fresh();state.enemies=[];act("feed")');assert.equal(run('state.damage[21]'),10);
run('state=fresh();state.enemies=[];act("wait")');assert.equal(run('state.damage[21]'),10);
run('state=fresh();state.enemies=[{type:"kaiju",pos:21,hp:6}];act("special")');assert.equal(run('state.damage[21]'),30);
run('state=fresh();state.damage[21]=90;damageDistrict(30)');assert.equal(run('state.damage[21]'),100);
run('state=fresh();state.enemies=[];state.food.fill(0);state.food[14]=3;state.damage[14]=100;state.turn=3;fleeCivilians()');assert.equal(run('state.food[14]'),3);
run('state=fresh();state.enemies=[];state.food.fill(0);state.food[14]=3;districts[14].links.forEach(i=>state.damage[i]=100);state.turn=3;fleeCivilians()');assert.equal(run('state.food[14]'),3);
run('state=fresh();state.damage.fill(100);state.enemies=[{type:"military",unit:"tank",pos:9,hp:4}];militaryTurn()');assert.equal(run('state.enemies[0].pos'),15);
run('state=fresh();state.enemies=[];state.en=5;state.food.fill(0);state.food[22]=1;berserk();berserk()');assert.equal(run('state.damage[22]'),20);
console.log('Passed: movement, feeding, waiting, special damage, 100% cap, rubble traps/blocks civilians, military crosses rubble, berserk movement plus feeding.');
run('state=fresh();state.enemies=[];state.food.fill(0);state.food[7]=2;state.turn=3;fleeCivilians()');assert.equal(run('state.food.reduce((a,b)=>a+b,0)'),2);assert.equal(run('state.food.some((n,i)=>n===2&&districts[i].edge)'),true);run('state.turn=6;state.civilianMoved.fill(0);fleeCivilians()');assert.equal(run('state.food.reduce((a,b)=>a+b,0)'),0);console.log('Passed: civilians wait on the edge until their next movement opportunity.');

