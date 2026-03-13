import { useState, useEffect, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

/* ══════════════════════════════════════════════
   DESIGN: Deep Space Control Room
   Tone: Premium dark-first SaaS — like Vercel
   meets Linear meets a Bloomberg terminal.
   Unforgettable: Glowing metric cards, live
   animated ticker, cinematic sidebar.
══════════════════════════════════════════════ */

// ── DATA ──────────────────────────────────────
const revenueData = [
  { month:"Jan", revenue:42000, expenses:28000, profit:14000 },
  { month:"Feb", revenue:51000, expenses:31000, profit:20000 },
  { month:"Mar", revenue:47000, expenses:29000, profit:18000 },
  { month:"Apr", revenue:63000, expenses:35000, profit:28000 },
  { month:"May", revenue:58000, expenses:32000, profit:26000 },
  { month:"Jun", revenue:72000, expenses:38000, profit:34000 },
  { month:"Jul", revenue:68000, expenses:36000, profit:32000 },
  { month:"Aug", revenue:84000, expenses:41000, profit:43000 },
  { month:"Sep", revenue:79000, expenses:39000, profit:40000 },
  { month:"Oct", revenue:91000, expenses:44000, profit:47000 },
  { month:"Nov", revenue:96000, expenses:46000, profit:50000 },
  { month:"Dec", revenue:112000, expenses:52000, profit:60000 },
];

const trafficData = [
  { day:"Mon", visits:4200, unique:2800, bounce:38 },
  { day:"Tue", visits:5800, unique:3900, bounce:32 },
  { day:"Wed", visits:5100, unique:3400, bounce:35 },
  { day:"Thu", visits:6700, unique:4500, bounce:29 },
  { day:"Fri", visits:7200, unique:4900, bounce:27 },
  { day:"Sat", visits:4800, unique:3100, bounce:41 },
  { day:"Sun", visits:3900, unique:2600, bounce:44 },
];

const channelData = [
  { name:"Organic", value:38, color:"#5ba8ff" },
  { name:"Direct",  value:24, color:"#a78bfa" },
  { name:"Social",  value:20, color:"#f472b6" },
  { name:"Email",   value:11, color:"#2dd4bf" },
  { name:"Paid",    value:7,  color:"#fbbf24" },
];

const conversionData = [
  { name:"Visitors", value:100, fill:"#1e3a5f" },
  { name:"Leads",    value:68,  fill:"#5ba8ff" },
  { name:"Signups",  value:42,  fill:"#a78bfa" },
  { name:"Paying",   value:18,  fill:"#2dd4bf" },
];

const users = [
  { id:1, name:"Aria Chen",       email:"aria@techcorp.io",    role:"Admin",    status:"Active",   revenue:"$12,400", joined:"Jan 2024", avatar:"AC", color:"#5ba8ff" },
  { id:2, name:"Marcus Webb",     email:"m.webb@growfast.co",  role:"Manager",  status:"Active",   revenue:"$8,920",  joined:"Mar 2024", avatar:"MW", color:"#a78bfa" },
  { id:3, name:"Fatima Al-Said",  email:"f.alsaid@nexus.com",  role:"Designer", status:"Active",   revenue:"$6,750",  joined:"Feb 2024", avatar:"FS", color:"#f472b6" },
  { id:4, name:"Jake Thornton",   email:"jake@venture.io",     role:"Dev",      status:"Inactive", revenue:"$4,300",  joined:"Apr 2024", avatar:"JT", color:"#2dd4bf" },
  { id:5, name:"Priya Sharma",    email:"priya@cloudstack.in", role:"Analyst",  status:"Active",   revenue:"$9,100",  joined:"Jan 2024", avatar:"PS", color:"#fbbf24" },
  { id:6, name:"Leo Müller",      email:"leo@datastudio.de",   role:"Manager",  status:"Active",   revenue:"$11,200", joined:"May 2024", avatar:"LM", color:"#34d399" },
  { id:7, name:"Sofia Okafor",    email:"sofia@launchpad.ng",  role:"Dev",      status:"Pending",  revenue:"$3,800",  joined:"Jun 2024", avatar:"SO", color:"#f97316" },
];

const recentActivity = [
  { icon:"💰", text:"New subscription — Pro Plan", time:"2m ago",  color:"#2dd4bf" },
  { icon:"👤", text:"User signup — Priya Sharma",  time:"14m ago", color:"#5ba8ff" },
  { icon:"⚠️", text:"Server load spike detected",  time:"31m ago", color:"#fbbf24" },
  { icon:"✅", text:"Deployment #481 successful",   time:"1h ago",  color:"#34d399" },
  { icon:"💳", text:"Payment failed — retry #3",    time:"2h ago",  color:"#f472b6" },
  { icon:"📊", text:"Monthly report generated",     time:"3h ago",  color:"#a78bfa" },
];

const navItems = [
  { icon:"⬡",  label:"Overview",   id:"overview",  badge:null },
  { icon:"📈", label:"Analytics",  id:"analytics", badge:null },
  { icon:"👥", label:"Users",      id:"users",     badge:"7" },
  { icon:"💳", label:"Revenue",    id:"revenue",   badge:null },
  { icon:"📦", label:"Products",   id:"products",  badge:"3" },
  { icon:"🔔", label:"Alerts",     id:"alerts",    badge:"12" },
  { icon:"⚙️", label:"Settings",   id:"settings",  badge:null },
];

// ── THEME ─────────────────────────────────────
const themes = {
  dark: {
    bg:      "#050c1d",
    bg2:     "#060f20",
    surf:    "#0b1829",
    surf2:   "#0f1f32",
    border:  "rgba(91,168,255,.09)",
    border2: "rgba(91,168,255,.2)",
    tx:      "#e2eeff",
    tx2:     "#7a99be",
    tx3:     "#3d5470",
    blue:    "#5ba8ff",
    violet:  "#a78bfa",
    pink:    "#f472b6",
    teal:    "#2dd4bf",
    amber:   "#fbbf24",
    green:   "#34d399",
    grid:    "rgba(91,168,255,.04)",
    chartBg: "transparent",
    sidebar: "#060f20",
  },
  light: {
    bg:      "#f0f5ff",
    bg2:     "#e8efff",
    surf:    "#ffffff",
    surf2:   "#f5f9ff",
    border:  "rgba(59,130,246,.12)",
    border2: "rgba(59,130,246,.3)",
    tx:      "#0f172a",
    tx2:     "#475569",
    tx3:     "#94a3b8",
    blue:    "#2563eb",
    violet:  "#7c3aed",
    pink:    "#db2777",
    teal:    "#0d9488",
    amber:   "#d97706",
    green:   "#059669",
    grid:    "rgba(59,130,246,.06)",
    chartBg: "transparent",
    sidebar: "#0f172a",
  },
};

// ── HELPERS ───────────────────────────────────
const fmt = (n) => n >= 1000 ? `$${(n/1000).toFixed(1)}k` : `$${n}`;
const fmtNum = (n) => n.toLocaleString();

function useAnimatedCounter(target, duration=1400) {
  const [val, setVal] = useState(0);
  const startRef = useRef(null);
  useEffect(() => {
    startRef.current = null;
    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(target * ease));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  return val;
}

// ── CUSTOM TOOLTIP ────────────────────────────
function CustomTooltip({ active, payload, label, t }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: t.surf2, border: `1px solid ${t.border2}`,
      borderRadius: 8, padding: "12px 16px",
      fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
      boxShadow: `0 16px 48px rgba(0,0,0,.5)`,
    }}>
      <div style={{ color: t.tx2, marginBottom: 8, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 11 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, display: "flex", gap: 10, alignItems: "center", marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, display: "inline-block" }}/>
          <span style={{ color: t.tx2 }}>{p.name}:</span>
          <span style={{ color: t.tx, fontWeight: 600 }}>
            {typeof p.value === "number" && p.value > 1000 ? `$${(p.value/1000).toFixed(1)}k` : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── METRIC CARD ───────────────────────────────
function MetricCard({ label, value, prefix="", suffix="", delta, icon, color, t, delay=0 }) {
  const count = useAnimatedCounter(typeof value === "number" ? value : 0);
  const isUp = delta >= 0;
  return (
    <div style={{
      background: t.surf, border: `1px solid ${t.border}`,
      borderRadius: 14, padding: "24px 22px", position: "relative",
      overflow: "hidden", cursor: "default",
      animation: `fadeUp .6s ${delay}s both`,
      transition: "border-color .3s, transform .3s",
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateY(-3px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = ""; }}
    >
      {/* glow */}
      <div style={{ position:"absolute", top:-40, right:-40, width:120, height:120, borderRadius:"50%", background:`radial-gradient(circle,${color}22,transparent 70%)`, pointerEvents:"none" }}/>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
        <span style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", letterSpacing:"0.16em", textTransform:"uppercase", color: t.tx2 }}>{label}</span>
        <span style={{ fontSize:22, lineHeight:1 }}>{icon}</span>
      </div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.8rem,2.5vw,2.4rem)", fontWeight:800, color: t.tx, letterSpacing:"-1.5px", lineHeight:1, marginBottom:12 }}>
        {prefix}{typeof value === "number" ? fmtNum(count) : value}{suffix}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color: isUp ? t.green : t.pink, background: isUp ? `${t.green}18` : `${t.pink}18`, padding:"3px 8px", borderRadius:4, fontWeight:600 }}>
          {isUp ? "↑" : "↓"} {Math.abs(delta)}%
        </span>
        <span style={{ fontSize:11, color: t.tx3 }}>vs last month</span>
      </div>
    </div>
  );
}

// ── SIDEBAR ───────────────────────────────────
function Sidebar({ active, setActive, dark, setDark, t, collapsed, setCollapsed }) {
  return (
    <aside style={{
      width: collapsed ? 68 : 230, minHeight:"100vh", flexShrink:0,
      background: t.sidebar, borderRight:`1px solid ${t.border}`,
      display:"flex", flexDirection:"column",
      transition:"width .3s cubic-bezier(.16,1,.3,1)",
      position:"sticky", top:0, zIndex:100, overflow:"hidden",
    }}>
      {/* Logo */}
      <div style={{ padding:"24px 18px 20px", borderBottom:`1px solid ${t.border}`, display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#5ba8ff,#a78bfa)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:16, color:"#fff", flexShrink:0 }}>H</div>
        {!collapsed && <div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:15, color: t.tx, letterSpacing:"-.3px" }}>HZ Dashboard</div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color: t.tx3, letterSpacing:"0.1em" }}>ANALYTICS</div>
        </div>}
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"12px 10px", display:"flex", flexDirection:"column", gap:2, overflowY:"auto" }}>
        {navItems.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => setActive(item.id)} style={{
              display:"flex", alignItems:"center", gap:12, padding: collapsed ? "12px 14px" : "11px 14px",
              borderRadius:9, border:"none", cursor:"pointer", width:"100%", textAlign:"left",
              background: isActive ? `linear-gradient(135deg,rgba(91,168,255,.18),rgba(167,139,250,.12))` : "transparent",
              borderLeft: isActive ? `2px solid #5ba8ff` : "2px solid transparent",
              transition:"all .2s",
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = `rgba(91,168,255,.07)`; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize:18, flexShrink:0 }}>{item.icon}</span>
              {!collapsed && <>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight: isActive ? 600 : 400, color: isActive ? "#5ba8ff" : t.tx2, flex:1 }}>{item.label}</span>
                {item.badge && <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, background:"#5ba8ff22", color:"#5ba8ff", border:"1px solid #5ba8ff44", borderRadius:4, padding:"2px 6px" }}>{item.badge}</span>}
              </>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding:"12px 10px", borderTop:`1px solid ${t.border}`, display:"flex", flexDirection:"column", gap:8 }}>
        {/* Theme toggle */}
        <button onClick={() => setDark(!dark)} style={{
          display:"flex", alignItems:"center", gap:12, padding: collapsed ? "10px 14px" : "10px 14px",
          borderRadius:9, border:`1px solid ${t.border}`, cursor:"pointer", background:"transparent",
          transition:"all .25s", width:"100%",
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "#5ba8ff"}
        onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
        >
          <span style={{ fontSize:16, flexShrink:0 }}>{dark ? "☀️" : "🌙"}</span>
          {!collapsed && <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color: t.tx2 }}>{dark ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        {/* Collapse */}
        <button onClick={() => setCollapsed(!collapsed)} style={{
          display:"flex", alignItems:"center", justifyContent: collapsed ? "center" : "flex-start", gap:12,
          padding:"10px 14px", borderRadius:9, border:`1px solid ${t.border}`,
          cursor:"pointer", background:"transparent", transition:"all .25s", width:"100%",
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "#5ba8ff"}
        onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
        >
          <span style={{ fontSize:14, flexShrink:0, color: t.tx2 }}>{collapsed ? "→" : "←"}</span>
          {!collapsed && <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color: t.tx2 }}>Collapse</span>}
        </button>
        {/* User */}
        {!collapsed && (
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 10px 4px" }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#f472b6,#a78bfa)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:12, color:"#fff", flexShrink:0 }}>HZ</div>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color: t.tx }}>Habiba Zahid</div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color: t.teal, letterSpacing:"0.06em" }}>Admin</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

// ── TICKER BAR ────────────────────────────────
function TickerBar({ t }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(i); }, []);
  const metrics = ["↑ DAU +18.4%","↓ Churn 2.1%","↑ MRR $91.2k","↑ NPS 74","↓ Latency 142ms","↑ Uptime 99.98%"];
  return (
    <div style={{ background: t.surf, borderBottom:`1px solid ${t.border}`, padding:"10px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:20, overflow:"hidden", flexShrink:0 }}>
      <div style={{ display:"flex", gap:28, overflow:"hidden", animation:"ticker 30s linear infinite" }}>
        {[...metrics,...metrics].map((m,i) => (
          <span key={i} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color: m.startsWith("↑") ? t.teal : t.pink, whiteSpace:"nowrap", letterSpacing:"0.08em" }}>{m}</span>
        ))}
      </div>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color: t.tx3, flexShrink:0 }}>
        {time.toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit",second:"2-digit"})} PKT
      </div>
    </div>
  );
}

// ── OVERVIEW PAGE ─────────────────────────────
function Overview({ t }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
      {/* Metric cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
        <MetricCard label="Total Revenue"  value={847200} prefix="$" delta={12.4} icon="💰" color="#2dd4bf" t={t} delay={0} />
        <MetricCard label="Active Users"   value={24891}             delta={8.7}  icon="👥" color="#5ba8ff" t={t} delay={.05} />
        <MetricCard label="Conversions"    value={3847}              delta={-2.1} icon="🎯" color="#a78bfa" t={t} delay={.1} />
        <MetricCard label="Avg Order Val"  value={220}  prefix="$"   delta={5.3}  icon="📦" color="#fbbf24" t={t} delay={.15} />
      </div>

      {/* Revenue chart + Activity feed */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:14 }}>
        <ChartCard title="Revenue Overview" subtitle="Monthly revenue, expenses & profit" t={t}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData} margin={{ top:10, right:10, left:-10, bottom:0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5ba8ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#5ba8ff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="prof" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={t.grid} />
              <XAxis dataKey="month" tick={{ fill:t.tx3, fontSize:11, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:t.tx3, fontSize:11, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}k`} />
              <Tooltip content={<CustomTooltip t={t}/>} />
              <Area type="monotone" dataKey="revenue" stroke="#5ba8ff" strokeWidth={2} fill="url(#rev)" name="Revenue" />
              <Area type="monotone" dataKey="profit" stroke="#2dd4bf" strokeWidth={2} fill="url(#prof)" name="Profit" />
              <Line type="monotone" dataKey="expenses" stroke="#f472b6" strokeWidth={1.5} dot={false} name="Expenses" strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Live Activity" subtitle="Real-time events" t={t}>
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {recentActivity.map((a,i) => (
              <div key={i} style={{ display:"flex", gap:12, padding:"11px 0", borderBottom: i < recentActivity.length-1 ? `1px solid ${t.border}` : "none", alignItems:"flex-start", animation:`fadeUp .4s ${i*.06}s both` }}>
                <div style={{ width:32, height:32, borderRadius:8, background:`${a.color}18`, border:`1px solid ${a.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{a.icon}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12.5, color: t.tx, lineHeight:1.4, marginBottom:3 }}>{a.text}</div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color: t.tx3 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Traffic + Channels + Funnel */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 280px 260px", gap:14 }}>
        <ChartCard title="Weekly Traffic" subtitle="Visits & unique visitors" t={t}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={trafficData} margin={{ top:10, right:10, left:-10, bottom:0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.grid} />
              <XAxis dataKey="day" tick={{ fill:t.tx3, fontSize:11, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:t.tx3, fontSize:11, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip t={t}/>} />
              <Bar dataKey="visits" fill="#5ba8ff" radius={[4,4,0,0]} name="Visits" />
              <Bar dataKey="unique" fill="#a78bfa" radius={[4,4,0,0]} name="Unique" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Traffic Sources" subtitle="Channel breakdown" t={t}>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={channelData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                {channelData.map((d,i) => <Cell key={i} fill={d.color} stroke="none" />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ background: t.surf2, border:`1px solid ${t.border2}`, borderRadius:8, fontFamily:"JetBrains Mono", fontSize:12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {channelData.map((d,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:d.color, display:"inline-block" }}/>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color: t.tx2 }}>{d.name}</span>
                </div>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color: t.tx, fontWeight:600 }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Conversion Funnel" subtitle="Visitor → Customer" t={t}>
          <ResponsiveContainer width="100%" height={180}>
            <RadialBarChart cx="50%" cy="50%" innerRadius={20} outerRadius={90} data={conversionData} startAngle={90} endAngle={-270}>
              <RadialBar minAngle={15} background={{ fill: t.grid }} dataKey="value" cornerRadius={4} />
              <Tooltip contentStyle={{ background: t.surf2, border:`1px solid ${t.border2}`, borderRadius:8, fontFamily:"JetBrains Mono", fontSize:12 }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {conversionData.slice(1).map((d,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ width:8, height:8, borderRadius:2, background:d.fill, display:"inline-block" }}/>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color: t.tx2 }}>{d.name}</span>
                </div>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color: t.tx, fontWeight:600 }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

// ── USERS PAGE ────────────────────────────────
function UsersPage({ t }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filter, setFilter] = useState("All");

  const filtered = users
    .filter(u => filter === "All" || u.status === filter)
    .filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => a[sortBy]?.localeCompare?.(b[sortBy]) ?? 0);

  const statusColor = { Active: "#2dd4bf", Inactive: "#7a99be", Pending: "#fbbf24" };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* Controls */}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ position:"relative", flex:1, minWidth:200 }}>
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color: t.tx3, fontSize:14 }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search users..."
            style={{ width:"100%", padding:"10px 12px 10px 36px", background: t.surf, border:`1px solid ${t.border}`, borderRadius:9, color: t.tx, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }} />
        </div>
        {["All","Active","Inactive","Pending"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding:"9px 18px", borderRadius:8, border:`1px solid ${filter===f ? "#5ba8ff" : t.border}`, background: filter===f ? "rgba(91,168,255,.12)" : t.surf, color: filter===f ? "#5ba8ff" : t.tx2, fontFamily:"'JetBrains Mono',monospace", fontSize:12, cursor:"pointer", transition:"all .2s" }}>{f}</button>
        ))}
        <button style={{ padding:"9px 18px", borderRadius:8, border:"none", background:"linear-gradient(135deg,#3b82f6,#a78bfa)", color:"#fff", fontFamily:"'JetBrains Mono',monospace", fontSize:12, cursor:"pointer" }}>+ Add User</button>
      </div>

      {/* Table */}
      <div style={{ background: t.surf, border:`1px solid ${t.border}`, borderRadius:14, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ borderBottom:`1px solid ${t.border}` }}>
              {["User","Email","Role","Status","Revenue","Joined","Action"].map(h => (
                <th key={h} onClick={() => h !== "Action" && setSortBy(h.toLowerCase())} style={{ padding:"14px 18px", textAlign:"left", fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color: t.tx3, cursor: h !== "Action" ? "pointer" : "default", userSelect:"none", whiteSpace:"nowrap" }}>
                  {h} {sortBy === h.toLowerCase() && "↑"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} style={{ borderBottom:`1px solid ${t.border}`, transition:"background .18s" }}
                onMouseEnter={e => e.currentTarget.style.background = `rgba(91,168,255,.04)`}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding:"14px 18px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${u.color},${u.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:12, color:"#fff", flexShrink:0 }}>{u.avatar}</div>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500, color: t.tx }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ padding:"14px 18px", fontFamily:"'JetBrains Mono',monospace", fontSize:12, color: t.tx2 }}>{u.email}</td>
                <td style={{ padding:"14px 18px" }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, padding:"3px 10px", borderRadius:4, background:`rgba(91,168,255,.1)`, color:"#5ba8ff", border:`1px solid rgba(91,168,255,.2)` }}>{u.role}</span>
                </td>
                <td style={{ padding:"14px 18px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background: statusColor[u.status], boxShadow:`0 0 6px ${statusColor[u.status]}` }}/>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color: statusColor[u.status] }}>{u.status}</span>
                  </div>
                </td>
                <td style={{ padding:"14px 18px", fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color: t.teal }}>{u.revenue}</td>
                <td style={{ padding:"14px 18px", fontFamily:"'JetBrains Mono',monospace", fontSize:12, color: t.tx3 }}>{u.joined}</td>
                <td style={{ padding:"14px 18px" }}>
                  <div style={{ display:"flex", gap:6 }}>
                    <button style={{ padding:"5px 12px", borderRadius:6, border:`1px solid ${t.border}`, background:"transparent", color: t.tx2, fontFamily:"'JetBrains Mono',monospace", fontSize:11, cursor:"pointer" }}>Edit</button>
                    <button style={{ padding:"5px 12px", borderRadius:6, border:`1px solid rgba(244,114,182,.3)`, background:"rgba(244,114,182,.08)", color:"#f472b6", fontFamily:"'JetBrains Mono',monospace", fontSize:11, cursor:"pointer" }}>Del</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding:"12px 18px", borderTop:`1px solid ${t.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color: t.tx3 }}>Showing {filtered.length} of {users.length} users</span>
          <div style={{ display:"flex", gap:6 }}>
            {[1,2,3].map(p => <button key={p} style={{ width:28, height:28, borderRadius:6, border:`1px solid ${p===1?"#5ba8ff":t.border}`, background:p===1?"rgba(91,168,255,.12)":"transparent", color:p===1?"#5ba8ff":t.tx3, fontFamily:"'JetBrains Mono',monospace", fontSize:12, cursor:"pointer" }}>{p}</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ANALYTICS PAGE ────────────────────────────
function AnalyticsPage({ t }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <ChartCard title="Revenue Trend" subtitle="12-month revenue vs expenses" t={t}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData} margin={{ top:10, right:10, left:-10, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.grid} />
              <XAxis dataKey="month" tick={{ fill:t.tx3, fontSize:11, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:t.tx3, fontSize:11, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}k`} />
              <Tooltip content={<CustomTooltip t={t}/>} />
              <Legend wrapperStyle={{ fontFamily:"JetBrains Mono", fontSize:11, color: t.tx2 }} />
              <Line type="monotone" dataKey="revenue" stroke="#5ba8ff" strokeWidth={2.5} dot={{ fill:"#5ba8ff", r:3 }} name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#f472b6" strokeWidth={2} dot={{ fill:"#f472b6", r:3 }} name="Expenses" strokeDasharray="5 3" />
              <Line type="monotone" dataKey="profit" stroke="#2dd4bf" strokeWidth={2} dot={{ fill:"#2dd4bf", r:3 }} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Traffic Analysis" subtitle="Visits, unique visitors & bounce rate" t={t}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trafficData} margin={{ top:10, right:10, left:-10, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.grid} />
              <XAxis dataKey="day" tick={{ fill:t.tx3, fontSize:11, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:t.tx3, fontSize:11, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip t={t}/>} />
              <Legend wrapperStyle={{ fontFamily:"JetBrains Mono", fontSize:11, color: t.tx2 }} />
              <Bar dataKey="visits" fill="#5ba8ff" radius={[5,5,0,0]} name="Visits" />
              <Bar dataKey="unique" fill="#a78bfa" radius={[5,5,0,0]} name="Unique" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"320px 1fr", gap:14 }}>
        <ChartCard title="Channel Mix" subtitle="Traffic source distribution" t={t}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={channelData} cx="50%" cy="50%" outerRadius={80} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                {channelData.map((d,i) => <Cell key={i} fill={d.color} stroke="none" />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ background: t.surf2, border:`1px solid ${t.border2}`, borderRadius:8, fontFamily:"JetBrains Mono", fontSize:12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Profit Breakdown" subtitle="Profit bars per month" t={t}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} margin={{ top:10, right:10, left:-10, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.grid} />
              <XAxis dataKey="month" tick={{ fill:t.tx3, fontSize:11, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:t.tx3, fontSize:11, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}k`} />
              <Tooltip content={<CustomTooltip t={t}/>} />
              <Bar dataKey="profit" radius={[5,5,0,0]} name="Profit">
                {revenueData.map((d,i) => <Cell key={i} fill={`hsl(${160+i*8},80%,60%)`} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

// ── REVENUE PAGE ──────────────────────────────
function RevenuePage({ t }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
        <MetricCard label="MRR"       value={91200}  prefix="$" delta={14.2} icon="📈" color="#2dd4bf" t={t} delay={0} />
        <MetricCard label="ARR"       value={1094400} prefix="$" delta={14.2} icon="🏆" color="#5ba8ff" t={t} delay={.07} />
        <MetricCard label="Avg ARPU"  value={220}    prefix="$" delta={5.3}  icon="💎" color="#a78bfa" t={t} delay={.14} />
      </div>
      <ChartCard title="Revenue vs Expenses vs Profit" subtitle="Full year comparison" t={t}>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={revenueData} margin={{ top:10, right:20, left:0, bottom:0 }}>
            <defs>
              {[["rev","#5ba8ff"],["exp","#f472b6"],["prof","#2dd4bf"]].map(([id,c]) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={c} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={c} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={t.grid} />
            <XAxis dataKey="month" tick={{ fill:t.tx3, fontSize:11, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:t.tx3, fontSize:11, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}k`} />
            <Tooltip content={<CustomTooltip t={t}/>} />
            <Legend wrapperStyle={{ fontFamily:"JetBrains Mono", fontSize:11, color: t.tx2 }} />
            <Area type="monotone" dataKey="revenue"  stroke="#5ba8ff" strokeWidth={2.5} fill="url(#rev)"  name="Revenue" />
            <Area type="monotone" dataKey="expenses" stroke="#f472b6" strokeWidth={2}   fill="url(#exp)"  name="Expenses" />
            <Area type="monotone" dataKey="profit"   stroke="#2dd4bf" strokeWidth={2}   fill="url(#prof)" name="Profit" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
      {/* Revenue table */}
      <ChartCard title="Monthly Revenue Breakdown" subtitle="Detailed per-month data" t={t}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ borderBottom:`1px solid ${t.border}` }}>
              {["Month","Revenue","Expenses","Profit","Margin"].map(h => (
                <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color: t.tx3 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {revenueData.map((r,i) => {
              const margin = ((r.profit/r.revenue)*100).toFixed(1);
              return (
                <tr key={i} style={{ borderBottom:`1px solid ${t.border}`, transition:"background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background=`rgba(91,168,255,.04)`}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}
                >
                  <td style={{ padding:"12px 16px", fontFamily:"'Syne',sans-serif", fontWeight:700, color: t.tx }}>{r.month}</td>
                  <td style={{ padding:"12px 16px", fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:"#5ba8ff" }}>${r.revenue.toLocaleString()}</td>
                  <td style={{ padding:"12px 16px", fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:"#f472b6" }}>${r.expenses.toLocaleString()}</td>
                  <td style={{ padding:"12px 16px", fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:"#2dd4bf", fontWeight:700 }}>${r.profit.toLocaleString()}</td>
                  <td style={{ padding:"12px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ flex:1, height:4, background:t.grid, borderRadius:2, overflow:"hidden" }}>
                        <div style={{ width:`${margin}%`, height:"100%", background:`linear-gradient(90deg,#2dd4bf,#5ba8ff)`, borderRadius:2 }}/>
                      </div>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color: t.tx2, minWidth:40 }}>{margin}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </ChartCard>
    </div>
  );
}

// ── GENERIC PAGES ─────────────────────────────
function PlaceholderPage({ title, icon, t }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"60vh", gap:16, opacity:.6 }}>
      <div style={{ fontSize:56 }}>{icon}</div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color: t.tx }}>{title}</div>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color: t.tx3 }}>Coming soon — page under construction</div>
    </div>
  );
}

// ── CHART CARD WRAPPER ────────────────────────
function ChartCard({ title, subtitle, children, t }) {
  return (
    <div style={{ background: t.surf, border:`1px solid ${t.border}`, borderRadius:14, padding:"22px 22px 18px", animation:"fadeUp .5s both" }}>
      <div style={{ marginBottom:18 }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color: t.tx, marginBottom:3 }}>{title}</div>
        {subtitle && <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color: t.tx3, letterSpacing:"0.04em" }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

// ── HEADER ────────────────────────────────────
function Header({ active, t }) {
  const labels = { overview:"Overview", analytics:"Analytics", users:"Users", revenue:"Revenue", products:"Products", alerts:"Alerts", settings:"Settings" };
  return (
    <div style={{ padding:"20px 28px 0", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
      <div>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.5rem,2.5vw,2rem)", fontWeight:800, color: t.tx, letterSpacing:"-1px", margin:0 }}>{labels[active]}</h1>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color: t.tx3, marginTop:4, letterSpacing:"0.08em" }}>
          {new Date().toLocaleDateString("en",{weekday:"long",year:"numeric",month:"long",day:"numeric"})} · PKT
        </p>
      </div>
      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        <div style={{ position:"relative" }}>
          <button style={{ width:38, height:38, borderRadius:9, border:`1px solid ${t.border}`, background: t.surf, color: t.tx2, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>🔔</button>
          <span style={{ position:"absolute", top:-4, right:-4, width:16, height:16, borderRadius:"50%", background:"#f472b6", fontFamily:"JetBrains Mono", fontSize:9, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>3</span>
        </div>
        <div style={{ width:38, height:38, borderRadius:9, background:"linear-gradient(135deg,#f472b6,#a78bfa)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:13, color:"#fff", cursor:"pointer" }}>HZ</div>
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────
export default function Dashboard() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const t = themes[dark ? "dark" : "light"];

  const pageMap = {
    overview: <Overview t={t} />,
    analytics: <AnalyticsPage t={t} />,
    users: <UsersPage t={t} />,
    revenue: <RevenuePage t={t} />,
    products: <PlaceholderPage title="Products" icon="📦" t={t} />,
    alerts: <PlaceholderPage title="Alerts" icon="🔔" t={t} />,
    settings: <PlaceholderPage title="Settings" icon="⚙️" t={t} />,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(91,168,255,.3); border-radius: 4px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        input::placeholder { color: rgba(122,153,190,.5); }
        input { outline: none; }
        button { outline: none; }
        table { border-spacing: 0; }
      `}</style>

      <div style={{ display:"flex", minHeight:"100vh", background: t.bg, color: t.tx, transition:"background .4s, color .35s" }}>
        <Sidebar active={active} setActive={setActive} dark={dark} setDark={setDark} t={t} collapsed={collapsed} setCollapsed={setCollapsed} />

        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
          <TickerBar t={t} />
          <Header active={active} t={t} />

          <main style={{ flex:1, padding:"20px 28px 40px", overflowY:"auto" }}>
            {pageMap[active]}
          </main>
        </div>
      </div>
    </>
  );
}
