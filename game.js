(() => {
  'use strict';

  const VERSION = '1.31';
  const TRACKS = {
    classic: {
      id:'classic',
      name:'クラシック',
      len:100,
      d:`M 132 58
      L 1016 58
      Q 1080 58 1070 120
      Q 1060 176 1000 170
      L 520 170
      Q 450 170 442 245
      Q 438 314 520 330
      L 892 404
      Q 956 418 982 480
      L 1044 590
      Q 1070 640 1010 658
      L 420 658
      Q 336 658 320 582
      L 320 336
      Q 320 266 248 266
      L 134 266
      Q 72 266 70 204
      L 70 120
      Q 70 58 132 58 Z`,
      corners:[
        {pos: 25, limit: 5, name:'A'},
        {pos: 42, limit: 3, name:'B'},
        {pos: 62, limit: 4, name:'C'},
        {pos: 88, limit: 2, name:'D'},
      ],
    },
    burntisland: {
      id:'burntisland',
      name:'Burntisland',
      len:100,
      points:[[560.2, 670], [518.7, 670], [477.2, 670], [435.6, 670], [394.1, 670], [352.5, 670], [311, 670], [269.5, 670], [227.9, 670], [186.4, 670], [144.9, 668.6], [104.3, 660.8], [72.6, 635], [62.1, 595.3], [72.2, 555.3], [89, 517.3], [107.1, 479.9], [137.2, 452.7], [187.7, 454.6], [230.9, 460.1], [273.7, 439.7], [246.9, 404.5], [208.1, 377.9], [175.5, 350.8], [148.4, 316.7], [161, 276.5], [209.9, 267.1], [254.3, 284.4], [293.8, 297.3], [333.2, 310.3], [372.7, 323.3], [412.2, 336.2], [451.9, 348.2], [493.1, 351.9], [532.7, 340.6], [563.7, 313.2], [591.8, 282.6], [619.6, 251.8], [647.5, 221], [675.4, 190.2], [703.9, 160.1], [736.1, 133.9], [772.6, 114.2], [810.8, 97.9], [849.5, 82.7], [888.7, 69.1], [928.4, 56.7], [969.3, 50], [1009.8, 57.6], [1035.9, 88.3], [1037.9, 129.2], [1019.2, 165.3], [982.7, 184.5], [943.1, 196.8], [903.4, 209.1], [863.7, 221.3], [824, 233.6], [784.4, 246.2], [745.8, 261.4], [713.5, 287], [690.6, 321.6], [670.1, 357.7], [649.4, 393.7], [628.9, 429.8], [608.2, 465.8], [587.5, 501.8], [566.8, 537.9], [543.2, 574.5], [564.4, 613.3], [604.8, 600.8], [635, 576.2], [664, 546.5], [693.3, 517], [722.4, 487.4], [751.6, 457.8], [780.7, 428.2], [810.1, 398.9], [839.1, 369.1], [868.5, 339.8], [897.8, 310.4], [932.3, 288.5], [973.4, 287.4], [1008.5, 307.5], [1021.2, 346.5], [1018.1, 387.8], [1009.6, 428.4], [1001, 469], [992.4, 509.7], [984.1, 550.4], [975.4, 591], [960.2, 629.4], [930.1, 657.3], [890.2, 668], [848.8, 670], [807.3, 670], [765.7, 670], [724.2, 670], [682.6, 670], [641.1, 670], [599.6, 670]],
      corners:[
        {pos:20, limit:2, name:'①'},
        {pos:26, limit:3, name:'②'},
        {pos:48, limit:4, name:'③'},
        {pos:68, limit:3, name:'④'},
        {pos:82, limit:3, name:'⑤'},
      ],
    },
    jarama: {
      id:'jarama',
      name:'Jarama',
      len:100,
      points:[[544.2, 669.3], [588.4, 670], [632.6, 669.3], [676.8, 669.3], [721, 669.3], [765.2, 669.3], [809.4, 669.3], [853.6, 670], [897.8, 669.3], [941.8, 666.7], [982.3, 651.2], [998.6, 611], [993.6, 567.5], [968.4, 531.8], [933.4, 504.8], [897.8, 478.6], [862.1, 452.4], [826.6, 426.2], [792.5, 398.1], [776.4, 357.7], [783.1, 314.6], [805.5, 276.5], [829.6, 239.4], [862.6, 210.6], [904.9, 198.8], [948.7, 203.4], [990.5, 204.3], [1029.2, 178.1], [1023, 134.7], [994, 103], [954.7, 82.9], [915.2, 62.9], [873.2, 50], [829.4, 51.8], [790.3, 71.5], [763.9, 106.7], [741.7, 144.9], [719.8, 183.4], [698.5, 222.1], [677.4, 260.9], [656.3, 299.8], [635.4, 338.7], [614.5, 377.7], [593.7, 416.7], [572.9, 455.7], [552, 494.7], [514.7, 524.7], [478.7, 497.5], [493.5, 451.6], [503.7, 408.6], [513.8, 365.5], [523.8, 322.5], [532.8, 279.2], [533.6, 235.2], [519, 193.9], [491.4, 159.4], [462.9, 125.6], [433.4, 92.6], [395.6, 70.7], [351.9, 66.5], [308.7, 75.5], [267.1, 90.7], [225.6, 105.8], [184.1, 121], [142.9, 137.1], [106.3, 161.5], [81.3, 197.6], [76.4, 241.1], [92.8, 281.2], [132.7, 297.8], [176.2, 291.9], [217.8, 276.9], [259.4, 261.7], [300.8, 246.3], [342.7, 232.3], [386.4, 231.5], [423.4, 253.9], [439.5, 294.4], [437.7, 338.3], [424.2, 380.3], [408.1, 421.5], [390.1, 461.8], [366.6, 499.2], [336, 530.9], [296.5, 550.3], [254, 562.6], [212.3, 572.6], [165.4, 578.2], [124.5, 585.7], [91.5, 615.5], [107.6, 655.3], [146.4, 669], [190.6, 670], [234.8, 669.3], [279, 669.3], [323.2, 669.3], [367.4, 669.3], [411.6, 670], [455.8, 669.5], [500, 669.3]],
      corners:[
        {pos:90, limit:3, name:'①'},
        {pos:76, limit:3, name:'②'},
        {pos:68, limit:3, name:'③'},
        {pos:47, limit:2, name:'④'},
        {pos:27, limit:4, name:'⑤'},
        {pos:11, limit:5, name:'⑥'},
      ],
    },
    jerez: {
      id:'jerez',
      name:'Jerez',
      len:100,
      points:[[544.3, 670], [507.7, 670], [471.1, 670], [434.5, 670], [397.9, 670], [361.3, 670], [324.7, 670], [288.1, 670], [251.5, 670], [214.9, 670], [178.3, 670], [138.2, 669.4], [101.1, 658.1], [84.3, 625.7], [83, 586.7], [83.7, 550.2], [84.4, 513.6], [84.4, 477], [84.4, 440.4], [84.4, 403.8], [84.4, 367.2], [84.4, 330.6], [84.4, 294], [84.4, 257.4], [84.4, 220.8], [84.4, 184.2], [84.9, 147.6], [88.1, 111.2], [101, 77.3], [130, 55.9], [166, 50], [201.7, 57.4], [228.4, 81.4], [237.7, 116.6], [240, 153], [244.6, 189.3], [263.5, 219.7], [298.1, 230], [334.6, 231.7], [371.2, 231.7], [407.8, 231.7], [444.4, 231.7], [481, 231.7], [517.6, 232.6], [553.8, 237.3], [584.2, 256.6], [599.2, 289.6], [608.4, 325.1], [617.3, 360.6], [625.5, 396.2], [634.4, 436.1], [669.9, 457.4], [702.4, 430.1], [728.2, 395.4], [749.9, 364.1], [772.6, 332.8], [794.4, 302.4], [818, 273], [838.6, 244.4], [860.3, 213.9], [883.5, 186.5], [921.8, 169.8], [961.4, 183.8], [978.5, 220.6], [963.2, 257.8], [940.5, 288.1], [916.6, 314.6], [894.8, 343.9], [873.1, 373.4], [851.1, 402.7], [829.2, 431.9], [807.3, 461.3], [783.7, 490.7], [759.9, 524.1], [765.6, 566.4], [806.1, 572.6], [836.5, 545.7], [859.7, 517.3], [883.7, 488.1], [906.3, 460], [931.3, 431.6], [968.3, 413.4], [1010.4, 424.5], [1022.6, 462.3], [1015.3, 498.6], [1006.1, 534.1], [996.7, 569.4], [987.2, 604.8], [973.2, 638.5], [946, 662.1], [910.3, 669.3], [873.7, 670], [837.1, 670], [800.5, 670], [763.9, 670], [727.3, 670], [690.7, 670], [654.1, 670], [617.5, 670], [580.9, 670]],
      corners:[
        {pos:31, limit:5, name:'①'},
        {pos:51, limit:2, name:'②'},
        {pos:62, limit:2, name:'③'},
        {pos:74, limit:2, name:'④'},
        {pos:89, limit:4, name:'⑤'},
      ],
    },
  };
  const COLORS = ['#2a82ff','#ff514c','#f2cb47','#31c160','#a96df2','#d0d7e4','#ff8a2a','#20c7c7','#f26db2','#8d9b2f'];
  const NAMES = ['プレイヤー1','プレイヤー2','プレイヤー3','プレイヤー4','プレイヤー5','プレイヤー6','プレイヤー7','プレイヤー8','プレイヤー9','プレイヤー10'];
  const SLOT_OFFSETS = [-7, 7];

  const state = {
    started:false, round:0, laps:2, cpuCount:5, players:[], logs:[],
    phase:'idle', selected:[], discardSelected:[], humanGearChoice:1,
    resolving:false, points:[], winnerOrder:[], standingsOrderIds:[], playDisplayCards:[], playDisplayPlayerId:null,
    trackId:'classic', trackLen:TRACKS.classic.len, trackCorners:[...TRACKS.classic.corners], trackName:TRACKS.classic.name,
    editor:{open:false,enabled:true,showNumbers:true,showCenters:false,showLine:true,follow:true,followRange:2,selected:[],dirty:false,undo:[],redo:[],defaultPoints:[],drag:null}
  };

  const $ = id => document.getElementById(id);
  function currentTrack(){ return TRACKS[state.trackId] || TRACKS.classic; }
  function trackLen(){ return state.trackLen || currentTrack().len; }
  function trackCorners(){ return state.trackCorners || currentTrack().corners || []; }
  function localPlayer(){
    if(window.HeatOnlineHooks && typeof window.HeatOnlineHooks.getLocalPlayer==='function'){
      const p=window.HeatOnlineHooks.getLocalPlayer(state.players);
      if(p) return p;
    }
    return state.players.find(p=>p.human && !p.cpu) || state.players[0];
  }
  function isLocalPlayer(p){
    if(!p) return false;
    if(window.HeatOnlineHooks && typeof window.HeatOnlineHooks.isLocalPlayer==='function') return !!window.HeatOnlineHooks.isLocalPlayer(p);
    return p===state.players[0];
  }
  function isCpu(p){ return !!(p && p.cpu); }
  function onlineHooks(){ return window.HeatOnlineHooks || null; }

  function chaikinClosed(points, iterations=3){
    let pts=points.map(([x,y])=>({x,y}));
    for(let it=0; it<iterations; it++){
      const out=[];
      for(let i=0;i<pts.length;i++){
        const a=pts[i], b=pts[(i+1)%pts.length];
        out.push({x:a.x*0.75+b.x*0.25, y:a.y*0.75+b.y*0.25});
        out.push({x:a.x*0.25+b.x*0.75, y:a.y*0.25+b.y*0.75});
      }
      pts=out;
    }
    return pts;
  }
  function resampleClosed(points, count){
    const pts=points;
    const segs=[];
    let total=0;
    for(let i=0;i<pts.length;i++){
      const a=pts[i], b=pts[(i+1)%pts.length];
      const len=Math.hypot(b.x-a.x,b.y-a.y);
      segs.push({a,b,len,start:total});
      total+=len;
    }
    const out=[];
    for(let i=0;i<count;i++){
      const t=(i/count)*total;
      const seg=segs.findLast ? segs.findLast(s=>s.start<=t) : [...segs].reverse().find(s=>s.start<=t);
      const local=Math.max(0, Math.min(seg.len, t-seg.start));
      const r=seg.len ? local/seg.len : 0;
      out.push({x:seg.a.x+(seg.b.x-seg.a.x)*r, y:seg.a.y+(seg.b.y-seg.a.y)*r});
    }
    return out;
  }
  function buildPointsFromAnchors(anchors, count){
    const smooth=chaikinClosed(anchors, 3);
    return resampleClosed(smooth, count);
  }
  const ui = {
    svg:$('trackSvg'), spaces:$('spaceLayer'), corners:$('cornerLayer'), cars:$('carLayer'), scenery:$('sceneryLayer'),
    hand:$('hand'), standings:$('standings'), phaseTitle:$('phaseTitle'), phaseHelp:$('phaseHelp'),
    gearControls:$('gearControls'), actionControls:$('actionControls'),
    round:$('roundText'), lap:$('lapText'), leader:$('leaderText'),
    gear:$('gearText'), heat:$('heatText'), handCount:$('handCountText'), deckCount:$('deckCountText'), discardCount:$('discardCountText'),
    heatPips:$('heatPips'), handPlayerLabel:$('handPlayerLabel'), logList:$('logList'), discardTopCard:$('discardTopCard'), discardFaceContent:$('discardFaceContent'), glossaryBtn:$('glossaryBtn'), playCards:$('playCards'),
    modal:$('modal'), modalTitle:$('modalTitle'), modalBody:$('modalBody'), msg:$('raceMessage'),
    trackEditBtn:$('trackEditBtn'), editorPanel:$('trackEditorPanel'), editorCloseBtn:$('editorCloseBtn'), editorEnabled:$('editorEnabled'),
    editorShowNumbers:$('editorShowNumbers'), editorShowCenters:$('editorShowCenters'), editorShowLine:$('editorShowLine'), editorFollow:$('editorFollow'),
    editorFollowRange:$('editorFollowRange'), editorSelectedText:$('editorSelectedText'), editorDirtyText:$('editorDirtyText'), editorTrackName:$('editorTrackName'),
    editorUndoBtn:$('editorUndoBtn'), editorRedoBtn:$('editorRedoBtn'), editorResetBtn:$('editorResetBtn'), editorSaveBtn:$('editorSaveBtn'), editorCopyBtn:$('editorCopyBtn')
  };

  function log(msg){
    state.logs.push(`R${Math.max(1,state.round)}  ${msg}`);
    if(state.logs.length>250) state.logs.shift();
    renderLog();
  }
  function rand(n){ return Math.floor(Math.random()*n); }
  function shuffle(a){
    const b=[...a];
    for(let i=b.length-1;i>0;i--){const j=rand(i+1); [b[i],b[j]]=[b[j],b[i]];}
    return b;
  }
  function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
  const messageQueue=[];
  let messageRunning=false;
  function showMessage(text, ms=2000){
    messageQueue.push({text,ms:2000});
    processMessageQueue();
  }
  async function processMessageQueue(){
    if(messageRunning) return;
    messageRunning=true;
    while(messageQueue.length){
      const item=messageQueue.shift();
      ui.msg.textContent=item.text;
      ui.msg.classList.add('show');
      await sleep(item.ms);
      ui.msg.classList.remove('show');
      await sleep(120);
    }
    messageRunning=false;
  }

  function basicDeck(){
    const cards=[]; let id=0;
    for(let v=1;v<=4;v++) for(let n=0;n<3;n++) cards.push({id:`s${id++}`,type:'speed',value:v,basic:true});
    cards.push({id:`s${id++}`,type:'speed',value:0,basic:false});
    cards.push({id:`s${id++}`,type:'speed',value:5,basic:false});
    for(let n=0;n<3;n++) cards.push({id:`t${id++}`,type:'stress',value:null,basic:false});
    cards.push({id:`h${id++}`,type:'heat',value:null,basic:false});
    return shuffle(cards);
  }

  function makePlayer(i,opts={}){
    const deck=basicDeck();
    const cpu = opts.cpu !== undefined ? !!opts.cpu : i!==0;
    const p={
      id:i,
      name:opts.name || NAMES[i] || `プレイヤー${i+1}`,
      color:COLORS[i % COLORS.length],
      human:!cpu,
      cpu,
      onlinePlayerId:opts.onlinePlayerId || null,
      gear:1,
      engineHeat:6,
      deck, discard:[], hand:[], play:[],
      progress:-Math.floor(i/2)-1,
      speedThisRound:0,
      startProgress:0,
      boosted:false,
      adrenaline:false,
      finished:false,
      finishProgress:null,
      finishRound:null,
      finishRank:null,
      spin:false,
      stressResolvedCards:[],
      boostResolvedCards:[],
      slotIndex:0,
      slotSpace:null,
    };
    drawTo(p,7);
    return p;
  }

  function reshuffleIfNeeded(p){
    if(p.deck.length===0 && p.discard.length){
      p.deck=shuffle(p.discard); p.discard=[];
      log(`${p.name}: 捨て札をシャッフル`);
    }
  }
  function drawOne(p){ reshuffleIfNeeded(p); return p.deck.shift() || null; }
  function drawTo(p,n){ while(p.hand.length<n){ const c=drawOne(p); if(!c)break; p.hand.push(c); } }
  function payHeat(p,n,reason){
    const pay=Math.min(n,p.engineHeat);
    for(let i=0;i<pay;i++) p.discard.push({id:`heat_${Date.now()}_${Math.random()}`,type:'heat',value:null,basic:false});
    p.engineHeat-=pay;
    if(pay) log(`${p.name}: HEAT ${pay} 使用${reason?` (${reason})`:''}`);
    return pay===n;
  }
  function coolHeat(p,n){
    let cooled=0;
    for(let i=p.hand.length-1;i>=0 && cooled<n;i--){
      if(p.hand[i].type==='heat'){
        p.hand.splice(i,1); p.engineHeat++; cooled++;
      }
    }
    if(cooled) log(`${p.name}: クールダウン ${cooled}`);
    return cooled;
  }

  async function applyCooldown(p,n,source='クールダウン'){
    const cooled=coolHeat(p,n);
    if(cooled>0){
      showMessage(`${p.name}
${source}
HEAT ${cooled}枚 → エンジン`,2000);
      await sleep(2000);
    }
    return cooled;
  }

  function editorStorageKey(trackId=state.trackId){ return `heat_track_points_v1:${trackId}`; }
  function clonePoints(points=state.points){ return points.map(p=>({x:+p.x,y:+p.y})); }
  function savedEditorPoints(){
    try{
      const raw=localStorage.getItem(editorStorageKey());
      if(!raw) return null;
      const data=JSON.parse(raw);
      if(!Array.isArray(data) || data.length!==trackLen()) return null;
      if(!data.every(p=>Array.isArray(p) && p.length>=2 && Number.isFinite(+p[0]) && Number.isFinite(+p[1]))) return null;
      return data.map(p=>({x:+p[0],y:+p[1]}));
    }catch(e){ return null; }
  }
  function updateTrackPathFromPoints(){
    if(!state.points.length) return;
    const d=closedCatmullRomPath(state.points);
    $('trackWide').setAttribute('d',d);
    $('trackInner').setAttribute('d',d);
    $('trackCenter').setAttribute('d',d);
  }
  function renderTrackGeometry(){
    updateTrackPathFromPoints();
    buildSpaces();
    buildCorners();
    renderCars();
    renderMovePreview();
    updateEditorUi();
  }
  function markEditorDirty(value=true){
    state.editor.dirty=value;
    updateEditorUi();
  }
  function pushEditorHistory(){
    state.editor.undo.push(clonePoints());
    if(state.editor.undo.length>60) state.editor.undo.shift();
    state.editor.redo=[];
    updateEditorUi();
  }
  function editorUndo(){
    const prev=state.editor.undo.pop();
    if(!prev) return;
    state.editor.redo.push(clonePoints());
    state.points=clonePoints(prev);
    markEditorDirty(true);
    renderTrackGeometry();
  }
  function editorRedo(){
    const next=state.editor.redo.pop();
    if(!next) return;
    state.editor.undo.push(clonePoints());
    state.points=clonePoints(next);
    markEditorDirty(true);
    renderTrackGeometry();
  }
  function saveEditorPoints(){
    try{
      const data=state.points.map(p=>[+p.x.toFixed(1),+p.y.toFixed(1)]);
      localStorage.setItem(editorStorageKey(),JSON.stringify(data));
      markEditorDirty(false);
      showMessage(`${state.trackName}\nコース座標を保存`,2000);
    }catch(e){
      showMessage('コース座標の保存に失敗',2000);
    }
  }
  function resetEditorPoints(){
    if(!state.editor.defaultPoints.length) return;
    pushEditorHistory();
    state.points=clonePoints(state.editor.defaultPoints);
    state.editor.selected=[];
    markEditorDirty(true);
    renderTrackGeometry();
  }
  async function copyEditorPoints(){
    const text=`points:${JSON.stringify(state.points.map(p=>[+p.x.toFixed(1),+p.y.toFixed(1)]))}`;
    try{
      await navigator.clipboard.writeText(text);
      showMessage('座標データをコピー',2000);
    }catch(e){
      modal(`${state.trackName} 座標データ`,`<textarea class="editor-export-text" readonly>${escapeHtml(text)}</textarea><div class="notice">Ctrl+A → Ctrl+C でコピーできます。</div>`);
      const ta=ui.modalBody.querySelector('textarea'); if(ta){ta.focus();ta.select();}
    }
  }
  function updateEditorUi(){
    const ed=state.editor;
    const board=ui.svg ? ui.svg.closest('.board-wrap') : null;
    if(ui.editorPanel) ui.editorPanel.classList.toggle('hidden',!ed.open);
    if(ui.trackEditBtn) ui.trackEditBtn.classList.toggle('editor-active',ed.open && ed.enabled);
    if(board){
      board.classList.toggle('editor-mode',ed.open && ed.enabled);
      board.classList.toggle('editor-hide-line',ed.open && !ed.showLine);
    }
    if(ui.editorEnabled) ui.editorEnabled.checked=ed.enabled;
    if(ui.editorShowNumbers) ui.editorShowNumbers.checked=ed.showNumbers;
    if(ui.editorShowCenters) ui.editorShowCenters.checked=ed.showCenters;
    if(ui.editorShowLine) ui.editorShowLine.checked=ed.showLine;
    if(ui.editorFollow) ui.editorFollow.checked=ed.follow;
    if(ui.editorFollowRange) ui.editorFollowRange.value=String(ed.followRange);
    if(ui.editorTrackName) ui.editorTrackName.textContent=`${state.trackName} / ${trackLen()}マス`;
    if(ui.editorSelectedText) ui.editorSelectedText.textContent=ed.selected.length?`選択: ${ed.selected.map(i=>i+1).join(', ')}`:'選択: なし';
    if(ui.editorDirtyText){ ui.editorDirtyText.textContent=ed.dirty?'未保存':'保存済み'; ui.editorDirtyText.className=ed.dirty?'editor-dirty':'editor-clean'; }
    if(ui.editorUndoBtn) ui.editorUndoBtn.disabled=!ed.undo.length;
    if(ui.editorRedoBtn) ui.editorRedoBtn.disabled=!ed.redo.length;
  }
  function toggleEditorPanel(force){
    state.editor.open = typeof force==='boolean' ? force : !state.editor.open;
    updateEditorUi();
    buildSpaces();
  }
  function selectEditorPoint(idx, additive=false){
    if(!Number.isInteger(idx) || idx<0 || idx>=state.points.length) return;
    if(additive){
      state.editor.selected = state.editor.selected.includes(idx) ? state.editor.selected.filter(i=>i!==idx) : [...state.editor.selected,idx];
    }else if(!state.editor.selected.includes(idx)){
      state.editor.selected=[idx];
    }
    buildSpaces();
    updateEditorUi();
  }
  function svgPointFromEvent(e){
    const pt=ui.svg.createSVGPoint(); pt.x=e.clientX; pt.y=e.clientY;
    const ctm=ui.svg.getScreenCTM();
    return ctm ? pt.matrixTransform(ctm.inverse()) : {x:e.clientX,y:e.clientY};
  }
  function editorMoveWeights(primary){
    const ed=state.editor;
    const map=new Map();
    if(ed.selected.length>1){ ed.selected.forEach(i=>map.set(i,1)); return map; }
    map.set(primary,1);
    if(!ed.follow) return map;
    const r=Math.max(1,+ed.followRange||2), n=trackLen();
    for(let d=1;d<=r;d++){
      const w=(r+1-d)/(r+1);
      map.set((primary-d+n)%n,Math.max(map.get((primary-d+n)%n)||0,w));
      map.set((primary+d)%n,Math.max(map.get((primary+d)%n)||0,w));
    }
    return map;
  }
  function startEditorDrag(e,idx){
    if(!state.editor.open || !state.editor.enabled || e.button!==0) return;
    e.preventDefault(); e.stopPropagation();
    const additive=e.ctrlKey||e.metaKey;
    selectEditorPoint(idx,additive);
    if(additive) return;
    pushEditorHistory();
    const start=svgPointFromEvent(e);
    state.editor.drag={pointerId:e.pointerId,primary:idx,start,base:clonePoints(),weights:editorMoveWeights(idx)};
    try{ui.svg.setPointerCapture(e.pointerId);}catch(err){}
  }
  function moveEditorDrag(e){
    const drag=state.editor.drag;
    if(!drag || drag.pointerId!==e.pointerId) return;
    e.preventDefault();
    const p=svgPointFromEvent(e), dx=p.x-drag.start.x, dy=p.y-drag.start.y;
    state.points=drag.base.map((pt,i)=>{
      const w=drag.weights.get(i)||0;
      return w?{x:pt.x+dx*w,y:pt.y+dy*w}:{x:pt.x,y:pt.y};
    });
    state.editor.dirty=true;
    renderTrackGeometry();
  }
  function endEditorDrag(e){
    const drag=state.editor.drag;
    if(!drag || drag.pointerId!==e.pointerId) return;
    state.editor.drag=null;
    try{ui.svg.releasePointerCapture(e.pointerId);}catch(err){}
    markEditorDirty(true);
  }
  function nudgeEditorSelection(dx,dy){
    if(!state.editor.open || !state.editor.enabled || !state.editor.selected.length) return;
    pushEditorHistory();
    const selected=new Set(state.editor.selected);
    state.points=state.points.map((p,i)=>selected.has(i)?{x:p.x+dx,y:p.y+dy}:{x:p.x,y:p.y});
    markEditorDirty(true);
    renderTrackGeometry();
  }

  function buildTrack(){
    const track=currentTrack();
    state.trackLen=track.len;
    state.trackCorners=[...(track.corners||[])];
    state.trackName=track.name;

    if(track.points && track.points.length){
      state.points=track.points.map(([x,y])=>({x,y}));
      const d=closedCatmullRomPath(state.points);
      $('trackWide').setAttribute('d',d);
      $('trackInner').setAttribute('d',d);
      $('trackCenter').setAttribute('d',d);
    }else if(track.anchors && track.anchors.length){
      state.points=buildPointsFromAnchors(track.anchors, trackLen());
      const d=closedCatmullRomPath(state.points);
      $('trackWide').setAttribute('d',d);
      $('trackInner').setAttribute('d',d);
      $('trackCenter').setAttribute('d',d);
    }else{
      const d=track.d;
      $('trackWide').setAttribute('d',d);
      $('trackInner').setAttribute('d',d);
      $('trackCenter').setAttribute('d',d);
      const samplePath=svgEl('path',{d,fill:'none',stroke:'none'});
      ui.svg.appendChild(samplePath);
      const total=samplePath.getTotalLength();
      const pts=[];
      for(let i=0;i<trackLen();i++){
        const len=(i/trackLen())*total;
        const p=samplePath.getPointAtLength(len);
        pts.push({x:p.x,y:p.y});
      }
      samplePath.remove();
      state.points=pts;
    }

    state.editor.defaultPoints=clonePoints();
    const edited=savedEditorPoints();
    if(edited){
      state.points=edited;
      updateTrackPathFromPoints();
    }
    state.editor.selected=[]; state.editor.undo=[]; state.editor.redo=[]; state.editor.dirty=false; state.editor.drag=null;
    buildScenery();
    buildSpaces();
    buildCorners();
    updateEditorUi();
    if(state.started) render();
  }

  function buildScenery(){
    ui.scenery.innerHTML='';
  }

  function buildSpaces(){
    ui.spaces.innerHTML='';

    for(let i=0;i<state.points.length;i++){
      const p=state.points[i];
      const angle=tangentAngle(i);
      const classes=['space-cell-group'];
      if(state.editor.open && state.editor.enabled) classes.push('editor-selectable');
      if(state.editor.selected.includes(i)) classes.push('editor-selected');
      const g=svgEl('g',{class:classes.join(' '),'data-space-index':i,transform:`translate(${p.x} ${p.y}) rotate(${angle})`});
      g.appendChild(svgEl('rect',{x:-15,y:-15,width:30,height:30,rx:2,class:'space-cell'}));
      if(state.editor.open && state.editor.showCenters) g.appendChild(svgEl('circle',{cx:0,cy:0,r:2.8,class:'space-editor-center'}));
      if(state.editor.open && state.editor.showNumbers){
        const tx=svgEl('text',{x:0,y:0,class:'space-editor-number',transform:`rotate(${-angle})`});
        tx.textContent=String(i+1); g.appendChild(tx);
      }
      ui.spaces.appendChild(g);
    }

    const s0=state.points[0], n0=normalAt(0);
    ui.spaces.appendChild(svgEl('line',{
      x1:s0.x-n0.x*16,y1:s0.y-n0.y*16,
      x2:s0.x+n0.x*16,y2:s0.y+n0.y*16,
      class:'start-band-white'
    }));
    ui.spaces.appendChild(svgEl('line',{
      x1:s0.x-n0.x*16,y1:s0.y-n0.y*16,
      x2:s0.x+n0.x*16,y2:s0.y+n0.y*16,
      class:'start-band-black'
    }));
  }

  function buildCorners(){
    ui.corners.innerHTML='';
    trackCorners().forEach(c=>{
      const prev=state.points[(c.pos-1+trackLen())%trackLen()];
      const next=state.points[c.pos%trackLen()];
      const mx=(prev.x+next.x)/2, my=(prev.y+next.y)/2;
      const dx=next.x-prev.x, dy=next.y-prev.y, len=Math.hypot(dx,dy)||1;
      const nx=-dy/len, ny=dx/len;
      ui.corners.appendChild(svgEl('line',{x1:mx-nx*16,y1:my-ny*16,x2:mx+nx*16,y2:my+ny*16,class:'corner-line'}));
      ui.corners.appendChild(svgEl('line',{x1:mx-nx*16,y1:my-ny*16,x2:mx+nx*16,y2:my+ny*16,class:'corner-line-dark'}));
      const bx=mx+nx*34, by=my+ny*34;
      ui.corners.appendChild(svgEl('circle',{cx:bx,cy:by,r:14,class:'corner-badge'}));
      const tx=svgEl('text',{x:bx,y:by+1,class:'corner-text'});
      tx.textContent=c.limit;
      ui.corners.appendChild(tx);
    });
  }

  function closedCatmullRomPath(points){
    const n=points.length; let d=`M ${points[0].x} ${points[0].y}`;
    for(let i=0;i<n;i++){
      const p0=points[(i-1+n)%n], p1=points[i], p2=points[(i+1)%n], p3=points[(i+2)%n];
      const c1={x:p1.x+(p2.x-p0.x)/6,y:p1.y+(p2.y-p0.y)/6};
      const c2={x:p2.x-(p3.x-p1.x)/6,y:p2.y-(p3.y-p1.y)/6};
      d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
    }
    return d+' Z';
  }
  function svgEl(tag,attrs){ const e=document.createElementNS('http://www.w3.org/2000/svg',tag); for(const[k,v] of Object.entries(attrs)) e.setAttribute(k,v); return e; }
  function normalAt(i){
    const a=state.points[(i-1+trackLen())%trackLen()], b=state.points[(i+1)%trackLen()];
    const dx=b.x-a.x, dy=b.y-a.y, len=Math.hypot(dx,dy)||1;
    return {x:-dy/len,y:dx/len};
  }
  function tangentAngle(i){
    const a=state.points[(i-1+trackLen())%trackLen()], b=state.points[(i+1)%trackLen()];
    return Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;
  }
  function pointForProgress(progress,laneOffset=0){
    const idx=((Math.floor(progress)%trackLen())+trackLen())%trackLen();
    const p=state.points[idx], n=normalAt(idx);
    return {x:p.x+n.x*laneOffset, y:p.y+n.y*laneOffset, angle:tangentAngle(idx)};
  }

  function currentSpaceOf(p){
    return Math.floor(p.progress);
  }

  function playersInSpace(space, excludeId=null){
    return state.players.filter(p => !p.finished && p.id!==excludeId && p.slotSpace===space);
  }

  function assignSlotForPlayer(p){
    if(p.finished) return;
    const newSpace=currentSpaceOf(p);
    if(p.slotSpace===newSpace && (p.slotIndex===0 || p.slotIndex===1)) return;
    const used=new Set(playersInSpace(newSpace,p.id).map(o=>o.slotIndex).filter(v=>v===0||v===1));
    p.slotIndex = used.has(1) ? 0 : 1;
    p.slotSpace = newSpace;
  }

  function syncAllSlots(){
    const spaces=[...new Set(state.players.filter(p=>!p.finished).map(p=>currentSpaceOf(p)))].sort((a,b)=>a-b);
    for(const space of spaces){
      const list=state.players.filter(p=>!p.finished && currentSpaceOf(p)===space).sort((a,b)=>a.id-b.id);
      list.forEach((p,idx)=>{
        p.slotSpace=space;
        p.slotIndex=idx===0 ? 1 : 0;
      });
    }
  }

  function movePlayerTo(p,newProgress){
    p.progress=newProgress;
    assignSlotForPlayer(p);
  }

  function orderPlayers(includeFinished=true){
    return [...state.players].filter(p=>includeFinished||!p.finished).sort((a,b)=>b.progress-a.progress || (b.slotIndex??0)-(a.slotIndex??0) || a.id-b.id);
  }
  function standingsOrder(){
    if(state.standingsOrderIds && state.standingsOrderIds.length){
      const ordered=state.standingsOrderIds
        .map(id=>state.players.find(p=>p.id===id))
        .filter(Boolean);
      const missing=state.players.filter(p=>!ordered.includes(p));
      return [...ordered,...missing];
    }
    const finished = state.winnerOrder
      .map(id=>state.players.find(p=>p.id===id))
      .filter(Boolean);
    const active = orderPlayers(false);
    return [...finished, ...active];
  }

  function updateStandingsOrderForRound(){
    const finished = state.winnerOrder
      .map(id=>state.players.find(p=>p.id===id))
      .filter(Boolean);
    const active = orderPlayers(false);
    state.standingsOrderIds=[...finished,...active].map(p=>p.id);
  }
  function carsAtProgress(progress,excludeId=null){
    return state.players.filter(p=>p.id!==excludeId && !p.finished && Math.floor(p.progress)===Math.floor(progress));
  }
  function settleDestination(p,target){
    let t=Math.floor(target);
    while(carsAtProgress(t,p.id).length>=2) t--;
    return t;
  }

  function renderCars(){
    ui.cars.innerHTML='';
    const sorted=[...state.players].filter(p=>!p.finished).sort((a,b)=>a.progress-b.progress||a.slotIndex-b.slotIndex||a.id-b.id);
    for(const p of sorted){
      const slot = (p.slotIndex===1) ? 1 : 0;
      const pt=pointForProgress(p.progress,SLOT_OFFSETS[slot]);
      const g=svgEl('g',{class:'car-token',transform:`translate(${pt.x} ${pt.y}) rotate(${pt.angle + 90})`,filter:'url(#carShadow)'});
      if(isLocalPlayer(p)) g.appendChild(svgEl('rect',{x:-8.5,y:-14,width:17,height:28,rx:5,fill:'none',stroke:'#ffffff', 'stroke-width':2}));
      g.appendChild(svgEl('rect',{x:-6.5,y:-12,width:13,height:24,rx:4,fill:p.color,stroke:'#ffffff','stroke-width':1.2}));
      g.appendChild(svgEl('rect',{x:-3,y:-6,width:6,height:12,rx:2,fill:'rgba(255,255,255,.22)'}));
      g.appendChild(svgEl('circle',{cx:-4.5,cy:-9,r:1.8,fill:'#1a1a1a'}));
      g.appendChild(svgEl('circle',{cx:4.5,cy:-9,r:1.8,fill:'#1a1a1a'}));
      g.appendChild(svgEl('circle',{cx:-4.5,cy:9,r:1.8,fill:'#1a1a1a'}));
      g.appendChild(svgEl('circle',{cx:4.5,cy:9,r:1.8,fill:'#1a1a1a'}));
      ui.cars.appendChild(g);
    }
  }

  function renderStandings(){
    const ord=standingsOrder();
    ui.standings.innerHTML=ord.map((p,i)=>`<div class="standing-row"><div class="standing-pos">${p.finished && p.finishRank ? p.finishRank : i+1}</div><div class="standing-name"><span class="mini-car" style="background:${p.color}"></span>${p.name}${isLocalPlayer(p)?' ★':''}</div><div class="standing-meta">${p.finished?`FINISH / ${p.finishRank}位`:`L${Math.max(1,Math.floor(Math.max(0,p.progress)/trackLen())+1)} / G${p.gear}`}<br>所持HEAT ${p.engineHeat}</div></div>`).join('');
  }

  function renderHeatPips(human){
    ui.heatPips.innerHTML='';
    for(let i=0;i<7;i++){
      const div=document.createElement('div');
      div.className='heat-pip' + (i<human.engineHeat ? ' on' : '');
      ui.heatPips.appendChild(div);
    }
  }

  function renderLog(){
    if(!ui.logList) return;
    const logs=state.logs.slice(-12).reverse().map((entry,idx)=>{
      const parts=entry.split('  ');
      const turn=parts[0] || '';
      const text=parts.slice(1).join('  ') || entry;
      return `<div class="log-row ${idx===0?'is-current':''}"><div class="log-turn">${escapeHtml(turn)}</div><div class="log-text">${escapeHtml(text)}</div></div>`;
    }).join('');
    ui.logList.innerHTML=logs || '<div class="log-row"><div class="log-turn">-</div><div class="log-text">まだログはありません。</div></div>';
    ui.logList.scrollTop=0;
  }

  function selectedKnownSpeed(){
    const p=localPlayer();
    if(!p || !['shift','selectCards'].includes(state.phase)) return 0;
    return state.selected.reduce((sum,i)=>{
      const c=p.hand[i];
      return sum + (c && c.type==='speed' ? Number(c.value)||0 : 0);
    },0);
  }

  function renderMovePreview(){
    ui.spaces.querySelectorAll('.space-cell-group').forEach(g=>g.classList.remove('space-preview'));
    if(!state.started || !['shift','selectCards'].includes(state.phase)) return;
    const p=localPlayer();
    const distance=selectedKnownSpeed();
    if(!p || distance<=0) return;
    const target=Math.floor(p.progress + distance);
    const idx=((target%trackLen())+trackLen())%trackLen();
    const g=ui.spaces.querySelector(`[data-space-index="${idx}"]`);
    if(g) g.classList.add('space-preview');
  }

  function render(){
    if(!state.started){ renderHand(); renderPlayArea(); renderMovePreview(); renderLog(); if(onlineHooks()?.onRender) onlineHooks().onRender(); return; }
    renderCars();
    renderStandings();
    const human=localPlayer();
    if(ui.round) ui.round.textContent=state.round;
    if(ui.lap) ui.lap.textContent=`${Math.min(state.laps,Math.max(1,Math.floor(Math.max(0,human.progress)/trackLen())+1))}/${state.laps}`;
    if(ui.leader) ui.leader.textContent=orderPlayers()[0]?.name||'-';
    if(ui.gear) ui.gear.textContent=human.gear;
    ui.heat.textContent=human.engineHeat;
    if(ui.handCount) ui.handCount.textContent=human.hand.length;
    ui.deckCount.textContent=human.deck.length;
    ui.discardCount.textContent=human.discard.length;
    renderDiscardTop(human);
    renderPlayArea();
    if(ui.handPlayerLabel) ui.handPlayerLabel.textContent=`（${human.name}）`;
    if(ui.heatPips) renderHeatPips(human);
    renderHand();
    renderMovePreview();
    renderLog();
    if(onlineHooks()?.onRender) onlineHooks().onRender();
  }

  function cardMarkup(c){
    if(!c) return '';
    const big=c.type==='speed' ? c.value : (c.type==='stress' ? '?' : '🔥');
    const type=c.type==='speed' ? (c.basic?'SPEED':'SPECIAL') : (c.type==='stress'?'STRESS':'HEAT');
    const tag=c.type==='stress' ? '<div class="tag">1-4</div>' : '';
    return `<div class="big">${big}</div><div class="type">${type}</div>${tag}`;
  }

  function renderPlayArea(){
    if(!ui.playCards) return;
    ui.playCards.innerHTML='';
    for(let i=0;i<5;i++){
      const slot=document.createElement('div');
      slot.className='play-slot' + (i===4 ? ' boost-slot' : '');
      slot.dataset.playSlot=String(i);
      const c=state.playDisplayCards[i];
      if(c){
        const div=document.createElement('div');
        div.className=`card ${c.type}${c.type==='speed'?` value${c.value}`:''} disabled`;
        div.innerHTML=cardMarkup(c);
        slot.appendChild(div);
      }else if(i===4){
        const label=document.createElement('div');
        label.className='boost-slot-label';
        label.textContent='BOOST';
        slot.appendChild(label);
      }
      ui.playCards.appendChild(slot);
    }
  }

  async function animateStressDraw(card, destinationEl, doReveal=true){
    if(!destinationEl) { await sleep(1000); return; }
    const deckEl=document.querySelector('.deck-card');
    if(!deckEl) { await sleep(1000); return; }
    const from=deckEl.getBoundingClientRect();
    const to=destinationEl.getBoundingClientRect();
    const el=document.createElement('div');
    el.className='stress-fly-card card-back';
    el.style.left=`${from.left}px`;
    el.style.top=`${from.top}px`;
    el.innerHTML='<div class="deck-mark">🏁</div>';
    document.body.appendChild(el);
    await sleep(200);
    if(doReveal){
      el.className=`stress-fly-card ${card.type}`;
      el.innerHTML=cardMarkup(card);
    }
    const dx=(to.left + to.width/2) - (from.left + from.width/2);
    const dy=(to.top + to.height/2) - (from.top + from.height/2);
    const anim=el.animate([
      {transform:'translate(0,0) rotateY(0deg) scale(1)'},
      {transform:`translate(${dx}px,${dy}px) rotateY(0deg) scale(1)`}
    ],{duration:800,easing:'ease-in-out',fill:'forwards'});
    try{ await anim.finished; }catch(e){}
    el.remove();
  }

  function renderDiscardTop(p){
    if(!ui.discardTopCard || !ui.discardFaceContent) return;
    const top = p && p.discard.length ? p.discard[p.discard.length-1] : null;
    if(!top){
      ui.discardTopCard.className='pile-card discard-card-back';
      ui.discardFaceContent.innerHTML='<div class="discard-mark">↻</div>';
      return;
    }
    const valueClass = top.type==='speed' ? ` value${top.value}` : '';
    ui.discardTopCard.className=`pile-card discard-card-face ${top.type}${valueClass}`;
    const big = top.type==='speed' ? top.value : (top.type==='stress' ? '?' : '🔥');
    const type = top.type==='speed' ? (top.basic?'SPEED':'SPECIAL') : (top.type==='stress'?'STRESS':'HEAT');
    const tag = top.type==='stress' ? '<div class="tag">1-4</div>' : '';
    ui.discardFaceContent.innerHTML=`<div class="big">${big}</div><div class="type">${type}</div>${tag}`;
  }

  function renderHand(){
    const p=localPlayer();
    if(!p){ ui.hand.innerHTML=''; return; }
    ui.hand.innerHTML='';
    p.hand.forEach((c,i)=>{
      const div=document.createElement('div');
      div.className=`card ${c.type}`;
      if(c.type==='speed') div.classList.add(`value${c.value}`);
      if(state.selected.includes(i)) div.classList.add('selected');
      if(state.discardSelected.includes(i)) div.classList.add('selected-discard');
      const hook=onlineHooks();
      const remoteSelectable = hook && typeof hook.canSelectCard==='function' ? hook.canSelectCard(c,i) : null;
      const remoteDiscardable = hook && typeof hook.canSelectDiscard==='function' ? hook.canSelectDiscard(c,i) : null;
      const selectable = remoteSelectable===null ? (['shift','selectCards'].includes(state.phase) && c.type!=='heat') : !!remoteSelectable;
      const discardable = remoteDiscardable===null ? (state.phase==='discard' && c.type==='speed') : !!remoteDiscardable;
      if(!(selectable||discardable)) div.classList.add('disabled');

      const big=document.createElement('div');
      big.className='big';
      big.textContent=c.type==='speed' ? c.value : (c.type==='stress' ? '?' : '🔥');
      const type=document.createElement('div');
      type.className='type';
      type.textContent=c.type==='speed' ? (c.basic?'SPEED':'SPECIAL') : (c.type==='stress'?'STRESS':'HEAT');
      div.append(big,type);
      if(c.type==='stress'){
        const tag=document.createElement('div'); tag.className='tag'; tag.textContent='1-4'; div.appendChild(tag);
      }
      div.onclick=()=>{
        if(selectable) toggleSelected(i);
        else if(discardable) toggleDiscard(i);
      };
      ui.hand.appendChild(div);
    });
    for(let i=p.hand.length;i<7;i++){
      const empty=document.createElement('div');
      empty.className='hand-slot-empty';
      ui.hand.appendChild(empty);
    }
  }

  function selectionLimitForHuman(){
    const hook=onlineHooks();
    if(hook && typeof hook.selectionLimit==='function'){
      const custom=hook.selectionLimit();
      if(Number.isFinite(custom)) return custom;
    }
    const p=localPlayer();
    if(!p) return 0;
    if(state.phase==='selectCards') return p.gear;
    if(state.phase==='shift'){
      const options=[];
      for(let g=1;g<=4;g++){
        const diff=Math.abs(g-p.gear);
        if(diff<=2 && (diff<2 || p.engineHeat>0)) options.push(g);
      }
      return Math.max(0,...options);
    }
    return 0;
  }

  function toggleSelected(i){
    const limit=selectionLimitForHuman();
    if(state.selected.includes(i)) state.selected=state.selected.filter(x=>x!==i);
    else if(state.selected.length<limit) state.selected.push(i);
    render();
    if(state.phase==='selectCards') updateSelectionControls();
  }
  function toggleDiscard(i){
    if(state.discardSelected.includes(i)) state.discardSelected=state.discardSelected.filter(x=>x!==i);
    else state.discardSelected.push(i);
    render();
  }

  function openSetup(){
    const current=state.trackId || 'classic';
    modal('NEW RACE', `<div class="setup-grid">
      <div class="setup-item"><label>対戦相手CPU</label><select id="cpuSel"><option value="1">1台（2台レース）</option><option value="2">2台（3台レース）</option><option value="3">3台（4台レース）</option><option value="4">4台（5台レース）</option><option value="5" selected>5台（6台レース）</option><option value="6">6台（7台レース）</option><option value="7">7台（8台レース）</option><option value="8">8台（9台レース）</option><option value="9">9台（10台レース）</option></select></div>
      <div class="setup-item"><label>周回数</label><select id="lapSel"><option value="1">1周</option><option value="2" selected>2周</option><option value="3">3周</option></select></div>
      <div class="setup-item"><label>コース</label><select id="trackSel">
        <option value="classic" ${current==='classic'?'selected':''}>クラシック（100マス）</option>
        <option value="burntisland" ${current==='burntisland'?'selected':''}>Burntisland（100マス・ルートのみ）</option>
        <option value="jarama" ${current==='jarama'?'selected':''}>Jarama（100マス・ルートのみ）</option>
        <option value="jerez" ${current==='jerez'?'selected':''}>Jerez（100マス・ルートのみ）</option>
      </select></div>
    </div><div class="notice">追加3コースは100マスのルート試作です。トップバーの「コース調整」から各マスを手動で移動・保存できます。コーナー位置と制限速度はまだ未設定です。</div><div class="setup-actions"><button id="startBtn" class="big-start">START RACE</button></div>`);
    $('startBtn').onclick=()=>{ state.cpuCount=+$('cpuSel').value; state.laps=+$('lapSel').value; state.trackId=$('trackSel').value; buildTrack(); closeModal(); startRace(); };
  }
  function modal(title,html){ ui.modalTitle.textContent=title; ui.modalBody.innerHTML=html; ui.modal.classList.remove('hidden'); ui.modal.setAttribute('aria-hidden','false'); }
  function closeModal(){ ui.modal.classList.add('hidden'); ui.modal.setAttribute('aria-hidden','true'); }
  function showLog(){ modal('RACE LOG', `<div class="log-list">${escapeHtml(state.logs.slice().reverse().join('\n')||'まだログはありません。')}</div>`); }
  function showGlossary(){
    const rows=[
      ['ギア','1～4速。現在のギアと同じ枚数のカードをプレイします。'],
      ['シフト','ギア変更。通常は±1、2段変更はヒート1枚を使用します。'],
      ['速度カード','車の速度を決めるカード。基本速度カードは1～4です。'],
      ['基本速度カード','速度1～4。ストレスやブーストでは基本速度カードが出るまで山札をめくります。'],
      ['開始時アップグレード','基本ゲームで入れる0・5・ヒートの3枚。Garageでは別のアップグレードと入れ替えます。'],
      ['ヒート','エンジンの余力。使用するとエンジンから捨て札へ移り、後で手札を圧迫します。'],
      ['エンジン','使用可能なヒートを置く場所。基本ゲームでは6枚で開始します。'],
      ['クールダウン','手札のヒートをエンジンへ戻します。'],
      ['ストレス','「？」のカード。基本速度1～4が出るまで山札をめくり、その値を使います。'],
      ['ブースト','ヒート1枚を使い、基本速度カードが出るまで山札をめくって追加移動します。'],
      ['スリップストリーム','条件を満たしたとき任意で2マス進む処理。追加2マスは速度値には加算しません。'],
      ['アドレナリン','後方車への任意の補助。速度+1＋1マス前進、クールダウン+1、または両方を選べます。速度+1はコーナー判定にも加算されます。'],
      ['コーナーライン','マスとマスの境界にある判定線。ここを越えたターンに速度制限を確認します。'],
      ['速度制限','コーナーの数字。速度がこれを超えた分だけヒートを支払います。'],
      ['スピン','コーナー超過分のヒートを払えない場合に発生します。'],
      ['手札','通常7枚。ギアに応じた枚数を選びます。'],
      ['山札','カードを引く束。なくなれば捨て札をシャッフルします。'],
      ['捨て札','使用済みカードを置く場所。確認できるのは一番上のカードと枚数だけです。'],
      ['ラップ','周回数です。'],
      ['ラウンド','全員が1回ずつ処理する一区切りです。'],
      ['スロット','このデジタル版の実装用語。1マスに右・左の2台分の配置位置があります。']
    ];
    modal('用語', `<table class="glossary-table"><tbody>${rows.map(([a,b])=>`<tr><th>${a}</th><td>${b}</td></tr>`).join('')}</tbody></table>`);
  }
  function escapeHtml(s){ return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

  function startRace(){
    state.started=true; state.round=0; state.players=[]; state.logs=[]; state.winnerOrder=[]; state.standingsOrderIds=[]; state.selected=[]; state.discardSelected=[]; state.playDisplayCards=[]; state.playDisplayPlayerId=null; state.phase='idle';
    for(let i=0;i<state.cpuCount+1;i++) state.players.push(makePlayer(i));
    syncAllSlots();
    updateStandingsOrderForRound();
    log(`レース開始: ${state.trackName} / ${trackLen()}マス / ${state.players.length}台 / ${state.laps}周`);
    render();
    nextRound();
  }

  function nextRound(){
    if(checkRaceEnd()) return;
    state.round++;
    for(const p of state.players){
      if(!p.finished){
        p.startProgress=p.progress; p.speedThisRound=0; p.boosted=false; p.adrenaline=false; p.spin=false; p.play=[];
      }
    }
    updateStandingsOrderForRound();
    const active=orderPlayers(false);
    const raceSize=state.players.length;
    const tailCount=raceSize>=9 ? 3 : (raceSize>=5 ? 2 : 1);
    active.slice(-tailCount).forEach(p=>p.adrenaline=true);
    state.phase='shift'; state.selected=[]; state.discardSelected=[]; state.playDisplayCards=[]; state.playDisplayPlayerId=null;
    showMessage(`ROUND ${state.round}`,700);
    log(`--- ROUND ${state.round} ---`);
    if(onlineHooks()?.onRoundReady){ onlineHooks().onRoundReady(); render(); return; }
    askHumanShift();
    render();
  }

  function askHumanShift(){
    const p=localPlayer();
    if(p.finished){ cpuAndResolveWithoutHuman(); return; }
    ui.phaseTitle.textContent='① カードを仮選択 → ギアを選択';
    ui.phaseHelp.textContent='ギアを決める前に手札を仮選択できます。選択したカードの確定速度ぶん先のマスを確認し、使うギアを選んでください。STRESSは予測に含めません。';
    ui.gearControls.innerHTML=''; ui.actionControls.innerHTML='';
    const options=[]; for(let g=1;g<=4;g++) if(Math.abs(g-p.gear)<=2) options.push(g);
    options.forEach(g=>{
      const cost=Math.abs(g-p.gear)===2?1:0;
      const b=document.createElement('button');
      const cooldownMark=g===1?' ❄3':(g===2?' ❄1':'');
      b.textContent=`${g}速${cooldownMark}${cost?' 🔥1':''}`;
      if(g===1) b.title='クールダウン：手札のHEATを最大3枚エンジンへ戻せます';
      if(g===2) b.title='クールダウン：手札のHEATを最大1枚エンジンへ戻せます';
      if(g===p.gear) b.classList.add('primary');
      if(cost>p.engineHeat) b.disabled=true;
      b.onclick=()=>chooseHumanGear(g);
      ui.gearControls.appendChild(b);
    });
  }

  function chooseHumanGear(g){
    const p=localPlayer(), diff=Math.abs(g-p.gear);
    if(diff===2 && !payHeat(p,1,'2段変速')) return;
    p.gear=g; state.humanGearChoice=g; state.phase='selectCards';
    ui.phaseTitle.textContent='② プレイカードを確定';
    ui.phaseHelp.textContent=`${g}速なので ${g}枚をプレイします。仮選択はそのまま引き継がれます。枚数が合わない場合は手札を選び直してください。`;
    ui.gearControls.innerHTML='';
    updateSelectionControls();
    render();
  }

  function updateSelectionControls(){
    const p=localPlayer();
    ui.actionControls.innerHTML='';
    if(state.phase!=='selectCards') return;
    const legal=p.hand.filter(c=>c.type!=='heat').length;
    const cluttered=legal<p.gear;
    const b=document.createElement('button');
    b.className='primary';
    b.textContent=cluttered?'手札詰まりを処理':'カード決定';
    b.disabled=!cluttered && state.selected.length!==p.gear;
    b.onclick=commitHumanCards;
    ui.actionControls.appendChild(b);
    const info=document.createElement('span');
    info.style.cssText='font-size:14px;color:#bcd0e4;align-self:center';
    const known=selectedKnownSpeed();
    info.textContent=`${state.selected.length}/${p.gear}枚　確定速度 ${known}${state.selected.some(i=>p.hand[i]?.type==='stress')?' + STRESS':''}`;
    ui.actionControls.appendChild(info);
  }

  async function commitHumanCards(){
    const human=localPlayer();
    const legalIdx=human.hand.map((c,i)=>c.type!=='heat'?i:-1).filter(i=>i>=0);
    if(legalIdx.length<human.gear){
      log(`${human.name}: 手札がHEATで詰まり失速`);
      showMessage('CLUTTERED HAND!',1000);
      human.play=[]; human.gear=1; human.speedThisRound=0;
      if(onlineHooks()?.onLocalRoundChoiceCommitted){ onlineHooks().onLocalRoundChoiceCommitted(true); return; }
      await cpuChoices();
      await resolveRound(true);
      return;
    }
    const chosen=[...state.selected].sort((a,b)=>b-a).map(i=>human.hand.splice(i,1)[0]);
    human.play=chosen;
    state.playDisplayCards=[...chosen]; state.playDisplayPlayerId=human.id;
    state.selected=[];
    render();
    if(onlineHooks()?.onLocalRoundChoiceCommitted){ onlineHooks().onLocalRoundChoiceCommitted(false); return; }
    await cpuChoices();
    await resolveRound(false);
  }

  async function cpuAndResolveWithoutHuman(){ await cpuChoices(); await resolveRound(false); }

  async function cpuChoices(){
    const players=state.players.filter(p=>p.cpu&&!p.finished);
    for(const p of players){
      const target=cpuTarget(p);
      const gearOptions=[];
      for(let g=1;g<=4;g++){
        const d=Math.abs(g-p.gear);
        if(d<=2 && (d<2 || p.engineHeat>0)) gearOptions.push(g);
      }
      let best={score:1e9,g:p.gear};
      for(const g of gearOptions){
        const legal=p.hand.filter(c=>c.type!=='heat');
        if(legal.length<g) continue;
        const combo=bestCombo(legal,g,target);
        const avg=combo.reduce((s,c)=>s+cardExpected(c),0);
        const score=Math.abs(avg-target)+g*.02;
        if(score<best.score) best={score,g,combo};
      }
      const diff=Math.abs(best.g-p.gear);
      if(diff===2) payHeat(p,1,'2段変速');
      p.gear=best.g;
      const legal=p.hand.filter(c=>c.type!=='heat');
      if(legal.length<p.gear){ p.play=[]; p.gear=1; log(`${p.name}: 手札詰まりで失速`); continue; }
      const combo=best.combo || bestCombo(legal,p.gear,target);
      p.play=[];
      combo.forEach(card=>{ const idx=p.hand.indexOf(card); if(idx>=0) p.play.push(p.hand.splice(idx,1)[0]); });
    }
  }

  function cardExpected(c){ return c.type==='stress' ? 2.5 : (c.value??0); }
  function nextCornerInfo(p){
    const cur=p.progress; let best=null;
    for(let lap=-1;lap<=state.laps;lap++){
      for(const c of trackCorners()){
        const abs=lap*trackLen()+c.pos;
        if(abs>cur && (!best || abs<best.abs)) best={...c,abs,dist:abs-cur};
      }
    }
    return best;
  }
  function cpuTarget(p){
    const c=nextCornerInfo(p);
    if(!c) return 8;
    if(c.dist<=4) return Math.max(2,c.limit+Math.min(2,p.engineHeat));
    if(c.dist<=9) return Math.max(3,Math.min(10,c.dist-1));
    return 10;
  }
  function combinations(arr,k){
    const out=[];
    const rec=(start,cur)=>{
      if(cur.length===k){ out.push([...cur]); return; }
      for(let i=start;i<arr.length;i++){ cur.push(arr[i]); rec(i+1,cur); cur.pop(); }
    };
    rec(0,[]);
    return out;
  }
  function bestCombo(cards,k,target){
    const cs=combinations(cards,k); let best=cs[0]||[]; let score=1e9;
    for(const c of cs){
      const s=c.reduce((a,x)=>a+cardExpected(x),0);
      const sc=Math.abs(s-target)+(s>target?0.05:0);
      if(sc<score){ score=sc; best=c; }
    }
    return best;
  }

  async function resolveRound(humanCluttered=false,resumeInfo=null){
    state.phase='resolve'; state.resolving=true;
    ui.gearControls.innerHTML=''; ui.actionControls.innerHTML='';
    ui.phaseTitle.textContent='③ レース処理';
    ui.phaseHelp.textContent='先頭車から順番に公開して移動します。';
    render();
    await sleep(280);
    const order=resumeInfo?.orderIds?.length ? resumeInfo.orderIds.map(id=>state.players.find(p=>p.id===id)).filter(Boolean) : orderPlayers(false);
    const startIndex=Math.max(0,Math.min(order.length,Number(resumeInfo?.startIndex)||0));
    for(let oi=startIndex;oi<order.length;oi++){
      const p=order[oi];
      if(onlineHooks()?.beforeResolveCar) await onlineHooks().beforeResolveCar(p,oi,order.map(x=>x.id));
      if(p.clutteredRound || (isLocalPlayer(p) && humanCluttered)){ p.clutteredRound=false; await cleanupCluttered(p); continue; }
      if(p.play.length===0){ await cleanupCluttered(p); continue; }
      await resolveCar(p);
    }
    if(onlineHooks()?.beforeDiscardPhase) await onlineHooks().beforeDiscardPhase();
    await beginDiscardPhase();
    state.resolving=false;
  }

  async function resolveCar(p){
    state.playDisplayCards=[...p.play];
    state.playDisplayPlayerId=p.id;
    renderPlayArea();

    let speed=0;
    for(let i=0;i<p.play.length;i++){
      const c=p.play[i];
      if(c.type==='speed') speed+=c.value;
      else if(c.type==='stress'){
        const v=await resolveStress(p,i);
        speed+=v;
        log(`${p.name}: STRESS → ${v}`);
      }
    }
    p.speedThisRound=speed;

    showMessage(`${p.name}
ギア ${p.gear}　速度 ${speed}`,2000);
    await sleep(2000);

    let dest=settleDestination(p,p.progress+speed);
    movePlayerTo(p,dest);
    log(`${p.name}: 速度 ${speed} → ${speed}マス移動`);
    render();
    await sleep(350);

    if(p.adrenaline && !p.finished){
      if(p.cpu) await cpuAdrenalineChoice(p);
      else if(isLocalPlayer(p)) await humanAdrenalineChoice(p);
      else if(onlineHooks()?.remoteDecision) await onlineHooks().remoteDecision(p,'adrenaline');
    }
    const cd=(p.gear===1?3:p.gear===2?1:0);
    if(cd) await applyCooldown(p,cd,'クールダウン');
    render();
    await sleep(200);

    if(!p.finished && shouldBoost(p)){
      if(p.cpu){ if(cpuWantsBoost(p)) await doBoost(p); }
      else if(isLocalPlayer(p)) await humanBoostChoice(p);
      else if(onlineHooks()?.remoteDecision) await onlineHooks().remoteDecision(p,'boost');
    }
    if(!p.finished){
      if(p.cpu){ if(canSlipstream(p)&&cpuWantsSlipstream(p)) await doSlipstream(p); }
      else if(isLocalPlayer(p)) await humanSlipstreamChoice(p);
      else if(canSlipstream(p) && onlineHooks()?.remoteDecision) await onlineHooks().remoteDecision(p,'slipstream');
    }
    await checkCorners(p);
    checkFinish(p);
    render();
    await sleep(250);
  }

  function totalCornerHeatCost(p, speed, endProgress){
    return cornersCrossed(p.startProgress,endProgress).reduce((sum,c)=>sum+Math.max(0,speed-c.limit),0);
  }

  async function humanAdrenalineChoice(p){
    return new Promise(resolve=>{
      state.phase='adrenaline';
      ui.phaseTitle.textContent='④ アドレナリン';
      ui.phaseHelp.textContent='後方ボーナスです。+1移動を使うと速度も+1され、コーナー判定にも反映されます。クールダウン+1だけ、両方、使わない、を選べます。';
      ui.actionControls.innerHTML='';

      const finish=async(useSpeed,useCooldown)=>{
        ui.actionControls.innerHTML='';
        if(useSpeed){
          p.speedThisRound+=1;
          movePlayerTo(p,settleDestination(p,p.progress+1));
          log(`${p.name}: アドレナリン 速度+1 / 1マス前進`);
        }
        if(useCooldown){
          const cooled=await applyCooldown(p,1,'アドレナリン：クールダウン');
          if(!cooled) log(`${p.name}: アドレナリン クールダウン+1（対象HEATなし）`);
        }
        render();
        await sleep(220);
        resolve();
      };

      const speedBtn=button('速度+1 / 1マス前進','primary',()=>finish(true,false));
      const coolBtn=button('クールダウン+1','ok',()=>finish(false,true));
      const bothBtn=button('両方使う','primary',()=>finish(true,true));
      const noneBtn=button('使わない','',()=>finish(false,false));
      ui.actionControls.append(speedBtn,coolBtn,bothBtn,noneBtn);
    });
  }

  async function cpuAdrenalineChoice(p){
    const useCooldown=p.hand.some(c=>c.type==='heat');
    const candidate=settleDestination(p,p.progress+1);
    const newSpeed=p.speedThisRound+1;
    const newCost=totalCornerHeatCost(p,newSpeed,candidate);
    const useSpeed=candidate>p.progress && newCost<=p.engineHeat;

    if(useSpeed){
      p.speedThisRound=newSpeed;
      movePlayerTo(p,candidate);
      log(`${p.name}: アドレナリン 速度+1 / 1マス前進`);
    }
    if(useCooldown) await applyCooldown(p,1,'アドレナリン：クールダウン');
    if(!useSpeed && !useCooldown) log(`${p.name}: アドレナリンを使わない`);
    render();
    await sleep(160);
  }

  async function resolveStress(p,slotIndex){
    while(true){
      const c=drawOne(p);
      if(!c) return 0;
      const isBasicSpeed=c.type==='speed' && c.basic;
      if(isLocalPlayer(p)){
        const destination=isBasicSpeed
          ? document.querySelector(`[data-play-slot="${slotIndex}"]`)
          : ui.discardTopCard;
        await animateStressDraw(c,destination,true);
      }else{
        await sleep(250);
      }
      if(isBasicSpeed){
        state.playDisplayCards[slotIndex]=c;
        if(isLocalPlayer(p) && ui.deckCount) ui.deckCount.textContent=p.deck.length;
        renderPlayArea();
        if(!p.stressResolvedCards) p.stressResolvedCards=[];
        p.stressResolvedCards.push(c);
        return c.value;
      }
      p.discard.push(c);
      if(isLocalPlayer(p)){ renderDiscardTop(p); if(ui.deckCount) ui.deckCount.textContent=p.deck.length; if(ui.discardCount) ui.discardCount.textContent=p.discard.length; }
    }
  }
  function shouldBoost(p){ return p.engineHeat>0 && !p.boosted; }
  function cpuWantsBoost(p){
    const c=nextCornerInfo(p); if(p.engineHeat<=1) return false;
    if(c && c.dist<=5) return false;
    return Math.random()<0.34;
  }
  async function humanBoostChoice(p){
    return new Promise(resolve=>{
      ui.phaseTitle.textContent='⑤ ブースト';
      ui.phaseHelp.textContent='HEATを1枚使い、山札から基本速度1〜4が出るまでめくって追加移動できます。';
      ui.actionControls.innerHTML='';
      const yes=button('ブースト 🔥1','primary',async()=>{ ui.actionControls.innerHTML=''; await doBoost(p); resolve(); });
      const no=button('使わない','',()=>{ ui.actionControls.innerHTML=''; resolve(); });
      ui.actionControls.append(yes,no);
    });
  }
  async function doBoost(p){
    if(p.boosted || p.engineHeat<1) return;
    payHeat(p,1,'ブースト');
    p.boosted=true;
    let v=0;
    while(true){
      const c=drawOne(p);
      if(!c) break;
      const isBasicSpeed=c.type==='speed' && c.basic;
      if(isLocalPlayer(p)){
        const destination=isBasicSpeed
          ? document.querySelector('[data-play-slot="4"]')
          : ui.discardTopCard;
        await animateStressDraw(c,destination,true);
      }else{
        await sleep(150);
      }
      if(isBasicSpeed){
        v=c.value;
        state.playDisplayCards[4]=c;
        renderPlayArea();
        if(!p.boostResolvedCards) p.boostResolvedCards=[];
        p.boostResolvedCards.push(c);
        if(isLocalPlayer(p) && ui.deckCount) ui.deckCount.textContent=p.deck.length;
        break;
      }
      p.discard.push(c);
      if(isLocalPlayer(p)){
        renderDiscardTop(p);
        if(ui.deckCount) ui.deckCount.textContent=p.deck.length;
        if(ui.discardCount) ui.discardCount.textContent=p.discard.length;
      }
    }
    p.speedThisRound+=v;
    movePlayerTo(p,settleDestination(p,p.progress+v));
    log(`${p.name}: BOOST +${v}`);
    showMessage(`${p.name}
ブースト +${v}`,1000);
    render();
    await sleep(350);
  }

  function canSlipstream(p){
    if(p.finished || p.progress>=state.laps*trackLen()) return false;
    return state.players.some(o=>o.id!==p.id && !o.finished && (Math.floor(o.progress)===Math.floor(p.progress) || Math.floor(o.progress)===Math.floor(p.progress)+1));
  }
  function cpuWantsSlipstream(p){
    const trial=settleDestination(p,p.progress+2); const corners=cornersCrossed(p.startProgress,trial);
    let cost=0; for(const c of corners) cost+=Math.max(0,p.speedThisRound-c.limit);
    return cost<=p.engineHeat;
  }
  async function humanSlipstreamChoice(p){
    if(!canSlipstream(p)) return;
    return new Promise(resolve=>{
      ui.phaseTitle.textContent='⑥ スリップストリーム';
      ui.phaseHelp.textContent='隣または直前の車を利用して2マス進めます。この2マスはコーナー判定の速度には加算されません。';
      ui.actionControls.innerHTML='';
      const yes=button('2マス進む','ok',async()=>{ ui.actionControls.innerHTML=''; await doSlipstream(p); resolve(); });
      const no=button('使わない','',()=>{ ui.actionControls.innerHTML=''; resolve(); });
      ui.actionControls.append(yes,no);
    });
  }
  async function doSlipstream(p){
    movePlayerTo(p,settleDestination(p,p.progress+2));
    log(`${p.name}: スリップストリーム +2`);
    showMessage('SLIPSTREAM +2',550);
    render();
    await sleep(300);
  }
  function button(text,cls,fn){ const b=document.createElement('button'); b.textContent=text; if(cls) b.className=cls; b.onclick=fn; return b; }

  function cornersCrossed(from,to){
    const list=[];
    const minLap=Math.floor((from-trackLen())/trackLen()), maxLap=Math.floor((to+trackLen())/trackLen());
    for(let lap=minLap; lap<=maxLap; lap++){
      for(const c of trackCorners()){
        const abs=lap*trackLen()+c.pos;
        if(abs>from && abs<=to && abs<state.laps*trackLen()) list.push({...c,abs});
      }
    }
    return list.sort((a,b)=>a.abs-b.abs);
  }
  async function checkCorners(p){
    const cs=cornersCrossed(p.startProgress,p.progress);
    for(const c of cs){
      const over=Math.max(0,p.speedThisRound-c.limit);
      if(over===0){ log(`${p.name}: CORNER ${c.name} 安全通過 (${p.speedThisRound}/${c.limit})`); continue; }
      showMessage(`CORNER ${c.name}  +🔥${over}`,650);
      if(p.engineHeat>=over){
        payHeat(p,over,`CORNER ${c.name}`); log(`${p.name}: CORNER ${c.name} ${p.speedThisRound}/${c.limit}`);
      }else{
        const remain=p.engineHeat; if(remain) payHeat(p,remain,`SPIN CORNER ${c.name}`);
        movePlayerTo(p,findFreeBeforeCorner(c.abs,p.id));
        const stressN=p.gear<=2?1:2;
        for(let i=0;i<stressN;i++) p.hand.push({id:`spinStress_${Date.now()}_${Math.random()}`,type:'stress',value:null,basic:false});
        p.gear=1; p.spin=true;
        log(`${p.name}: SPIN OUT! STRESS +${stressN}`);
        showMessage('SPIN OUT!',1000);
        render();
        await sleep(800);
        break;
      }
    }
  }
  function findFreeBeforeCorner(abs,playerId){ let x=Math.floor(abs-1); while(carsAtProgress(x,playerId).length>=2) x--; return x; }
  function checkFinish(p){
    const finish=state.laps*trackLen();
    if(!p.finished && p.progress>=finish){
      p.finished=true;
      p.finishProgress=p.progress;
      p.finishRound=state.round;
      state.winnerOrder.push(p.id);
      p.finishRank=state.winnerOrder.length;
      p.slotSpace=null;
      log(`${p.name}: FINISH! ${p.finishRank}位確定`);
      showMessage(`${p.name} FINISH!\n${p.finishRank}位確定`,1000);
    }
  }

  async function cleanupCluttered(p){
    p.play.forEach(c=>p.discard.push(c)); if(p.stressResolvedCards?.length){p.stressResolvedCards.forEach(c=>p.discard.push(c));p.stressResolvedCards=[];} if(p.boostResolvedCards?.length){p.boostResolvedCards.forEach(c=>p.discard.push(c));p.boostResolvedCards=[];} p.play=[]; drawTo(p,7); render(); await sleep(150);
  }
  async function beginDiscardPhase(){
    if(onlineHooks()?.handleDiscardPhase) return await onlineHooks().handleDiscardPhase();
    const human=localPlayer();
    for(const p of state.players.filter(x=>x.cpu && !x.finished)) cpuDiscard(p);
    for(const p of state.players.filter(x=>x.cpu)){ p.play.forEach(c=>p.discard.push(c)); if(p.stressResolvedCards?.length){p.stressResolvedCards.forEach(c=>p.discard.push(c));p.stressResolvedCards=[];} if(p.boostResolvedCards?.length){p.boostResolvedCards.forEach(c=>p.discard.push(c));p.boostResolvedCards=[];} p.play=[]; drawTo(p,7); }
    if(human.finished){ human.play.forEach(c=>human.discard.push(c)); if(human.stressResolvedCards?.length){human.stressResolvedCards.forEach(c=>human.discard.push(c));human.stressResolvedCards=[];} if(human.boostResolvedCards?.length){human.boostResolvedCards.forEach(c=>human.discard.push(c));human.boostResolvedCards=[];} human.play=[]; drawTo(human,7); finishRoundCleanup(); return; }
    state.phase='discard'; state.selected=[]; state.discardSelected=[];
    ui.phaseTitle.textContent='⑧ 捨て札';
    ui.phaseHelp.textContent='不要な速度カードは任意で捨てられます。STRESSとHEATは捨てられません。赤枠が捨てるカードです。';
    ui.actionControls.innerHTML='';
    const done=button('捨て札を確定 / 次のラウンド','primary',()=>{
      const idxs=[...state.discardSelected].sort((a,b)=>b-a);
      for(const i of idxs){ const c=human.hand.splice(i,1)[0]; if(c) human.discard.push(c); }
      human.play.forEach(c=>human.discard.push(c)); if(human.stressResolvedCards?.length){human.stressResolvedCards.forEach(c=>human.discard.push(c));human.stressResolvedCards=[];} if(human.boostResolvedCards?.length){human.boostResolvedCards.forEach(c=>human.discard.push(c));human.boostResolvedCards=[];} human.play=[]; drawTo(human,7); finishRoundCleanup();
    });
    ui.actionControls.appendChild(done);
    render();
  }
  function cpuDiscard(p){
    const c=nextCornerInfo(p); if(!c) return;
    const target=c.dist<7 ? c.limit : 10;
    const candidates=p.hand.filter(x=>x.type==='speed' && Math.abs(x.value-target)>4);
    if(candidates.length && Math.random()<.25){ const card=candidates[0], i=p.hand.indexOf(card); p.hand.splice(i,1); p.discard.push(card); }
  }
  function finishRoundCleanup(){ state.phase='idle'; state.discardSelected=[]; render(); if(onlineHooks()?.afterRoundCleanup){ onlineHooks().afterRoundCleanup(); return; } setTimeout(nextRound,300); }

  function checkRaceEnd(){
    if(!state.started) return false;
    if(state.players.every(p=>p.finished)) return showResults(), true;
    const human=localPlayer(); if(human.finished && state.winnerOrder.length===state.players.length) return showResults(), true;
    return false;
  }
  function showResults(){
    state.phase='finished';
    if(onlineHooks()?.onRaceFinished) onlineHooks().onRaceFinished();
    const ranked=[
      ...state.winnerOrder.map(id=>state.players.find(p=>p.id===id)).filter(Boolean),
      ...orderPlayers(false)
    ];
    const rows=ranked.map((p,i)=>`<tr><td>${i+1}</td><td>${p.name}</td><td>R${p.finishRound??'-'}</td><td>${p.finishProgress??'-'}</td></tr>`).join('');
    modal('RACE RESULT', `<table class="result-table"><thead><tr><th>順位</th><th>DRIVER</th><th>FINISH</th><th>DISTANCE</th></tr></thead><tbody>${rows}</tbody></table><div class="setup-actions"><button id="againBtn" class="big-start">もう一度</button></div>`);
    $('againBtn').onclick=()=>{ closeModal(); if(onlineHooks()?.onAgain) onlineHooks().onAgain(); else startRace(); };
    ui.phaseTitle.textContent='レース終了';
    ui.phaseHelp.textContent='NEW RACEで新しいレースを開始できます。';
  }

  function resetRaceStateForStart(){
    state.started=false; state.round=0; state.players=[]; state.logs=[]; state.winnerOrder=[]; state.standingsOrderIds=[]; state.selected=[]; state.discardSelected=[]; state.playDisplayCards=[]; state.playDisplayPlayerId=null; state.phase='idle';
  }
  function startRaceWithRoster(roster,cpuCount=0,laps=2,trackId='classic'){
    resetRaceStateForStart();
    state.cpuCount=Math.max(0,Math.min(10-(roster?.length||0),+cpuCount||0));
    state.laps=+laps||2; state.trackId=trackId||'classic'; buildTrack();
    (roster||[]).forEach((r,i)=>state.players.push(makePlayer(i,{cpu:false,name:r.name,onlinePlayerId:r.id})));
    for(let n=0;n<state.cpuCount;n++){
      const i=state.players.length;
      state.players.push(makePlayer(i,{cpu:true,name:`CPU ${n+1}`}));
    }
    state.started=true;
    syncAllSlots(); updateStandingsOrderForRound();
    log(`レース開始: ${state.trackName} / ${trackLen()}マス / ${state.players.length}台 / ${state.laps}周`);
    render(); nextRound();
  }
  function makeNetworkSnapshot(){
    return {
      started:state.started,round:state.round,laps:state.laps,cpuCount:state.cpuCount,players:state.players,logs:state.logs,
      phase:state.phase,winnerOrder:state.winnerOrder,standingsOrderIds:state.standingsOrderIds,playDisplayCards:state.playDisplayCards,playDisplayPlayerId:state.playDisplayPlayerId,
      trackId:state.trackId,trackLen:state.trackLen,trackCorners:state.trackCorners,trackName:state.trackName,points:state.points
    };
  }
  function applyNetworkSnapshot(snap){
    if(!snap) return;
    const localSel=[...state.selected], localDiscard=[...state.discardSelected], editor=state.editor;
    for(const k of ['started','round','laps','cpuCount','players','logs','phase','winnerOrder','standingsOrderIds','playDisplayCards','playDisplayPlayerId','trackId','trackLen','trackCorners','trackName','points']){
      if(snap[k]!==undefined) state[k]=snap[k];
    }
    state.editor=editor; state.selected=localSel; state.discardSelected=localDiscard;
    if(state.points?.length){ updateTrackPathFromPoints(); buildSpaces(); buildCorners(); }
    render();
  }
  function applyRemoteRoundChoice(p,payload){
    if(!p||!payload) return {ok:false};
    const g=Math.max(1,Math.min(4,+payload.gear||1));
    const diff=Math.abs(g-p.gear);
    if(diff>2 || (diff===2 && p.engineHeat<1)) return {ok:false,error:'illegal gear'};
    if(diff===2) payHeat(p,1,'2段変速');
    p.gear=g;
    const legal=p.hand.filter(c=>c.type!=='heat');
    if(legal.length<g){ p.play=[]; p.gear=1; p.clutteredRound=true; log(`${p.name}: 手札詰まりで失速`); return {ok:true,cluttered:true}; }
    const ids=Array.isArray(payload.cardIds)?payload.cardIds:[];
    if(ids.length!==g) return {ok:false,error:'card count'};
    const chosen=[];
    for(const id of ids){ const idx=p.hand.findIndex(c=>c.id===id && c.type!=='heat'); if(idx<0) return {ok:false,error:'card'}; chosen.push(p.hand.splice(idx,1)[0]); }
    p.play=chosen; p.clutteredRound=false; return {ok:true};
  }
  function cleanupHumanAfterDiscard(p,cardIds=[]){
    const ids=new Set(cardIds||[]);
    for(let i=p.hand.length-1;i>=0;i--){ if(ids.has(p.hand[i].id) && p.hand[i].type==='speed') p.discard.push(p.hand.splice(i,1)[0]); }
    p.play.forEach(c=>p.discard.push(c));
    if(p.stressResolvedCards?.length){p.stressResolvedCards.forEach(c=>p.discard.push(c));p.stressResolvedCards=[];}
    if(p.boostResolvedCards?.length){p.boostResolvedCards.forEach(c=>p.discard.push(c));p.boostResolvedCards=[];}
    p.play=[]; drawTo(p,7);
  }
  window.HeatGameAPI={
    VERSION,state,TRACKS,localPlayer,isLocalPlayer,isCpu,render,renderHand,renderPlayArea,buildTrack,buildSpaces,buildCorners,updateTrackPathFromPoints,
    openSetup,closeModal,modal,showLog,showGlossary,startRaceWithRoster,nextRound,askHumanShift,chooseHumanGear,commitHumanCards,cpuChoices,resolveRound,
    humanAdrenalineChoice,cpuAdrenalineChoice,humanBoostChoice,doBoost,humanSlipstreamChoice,doSlipstream,applyCooldown,checkCorners,checkFinish,
    beginDiscardPhase,cpuDiscard,finishRoundCleanup,checkRaceEnd,showResults,makeNetworkSnapshot,applyNetworkSnapshot,applyRemoteRoundChoice,cleanupHumanAfterDiscard,
    canSlipstream,shouldBoost,cpuWantsBoost,cpuWantsSlipstream,payHeat,coolHeat,selectedKnownSpeed,updateSelectionControls,toggleSelected,toggleDiscard,button,log,showMessage,settleDestination,movePlayerTo,totalCornerHeatCost,drawTo
  };

  function editorSpaceIndexFromEvent(e){
    const el=e.target && e.target.closest ? e.target.closest('.space-cell-group') : null;
    return el ? Number(el.dataset.spaceIndex) : null;
  }
  if(ui.trackEditBtn) ui.trackEditBtn.onclick=()=>toggleEditorPanel();
  if(ui.editorCloseBtn) ui.editorCloseBtn.onclick=()=>toggleEditorPanel(false);
  if(ui.editorEnabled) ui.editorEnabled.onchange=()=>{state.editor.enabled=ui.editorEnabled.checked;updateEditorUi();buildSpaces();};
  if(ui.editorShowNumbers) ui.editorShowNumbers.onchange=()=>{state.editor.showNumbers=ui.editorShowNumbers.checked;buildSpaces();updateEditorUi();};
  if(ui.editorShowCenters) ui.editorShowCenters.onchange=()=>{state.editor.showCenters=ui.editorShowCenters.checked;buildSpaces();updateEditorUi();};
  if(ui.editorShowLine) ui.editorShowLine.onchange=()=>{state.editor.showLine=ui.editorShowLine.checked;updateEditorUi();};
  if(ui.editorFollow) ui.editorFollow.onchange=()=>{state.editor.follow=ui.editorFollow.checked;updateEditorUi();};
  if(ui.editorFollowRange) ui.editorFollowRange.onchange=()=>{state.editor.followRange=+ui.editorFollowRange.value;updateEditorUi();};
  if(ui.editorUndoBtn) ui.editorUndoBtn.onclick=editorUndo;
  if(ui.editorRedoBtn) ui.editorRedoBtn.onclick=editorRedo;
  if(ui.editorResetBtn) ui.editorResetBtn.onclick=resetEditorPoints;
  if(ui.editorSaveBtn) ui.editorSaveBtn.onclick=saveEditorPoints;
  if(ui.editorCopyBtn) ui.editorCopyBtn.onclick=copyEditorPoints;
  if(ui.svg){
    ui.svg.addEventListener('pointerdown',e=>{const idx=editorSpaceIndexFromEvent(e); if(idx!==null) startEditorDrag(e,idx);});
    ui.svg.addEventListener('pointermove',moveEditorDrag);
    ui.svg.addEventListener('pointerup',endEditorDrag);
    ui.svg.addEventListener('pointercancel',endEditorDrag);
  }
  window.addEventListener('keydown',e=>{
    if(!state.editor.open || !state.editor.enabled) return;
    if(['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName)) return;
    const step=e.shiftKey?5:1;
    const dirs={ArrowLeft:[-step,0],ArrowRight:[step,0],ArrowUp:[0,-step],ArrowDown:[0,step]};
    if(dirs[e.key]){e.preventDefault();nudgeEditorSelection(...dirs[e.key]);}
    else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();e.shiftKey?editorRedo():editorUndo();}
    else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='y'){e.preventDefault();editorRedo();}
  });

  $('newRaceBtn').onclick=openSetup;
  $('logBtn').onclick=showLog;
  if(ui.glossaryBtn) ui.glossaryBtn.onclick=showGlossary;
  $('modalClose').onclick=closeModal;
  ui.modal.onclick=e=>{ if(e.target===ui.modal) closeModal(); };

  buildTrack();
  render();
  if(!window.HEAT_ONLINE_MODE) openSetup();
})();
