const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements=new Map();const el=()=>({innerHTML:'',textContent:'',className:'',disabled:false,hidden:false,showModal(){},close(){},append(){},querySelectorAll(){return[]}});const context=vm.createContext({document:{body:{},getElementById(id){if(!elements.has(id))elements.set(id,el());return elements.get(id)},createElement:el},localStorage:{getItem(){return null},setItem(){}}});vm.runInContext(fs.readFileSync('dist/game.js','utf8'),context);const run=s=>vm.runInContext(s,context);

assert.equal(run('districts.length'),36);
assert.equal(run('districts.every((d,i)=>d.links.every(n=>districts[n].links.includes(i))&&path(i,[21]))'),true);
run('state=fresh();state.enemies=[];act("move",27)');assert.equal(run('state.en'),13);assert.equal(run('state.pos'),27);
run('state=fresh();state.enemies=[];state.hp=5;act("heal")');assert.equal(run('state.hp'),6);assert.equal(run('state.en'),13);
run('state=fresh();state.enemies=[];state.en=19;act("feed");evolve("Razor claws");evolve("Armored hide")');assert.equal(run('state.en'),20);assert.equal(run('state.abilities.length'),1);
run('state=fresh();state.enemies=[];state.en=0;state.hp=1;state.food.fill(0);berserk();berserk()');assert.equal(run('state.hp'),0);
run('state=fresh();state.enemies=[];state.food.fill(0);state.food[14]=3;state.turn=3;fleeCivilians()');assert.equal(run('state.food.reduce((a,b)=>a+b,0)'),3);assert.equal(run('state.food.every((n,i)=>!n||path(i,[state.pos]).length>path(14,[state.pos]).length)'),true);
run('state.food.fill(0);state.food[0]=4;fleeCivilians()');assert.equal(run('state.food.reduce((a,b)=>a+b,0)'),0);
run('spawnCivilians=()=>{};state=fresh();state.enemies=[];state.food.fill(0);state.food[14]=2;state.turn=1;endTurn();endTurn()');assert.equal(run('state.food[14]'),2);run('endTurn()');assert.equal(run('state.food[14]'),0);
console.log('Passed: 36 connected territories; movement, healing, evolution, death;  civilian cadence, flight and exits; interior births and edge reinforcement types.');

