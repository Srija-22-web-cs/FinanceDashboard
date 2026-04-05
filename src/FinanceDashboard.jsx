import { useState, useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import {
  TrendingUp, TrendingDown, Wallet, Search, Plus, Download,
  ChevronUp, ChevronDown, Eye, ShieldCheck, X, ArrowUpDown,
  Lightbulb, BarChart2, ListFilter, Moon, Sun
} from "lucide-react";

// ─── THEME ───────────────────────────────────────────────────
const light = {
  bg: "#f5f6fa", surface: "#ffffff", card: "#ffffff",
  border: "#e4e7ef", sidebar: "#1a1f36",
  text: "#1a1f36", muted: "#6b7280", hint: "#9ca3af",
  income: "#10b981", expense: "#f43f5e", accent: "#6366f1",
  amber: "#f59e0b", chartGrid: "#e5e7eb",
  incomeLight: "#d1fae5", expenseLight: "#ffe4e6",
  accentLight: "#ede9fe",
};
const dark = {
  bg: "#0d1117", surface: "#161b22", card: "#1c2333",
  border: "#30363d", sidebar: "#0d1117",
  text: "#e6edf3", muted: "#8b949e", hint: "#6e7681",
  income: "#10b981", expense: "#f43f5e", accent: "#818cf8",
  amber: "#fbbf24", chartGrid: "#21262d",
  incomeLight: "#0d2b1f", expenseLight: "#2d1117",
  accentLight: "#1e1b4b",
};

// ─── MOCK DATA ────────────────────────────────────────────────
const RAW_TXS = [
  { id:1,  date:"2024-01-01", description:"Monthly Salary",     amount: 5200, category:"Salary",        type:"income" },
  { id:2,  date:"2024-01-03", description:"Rent Payment",       amount:-1400, category:"Housing",       type:"expense" },
  { id:3,  date:"2024-01-05", description:"Grocery Store",      amount: -120, category:"Food",          type:"expense" },
  { id:4,  date:"2024-01-08", description:"Netflix",            amount:  -15, category:"Entertainment", type:"expense" },
  { id:5,  date:"2024-01-10", description:"Uber Ride",          amount:  -22, category:"Transport",     type:"expense" },
  { id:6,  date:"2024-01-15", description:"Electricity Bill",   amount:  -95, category:"Utilities",     type:"expense" },
  { id:7,  date:"2024-01-18", description:"Online Shopping",    amount: -200, category:"Shopping",      type:"expense" },
  { id:8,  date:"2024-01-20", description:"Freelance Project",  amount:  800, category:"Freelance",     type:"income" },
  { id:9,  date:"2024-01-22", description:"Doctor Visit",       amount:  -60, category:"Healthcare",    type:"expense" },
  { id:10, date:"2024-01-28", description:"Gas Station",        amount:  -45, category:"Transport",     type:"expense" },
  { id:11, date:"2024-02-01", description:"Monthly Salary",     amount: 5200, category:"Salary",        type:"income" },
  { id:12, date:"2024-02-03", description:"Rent Payment",       amount:-1400, category:"Housing",       type:"expense" },
  { id:13, date:"2024-02-05", description:"Grocery Store",      amount: -135, category:"Food",          type:"expense" },
  { id:14, date:"2024-02-07", description:"Investment Dividend",amount:  320, category:"Investments",   type:"income" },
  { id:15, date:"2024-02-10", description:"Valentine's Dinner", amount: -120, category:"Food",          type:"expense" },
  { id:16, date:"2024-02-15", description:"Water Bill",         amount:  -40, category:"Utilities",     type:"expense" },
  { id:17, date:"2024-02-18", description:"Clothing Store",     amount: -180, category:"Shopping",      type:"expense" },
  { id:18, date:"2024-02-22", description:"Online Course",      amount: -150, category:"Education",     type:"expense" },
  { id:19, date:"2024-02-28", description:"Freelance Project",  amount:  600, category:"Freelance",     type:"income" },
  { id:20, date:"2024-03-01", description:"Monthly Salary",     amount: 5200, category:"Salary",        type:"income" },
  { id:21, date:"2024-03-03", description:"Rent Payment",       amount:-1400, category:"Housing",       type:"expense" },
  { id:22, date:"2024-03-06", description:"Grocery Store",      amount: -125, category:"Food",          type:"expense" },
  { id:23, date:"2024-03-10", description:"Car Maintenance",    amount: -250, category:"Transport",     type:"expense" },
  { id:24, date:"2024-03-15", description:"Electricity Bill",   amount:  -88, category:"Utilities",     type:"expense" },
  { id:25, date:"2024-03-18", description:"Shopping Mall",      amount: -320, category:"Shopping",      type:"expense" },
  { id:26, date:"2024-03-20", description:"Investment Dividend",amount:  320, category:"Investments",   type:"income" },
  { id:27, date:"2024-03-28", description:"Freelance Project",  amount: 1200, category:"Freelance",     type:"income" },
  { id:28, date:"2024-04-01", description:"Monthly Salary",     amount: 5200, category:"Salary",        type:"income" },
  { id:29, date:"2024-04-03", description:"Rent Payment",       amount:-1400, category:"Housing",       type:"expense" },
  { id:30, date:"2024-04-08", description:"Netflix",            amount:  -15, category:"Entertainment", type:"expense" },
  { id:31, date:"2024-04-12", description:"Restaurant Dinner",  amount:  -95, category:"Food",          type:"expense" },
  { id:32, date:"2024-04-15", description:"Internet Bill",      amount:  -60, category:"Utilities",     type:"expense" },
  { id:33, date:"2024-04-18", description:"Amazon Purchase",    amount: -145, category:"Shopping",      type:"expense" },
  { id:34, date:"2024-04-20", description:"Investment Dividend",amount:  320, category:"Investments",   type:"income" },
  { id:35, date:"2024-04-28", description:"Side Project",       amount:  450, category:"Freelance",     type:"income" },
  { id:36, date:"2024-05-01", description:"Monthly Salary",     amount: 5500, category:"Salary",        type:"income" },
  { id:37, date:"2024-05-03", description:"Rent Payment",       amount:-1400, category:"Housing",       type:"expense" },
  { id:38, date:"2024-05-08", description:"Concert Tickets",    amount: -180, category:"Entertainment", type:"expense" },
  { id:39, date:"2024-05-12", description:"Birthday Dinner",    amount: -110, category:"Food",          type:"expense" },
  { id:40, date:"2024-05-15", description:"Electricity Bill",   amount: -102, category:"Utilities",     type:"expense" },
  { id:41, date:"2024-05-18", description:"Summer Clothes",     amount: -280, category:"Shopping",      type:"expense" },
  { id:42, date:"2024-05-20", description:"Investment Dividend",amount:  480, category:"Investments",   type:"income" },
  { id:43, date:"2024-05-22", description:"Dentist Visit",      amount: -120, category:"Healthcare",    type:"expense" },
  { id:44, date:"2024-05-28", description:"Freelance Project",  amount:  900, category:"Freelance",     type:"income" },
  { id:45, date:"2024-06-01", description:"Monthly Salary",     amount: 5500, category:"Salary",        type:"income" },
  { id:46, date:"2024-06-03", description:"Rent Payment",       amount:-1400, category:"Housing",       type:"expense" },
  { id:47, date:"2024-06-08", description:"Vacation Flight",    amount: -450, category:"Entertainment", type:"expense" },
  { id:48, date:"2024-06-12", description:"Restaurant",         amount:  -75, category:"Food",          type:"expense" },
  { id:49, date:"2024-06-15", description:"Water & Gas Bill",   amount:  -75, category:"Utilities",     type:"expense" },
  { id:50, date:"2024-06-20", description:"Investment Dividend",amount:  480, category:"Investments",   type:"income" },
  { id:51, date:"2024-06-28", description:"Freelance Project",  amount: 1500, category:"Freelance",     type:"income" },
];

const CATEGORIES = ["Food","Housing","Transport","Shopping","Entertainment","Healthcare","Education","Utilities","Salary","Freelance","Investments"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun"];
const CATEGORY_COLORS = {
  Housing:"#6366f1", Food:"#f59e0b", Transport:"#10b981",
  Shopping:"#ec4899", Entertainment:"#8b5cf6", Healthcare:"#14b8a6",
  Education:"#f97316", Utilities:"#64748b", Salary:"#10b981",
  Freelance:"#22d3ee", Investments:"#a78bfa"
};

const fmt = (n) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 }).format(Math.abs(n));

// ─── SUB-COMPONENTS ──────────────────────────────────────────

function SummaryCard({ label, value, sub, icon: Icon, color, bg, t }) {
  return (
    <div style={{ background: t.card, border:`1px solid ${t.border}`, borderRadius:16, padding:"20px 24px", display:"flex", flexDirection:"column", gap:8 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:13, color:t.muted, fontWeight:500, letterSpacing:"0.04em", textTransform:"uppercase" }}>{label}</span>
        <div style={{ width:36, height:36, borderRadius:10, background:bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon size={16} color={color} strokeWidth={2.2} />
        </div>
      </div>
      <div style={{ fontSize:28, fontWeight:700, color:t.text, fontFamily:"'SF Mono','Fira Mono',monospace", letterSpacing:"-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize:12, color:t.muted }}>{sub}</div>}
    </div>
  );
}

function Badge({ children, color, bg }) {
  return (
    <span style={{ fontSize:11, fontWeight:600, color, background:bg, borderRadius:6, padding:"2px 8px", display:"inline-block", letterSpacing:"0.04em" }}>
      {children}
    </span>
  );
}

function AddTransactionModal({ onClose, onAdd, t }) {
  const [form, setForm] = useState({ description:"", amount:"", category:"Food", type:"expense", date: new Date().toISOString().split("T")[0] });
  const set = (k, v) => setForm(f => ({...f, [k]:v}));
  const submit = () => {
    if (!form.description || !form.amount) return;
    onAdd({ ...form, amount: form.type === "expense" ? -Math.abs(+form.amount) : +Math.abs(+form.amount), id: Date.now() });
    onClose();
  };

  const inputStyle = { width:"100%", padding:"10px 12px", borderRadius:10, border:`1px solid ${t.border}`, background:t.surface, color:t.text, fontSize:14, outline:"none", boxSizing:"border-box" };
  const labelStyle = { fontSize:12, fontWeight:600, color:t.muted, letterSpacing:"0.05em", textTransform:"uppercase", display:"block", marginBottom:6 };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }}>
      <div style={{ background:t.card, borderRadius:20, padding:28, width:400, border:`1px solid ${t.border}`, boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <span style={{ fontSize:17, fontWeight:700, color:t.text }}>Add Transaction</span>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:t.muted, padding:4 }}><X size={18} /></button>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {["expense","income"].map(tp => (
            <button key={tp} onClick={() => set("type", tp)} style={{ flex:1, padding:"10px", borderRadius:10, border:`1.5px solid ${form.type===tp ? (tp==="income"?t.income:t.expense) : t.border}`, background: form.type===tp ? (tp==="income"?t.incomeLight:t.expenseLight) : "transparent", color: form.type===tp ? (tp==="income"?t.income:t.expense) : t.muted, fontWeight:600, fontSize:13, cursor:"pointer", textTransform:"capitalize" }}>
              {tp}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <label style={labelStyle}>Description</label>
            <input style={inputStyle} placeholder="e.g. Grocery Store" value={form.description} onChange={e => set("description", e.target.value)} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={labelStyle}>Amount ($)</label>
              <input style={inputStyle} type="number" placeholder="0.00" value={form.amount} onChange={e => set("amount", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input style={inputStyle} type="date" value={form.date} onChange={e => set("date", e.target.value)} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select style={inputStyle} value={form.category} onChange={e => set("category", e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button onClick={submit} style={{ width:"100%", marginTop:24, padding:"12px", borderRadius:12, background:t.accent, color:"#fff", fontWeight:700, fontSize:14, border:"none", cursor:"pointer" }}>
          Add Transaction
        </button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────
export default function FinanceDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [role, setRole] = useState("viewer");
  const [section, setSection] = useState("overview");
  const [txs, setTxs] = useState(RAW_TXS);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCat, setFilterCat] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [showAdd, setShowAdd] = useState(false);

  const t = darkMode ? dark : light;

  // ── Derived stats
  const totalIncome = useMemo(() => txs.filter(x => x.type==="income").reduce((s,x) => s+x.amount, 0), [txs]);
  const totalExpense = useMemo(() => txs.filter(x => x.type==="expense").reduce((s,x) => s+Math.abs(x.amount), 0), [txs]);
  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : "0.0";

  // ── Monthly chart data
  const monthlyData = useMemo(() => MONTHS.map((m, mi) => {
    const mon = `2024-0${mi+1}`;
    const inc = txs.filter(x => x.date.startsWith(mon) && x.type==="income").reduce((s,x) => s+x.amount, 0);
    const exp = txs.filter(x => x.date.startsWith(mon) && x.type==="expense").reduce((s,x) => s+Math.abs(x.amount), 0);
    return { month: m, Income: inc, Expenses: exp, Net: inc - exp };
  }), [txs]);

  // ── Running balance for area chart
  const balanceData = useMemo(() => {
    let bal = 5000;
    return monthlyData.map(d => { bal += d.Net; return { month: d.month, Balance: bal }; });
  }, [monthlyData]);

  // ── Category breakdown
  const catData = useMemo(() => {
    const map = {};
    txs.filter(x => x.type==="expense").forEach(x => { map[x.category] = (map[x.category]||0) + Math.abs(x.amount); });
    return Object.entries(map).sort((a,b) => b[1]-a[1]).map(([name, value]) => ({ name, value }));
  }, [txs]);

  // ── Filtered transactions
  const filteredTxs = useMemo(() => {
    let res = [...txs];
    if (search) res = res.filter(x => x.description.toLowerCase().includes(search.toLowerCase()) || x.category.toLowerCase().includes(search.toLowerCase()));
    if (filterType !== "all") res = res.filter(x => x.type === filterType);
    if (filterCat !== "all") res = res.filter(x => x.category === filterCat);
    res.sort((a, b) => {
      if (sortField === "date") return sortDir==="desc" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
      if (sortField === "amount") return sortDir==="desc" ? Math.abs(b.amount)-Math.abs(a.amount) : Math.abs(a.amount)-Math.abs(b.amount);
      return 0;
    });
    return res;
  }, [txs, search, filterType, filterCat, sortField, sortDir]);

  // ── Insights
  const lastMonth = monthlyData[monthlyData.length - 1];
  const prevMonth = monthlyData[monthlyData.length - 2];

  const exportCSV = () => {
    const rows = ["Date,Description,Category,Type,Amount", ...filteredTxs.map(x => `${x.date},${x.description},${x.category},${x.type},${x.amount}`)].join("\n");
    const a = document.createElement("a"); a.href = "data:text/csv," + encodeURIComponent(rows); a.download = "transactions.csv"; a.click();
  };

  const toggleSort = (f) => { if (sortField===f) setSortDir(d => d==="asc"?"desc":"asc"); else { setSortField(f); setSortDir("desc"); } };

  const SortIcon = ({ f }) => sortField===f ? (sortDir==="desc" ? <ChevronDown size={13}/> : <ChevronUp size={13}/>) : <ArrowUpDown size={13} opacity={0.4}/>;

  const navItems = [
    { id:"overview", label:"Overview", icon:BarChart2 },
    { id:"transactions", label:"Transactions", icon:ListFilter },
    { id:"insights", label:"Insights", icon:Lightbulb },
  ];

  // ── Custom tooltip
  const ChartTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background:t.card, border:`1px solid ${t.border}`, borderRadius:10, padding:"10px 14px", fontSize:13 }}>
        <div style={{ fontWeight:600, color:t.text, marginBottom:4 }}>{label}</div>
        {payload.map(p => (
          <div key={p.name} style={{ color:p.color, display:"flex", gap:8, justifyContent:"space-between" }}>
            <span>{p.name}</span><span style={{ fontFamily:"monospace" }}>{fmt(p.value)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight:"100vh", background:t.bg, color:t.text, fontFamily:"system-ui,-apple-system,sans-serif", display:"flex" }}>
      {/* ── SIDEBAR */}
      <div style={{ width:220, background:darkMode?t.sidebar:"#1a1f36", display:"flex", flexDirection:"column", padding:"24px 16px", gap:4, flexShrink:0, position:"sticky", top:0, height:"100vh" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28, paddingLeft:8 }}>
          <div style={{ width:32, height:32, borderRadius:10, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Wallet size={16} color="#fff" />
          </div>
          <span style={{ fontWeight:800, fontSize:16, color:"#fff", letterSpacing:"-0.01em" }}>FinTrack</span>
        </div>
        {navItems.map(({ id, label, icon:Icon }) => (
          <button key={id} onClick={() => setSection(id)} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, border:"none", cursor:"pointer", background: section===id ? "rgba(99,102,241,0.2)" : "transparent", color: section===id ? "#818cf8" : "rgba(255,255,255,0.55)", fontWeight: section===id ? 600 : 400, fontSize:14, textAlign:"left", transition:"all 0.15s" }}>
            <Icon size={16} /> {label}
          </button>
        ))}
        <div style={{ flex:1 }} />
        {/* Role switcher */}
        <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:12, padding:"12px 14px" }}>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8 }}>Role</div>
          <div style={{ display:"flex", gap:6 }}>
            {["viewer","admin"].map(r => (
              <button key={r} onClick={() => setRole(r)} style={{ flex:1, padding:"6px 0", borderRadius:8, border:"none", cursor:"pointer", background: role===r ? "#6366f1" : "rgba(255,255,255,0.08)", color: role===r ? "#fff" : "rgba(255,255,255,0.5)", fontWeight:600, fontSize:12, textTransform:"capitalize", display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
                {r==="viewer" ? <Eye size={11}/> : <ShieldCheck size={11}/>} {r}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => setDarkMode(d => !d)} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:10, border:"none", cursor:"pointer", background:"transparent", color:"rgba(255,255,255,0.4)", fontSize:13, marginTop:4 }}>
          {darkMode ? <Sun size={14}/> : <Moon size={14}/>} {darkMode ? "Light mode" : "Dark mode"}
        </button>
      </div>

      {/* ── MAIN CONTENT */}
      <div style={{ flex:1, padding:"32px 36px", overflowY:"auto" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:32 }}>
          <div>
            <h1 style={{ margin:0, fontSize:24, fontWeight:800, color:t.text, letterSpacing:"-0.02em" }}>
              {section === "overview" ? "Financial Overview" : section === "transactions" ? "Transactions" : "Insights"}
            </h1>
            <p style={{ margin:"4px 0 0", color:t.muted, fontSize:14 }}>Jan – Jun 2024 · 6-month snapshot</p>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            {role === "admin" && section !== "insights" && (
              <button onClick={() => setShowAdd(true)} style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 18px", borderRadius:11, background:t.accent, color:"#fff", border:"none", cursor:"pointer", fontWeight:700, fontSize:14 }}>
                <Plus size={15} /> Add
              </button>
            )}
            <button onClick={exportCSV} style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 16px", borderRadius:11, background:t.surface, color:t.muted, border:`1px solid ${t.border}`, cursor:"pointer", fontWeight:600, fontSize:14 }}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* ══ OVERVIEW SECTION */}
        {section === "overview" && (
          <>
            {/* Summary cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 }}>
              <SummaryCard label="Total Balance" value={fmt(balance)} sub={`${balance>=0?"↑ Surplus":"↓ Deficit"} this period`} icon={Wallet} color={t.accent} bg={t.accentLight} t={t} />
              <SummaryCard label="Total Income" value={fmt(totalIncome)} sub="Across all sources" icon={TrendingUp} color={t.income} bg={t.incomeLight} t={t} />
              <SummaryCard label="Total Expenses" value={fmt(totalExpense)} sub={`${txs.filter(x=>x.type==="expense").length} transactions`} icon={TrendingDown} color={t.expense} bg={t.expenseLight} t={t} />
              <SummaryCard label="Savings Rate" value={`${savingsRate}%`} sub="Of total income saved" icon={TrendingUp} color={t.amber} bg={darkMode?"#2d1f0d":"#fef3c7"} t={t} />
            </div>

            {/* Charts row */}
            <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:20, marginBottom:24 }}>
              {/* Area chart */}
              <div style={{ background:t.card, borderRadius:16, border:`1px solid ${t.border}`, padding:"22px 24px" }}>
                <div style={{ fontSize:14, fontWeight:700, color:t.text, marginBottom:4 }}>Balance Trend</div>
                <div style={{ fontSize:12, color:t.muted, marginBottom:18 }}>Running balance across 6 months</div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={balanceData}>
                    <defs>
                      <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke={t.chartGrid} strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill:t.muted, fontSize:12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill:t.muted, fontSize:12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="Balance" stroke="#6366f1" strokeWidth={2.5} fill="url(#balGrad)" dot={{ fill:"#6366f1", r:4 }} activeDot={{ r:6 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              {/* Pie chart */}
              <div style={{ background:t.card, borderRadius:16, border:`1px solid ${t.border}`, padding:"22px 24px" }}>
                <div style={{ fontSize:14, fontWeight:700, color:t.text, marginBottom:4 }}>Spending by Category</div>
                <div style={{ fontSize:12, color:t.muted, marginBottom:8 }}>Expense distribution</div>
                <ResponsiveContainer width="100%" height={145}>
                  <PieChart>
                    <Pie data={catData} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={2} dataKey="value">
                      {catData.map((entry) => <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name]||"#64748b"} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [fmt(v), ""]} contentStyle={{ background:t.card, border:`1px solid ${t.border}`, borderRadius:8, fontSize:12, color:t.text }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display:"flex", flexDirection:"column", gap:5, marginTop:4 }}>
                  {catData.slice(0,4).map(c => (
                    <div key={c.name} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12 }}>
                      <span style={{ width:8, height:8, borderRadius:2, background:CATEGORY_COLORS[c.name]||"#64748b", flexShrink:0 }} />
                      <span style={{ color:t.muted, flex:1 }}>{c.name}</span>
                      <span style={{ color:t.text, fontWeight:600, fontFamily:"monospace" }}>{fmt(c.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bar chart */}
            <div style={{ background:t.card, borderRadius:16, border:`1px solid ${t.border}`, padding:"22px 24px" }}>
              <div style={{ fontSize:14, fontWeight:700, color:t.text, marginBottom:4 }}>Monthly Income vs Expenses</div>
              <div style={{ fontSize:12, color:t.muted, marginBottom:18 }}>Month-over-month comparison</div>
              <div style={{ display:"flex", gap:16, marginBottom:12 }}>
                {[{c:"#10b981",l:"Income"},{c:"#f43f5e",l:"Expenses"}].map(({c,l}) => (
                  <span key={l} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:t.muted }}>
                    <span style={{ width:10, height:10, borderRadius:2, background:c }} /> {l}
                  </span>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={monthlyData} barCategoryGap="30%">
                  <CartesianGrid stroke={t.chartGrid} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill:t.muted, fontSize:12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill:t.muted, fontSize:12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="Income" fill="#10b981" radius={[4,4,0,0]} />
                  <Bar dataKey="Expenses" fill="#f43f5e" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* ══ TRANSACTIONS SECTION */}
        {section === "transactions" && (
          <>
            {/* Filters */}
            <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
              <div style={{ flex:1, minWidth:200, display:"flex", alignItems:"center", gap:10, background:t.card, border:`1px solid ${t.border}`, borderRadius:11, padding:"10px 16px" }}>
                <Search size={15} color={t.muted} />
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search transactions..." style={{ border:"none", outline:"none", background:"transparent", color:t.text, fontSize:14, flex:1, minWidth:0 }} />
              </div>
              <select value={filterType} onChange={e=>setFilterType(e.target.value)} style={{ padding:"10px 14px", borderRadius:11, border:`1px solid ${t.border}`, background:t.card, color:t.text, fontSize:14, cursor:"pointer" }}>
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expenses</option>
              </select>
              <select value={filterCat} onChange={e=>setFilterCat(e.target.value)} style={{ padding:"10px 14px", borderRadius:11, border:`1px solid ${t.border}`, background:t.card, color:t.text, fontSize:14, cursor:"pointer" }}>
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Table */}
            <div style={{ background:t.card, borderRadius:16, border:`1px solid ${t.border}`, overflow:"hidden" }}>
              <div style={{ display:"grid", gridTemplateColumns:"120px 1fr 130px 90px 120px", gap:0, padding:"12px 20px", borderBottom:`1px solid ${t.border}`, background:t.surface }}>
                {[["date","Date"],["","Description"],["","Category"],["","Type"],["amount","Amount"]].map(([f,l],i) => (
                  <div key={i} onClick={f ? ()=>toggleSort(f) : undefined} style={{ fontSize:11, fontWeight:700, color:t.muted, letterSpacing:"0.06em", textTransform:"uppercase", cursor:f?"pointer":"default", display:"flex", alignItems:"center", gap:4, justifyContent: i===4?"flex-end":"flex-start" }}>
                    {l} {f && <SortIcon f={f} />}
                  </div>
                ))}
              </div>
              {filteredTxs.length === 0 && (
                <div style={{ padding:40, textAlign:"center", color:t.muted, fontSize:14 }}>No transactions match your filters.</div>
              )}
              {filteredTxs.map((tx, i) => (
                <div key={tx.id} style={{ display:"grid", gridTemplateColumns:"120px 1fr 130px 90px 120px", padding:"14px 20px", borderBottom: i<filteredTxs.length-1 ? `1px solid ${t.border}` : "none", alignItems:"center", transition:"background 0.1s" }}
                  onMouseEnter={e=>e.currentTarget.style.background=t.surface}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                >
                  <span style={{ fontSize:13, color:t.muted }}>{tx.date.slice(5).replace("-","/")} {tx.date.slice(0,4)}</span>
                  <span style={{ fontSize:14, color:t.text, fontWeight:500 }}>{tx.description}</span>
                  <span>
                    <span style={{ fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:6, background: CATEGORY_COLORS[tx.category]+"22", color: CATEGORY_COLORS[tx.category]||t.muted }}>
                      {tx.category}
                    </span>
                  </span>
                  <span><Badge color={tx.type==="income"?t.income:t.expense} bg={tx.type==="income"?t.incomeLight:t.expenseLight}>{tx.type==="income"?"INC":"EXP"}</Badge></span>
                  <span style={{ textAlign:"right", fontFamily:"'SF Mono','Fira Mono',monospace", fontSize:14, fontWeight:700, color: tx.type==="income" ? t.income : t.expense }}>
                    {tx.type==="income" ? "+" : "-"}{fmt(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:12, fontSize:13, color:t.muted, textAlign:"right" }}>{filteredTxs.length} of {txs.length} transactions</div>
          </>
        )}

        {/* ══ INSIGHTS SECTION */}
        {section === "insights" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            {/* Top spending */}
            <div style={{ background:t.card, borderRadius:16, border:`1px solid ${t.border}`, padding:24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:t.expenseLight, display:"flex", alignItems:"center", justifyContent:"center" }}><TrendingDown size={16} color={t.expense}/></div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:t.text }}>Top Spending Category</div>
                  <div style={{ fontSize:12, color:t.muted }}>Where your money goes most</div>
                </div>
              </div>
              {catData.map((c, i) => (
                <div key={c.name} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:5 }}>
                    <span style={{ color:t.text, fontWeight: i===0?700:400 }}>{c.name} {i===0 && "🔥"}</span>
                    <span style={{ color:t.muted, fontFamily:"monospace" }}>{fmt(c.value)}</span>
                  </div>
                  <div style={{ height:5, borderRadius:999, background:t.border }}>
                    <div style={{ height:"100%", borderRadius:999, background: CATEGORY_COLORS[c.name]||t.accent, width:`${(c.value/catData[0].value*100).toFixed(0)}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly comparison */}
            <div style={{ background:t.card, borderRadius:16, border:`1px solid ${t.border}`, padding:24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:t.accentLight, display:"flex", alignItems:"center", justifyContent:"center" }}><BarChart2 size={16} color={t.accent}/></div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:t.text }}>Monthly Comparison</div>
                  <div style={{ fontSize:12, color:t.muted }}>Jun vs May performance</div>
                </div>
              </div>
              {[{label:"Income",curr:lastMonth.Income,prev:prevMonth?.Income},{label:"Expenses",curr:lastMonth.Expenses,prev:prevMonth?.Expenses},{label:"Net Savings",curr:lastMonth.Net,prev:prevMonth?.Net}].map(row => {
                const delta = prevMonth ? ((row.curr - row.prev) / Math.abs(row.prev) * 100).toFixed(1) : 0;
                const isPos = +delta >= 0;
                const good = row.label === "Expenses" ? !isPos : isPos;
                return (
                  <div key={row.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:`1px solid ${t.border}` }}>
                    <span style={{ fontSize:13, color:t.muted }}>{row.label}</span>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:16, fontWeight:700, fontFamily:"monospace", color: row.label==="Expenses"?t.expense:row.label==="Income"?t.income:t.text }}>{fmt(row.curr)}</div>
                      <div style={{ fontSize:11, color: good ? t.income : t.expense }}>{isPos?"+":""}{delta}% vs last month</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key observations */}
            <div style={{ background:t.card, borderRadius:16, border:`1px solid ${t.border}`, padding:24, gridColumn:"span 2" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:darkMode?"#1c2a1a":t.incomeLight, display:"flex", alignItems:"center", justifyContent:"center" }}><Lightbulb size={16} color={t.income}/></div>
                <div style={{ fontSize:13, fontWeight:700, color:t.text }}>Key Observations</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
                {[
                  { icon:"📦", title:"Housing is fixed", body:`Rent at ${fmt(1400)}/mo accounts for ${((1400/totalExpense)*100*6).toFixed(0)}% of all expenses.` },
                  { icon:"📈", title:"Income growing", body:`Salary raised from $5,200 to $5,500 in May, a 5.8% increase.` },
                  { icon:"⚠️", title:"Lifestyle spending", body:`Shopping & entertainment totaled ${fmt(catData.find(c=>c.name==="Shopping")?.value||0)} — consider reducing.` },
                  { icon:"💡", title:"Savings momentum", body:`You saved an average of ${fmt(balance/6)} per month over this period.` },
                  { icon:"🎯", title:"Savings rate", body:`${savingsRate}% savings rate. Financial experts recommend 20%+.` },
                  { icon:"🔄", title:"Freelance income", body:`Freelance contributed ${fmt(txs.filter(x=>x.category==="Freelance").reduce((s,x)=>s+x.amount,0))} — a valuable income diversifier.` },
                ].map(({ icon, title, body }) => (
                  <div key={title} style={{ background:t.surface, borderRadius:12, border:`1px solid ${t.border}`, padding:"14px 16px" }}>
                    <div style={{ fontSize:18, marginBottom:6 }}>{icon}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:t.text, marginBottom:4 }}>{title}</div>
                    <div style={{ fontSize:12, color:t.muted, lineHeight:1.55 }}>{body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showAdd && <AddTransactionModal onClose={() => setShowAdd(false)} onAdd={tx => setTxs(prev => [tx,...prev])} t={t} />}
    </div>
  );
}
