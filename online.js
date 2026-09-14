(() => {
  'use strict';

  window.HEAT_ONLINE_MODE = true;

  const SERVER_URL = 'https://heat-racing-online.naitoryo7110.workers.dev';
  const COMMON_NAME_KEY = 'boardgamePlayerName';
  const SESSION_KEY = 'heatRacingOnlineSessionV1';
  const GAME_ID = 'heat-racing';
  const GAME_NAME = 'HEAT Racing';
  const ROOMS = ['room1','room2','room3','room4'];

  const O = {
    joined:false,
    roomId:null,
    token:null,
    playerId:null,
    isHost:false,
    status:'waiting',
    roster:[],
    pending:null,
    pendingKey:null,
    submittedRequestId:null,
    draftGear:null,
    lastSnapshotVersion:0,
    lastActionSeq:0,
    pollTimer:null,
    roomTimer:null,
    snapshotTimer:null,
    localRoundResolver:null,
    localRoundCluttered:false,
    suppressRoundReady:false,
    savedNameForSession:false,
    currentGameSessionId:null,
    executionActive:false,
    allowRecovery:false,
    recoveryRunning:false,
    pinMode:false,
    pin:null,
    resultShownForSession:false,
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  function uuid(){ return (globalThis.crypto&&typeof crypto.randomUUID==='function') ? crypto.randomUUID() : `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}_${Math.random().toString(36).slice(2)}`; }
  const id = x => document.getElementById(x);
  const API = () => window.HeatGameAPI;

  function commonSavedName(){
    try { return (localStorage.getItem(COMMON_NAME_KEY) || '').trim().slice(0,32); }
    catch { return ''; }
  }
  function saveCommonNameOnActualStart(name){
    const n=(name||'').trim().slice(0,32);
    if(!n) return;
    try{ localStorage.setItem(COMMON_NAME_KEY,n); }catch{}
  }
  function saveSession(){
    if(!O.joined) return;
    try{
      localStorage.setItem(SESSION_KEY,JSON.stringify({roomId:O.roomId,token:O.token,playerId:O.playerId,name:currentName()}));
    }catch{}
  }
  function loadSession(){
    try{
      const v=JSON.parse(localStorage.getItem(SESSION_KEY)||'null');
      if(v && ROOMS.includes(v.roomId) && v.token) return v;
    }catch{}
    return null;
  }
  function clearSession(){ try{localStorage.removeItem(SESSION_KEY);}catch{} }
  function currentName(){
    const inp=id('playerNameInput');
    const local=API()?.localPlayer?.();
    return ((local?.name)||inp?.value||commonSavedName()||'').trim().slice(0,32);
  }

  async function request(path, opts={}){
    const method=opts.method||'GET';
    const init={method,headers:{'Content-Type':'application/json'}};
    if(opts.body!==undefined) init.body=JSON.stringify(opts.body);
    const ctrl=new AbortController();
    const timer=setTimeout(()=>ctrl.abort(),10000);
    init.signal=ctrl.signal;
    try{
      const res=await fetch(SERVER_URL+path,init);
      const text=await res.text();
      let data={};
      try{data=text?JSON.parse(text):{};}catch{data={raw:text};}
      if(!res.ok){
        const err=new Error(data.error||`HTTP ${res.status}`);
        err.status=res.status; err.data=data; throw err;
      }
      return data;
    } finally { clearTimeout(timer); }
  }

  function setLobbyStatus(text, cls=''){
    const el=id('lobbyStatus'); if(!el) return;
    el.textContent=text||''; el.className='lobby-status'+(cls?` ${cls}`:'');
  }
  function roomLabel(roomId){ return 'ROOM'+String(ROOMS.indexOf(roomId)+1); }
  function showLobby(show=true){
    id('onlineLobby')?.classList.toggle('hidden',!show);
    const shell=document.querySelector('.game-shell');
    if(shell){shell.classList.toggle('online-visible',!show); shell.classList.toggle('lobby-hidden',show);}
  }
  function updateTopbar(){
    const badge=id('roomBadge'), leave=id('leaveRoomBtn');
    if(O.joined){
      badge?.classList.remove('hidden'); if(badge) badge.textContent=`${roomLabel(O.roomId)} / ${O.status==='playing'?'ゲーム中':O.status==='finished'?'終了':'待機'}`;
      leave?.classList.remove('hidden');
    }else{
      badge?.classList.add('hidden'); leave?.classList.add('hidden');
    }
    const newBtn=id('newRaceBtn');
    if(newBtn){
      newBtn.style.display=O.joined&&O.isHost?'':'none';
      newBtn.textContent=O.status==='playing'?'NEW RACE':'レース設定';
    }
    const edit=id('trackEditBtn');
    if(edit){edit.style.display=O.joined&&O.isHost?'':'none';}
    const pin=id('pinBtn');
    if(pin){pin.classList.toggle('hidden',!(O.joined&&(O.status==='playing'||O.status==='finished')));pin.classList.toggle('pin-active',O.pinMode);}
  }

  async function refreshRooms(){
    if(O.joined) return;
    try{
      const data=await request('/api/rooms');
      renderRoomGrid(data.rooms||[]);
      setLobbyStatus('参加するROOMを選んでください。','online-ok');
    }catch(e){
      setLobbyStatus('サーバーへ接続できません。Cloudflare Workersのデプロイ状況を確認してください。','online-error');
    }
  }
  function renderRoomGrid(rooms){
    const grid=id('roomGrid'); if(!grid) return;
    const byId=new Map(rooms.map(r=>[r.roomId,r]));
    grid.innerHTML='';
    for(const roomId of ROOMS){
      const r=byId.get(roomId)||{roomId,count:0,status:'waiting'};
      const card=document.createElement('div'); card.className='room-card';
      const status=r.status==='playing'?'ゲーム中':r.status==='finished'?'終了':'待機中';
      card.innerHTML=`<div class="room-name">${roomLabel(roomId)}</div><div class="room-meta">${status}<br>${r.count||0}/10人${r.hostName?`<br>HOST: ${escapeHtml(r.hostName)}`:''}</div><div class="room-actions"><button class="join-btn" type="button">${r.status==='playing'?'再接続のみ':'参加'}</button><button class="reset-btn" type="button">初期化</button></div>`;
      const [join,reset]=card.querySelectorAll('button');
      join.disabled=(r.status==='playing'||r.status==='finished') && !sessionForRoom(roomId);
      join.onclick=()=>joinRoom(roomId);
      reset.onclick=()=>resetRoom(roomId);
      grid.appendChild(card);
    }
  }
  function sessionForRoom(roomId){ const s=loadSession(); return s&&s.roomId===roomId?s:null; }
  function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}

  async function joinRoom(roomId, forcedSession=null){
    const inp=id('playerNameInput');
    const sess=forcedSession||sessionForRoom(roomId);
    const name=((inp?.value)||sess?.name||commonSavedName()).trim().slice(0,32);
    if(!name){setLobbyStatus('プレイヤー名を入力してください。','online-error'); return;}
    setLobbyStatus(`${roomLabel(roomId)}へ接続しています…`);
    try{
      const data=await request('/api/join',{method:'POST',body:{roomId,name,reconnectToken:sess?.token||null}});
      O.joined=true; O.roomId=roomId; O.token=data.token; O.playerId=data.playerId; O.isHost=!!data.isHost; O.status=data.status||'waiting'; O.roster=data.roster||[]; O.lastSnapshotVersion=0; O.pending=null; O.submittedRequestId=null; O.executionActive=false; O.allowRecovery=!!data.isHost && (O.status==='playing'); O.recoveryRunning=false;
      if(inp) inp.value=name;
      saveSession();
      renderJoinedLobby(); updateTopbar();
      startPolling();
      if(data.snapshot){
        O.lastSnapshotVersion=data.snapshotVersion||1;
        API()?.applyNetworkSnapshot(data.snapshot);
      }
      if(O.status==='playing'||O.status==='finished'){
        saveNameIfActualStart(); showLobby(false); renderWaitingUi();
      } else showLobby(true);
      setLobbyStatus('接続しました。','online-ok');
    }catch(e){
      if(e.status===403 && e.message==='ホスト権限がありません') setLobbyStatus('ホスト権限がありません','online-error');
      else setLobbyStatus(e.message||'ROOMへ参加できません。','online-error');
      if(sess && (e.status===401||e.status===404)){clearSession();}
    }
  }

  async function resetRoom(roomId){
    const name=((id('playerNameInput')?.value)||commonSavedName()).trim().slice(0,32);
    if(!name){setLobbyStatus('プレイヤー名を入力してください。','online-error'); return;}
    if(!confirm(`${roomLabel(roomId)}を初期化しますか？`)) return;
    try{
      await request('/api/reset',{method:'POST',body:{roomId,name,token:(O.roomId===roomId?O.token:null)}});
      if(O.roomId===roomId){stopPolling();O.joined=false;clearSession();showLobby(true);updateTopbar();}
      await refreshRooms(); setLobbyStatus(`${roomLabel(roomId)}を初期化しました。`,'online-ok');
    }catch(e){
      setLobbyStatus(e.message||'初期化できません。','online-error');
    }
  }

  function renderJoinedLobby(){
    id('roomBrowserView')?.classList.add('hidden'); id('roomJoinedView')?.classList.remove('hidden');
    if(id('joinedRoomTitle')) id('joinedRoomTitle').textContent=roomLabel(O.roomId);
    if(id('joinedRoomState')) id('joinedRoomState').textContent=O.status==='playing'?'ゲーム中':O.status==='finished'?'終了':'待機中';
    const list=id('roomPlayerList'); if(list){
      list.innerHTML=O.roster.map((r,i)=>`<div class="room-player-row"><div class="room-player-no">${i+1}</div><div class="room-player-name">${escapeHtml(r.name)}</div><div class="room-player-tag">${r.id===O.playerId?'あなた ':''}${r.isHost?'HOST':''}</div></div>`).join('');
    }
    const controls=id('roomHostControls'), wait=id('roomWaitText');
    if(controls){
      controls.innerHTML='';
      if(O.isHost && O.status!=='playing'){
        const b=document.createElement('button'); b.className='lobby-primary'; b.type='button'; b.textContent='レース設定 / 開始'; b.onclick=openOnlineSetup; controls.appendChild(b);
      }
    }
    if(wait){wait.textContent=O.isHost?'参加者が揃ったらレースを開始できます。':'ホストがレースを開始するまでお待ちください。';}
  }

  async function leaveRoom(){
    if(!O.joined) return;
    try{await request('/api/leave',{method:'POST',body:{roomId:O.roomId,token:O.token}});}catch{}
    stopPolling(); O.joined=false; O.roomId=null; O.token=null; O.playerId=null; O.isHost=false; O.status='waiting'; O.roster=[]; O.pending=null; clearSession();
    id('roomBrowserView')?.classList.remove('hidden'); id('roomJoinedView')?.classList.add('hidden');
    showLobby(true); updateTopbar(); refreshRooms();
  }

  function startPolling(){
    stopPolling();
    O.pollTimer=setInterval(pollState,650);
    pollState();
  }
  function stopPolling(){ if(O.pollTimer){clearInterval(O.pollTimer);O.pollTimer=null;} }

  async function pollState(){
    if(!O.joined) return;
    try{
      const data=await request(`/api/state?roomId=${encodeURIComponent(O.roomId)}&token=${encodeURIComponent(O.token)}`);
      O.status=data.status||O.status; O.roster=data.roster||O.roster; O.isHost=!!data.isHost;
      if(data.gameSessionId && data.gameSessionId!==O.currentGameSessionId){O.currentGameSessionId=data.gameSessionId;O.savedNameForSession=false;O.resultShownForSession=false;}
      if(data.snapshot && (data.snapshotVersion||0)>O.lastSnapshotVersion && !O.isHost){
        O.lastSnapshotVersion=data.snapshotVersion||O.lastSnapshotVersion;
        API()?.applyNetworkSnapshot(data.snapshot);
      }
      const newPending=data.pending||null;
      const key=newPending?`${newPending.requestId}:${newPending.type}`:null;
      if(key!==O.pendingKey){
        O.pending=newPending; O.pendingKey=key; O.submittedRequestId=null; O.draftGear=null;
        if(API()?.state){API().state.selected=[];API().state.discardSelected=[];}
      } else O.pending=newPending;
      if(O.status==='playing'||O.status==='finished'){
        saveNameIfActualStart(); showLobby(false); renderWaitingUi();
      }else{
        showLobby(true); renderJoinedLobby();
      }
      O.pin=data.pin||null; renderSharedPin();
      updateTopbar();
      if(O.isHost && O.status==='playing' && O.allowRecovery && !O.recoveryRunning && data.checkpoint){
        resumeHostFromCheckpoint(data.checkpoint);
      }
      if(!O.isHost){ renderPendingUi(); if(O.status==='finished') showRemoteResult(); }
    }catch(e){
      if(e.status===401||e.status===404){
        stopPolling(); O.joined=false; clearSession(); showLobby(true); updateTopbar();
        id('roomBrowserView')?.classList.remove('hidden'); id('roomJoinedView')?.classList.add('hidden');
        setLobbyStatus('ROOMとの接続が切れました。もう一度参加してください。','online-error');
      }
    }
  }

  function saveNameIfActualStart(){
    if(O.savedNameForSession) return;
    const me=API()?.localPlayer?.();
    if(me?.name){saveCommonNameOnActualStart(me.name); O.savedNameForSession=true;}
  }

  function renderWaitingUi(){
    if(O.isHost) return;
    const a=API(); if(!a||!a.state.started) return;
    if(!O.pending){
      const title=id('phaseTitle'),help=id('phaseHelp'),gear=id('gearControls'),acts=id('actionControls');
      if(title) title.textContent='他プレイヤーの処理待ち';
      if(help) help.textContent='ゲーム状態は自動同期されます。あなたの判断が必要になると操作ボタンが表示されます。';
      if(gear) gear.innerHTML=''; if(acts) acts.innerHTML='';
    }
  }

  function openOnlineSetup(){
    if(!O.joined||!O.isHost) return;
    const a=API(); if(!a) return;
    const maxCpu=Math.max(0,10-O.roster.length);
    const current=a.state.trackId||'classic';
    const cpuOpts=Array.from({length:maxCpu+1},(_,n)=>`<option value="${n}" ${n===0?'selected':''}>${n}台</option>`).join('');
    a.modal('ONLINE RACE',`<div class="setup-grid">
      <div class="setup-item"><label>参加者</label><input value="${O.roster.length}人" disabled></div>
      <div class="setup-item"><label>追加CPU（合計10台まで）</label><select id="onlineCpuSel">${cpuOpts}</select></div>
      <div class="setup-item"><label>周回数</label><select id="onlineLapSel"><option value="1">1周</option><option value="2" selected>2周</option><option value="3">3周</option></select></div>
      <div class="setup-item"><label>コース</label><select id="onlineTrackSel">
        <option value="classic" ${current==='classic'?'selected':''}>クラシック</option>
        <option value="burntisland" ${current==='burntisland'?'selected':''}>Burntisland</option>
        <option value="jarama" ${current==='jarama'?'selected':''}>Jarama</option>
        <option value="jerez" ${current==='jerez'?'selected':''}>Jerez</option>
      </select></div>
    </div><div class="notice">現在ROOMにいる参加者を人間プレイヤーとして登録します。残り枠はCPUを追加できます。</div><div class="setup-actions"><button id="onlineStartBtn" class="big-start">START RACE</button></div>`);
    id('onlineStartBtn').onclick=()=>startOnlineRace();
  }

  async function startOnlineRace(){
    if(!O.isHost) return;
    const a=API();
    const cpu=+id('onlineCpuSel').value||0, laps=+id('onlineLapSel').value||2, track=id('onlineTrackSel').value||'classic';
    a.closeModal();
    O.suppressRoundReady=true;
    a.startRaceWithRoster(O.roster,cpu,laps,track);
    const snap=a.makeNetworkSnapshot();
    try{
      const startActionId=uuid();
      const data=await request('/api/start',{method:'POST',body:{roomId:O.roomId,token:O.token,config:{cpu,laps,trackId:track},snapshot:snap,gameId:GAME_ID,gameName:GAME_NAME,startActionId}});
      O.status='playing'; O.currentGameSessionId=data.gameSessionId||null; O.lastSnapshotVersion=data.snapshotVersion||1; O.savedNameForSession=false; O.allowRecovery=false; O.executionActive=true; saveNameIfActualStart();
      O.suppressRoundReady=false; showLobby(false); updateTopbar();
      await saveCheckpoint('roundStart');
      await collectRoundChoices(true);
    }catch(e){
      O.suppressRoundReady=false; a.showMessage(`開始失敗\n${e.message}`,2000); showLobby(true);
    }
  }

  function queueSnapshot(){
    if(!O.joined||!O.isHost||O.status!=='playing'||O.suppressRoundReady) return;
    clearTimeout(O.snapshotTimer);
    O.snapshotTimer=setTimeout(()=>pushSnapshot().catch(()=>{}),120);
  }
  async function pushSnapshot(){
    if(!O.joined||!O.isHost||!API()?.state.started) return;
    const data=await request('/api/snapshot',{method:'POST',body:{roomId:O.roomId,token:O.token,snapshot:API().makeNetworkSnapshot()}});
    if(data.snapshotVersion) O.lastSnapshotVersion=data.snapshotVersion;
  }

  async function saveCheckpoint(kind,extra={}){
    if(!O.joined||!O.isHost||O.status!=='playing'||!API()?.state.started) return;
    const checkpoint=kind?{kind,extra,snapshot:API().makeNetworkSnapshot(),savedAt:Date.now()}:null;
    await request('/api/checkpoint',{method:'POST',body:{roomId:O.roomId,token:O.token,checkpoint}});
  }

  async function resumeHostFromCheckpoint(checkpoint){
    if(!checkpoint||!checkpoint.kind||!checkpoint.snapshot||O.recoveryRunning) return;
    O.recoveryRunning=true; O.allowRecovery=false; O.executionActive=true;
    const a=API();
    try{
      a.applyNetworkSnapshot(checkpoint.snapshot);
      a.showMessage('再接続\nゲーム状態を復元しました',1600);
      await pushSnapshot();
      if(checkpoint.kind==='roundStart'){
        await collectRoundChoices(true);
      }else if(checkpoint.kind==='beforeCar'){
        const info=checkpoint.extra||{};
        await a.resolveRound(false,{startIndex:Number(info.index)||0,orderIds:Array.isArray(info.orderIds)?info.orderIds:[]});
      }else if(checkpoint.kind==='beforeDiscard'){
        await handleDiscardPhase();
      }else if(checkpoint.kind==='betweenRounds'){
        O.executionActive=false;
        setTimeout(()=>a.nextRound(),150);
      }
    }catch(e){
      a.showMessage(`再接続処理に失敗\n${e.message||e}`,2000);
      O.executionActive=false;
    }finally{
      O.recoveryRunning=false;
    }
  }

  async function setPending(playerId,pending){
    await request('/api/pending',{method:'POST',body:{roomId:O.roomId,token:O.token,playerId,pending}});
  }
  async function getActions(){
    const data=await request(`/api/actions?roomId=${encodeURIComponent(O.roomId)}&token=${encodeURIComponent(O.token)}&after=${O.lastActionSeq}`);
    const acts=data.actions||[];
    for(const a of acts) O.lastActionSeq=Math.max(O.lastActionSeq,a.seq||0);
    return acts;
  }
  async function requestRemoteDecision(p,type,payload={}){
    const requestId=uuid();
    await setPending(p.onlinePlayerId,{requestId,type,payload});
    await pushSnapshot();
    try{
      while(O.joined&&O.isHost){
        const actions=await getActions();
        const hit=actions.find(a=>a.playerId===p.onlinePlayerId&&a.requestId===requestId&&a.type===type);
        if(hit) return hit.payload||{};
        await sleep(350);
      }
      return {};
    } finally {
      try{await setPending(p.onlinePlayerId,null);}catch{}
    }
  }

  async function collectRoundChoices(checkpointAlreadySaved=false){
    if(!O.isHost||O.suppressRoundReady) return;
    O.executionActive=true;
    const a=API(), st=a.state;
    if(!checkpointAlreadySaved) await saveCheckpoint('roundStart');
    let localCluttered=false;
    const me=a.localPlayer();
    if(me && !me.finished){
      st.phase='shift'; st.selected=[]; st.discardSelected=[];
      localCluttered=await new Promise(resolve=>{O.localRoundResolver=resolve; a.askHumanShift(); a.render();});
      O.localRoundResolver=null;
    }
    const remotes=st.players.filter(p=>!p.cpu&&!a.isLocalPlayer(p)&&!p.finished);
    for(const p of remotes){
      st.phase='onlineWait';
      if(id('phaseTitle')) id('phaseTitle').textContent=`${p.name} のカード選択待ち`;
      if(id('phaseHelp')) id('phaseHelp').textContent='他プレイヤーがギアとカードを選択しています。';
      if(id('gearControls')) id('gearControls').innerHTML=''; if(id('actionControls')) id('actionControls').innerHTML='';
      a.render(); await pushSnapshot();
      while(true){
        const payload=await requestRemoteDecision(p,'roundChoice',{gear:p.gear});
        const result=a.applyRemoteRoundChoice(p,payload);
        if(result.ok) break;
        a.log(`${p.name}: 無効なカード選択を再要求`);
      }
      a.render(); await pushSnapshot();
    }
    if(localCluttered && me) me.clutteredRound=true;
    await a.cpuChoices(); await pushSnapshot();
    await a.resolveRound(false);
  }

  async function remoteDecision(p,type){
    const a=API();
    if(type==='adrenaline'){
      const choice=await requestRemoteDecision(p,'adrenaline',{});
      if(choice.speed){p.speedThisRound+=1;a.movePlayerTo(p,a.settleDestination(p,p.progress+1));a.log(`${p.name}: アドレナリン 速度+1 / 1マス前進`);}
      if(choice.cooldown) await a.applyCooldown(p,1,'アドレナリン：クールダウン');
      a.render(); await pushSnapshot(); return;
    }
    if(type==='boost'){
      const choice=await requestRemoteDecision(p,'boost',{});
      if(choice.use) await a.doBoost(p); await pushSnapshot(); return;
    }
    if(type==='slipstream'){
      const choice=await requestRemoteDecision(p,'slipstream',{});
      if(choice.use && a.canSlipstream(p)) await a.doSlipstream(p); await pushSnapshot(); return;
    }
  }

  async function handleDiscardPhase(){
    const a=API(), st=a.state;
    const choices=new Map();
    for(const p of st.players.filter(p=>p.cpu&&!p.finished)) a.cpuDiscard(p);

    const me=a.localPlayer();
    if(me && !me.finished){
      st.phase='discard'; st.selected=[]; st.discardSelected=[];
      if(id('phaseTitle')) id('phaseTitle').textContent='⑧ 捨て札';
      if(id('phaseHelp')) id('phaseHelp').textContent='不要な速度カードを選び、確定してください。';
      if(id('gearControls')) id('gearControls').innerHTML='';
      a.render();
      const localIds=await new Promise(resolve=>{
        const acts=id('actionControls'); acts.innerHTML='';
        const b=a.button('捨て札を確定','primary',()=>{
          const ids=(st.discardSelected||[]).map(i=>me.hand[i]?.id).filter(Boolean);
          acts.innerHTML=''; resolve(ids);
        }); acts.appendChild(b);
      });
      choices.set(me.id,localIds);
    }

    for(const p of st.players.filter(p=>!p.cpu&&!a.isLocalPlayer(p)&&!p.finished)){
      st.phase='onlineWait'; a.render(); await pushSnapshot();
      const payload=await requestRemoteDecision(p,'discard',{});
      choices.set(p.id,Array.isArray(payload.cardIds)?payload.cardIds:[]);
    }

    for(const p of st.players){
      if(p.cpu) a.cleanupHumanAfterDiscard(p,[]);
      else a.cleanupHumanAfterDiscard(p,choices.get(p.id)||[]);
    }
    st.discardSelected=[]; a.render(); await pushSnapshot();
    a.finishRoundCleanup();
  }

  function renderPendingUi(){
    const a=API(); if(!a||!O.joined||O.isHost||!a.state.started) return;
    const p=a.localPlayer(); if(!p) return;
    if(!O.pending){renderWaitingUi();return;}
    const pending=O.pending;
    if(O.submittedRequestId===pending.requestId){
      if(id('phaseTitle')) id('phaseTitle').textContent='送信済み';
      if(id('phaseHelp')) id('phaseHelp').textContent='ホスト側の処理を待っています。';
      if(id('gearControls')) id('gearControls').innerHTML=''; if(id('actionControls')) id('actionControls').innerHTML='';
      return;
    }
    if(pending.type==='roundChoice') return renderRemoteRoundChoice(p,pending);
    if(pending.type==='discard') return renderRemoteDiscard(p,pending);
    const gear=id('gearControls'),acts=id('actionControls'); if(gear)gear.innerHTML=''; if(acts)acts.innerHTML='';
    if(pending.type==='adrenaline'){
      id('phaseTitle').textContent='④ アドレナリン'; id('phaseHelp').textContent='後方ボーナスを選択してください。';
      addAction('速度+1 / 1マス前進','primary',()=>submitPending({speed:true,cooldown:false}));
      addAction('クールダウン+1','ok',()=>submitPending({speed:false,cooldown:true}));
      addAction('両方使う','primary',()=>submitPending({speed:true,cooldown:true}));
      addAction('使わない','',()=>submitPending({speed:false,cooldown:false}));
    }else if(pending.type==='boost'){
      id('phaseTitle').textContent='⑤ ブースト'; id('phaseHelp').textContent='HEATを1枚使ってブーストしますか？';
      addAction('ブースト 🔥1','primary',()=>submitPending({use:true})); addAction('使わない','',()=>submitPending({use:false}));
    }else if(pending.type==='slipstream'){
      id('phaseTitle').textContent='⑥ スリップストリーム'; id('phaseHelp').textContent='2マス進みますか？';
      addAction('2マス進む','ok',()=>submitPending({use:true})); addAction('使わない','',()=>submitPending({use:false}));
    }
  }

  function renderRemoteRoundChoice(p,pending){
    const a=API(), st=a.state;
    if(O.draftGear==null) O.draftGear=p.gear;
    st.phase='shift';
    id('phaseTitle').textContent='① ギアとカードを選択';
    id('phaseHelp').textContent='ギアを選び、そのギアと同じ枚数のカードを選択してください。';
    const gears=id('gearControls'), acts=id('actionControls'); gears.innerHTML=''; acts.innerHTML='';
    for(let g=1;g<=4;g++){
      const diff=Math.abs(g-p.gear),cost=diff===2?1:0;
      if(diff>2) continue;
      const b=document.createElement('button'); b.textContent=`${g}速${g===1?' ❄3':g===2?' ❄1':''}${cost?' 🔥1':''}`;
      if(g===O.draftGear)b.classList.add('primary'); if(cost>p.engineHeat)b.disabled=true;
      b.onclick=()=>{O.draftGear=g; if(st.selected.length>g)st.selected=st.selected.slice(0,g); a.render(); renderPendingUi();};
      gears.appendChild(b);
    }
    a.renderHand();
    const legal=p.hand.filter(c=>c.type!=='heat').length;
    const cluttered=legal<O.draftGear;
    const confirm=document.createElement('button'); confirm.className='primary'; confirm.textContent=cluttered?'手札詰まりを処理':'カード決定';
    confirm.disabled=!cluttered&&st.selected.length!==O.draftGear;
    confirm.onclick=()=>{
      const cardIds=st.selected.map(i=>p.hand[i]?.id).filter(Boolean);
      submitPending({gear:O.draftGear,cardIds});
    };
    acts.appendChild(confirm);
    const info=document.createElement('span'); info.style.cssText='font-size:14px;color:#bcd0e4;align-self:center';
    info.textContent=`${st.selected.length}/${O.draftGear}枚　確定速度 ${a.selectedKnownSpeed()}${st.selected.some(i=>p.hand[i]?.type==='stress')?' + STRESS':''}`; acts.appendChild(info);
  }

  function renderRemoteDiscard(p,pending){
    const a=API(),st=a.state; st.phase='discard';
    id('phaseTitle').textContent='⑧ 捨て札'; id('phaseHelp').textContent='不要な速度カードを選択してください。STRESSとHEATは捨てられません。';
    id('gearControls').innerHTML=''; id('actionControls').innerHTML=''; a.renderHand();
    addAction('捨て札を確定 / 次へ','primary',()=>{
      const cardIds=st.discardSelected.map(i=>p.hand[i]?.id).filter(Boolean); submitPending({cardIds});
    });
  }
  function addAction(text,cls,fn){const b=document.createElement('button');b.textContent=text;if(cls)b.className=cls;b.onclick=fn;id('actionControls')?.appendChild(b);return b;}

  async function submitPending(payload){
    if(!O.pending||O.submittedRequestId===O.pending.requestId) return;
    const p=O.pending; O.submittedRequestId=p.requestId;
    try{
      await request('/api/action',{method:'POST',body:{roomId:O.roomId,token:O.token,requestId:p.requestId,type:p.type,payload,actionId:uuid()}});
      if(API()?.state){API().state.selected=[];API().state.discardSelected=[];}
      renderPendingUi();
    }catch(e){O.submittedRequestId=null; API()?.showMessage(`送信失敗\n${e.message}`,2000);}
  }

  function onLocalRoundChoiceCommitted(cluttered){
    if(O.localRoundResolver){const r=O.localRoundResolver;O.localRoundResolver=null;r(!!cluttered);}
  }

  async function raceFinished(){
    if(!O.isHost) return;
    O.executionActive=false; O.allowRecovery=false;
    try{await pushSnapshot(); await request('/api/finish',{method:'POST',body:{roomId:O.roomId,token:O.token}}); O.status='finished'; updateTopbar();}catch{}
  }

  function showRemoteResult(){
    if(O.resultShownForSession||!API()?.state?.started||API().state.phase!=='finished') return;
    O.resultShownForSession=true;
    const st=API().state;
    const finished=(st.winnerOrder||[]).map(pid=>st.players.find(p=>p.id===pid)).filter(Boolean);
    const used=new Set(finished.map(p=>p.id));
    const rest=st.players.filter(p=>!used.has(p.id)).sort((a,b)=>(b.progress||0)-(a.progress||0));
    const ranked=[...finished,...rest];
    const rows=ranked.map((p,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(p.name)}</td><td>${p.finishRound??'-'}</td><td>${p.finishProgress??Math.floor(p.progress||0)}</td></tr>`).join('');
    API().modal('RACE RESULT',`<table class="result-table"><thead><tr><th>順位</th><th>DRIVER</th><th>FINISH</th><th>DISTANCE</th></tr></thead><tbody>${rows}</tbody></table><div class="setup-actions"><button id="onlineResultClose" class="big-start">盤面を見る</button></div>`);
    setTimeout(()=>{const b=id('onlineResultClose');if(b)b.onclick=()=>API().closeModal();},0);
  }

  function renderSharedPin(){
    const layer=id('pinLayer'); if(!layer)return;
    layer.innerHTML='';
    const p=O.pin; if(!p||!Number.isFinite(+p.x)||!Number.isFinite(+p.y))return;
    const ns='http://www.w3.org/2000/svg';
    const ring=document.createElementNS(ns,'circle');ring.setAttribute('cx',p.x);ring.setAttribute('cy',p.y);ring.setAttribute('r','18');ring.setAttribute('class','shared-pin-ring');
    const dot=document.createElementNS(ns,'circle');dot.setAttribute('cx',p.x);dot.setAttribute('cy',p.y);dot.setAttribute('r','5');dot.setAttribute('class','shared-pin-dot');
    layer.append(ring,dot);
  }
  async function placePinFromEvent(e){
    if(!O.pinMode||!O.joined||(O.status!=='playing'&&O.status!=='finished'))return;
    O.pinMode=false;updateTopbar();
    const svg=id('trackSvg');if(!svg)return;
    const rect=svg.getBoundingClientRect();
    const vb=svg.viewBox.baseVal;
    const x=vb.x+(e.clientX-rect.left)/rect.width*vb.width;
    const y=vb.y+(e.clientY-rect.top)/rect.height*vb.height;
    try{const data=await request('/api/pin',{method:'POST',body:{roomId:O.roomId,token:O.token,x,y}});O.pin=data.pin||{x,y};renderSharedPin();}catch{}
  }

  function initUi(){
    const input=id('playerNameInput'); if(input&&!input.value) input.value=commonSavedName();
    id('leaveRoomBtn')?.addEventListener('click',leaveRoom); id('lobbyLeaveBtn')?.addEventListener('click',leaveRoom);
    id('pinBtn')?.addEventListener('click',()=>{O.pinMode=!O.pinMode;updateTopbar();});
    id('trackSvg')?.addEventListener('click',placePinFromEvent);
    const newBtn=id('newRaceBtn'); if(newBtn)newBtn.onclick=()=>{if(O.isHost)openOnlineSetup();};
    const s=loadSession();
    if(s){if(input)input.value=s.name||commonSavedName();joinRoom(s.roomId,s);}else refreshRooms();
    O.roomTimer=setInterval(refreshRooms,2500);
    updateTopbar(); showLobby(true);
  }

  window.HeatOnlineHooks = {
    getLocalPlayer(players){ return players?.find(p=>p.onlinePlayerId===O.playerId) || players?.[0] || null; },
    isLocalPlayer(p){ return !!p && (!!O.playerId ? p.onlinePlayerId===O.playerId : p.id===0); },
    selectionLimit(){
      if(O.joined&&!O.isHost&&O.pending?.type==='roundChoice') return O.draftGear??API()?.localPlayer()?.gear??0;
      return NaN;
    },
    canSelectCard(c){ if(O.joined&&!O.isHost) return O.pending?.type==='roundChoice' ? c.type!=='heat' : false; return null; },
    canSelectDiscard(c){ if(O.joined&&!O.isHost) return O.pending?.type==='discard' ? c.type==='speed' : false; return null; },
    onRoundReady(){ if(O.suppressRoundReady)return; if(O.joined&&O.isHost)collectRoundChoices(); },
    onLocalRoundChoiceCommitted,
    remoteDecision,
    handleDiscardPhase,
    async beforeResolveCar(p,index,orderIds){ if(O.joined&&O.isHost) await saveCheckpoint('beforeCar',{playerId:p?.id,index,orderIds}); },
    async beforeDiscardPhase(){ if(O.joined&&O.isHost) await saveCheckpoint('beforeDiscard'); },
    afterRoundCleanup(){
      if(O.joined&&O.isHost){
        O.executionActive=false;
        saveCheckpoint('betweenRounds').catch(()=>{}).finally(()=>setTimeout(()=>API()?.nextRound(),300));
      }
    },
    onRender(){ queueSnapshot(); },
    onRaceFinished:raceFinished,
    onAgain(){ if(O.isHost)openOnlineSetup(); },
  };

  window.addEventListener('load',initUi);
})();
