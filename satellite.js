/* Static Google Earth captures. Clean basemap, north up; game geography is approximate. */
const SATELLITE_MAPS={
 'tokyo':{credit:'Google · Airbus'},
 'new-york':{credit:'Google · Vexcel Imaging US, Inc. · Airbus · Data SIO, NOAA, U.S. Navy, NGA, GEBCO'},
 'london':{credit:'Google · Airbus'},
 'hong-kong':{credit:'Google · Airbus · Data SIO, NOAA, U.S. Navy, NGA, GEBCO'},
 'mexico-city':{credit:'Google · Airbus'},
 'peoria-az':{credit:'Google · Vexcel Imaging US, Inc. · Airbus'},
 'los-angeles':{credit:'Google · Vexcel Imaging US, Inc. · Airbus · Data USGS · Data SIO, NOAA, U.S. Navy, NGA, GEBCO'}
};
function satelliteLayer(cityId,scope='board',preview=false){
 if(!SATELLITE_MAPS[cityId])return '';
 const clip='satellite-clip-'+scope,gray='satellite-gray-'+scope;
 const scale=12/70;
 const x=preview?110-760*scale:-120,y=preview?97.5-630*scale:-100,w=preview?1520*scale:1520,h=preview?1260*scale:1260;
 const paths=districts.map(d=>{const cx=preview?110+Math.sqrt(3)*12*(d.q+d.r/2):d.x,cy=preview?97.5+18*d.r:d.y,size=preview?11.3:68;return '<path d="'+Array.from({length:6},(_,i)=>{const a=(i*60-30)*Math.PI/180;return (i?'L':'M')+(cx+size*Math.cos(a))+','+(cy+size*Math.sin(a));}).join(' ')+'Z"/>';}).join('');
 return '<defs><clipPath id="'+clip+'">'+paths+'</clipPath><filter id="'+gray+'"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="0.7"/><feFuncG type="linear" slope="0.7"/><feFuncB type="linear" slope="0.7"/></feComponentTransfer></filter></defs><g clip-path="url(#'+clip+')" pointer-events="none" aria-hidden="true"><image href="backgrounds/'+cityId+'.png" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" preserveAspectRatio="xMidYMid slice" opacity="0.32" filter="url(#'+gray+')"/></g>';
}
function satelliteCredit(cityId){return SATELLITE_MAPS[cityId]?.credit||'';}
