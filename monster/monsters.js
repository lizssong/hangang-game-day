// 잠원 몬스터 탐험대 — 오리지널 몬스터 12종 (포획 코드·미션 포함)
const MONSTERS = [
  {id:'m01',name:'풀삐약',code:'2741',tier:'보통',pts:10,body:'#7BD389',belly:'#D4F5D8',shape:'round',top:'sprout',eyes:'dot',mouth:'beak',feet:'#F2A23A',
   desc:'풀밭에서 태어난 새싹 병아리. 햇볕을 쬐면 머리 새싹이 쑥쑥 자라요.',mission:'팀원 모두 한 발로 서서 5초 버티기'},
  {id:'m02',name:'퐁당',code:'5308',tier:'보통',pts:10,body:'#6CC7E8',belly:'#D9F4FC',shape:'drop',top:'none',eyes:'sparkle',mouth:'open',
   desc:'한강에서 튀어나온 물방울 요정. 웅덩이만 보면 퐁당 뛰어들어요.',mission:'"퐁당퐁당" 노래 한 소절 다 같이 부르기'},
  {id:'m03',name:'민들후',code:'1963',tier:'보통',pts:10,body:'#FFFFFF',belly:null,shape:'puff',top:'fluff',eyes:'dot',mouth:'smile',
   desc:'민들레 홀씨 몬스터. "후~" 불면 하늘로 날아가 버려서 잡기 어려워요.',mission:'다 같이 "후~" 불며 제자리 세 바퀴 돌기'},
  {id:'m04',name:'솔방콩',code:'8152',tier:'보통',pts:10,body:'#C0805C',belly:'#F1D2B8',shape:'bean',top:'leaf',eyes:'dot',mouth:'smile',scales:true,
   desc:'솔방울 옷을 입은 콩알 몬스터. 나무 아래에서 데굴데굴 굴러다녀요.',mission:'솔방울이나 나뭇잎 3개 찾아오기'},
  {id:'m05',name:'돌돌이',code:'4470',tier:'보통',pts:10,body:'#ADA6BF',belly:null,shape:'wide',top:'moss',eyes:'sleepy',mouth:'smile',
   desc:'강가 조약돌 몬스터. 하루 종일 졸다가 가위바위보 소리에만 깨요.',mission:'가위바위보로 엄마를 이기면 성공!'},
  {id:'m06',name:'점박이',code:'6025',tier:'보통',pts:10,body:'#F05A4A',belly:null,shape:'round',top:'antenna',eyes:'dot',mouth:'smile',spots:true,
   desc:'점 일곱 개가 자랑인 무당벌레 몬스터. 나무를 꼭 안아주면 나타나요.',mission:'팀원 다 같이 나무 한 그루 꼭 안아주기'},
  {id:'m07',name:'꽥꽥보트',code:'3389',tier:'보통',pts:10,body:'#FFCF5A',belly:'#FFF1C7',shape:'wide',top:'tuft',eyes:'dot',mouth:'bill',
   desc:'한강 오리배를 닮은 몬스터. 뒤뚱뒤뚱 걸을 때 제일 신나요.',mission:'오리처럼 뒤뚱뒤뚱 10걸음 걷기'},
  {id:'m08',name:'따릉링',code:'7216',tier:'희귀',pts:20,body:'#FF8FB1',belly:'#FFE0EA',shape:'bean',top:'ears',eyes:'sparkle',mouth:'open',wheels:true,
   desc:'바퀴 두 개로 강변을 달리는 몬스터. 벨 소리를 들으면 꼭 따라와요.',mission:'"따릉따릉!" 외치며 자전거 타는 흉내 10초'},
  {id:'m09',name:'노을냥',code:'9547',tier:'희귀',pts:20,body:'#FF9A5A',belly:'#FFE2CC',shape:'round',top:'cat',eyes:'sleepy',mouth:'cat',
   desc:'해 질 녘에만 나타나는 고양이 몬스터. 하늘 색이 바뀔 때마다 털 색도 바뀌어요.',mission:'하늘을 보고 보이는 색깔 3가지 말하기'},
  {id:'m10',name:'반짝물결',code:'1308',tier:'희귀',pts:20,body:'#3FBFA9',belly:'#CFF3EC',shape:'drop',top:'wave',eyes:'sparkle',mouth:'smile',
   desc:'강물 위 햇빛 조각이 모여 생긴 몬스터. 파도를 타면 반짝반짝 빛나요.',mission:'팀원 모두 손잡고 파도타기 3번'},
  {id:'m11',name:'구름솜',code:'5862',tier:'희귀',pts:20,body:'#EEE8FF',belly:null,shape:'puff',top:'none',eyes:'sleepy',mouth:'smile',
   desc:'풀밭에 내려와 낮잠 자는 구름 몬스터. 폭신해서 베개로 딱이에요.',mission:'누워서 하늘에 보이는 구름 모양 하나 찾기'},
  {id:'m12',name:'잠잠룡',code:'0614',tier:'전설',pts:50,body:'#8B6CF0',belly:'#E3DAFF',shape:'bean',top:'horns',eyes:'sparkle',mouth:'open',wings:true,
   desc:'잠원 한강을 지키는 전설의 용. 모두가 한마음일 때만 모습을 보여줘요.',mission:'팀 전원 용 포즈로 단체 사진 찰칵!'},
];
const TIER_PTS = {'보통':10,'희귀':20,'전설':50};

function monsterSVG(m, opt){
  opt = opt || {};
  const sil = !!opt.silhouette;
  const OL = sil ? 'var(--sil-line, #CDBDB6)' : '#2A1A22';
  const F = c => sil ? 'var(--sil, #E9DCD7)' : c;
  const sw = 3;
  const S = {
    round:{top:-28,bot:44}, wide:{top:-16,bot:44}, bean:{top:-30,bot:46},
    drop:{top:-44,bot:58}, puff:{top:-30,bot:44}
  }[m.shape];
  let back = '', body = '', front = '';
  // ---- behind body
  if (m.wings) back += `<path d="M-30,0 L-58,-22 L-52,6 L-62,14 L-34,22Z M30,0 L58,-22 L52,6 L62,14 L34,22Z" fill="${F('#B9A5FF')}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  if (m.top==='cat') back += `<path d="M-30,-14 L-26,-44 L-6,-30Z M30,-14 L26,-44 L6,-30Z" fill="${F(m.body)}" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round"/>` + (sil?'':`<path d="M-24,-22 L-23,-36 L-13,-28Z M24,-22 L23,-36 L13,-28Z" fill="#FFB6C9"/>`);
  if (m.top==='ears') back += `<circle cx="-22" cy="-30" r="11" fill="${F(m.body)}" stroke="${OL}" stroke-width="${sw}"/><circle cx="22" cy="-30" r="11" fill="${F(m.body)}" stroke="${OL}" stroke-width="${sw}"/>`;
  if (m.wheels) back += [-24,24].map(x=>`<circle cx="${x}" cy="46" r="12" fill="${F('#FFFFFF')}" stroke="${OL}" stroke-width="${sw}"/>`+(sil?'':`<path d="M${x-8},46 H${x+8} M${x},38 V54" stroke="${OL}" stroke-width="2"/>`)).join('');
  // ---- body
  const shapeEl = (fill, stroke, extra) => {
    const st = stroke ? `stroke="${stroke}" stroke-width="${extra||sw}"` : '';
    switch (m.shape){
      case 'round': return `<ellipse cx="0" cy="8" rx="38" ry="36" fill="${fill}" ${st}/>`;
      case 'wide':  return `<ellipse cx="0" cy="14" rx="46" ry="30" fill="${fill}" ${st}/>`;
      case 'bean':  return `<rect x="-34" y="-30" width="68" height="76" rx="32" fill="${fill}" ${st}/>`;
      case 'drop':  return `<path d="M0,-44 C16,-22 40,-2 40,18 A40,40 0 0 1 -40,18 C-40,-2 -16,-22 0,-44Z" fill="${fill}" ${st} stroke-linejoin="round"/>`;
      case 'puff': {
        const cs = [[-26,12,20],[26,12,20],[0,-6,26],[-14,26,18],[14,26,18],[-18,-2,18],[18,-2,18]];
        return cs.map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="${fill}" ${st}/>`).join('');
      }
    }
  };
  if (m.shape==='puff'){ body += shapeEl(OL, OL, sw*2); body += shapeEl(F(m.body)); }
  else body += shapeEl(F(m.body), OL);
  if (!sil){
    if (m.belly) body += m.shape==='wide'
      ? `<ellipse cx="0" cy="26" rx="26" ry="13" fill="${m.belly}"/>`
      : `<ellipse cx="0" cy="${m.shape==='drop'?32:26}" rx="22" ry="15" fill="${m.belly}"/>`;
    if (m.spots) body += `<path d="M0,-27 V43" stroke="${OL}" stroke-width="2.5"/>` + [[-22,-8,6],[22,-8,6],[-26,22,5],[26,22,5],[-12,34,4],[12,34,4]].map(s=>`<circle cx="${s[0]}" cy="${s[1]}" r="${s[2]}" fill="${OL}"/>`).join('');
    if (m.scales) body += [[-16,-14],[16,-14],[-22,4],[22,4],[-20,30],[20,30]].map(s=>`<path d="M${s[0]-7},${s[1]} q7,7 14,0" fill="none" stroke="#8A5236" stroke-width="2.5" stroke-linecap="round"/>`).join('');
    if (m.feet) body += `<ellipse cx="-14" cy="${S.bot}" rx="9" ry="4" fill="${m.feet}" stroke="${OL}" stroke-width="2.5"/><ellipse cx="14" cy="${S.bot}" rx="9" ry="4" fill="${m.feet}" stroke="${OL}" stroke-width="2.5"/>`;
  }
  // ---- top accessories (in front)
  const t = S.top;
  const a = {
    sprout:`<path d="M0,${t} V${t-14}" stroke="${OL}" stroke-width="${sw}" stroke-linecap="round"/><ellipse cx="-9" cy="${t-17}" rx="10" ry="5.5" transform="rotate(-30 -9 ${t-17})" fill="${F('#3DB36B')}" stroke="${OL}" stroke-width="2.5"/><ellipse cx="9" cy="${t-17}" rx="10" ry="5.5" transform="rotate(30 9 ${t-17})" fill="${F('#3DB36B')}" stroke="${OL}" stroke-width="2.5"/>`,
    leaf:`<ellipse cx="6" cy="${t-8}" rx="12" ry="6" transform="rotate(-25 6 ${t-8})" fill="${F('#3DB36B')}" stroke="${OL}" stroke-width="2.5"/>`,
    antenna:`<path d="M-10,${t+2} Q-16,${t-14} -20,${t-18} M10,${t+2} Q16,${t-14} 20,${t-18}" fill="none" stroke="${OL}" stroke-width="${sw}" stroke-linecap="round"/><circle cx="-20" cy="${t-19}" r="4.5" fill="${OL}"/><circle cx="20" cy="${t-19}" r="4.5" fill="${OL}"/>`,
    moss:`<path d="M-26,${t+4} q6,-12 14,-4 q6,-10 14,-2 q6,-8 12,2" fill="${F('#5CC27A')}" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>`,
    tuft:`<path d="M-4,${t+2} q-6,-14 2,-16 M2,${t+2} q2,-14 10,-12" fill="none" stroke="${OL}" stroke-width="${sw}" stroke-linecap="round"/>`,
    wave:`<path d="M-8,${t+14} q4,-22 22,-18 q-12,4 -8,16Z" fill="${F('#1E8E7C')}" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>`,
    horns:`<path d="M-18,${t+4} L-24,${t-14} L-8,${t+2}Z M18,${t+4} L24,${t-14} L8,${t+2}Z" fill="${F('#FFD36B')}" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>`,
    fluff:[...Array(7)].map((_,i)=>{const ang=(-150+i*20)*Math.PI/180,x=Math.cos(ang)*40,y=t-2+Math.sin(ang)*22;return `<path d="M${(x*0.4).toFixed(1)},${(t+6).toFixed(1)} L${x.toFixed(1)},${y.toFixed(1)}" stroke="${OL}" stroke-width="2"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${F('#FFFFFF')}" stroke="${OL}" stroke-width="2"/>`}).join(''),
  };
  if (a[m.top]) front += a[m.top];
  // ---- face
  if (!sil){
    const ey = m.shape==='wide' ? 8 : (m.shape==='drop' ? 10 : 2);
    if (m.eyes==='dot') front += `<circle cx="-13" cy="${ey}" r="5" fill="${OL}"/><circle cx="13" cy="${ey}" r="5" fill="${OL}"/><circle cx="-11.5" cy="${ey-2}" r="1.6" fill="#fff"/><circle cx="14.5" cy="${ey-2}" r="1.6" fill="#fff"/>`;
    if (m.eyes==='sparkle') front += `<circle cx="-14" cy="${ey}" r="7" fill="${OL}"/><circle cx="14" cy="${ey}" r="7" fill="${OL}"/><circle cx="-11.5" cy="${ey-3}" r="2.6" fill="#fff"/><circle cx="16.5" cy="${ey-3}" r="2.6" fill="#fff"/><circle cx="-16" cy="${ey+3}" r="1.2" fill="#fff"/><circle cx="12" cy="${ey+3}" r="1.2" fill="#fff"/>`;
    if (m.eyes==='sleepy') front += `<path d="M-20,${ey} q6,6 12,0 M8,${ey} q6,6 12,0" fill="none" stroke="${OL}" stroke-width="${sw}" stroke-linecap="round"/>`;
    front += `<ellipse cx="-24" cy="${ey+10}" rx="6" ry="3.5" fill="#FF7A9A" opacity=".55"/><ellipse cx="24" cy="${ey+10}" rx="6" ry="3.5" fill="#FF7A9A" opacity=".55"/>`;
    const my = ey + 11;
    if (m.mouth==='smile') front += `<path d="M-5,${my} q5,5 10,0" fill="none" stroke="${OL}" stroke-width="2.5" stroke-linecap="round"/>`;
    if (m.mouth==='open') front += `<path d="M-6,${my-1} q6,10 12,0Z" fill="#B23A4E" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>`;
    if (m.mouth==='cat') front += `<path d="M-7,${my} q3.5,4 7,0 q3.5,4 7,0" fill="none" stroke="${OL}" stroke-width="2.5" stroke-linecap="round"/>`;
    if (m.mouth==='beak') front += `<path d="M-6,${my-3} L6,${my-3} L0,${my+5}Z" fill="#F2A23A" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>`;
    if (m.mouth==='bill') front += `<ellipse cx="0" cy="${my}" rx="11" ry="5" fill="#F28A2E" stroke="${OL}" stroke-width="2.5"/>`;
  } else {
    front += `<text x="0" y="${m.shape==='wide'?24:16}" text-anchor="middle" font-size="34" font-weight="700" fill="var(--sil-line, #CDBDB6)" font-family="Jua, sans-serif">?</text>`;
  }
  return `<svg viewBox="-66 -66 132 132" role="img" aria-label="${sil?'정체를 모르는 몬스터':m.name}" xmlns="http://www.w3.org/2000/svg">${back}${body}${front}</svg>`;
}

function basketSVG(){
  return `<svg viewBox="-66 -66 132 132" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <path d="M-34,-6 Q0,-62 34,-6" fill="none" stroke="#2A1A22" stroke-width="7" stroke-linecap="round"/>
  <path d="M-34,-6 Q0,-62 34,-6" fill="none" stroke="#D7955B" stroke-width="3" stroke-linecap="round"/>
  <path d="M-46,-6 H46 L36,44 H-36Z" fill="#D7955B" stroke="#2A1A22" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M-42,10 H42 M-39,26 H39 M-20,-6 L-17,44 M0,-6 V44 M20,-6 L17,44" stroke="#9A5E33" stroke-width="2.5"/>
  <path d="M-50,-14 H50 L44,2 H-44Z" fill="#fff" stroke="#2A1A22" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M-40,-14 L-36,2 M-22,-14 L-20,2 M-4,-14 L-4,2 M14,-14 L12,2 M32,-14 L28,2" stroke="#EE4B3B" stroke-width="5"/>
  </svg>`;
}
