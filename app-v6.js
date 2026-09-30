(() => {
  const LOTS = [
    {
      id:"A",
      title:"Evaluating AI Thermal Imaging for Early PV Fault Detection",
      preview:{
        year:"2026",
        evidence:"2,400 thermal images",
        setting:"8 solar-PV sites",
        result:"93% detection accuracy"
      },
      intel1:[
        "Independent university research team",
        "Separate training and test datasets are reported",
        "Technician-confirmed faults are used as the comparison"
      ],
      final:[
        "Peer-reviewed journal article",
        "Large multi-site study with transparent methodology",
        "False positives, limitations and confidence intervals are reported",
        "Strong and directly relevant evidence"
      ]
    },
    {
      id:"B",
      title:"Evidence on AI Thermal Imaging for Early PV Fault Detection",
      preview:{
        year:"2025",
        evidence:"38 previous studies",
        setting:"Multiple countries and PV settings",
        result:"Overall performance synthesised"
      },
      intel1:[
        "More than 18,000 thermal images represented across included studies",
        "Search strategy and inclusion criteria are documented",
        "Quality of included studies is assessed"
      ],
      final:[
        "Peer-reviewed systematic review and meta-analysis",
        "Strong overview of the complete evidence base",
        "Useful for comparing many AI approaches",
        "Does not provide a new field experiment of its own"
      ]
    },
    {
      id:"C",
      title:"Australian Field Evaluation of AI Thermal PV Fault Detection",
      preview:{
        year:"2025",
        evidence:"Real maintenance + thermal inspection records",
        setting:"Australian commercial PV sites",
        result:"Automated alerts compared with confirmed faults"
      },
      intel1:[
        "Field-data collection process is documented",
        "Environmental effects such as heat and irradiance are considered",
        "Produced independently of a commercial AI vendor"
      ],
      final:[
        "Australian Government technical research report",
        "Strong real-world Australian evidence",
        "Transparent methodology and practical engineering relevance",
        "Not a peer-reviewed journal publication"
      ]
    },
    {
      id:"D",
      title:"Replication of AI Thermal PV Fault Detection",
      preview:{
        year:"2025",
        evidence:"1,100 thermal images",
        setting:"3 independent solar sites",
        result:"89% detection accuracy"
      },
      intel1:[
        "Independent team attempts to reproduce earlier findings",
        "Uses a clearly described evaluation method",
        "Smaller sample than Source A"
      ],
      final:[
        "Peer-reviewed journal article",
        "Independent replication increases confidence",
        "Directly relevant to the research question",
        "Smaller and less comprehensive than Source A"
      ]
    },
    {
      id:"E",
      title:"New AI Method for Early PV Fault Detection",
      preview:{
        year:"2026",
        evidence:"750 thermal images",
        setting:"Drone inspection of PV arrays",
        result:"95% detection accuracy"
      },
      intel1:[
        "Newly developed AI architecture",
        "Small number of field sites",
        "Results have not yet been independently replicated"
      ],
      final:[
        "Peer-reviewed engineering conference paper",
        "Very recent and directly relevant",
        "Promising but preliminary evidence",
        "Smaller study than the strongest journal evidence"
      ]
    },
    {
      id:"F",
      title:"Long-Term AI Thermal Imaging Study for PV Fault Detection",
      preview:{
        year:"2025",
        evidence:"Multiple experiments over 3 years",
        setting:"University + field datasets",
        result:"Several models compared"
      },
      intel1:[
        "Extensive methodology and literature review",
        "Includes dataset construction and repeated experiments",
        "Formally examined at a recognised university"
      ],
      final:[
        "Doctoral thesis",
        "Detailed and technically useful",
        "Strong source for methods, datasets and literature discovery",
        "Not equivalent to journal peer review"
      ]
    },
    {
      id:"G",
      title:"Latest Results in AI Thermal PV Fault Detection",
      preview:{
        year:"2026",
        evidence:"1,600 thermal images",
        setting:"4 solar sites",
        result:"94% detection accuracy"
      },
      intel1:[
        "University research team",
        "Methods and references are publicly available",
        "Uploaded very recently"
      ],
      final:[
        "Academic preprint",
        "Has not yet completed peer review",
        "Potentially valuable recent evidence",
        "Findings should be treated as provisional"
      ]
    },
    {
      id:"H",
      title:"Technical Validation of AI Thermal PV Fault Detection",
      preview:{
        year:"2026",
        evidence:"1,900 thermal images",
        setting:"Commercial PV installations",
        result:"97% detection accuracy"
      },
      intel1:[
        "Contains detailed technical diagrams and performance tables",
        "Testing was organised by the technology developer",
        "External academic references are included"
      ],
      final:[
        "Commercial company white paper",
        "Company sells the system being evaluated",
        "Useful technical detail but clear commercial interest",
        "Independent verification is needed"
      ]
    },
    {
      id:"I",
      title:"Study of AI Thermal Imaging for Early PV Fault Detection",
      preview:{
        year:"2025",
        evidence:"320 thermal images",
        setting:"Single solar site",
        result:"96% detection accuracy"
      },
      intel1:[
        "Contains graphs, references and a methods section",
        "Important test-split details are missing",
        "Publication review process is unclear"
      ],
      final:[
        "Journal-style online article with unclear review standards",
        "Small single-site dataset",
        "High accuracy claim is difficult to verify",
        "Methodological reporting is incomplete"
      ]
    },
    {
      id:"J",
      title:"AI Thermal Imaging Proves Early PV Fault Detection Works",
      preview:{
        year:"2026",
        evidence:"Sample size not stated",
        setting:"Solar-panel thermal inspection",
        result:"Claims 99% detection accuracy"
      },
      intel1:[
        "Several thermal examples are shown",
        "Author qualifications are unclear",
        "No reproducible evaluation method is provided"
      ],
      final:[
        "Marketing/personal blog article",
        "No traceable academic evidence",
        "Strong claims without transparent methodology",
        "Weak evidence for an engineering research argument"
      ]
    }
  ];

  // Hidden until results/debrief.
  const SOURCE_POINTS = {A:15,B:14,C:13,D:12,E:9,F:8,G:6,H:4,I:2,J:1};
  const MODEL_TOP6 = ["A","B","C","D","E","F"];
  const ALL_IDS = "ABCDEFGHIJ";
  const CONFETTI = ["#22d3ee","#a78bfa","#f472b6","#facc15","#34d399","#60a5fa","#fb923c"];

  let state = {
    startBudget:1000,
    minBid:50,
    bidStep:50,
    maxSources:3,
    lotIndex:0,
    bid:0,
    leader:null,
    sold:{},
    revealLevel:0,
    teams:Array.from({length:6},(_,i)=>({
      id:i+1,name:`Group ${i+1}`,cash:1000,sources:[],ranking:""
    }))
  };

  const $ = id => document.getElementById(id);
  const money = n => `$${Number(n||0).toLocaleString()}`;
  let tradeSeconds = 90, tradeHandle = null;
  let rankSeconds = 120, rankHandle = null;

  function toast(msg) {
    const el=$("toast");
    el.textContent=msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t=setTimeout(()=>el.classList.remove("show"),2300);
  }

  function showScreen(id){
    document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
    $(id).classList.add("active");
  }

  function phase(name){
    document.querySelectorAll(".phase").forEach(x=>x.classList.remove("active"));
    $(`phase${name}`).classList.add("active");

    const titles = {
      Auction:"Auction · 10 Mystery Sources",
      Reveal:"Source Intelligence",
      Trade:"Negotiation Floor",
      Rank:"Choose & Rank Top 6",
      Results:"Final Results"
    };
    $("phaseTitle").textContent=titles[name];

    ["Auction","Reveal","Trade","Rank","Results"].forEach(x=>$(`step${x}`).classList.remove("active"));
    $(`step${name}`).classList.add("active");
  }

  function start(){
    state.startBudget=Math.max(100,Number($("startingBudget").value)||1000);
    state.minBid=Math.max(10,Number($("minimumBid").value)||50);
    state.bidStep=Math.max(10,Number($("bidIncrement").value)||50);
    state.maxSources=Math.max(1,Math.min(10,Number($("maxSources").value)||3));
    state.teams.forEach(t=>t.cash=state.startBudget);

    showScreen("game");
    phase("Auction");
    renderAuction();
  }

  function lot(){ return LOTS[state.lotIndex]; }

  function renderAuction(){
    const l=lot();
    const sold=state.sold[l.id];
    const nextBid=state.bid?state.bid+state.bidStep:state.minBid;

    $("lotBadge").textContent=`LOT ${l.id} · ${state.lotIndex+1}/10`;
    $("lotState").textContent=sold?`SOLD TO ${state.teams[sold.teamId-1].name}`:"AVAILABLE";
    $("lotState").className=`status ${sold?"sold":""}`;
    $("lotTitle").textContent=`Mystery Source ${l.id}`;
    $("lotTeaser").textContent="All 10 lots investigate the same research question. Bid using only the evidence preview — the source identity stays hidden.";
    $("auctionClues").innerHTML=`
      <li><strong>Year:</strong> ${l.preview.year}</li>
      <li><strong>Evidence:</strong> ${l.preview.evidence}</li>
      <li><strong>Setting:</strong> ${l.preview.setting}</li>
      <li><strong>Reported result:</strong> ${l.preview.result}</li>
    `;
    $("bidAmount").textContent=money(state.bid);
    $("bidLeader").textContent=state.leader?state.teams[state.leader-1].name:"—";

    $("prevLot").disabled=state.lotIndex===0;
    $("nextLot").disabled=state.lotIndex===LOTS.length-1;
    $("soldBtn").disabled=Boolean(sold)||!state.leader;

    $("bidButtons").innerHTML=state.teams.map(t=>{
      const blocked=Boolean(sold)||t.cash<nextBid||t.sources.length>=state.maxSources;
      return `<button class="btn secondary" data-team-bid="${t.id}" ${blocked?"disabled":""}>
        <strong>${t.name}</strong>
        <small>${money(t.cash)} left · ${t.sources.length}/${state.maxSources} sources · next ${money(nextBid)}</small>
      </button>`;
    }).join("");

    document.querySelectorAll("[data-team-bid]").forEach(btn=>{
      btn.addEventListener("click",()=>placeBid(Number(btn.dataset.teamBid)));
    });

    renderAuctionTeams();

    $("finishAuction").disabled=Object.keys(state.sold).length!==LOTS.length;
  }

  function renderAuctionTeams(){
    $("auctionTeams").innerHTML=state.teams.map(t=>`
      <div class="team-card">
        <div class="team-row"><strong>${t.name}</strong><span class="cash">${money(t.cash)}</span></div>
        <div class="muted">Sources: ${t.sources.join(", ")||"—"}</div>
      </div>`).join("");
  }

  function placeBid(teamId){
    const t=state.teams[teamId-1];
    const next=state.bid?state.bid+state.bidStep:state.minBid;
    if(t.cash<next)return toast(`${t.name} cannot afford ${money(next)}.`);
    if(t.sources.length>=state.maxSources)return toast(`${t.name} already owns the maximum number of sources.`);
    state.bid=next;
    state.leader=teamId;
    renderAuction();
  }

  function changeLot(delta){
    state.lotIndex=Math.max(0,Math.min(LOTS.length-1,state.lotIndex+delta));
    state.bid=0;
    state.leader=null;
    renderAuction();
  }

  function sell(){
    if(!state.leader)return;
    const l=lot();
    if(state.sold[l.id])return;

    const team=state.teams[state.leader-1];
    if(team.cash<state.bid)return toast("That group no longer has enough money.");
    if(team.sources.length>=state.maxSources)return toast("That group already owns the maximum number of sources.");

    team.cash-=state.bid;
    team.sources.push(l.id);
    state.sold[l.id]={teamId:team.id,price:state.bid};

    soldAnimation();

    state.bid=0;
    state.leader=null;

    const next=LOTS.findIndex((x,idx)=>idx>state.lotIndex&&!state.sold[x.id]);
    if(next!==-1){
      setTimeout(()=>{
        state.lotIndex=next;
        renderAuction();
      },500);
    } else {
      renderAuction();
    }
  }

  function soldAnimation(){
    $("soldOverlay").classList.add("show");
    confetti();
    setTimeout(()=>$("soldOverlay").classList.remove("show"),850);
  }

  function confetti(){
    const wrap=document.createElement("div");
    wrap.className="confetti";
    for(let i=0;i<42;i++){
      const p=document.createElement("i");
      p.style.left=`${Math.random()*100}%`;
      p.style.background=CONFETTI[i%CONFETTI.length];
      p.style.setProperty("--drift",`${Math.random()*180-90}px`);
      p.style.setProperty("--spin",`${360+Math.random()*720}deg`);
      p.style.animationDelay=`${Math.random()*.16}s`;
      wrap.appendChild(p);
    }
    document.body.appendChild(wrap);
    setTimeout(()=>wrap.remove(),1700);
  }

  function openReveal(){
    phase("Reveal");
    renderIntel();
  }

  function renderIntel(){
    $("intelGrid").innerHTML=LOTS.map(l=>{
      let info=`<p class="muted">Information still hidden.</p>`;
      if(state.revealLevel===1){
        info=`<ul>${l.intel1.map(x=>`<li>${x}</li>`).join("")}</ul>`;
      } else if(state.revealLevel>=2){
        info=`<ul>${l.final.map(x=>`<li>${x}</li>`).join("")}</ul>`;
      }

      const owner=state.sold[l.id]?state.teams[state.sold[l.id].teamId-1].name:"Unsold";
      return `<article class="intel-card ${state.revealLevel?"reveal":""}" data-id="${l.id}">
        <div class="team-row"><strong>Source ${l.id}</strong><span>${owner}</span></div>
        <h3>${state.revealLevel ? l.title : `Mystery Source ${l.id}`}</h3>
        ${info}
      </article>`;
    }).join("");

    $("openTrading").disabled=state.revealLevel<2;
  }

  function reveal(level){
    state.revealLevel=Math.max(state.revealLevel,level);
    renderIntel();
  }

  function teamOptions(selected=""){
    return state.teams.map(t=>`<option value="${t.id}" ${String(t.id)===String(selected)?"selected":""}>${t.name}</option>`).join("");
  }

  function sourceOptions(teamId){
    const arr=state.teams[Number(teamId)-1]?.sources||[];
    return arr.length?arr.map(s=>`<option value="${s}">Source ${s}</option>`).join(""):`<option value="">No sources</option>`;
  }

  function openTrade(){
    phase("Trade");
    renderTrade();
  }

  function renderTrade(){
    const prev={
      seller:$("seller").value,buyer:$("buyer").value,
      a:$("swapGroupA").value,b:$("swapGroupB").value
    };

    $("seller").innerHTML=teamOptions(prev.seller||1);
    $("buyer").innerHTML=teamOptions(prev.buyer||2);
    $("swapGroupA").innerHTML=teamOptions(prev.a||1);
    $("swapGroupB").innerHTML=teamOptions(prev.b||2);

    if($("seller").value===$("buyer").value){
      $("buyer").value=String(state.teams.find(t=>String(t.id)!==$("seller").value)?.id||1);
    }
    if($("swapGroupA").value===$("swapGroupB").value){
      $("swapGroupB").value=String(state.teams.find(t=>String(t.id)!==$("swapGroupA").value)?.id||1);
    }

    updateTradeSources();

    $("tradeTeams").innerHTML=state.teams.map(t=>`
      <div class="portfolio-card">
        <div class="team-row"><strong>${t.name}</strong><span class="cash">${money(t.cash)}</span></div>
        <div class="muted">Owns: ${t.sources.join(", ")||"—"}</div>
      </div>`).join("");
  }

  function updateTradeSources(){
    $("sellerSource").innerHTML=sourceOptions($("seller").value);
    $("swapSourceA").innerHTML=sourceOptions($("swapGroupA").value);
    $("swapSourceB").innerHTML=sourceOptions($("swapGroupB").value);
  }

  function recordSale(){
    const sellerId=Number($("seller").value);
    const buyerId=Number($("buyer").value);
    const source=$("sellerSource").value;
    const price=Math.max(0,Number($("tradePrice").value)||0);

    if(sellerId===buyerId)return toast("Seller and buyer must be different groups.");
    if(!source)return toast("The seller has no source selected.");

    const seller=state.teams[sellerId-1];
    const buyer=state.teams[buyerId-1];

    if(!seller.sources.includes(source))return toast("That seller no longer owns the selected source.");
    if(buyer.cash<price)return toast(`${buyer.name} cannot afford ${money(price)}.`);
    if(buyer.sources.length>=state.maxSources)return toast(`${buyer.name} already owns the maximum number of sources.`);

    seller.sources=seller.sources.filter(s=>s!==source);
    buyer.sources.push(source);
    buyer.cash-=price;
    seller.cash+=price;

    if(state.sold[source])state.sold[source].teamId=buyer.id;

    toast(`Deal recorded: ${source} → ${buyer.name} for ${money(price)}.`);
    renderTrade();
  }

  function recordSwap(){
    const aId=Number($("swapGroupA").value);
    const bId=Number($("swapGroupB").value);
    const aSource=$("swapSourceA").value;
    const bSource=$("swapSourceB").value;

    if(aId===bId)return toast("Choose two different groups.");
    if(!aSource||!bSource)return toast("Both groups need a source to swap.");

    const a=state.teams[aId-1];
    const b=state.teams[bId-1];

    if(!a.sources.includes(aSource)||!b.sources.includes(bSource))return toast("One of those groups no longer owns that source.");

    a.sources=a.sources.filter(s=>s!==aSource);
    b.sources=b.sources.filter(s=>s!==bSource);
    a.sources.push(bSource);
    b.sources.push(aSource);

    if(state.sold[aSource])state.sold[aSource].teamId=b.id;
    if(state.sold[bSource])state.sold[bSource].teamId=a.id;

    toast(`Swap recorded: ${aSource} ↔ ${bSource}.`);
    renderTrade();
  }

  function openRank(){
    phase("Rank");
    renderRanking();
  }

  function renderRanking(){
    $("rankingGrid").innerHTML=state.teams.map(t=>`
      <div class="rank-card">
        <h3>${t.name}</h3>
        <p class="muted">Enter 6 different letters from A–J. Spaces, commas and arrows are okay.</p>
        <label>Strongest → weakest
          <input data-ranking="${t.id}" value="${t.ranking}" placeholder="A C B E D G">
        </label>
        <div id="feedback-${t.id}" class="feedback"></div>
      </div>`).join("");

    document.querySelectorAll("[data-ranking]").forEach(input=>{
      input.addEventListener("input",()=>{
        const id=Number(input.dataset.ranking);
        state.teams[id-1].ranking=normalizeRanking(input.value);
        validateRanking(id,input);
      });
      validateRanking(Number(input.dataset.ranking),input);
    });
  }

  function normalizeRanking(raw){
    return String(raw||"").toUpperCase().replace(/[^A-J]/g,"").slice(0,6);
  }

  function validateRanking(teamId,inputEl=null){
    const team=state.teams[teamId-1];
    const r=normalizeRanking(team.ranking);
    team.ranking=r;
    const valid=r.length===6&&new Set(r).size===6&&[...r].every(c=>ALL_IDS.includes(c));
    const fb=$(`feedback-${teamId}`);

    if(!r){
      fb.textContent="";
      return false;
    }

    if(valid){
      fb.style.color="#86efac";
      fb.textContent=`Saved as ${r.split("").join(" → ")}`;
      if(inputEl && document.activeElement!==inputEl)inputEl.value=r.split("").join(" ");
    }else{
      fb.style.color="#fda4af";
      fb.textContent="Need exactly 6 different sources from A–J.";
    }
    return valid;
  }

  function rankingPoints(r){
    r=normalizeRanking(r);
    let selected=0, exact=0;
    [...r].forEach((source,index)=>{
      if(MODEL_TOP6.includes(source))selected+=2;
      if(MODEL_TOP6[index]===source)exact+=1;
    });
    return {points:selected+exact,correctSources:selected/2,exact};
  }

  function calculate(){
    let valid=true;
    state.teams.forEach(t=>{
      const input=document.querySelector(`[data-ranking="${t.id}"]`);
      if(!validateRanking(t.id,input))valid=false;
    });

    if(!valid){
      toast("Please enter a valid Top 6 for every group before calculating.");
      return;
    }

    const rows=state.teams.map(t=>{
      const portfolio=t.sources.reduce((sum,s)=>sum+(SOURCE_POINTS[s]||0),0);
      const cashBonus=Math.min(5,Math.floor(t.cash/100));
      const rank=rankingPoints(t.ranking);
      return {
        ...t,
        portfolio,
        cashBonus,
        rankPoints:rank.points,
        correctSources:rank.correctSources,
        exactPositions:rank.exact,
        total:portfolio+cashBonus+rank.points
      };
    }).sort((a,b)=>b.total-a.total||b.cash-a.cash);

    phase("Results");

    const top=rows[0];
    const tied=rows.filter(r=>r.total===top.total);
    $("winnerName").textContent=tied.length===1?top.name:tied.map(r=>r.name).join(" & ");
    $("winnerPoints").textContent=`${top.total} points`;

    $("resultTable").innerHTML=`
      <div class="table-wrap">
        <table class="results">
          <thead>
            <tr>
              <th>Place</th>
              <th>Group</th>
              <th>Final Sources</th>
              <th>Cash</th>
              <th>Top 6</th>
              <th>Portfolio</th>
              <th>Cash</th>
              <th>Ranking</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((r,i)=>`
              <tr>
                <td>${i+1}</td>
                <td><strong>${r.name}</strong></td>
                <td>${r.sources.join(", ")||"—"}</td>
                <td>${money(r.cash)}</td>
                <td>${r.ranking.split("").join(" → ")}
                  <div class="muted">${r.correctSources}/6 model sources · ${r.exactPositions} exact positions</div>
                </td>
                <td>${r.portfolio}</td>
                <td>${r.cashBonus}</td>
                <td>${r.rankPoints}</td>
                <td><strong>${r.total}</strong></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`;

    confetti();
  }

  function timer(which){
    const isTrade=which==="trade";
    let seconds=isTrade?tradeSeconds:rankSeconds;
    let handle=isTrade?tradeHandle:rankHandle;

    if(handle)return;

    handle=setInterval(()=>{
      if(isTrade)tradeSeconds=Math.max(0,tradeSeconds-1);
      else rankSeconds=Math.max(0,rankSeconds-1);

      renderTimers();

      const left=isTrade?tradeSeconds:rankSeconds;
      if(left===0){
        clearInterval(handle);
        if(isTrade)tradeHandle=null; else rankHandle=null;
        toast(isTrade?"Negotiation time is up!":"Ranking time is up!");
      }
    },1000);

    if(isTrade)tradeHandle=handle; else rankHandle=handle;
  }

  function resetTimer(which){
    if(which==="trade"){
      clearInterval(tradeHandle);tradeHandle=null;tradeSeconds=90;
    }else{
      clearInterval(rankHandle);rankHandle=null;rankSeconds=120;
    }
    renderTimers();
  }

  function renderTimers(){
    const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
    $("tradeTimer").textContent=fmt(tradeSeconds);
    $("rankTimer").textContent=fmt(rankSeconds);
  }

  $("startBtn").addEventListener("click",start);
  $("prevLot").addEventListener("click",()=>changeLot(-1));
  $("nextLot").addEventListener("click",()=>changeLot(1));
  $("soldBtn").addEventListener("click",sell);
  $("finishAuction").addEventListener("click",openReveal);
  $("reveal1Btn").addEventListener("click",()=>reveal(1));
  $("reveal2Btn").addEventListener("click",()=>reveal(2));
  $("openTrading").addEventListener("click",openTrade);

  ["seller","swapGroupA","swapGroupB"].forEach(id=>$(id).addEventListener("change",updateTradeSources));
  $("recordSale").addEventListener("click",recordSale);
  $("recordSwap").addEventListener("click",recordSwap);
  $("startTradeTimer").addEventListener("click",()=>timer("trade"));
  $("resetTradeTimer").addEventListener("click",()=>resetTimer("trade"));
  $("finishTrading").addEventListener("click",openRank);

  $("startRankTimer").addEventListener("click",()=>timer("rank"));
  $("resetRankTimer").addEventListener("click",()=>resetTimer("rank"));
  $("calculateResults").addEventListener("click",calculate);
  $("restart").addEventListener("click",()=>location.reload());

  renderTimers();
})();
