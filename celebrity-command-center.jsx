import { useState, useEffect, useRef } from "react";

const CELEB_TYPES = ["Music Artist", "Actor/Actress", "Sports Star", "Influencer"];

const MODULES = [
  { id: "dashboard", label: "Brand Dashboard", icon: "◈" },
  { id: "fans", label: "Fan Hub", icon: "✦" },
  { id: "events", label: "Events & Tour", icon: "◉" },
  { id: "pr", label: "AI PR Studio", icon: "⬡" },
];

const BRAND_STATS = [
  { label: "Total Followers", value: "48.2M", delta: "+3.1%", color: "#c9a84c" },
  { label: "Engagement Rate", value: "7.4%", delta: "+0.9%", color: "#7eb8a0" },
  { label: "Brand Deals", value: "$2.4M", delta: "+12%", color: "#c9a84c" },
  { label: "Press Mentions", value: "1,204", delta: "+28%", color: "#7eb8a0" },
];

const PLATFORMS = [
  { name: "Instagram", followers: "18.4M", growth: "+2.1%", color: "#e1306c" },
  { name: "TikTok", followers: "14.7M", growth: "+8.4%", color: "#ff0050" },
  { name: "YouTube", followers: "9.2M", growth: "+1.2%", color: "#ff0000" },
  { name: "X / Twitter", followers: "5.9M", growth: "+0.3%", color: "#aaa" },
];

const EVENTS = [
  { date: "MAR 22", city: "Los Angeles", venue: "Crypto.com Arena", status: "confirmed", type: "Concert" },
  { date: "APR 05", city: "New York", venue: "Madison Square Garden", status: "confirmed", type: "Film Premiere" },
  { date: "APR 18", city: "London", venue: "The O2", status: "pending", type: "Press Tour" },
  { date: "MAY 02", city: "Tokyo", venue: "Tokyo Dome", status: "confirmed", type: "Concert" },
  { date: "MAY 15", city: "Paris", venue: "Stade de France", status: "pending", type: "Brand Event" },
  { date: "JUN 10", city: "Sydney", venue: "ANZ Stadium", status: "confirmed", type: "Concert" },
];

const FAN_MESSAGES = [
  { name: "Sofia M.", location: "Brazil 🇧🇷", msg: "You inspired me to start singing!", tier: "VIP", time: "2m ago" },
  { name: "Jake T.", location: "USA 🇺🇸", msg: "Saw you live last night — life-changing!", tier: "Gold", time: "5m ago" },
  { name: "Aiko H.", location: "Japan 🇯🇵", msg: "Please come to Tokyo again!", tier: "VIP", time: "12m ago" },
  { name: "Lucas F.", location: "France 🇫🇷", msg: "Your new album is perfection.", tier: "Silver", time: "18m ago" },
  { name: "Priya K.", location: "India 🇮🇳", msg: "Met you at the airport, best day ever!", tier: "Gold", time: "25m ago" },
];

const PR_TEMPLATES = [
  { label: "Press Release", prompt: "Write a professional press release announcing a new project" },
  { label: "Crisis Response", prompt: "Draft a calm, empathetic crisis response statement for a celebrity addressing a public controversy" },
  { label: "Award Speech", prompt: "Write a heartfelt award acceptance speech" },
  { label: "Social Caption", prompt: "Write a charismatic Instagram caption for a new project launch" },
];

function StatCard({ stat, index }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), index * 120); }, []);
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(201,168,76,0.2)",
      borderRadius: 16,
      padding: "28px 24px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 80, height: 80,
        background: `radial-gradient(circle, ${stat.color}22 0%, transparent 70%)`,
        borderRadius: "50%",
      }} />
      <div style={{ fontSize: 12, letterSpacing: 3, color: "#888", textTransform: "uppercase", marginBottom: 12 }}>{stat.label}</div>
      <div style={{ fontSize: 36, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#f0ead6", lineHeight: 1 }}>{stat.value}</div>
      <div style={{ marginTop: 10, fontSize: 13, color: stat.color, fontWeight: 600 }}>{stat.delta} this month</div>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <SectionTitle>Personal Brand Overview</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 36 }}>
        {BRAND_STATS.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>
      <SectionTitle>Platform Performance</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        {PLATFORMS.map(p => (
          <div key={p.name} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14,
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f0ead6", marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 24, fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c" }}>{p.followers}</div>
            </div>
            <div style={{
              background: "rgba(126,184,160,0.15)",
              color: "#7eb8a0",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 13,
              fontWeight: 700,
            }}>{p.growth}</div>
          </div>
        ))}
      </div>
      <SectionTitle style={{ marginTop: 36 }}>Recent Mentions</SectionTitle>
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
        {["Billboard called your comeback 'the sound of the year'", "Vogue featured your Met Gala look in top 10", "ESPN: 'Performance of the decade'", "Forbes 30 Under 30 nomination confirmed"].map((m, i) => (
          <div key={i} style={{ padding: "16px 24px", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ color: "#c9a84c", fontSize: 18 }}>◆</span>
            <span style={{ color: "#ccc", fontSize: 14 }}>{m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FanHub() {
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [generating, setGenerating] = useState(false);
  const [aiReply, setAiReply] = useState("");

  const generateReply = async (msg) => {
    setGenerating(true);
    setAiReply("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are a celebrity's social media manager. Write warm, authentic, personal replies to fan messages. Keep it under 3 sentences. Sound genuine, not corporate.",
          messages: [{ role: "user", content: `Fan message: "${msg}"\n\nWrite a reply from the celebrity.` }],
        }),
      });
      const data = await res.json();
      setAiReply(data.content[0].text);
    } catch {
      setAiReply("Couldn't generate reply. Try again!");
    }
    setGenerating(false);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>
        <SectionTitle>Fan Messages</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAN_MESSAGES.map((f, i) => (
            <div key={i} onClick={() => { setSelected(f); setAiReply(""); setReply(""); }}
              style={{
                background: selected?.name === f.name ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${selected?.name === f.name ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 12,
                padding: "16px 18px",
                cursor: "pointer",
                transition: "all 0.25s",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: "#f0ead6", fontSize: 14 }}>{f.name}</span>
                <span style={{
                  fontSize: 11, padding: "2px 8px", borderRadius: 20,
                  background: f.tier === "VIP" ? "rgba(201,168,76,0.2)" : f.tier === "Gold" ? "rgba(255,200,0,0.15)" : "rgba(180,180,180,0.1)",
                  color: f.tier === "VIP" ? "#c9a84c" : f.tier === "Gold" ? "#ffd700" : "#aaa",
                  fontWeight: 700,
                }}>{f.tier}</span>
              </div>
              <div style={{ fontSize: 13, color: "#999", marginBottom: 6 }}>{f.location} · {f.time}</div>
              <div style={{ fontSize: 14, color: "#ccc" }}>{f.msg}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle>Reply Studio</SectionTitle>
        {selected ? (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Message from {selected.name}</div>
              <div style={{ fontSize: 15, color: "#ddd", fontStyle: "italic" }}>"{selected.msg}"</div>
            </div>
            <button onClick={() => generateReply(selected.msg)} style={{
              width: "100%", padding: "12px", marginBottom: 16,
              background: "linear-gradient(135deg, #c9a84c, #a07830)",
              border: "none", borderRadius: 10, color: "#1a1108",
              fontWeight: 800, fontSize: 13, letterSpacing: 1,
              cursor: "pointer", textTransform: "uppercase",
            }}>
              {generating ? "✦ Generating..." : "✦ Generate AI Reply"}
            </button>
            {aiReply && (
              <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "#c9a84c", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>AI Draft</div>
                <div style={{ fontSize: 14, color: "#ddd", lineHeight: 1.7 }}>{aiReply}</div>
              </div>
            )}
            <textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Edit or write your reply..."
              style={{
                width: "100%", minHeight: 100, background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
                color: "#f0ead6", fontSize: 14, padding: 14, resize: "vertical",
                fontFamily: "inherit", outline: "none", boxSizing: "border-box",
              }} />
            <button style={{
              marginTop: 10, width: "100%", padding: "12px",
              background: "rgba(126,184,160,0.15)", border: "1px solid rgba(126,184,160,0.4)",
              borderRadius: 10, color: "#7eb8a0", fontWeight: 700, fontSize: 13,
              cursor: "pointer", letterSpacing: 1,
            }}>Send Reply ✓</button>
          </div>
        ) : (
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 40, textAlign: "center", color: "#555" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✦</div>
            <div>Select a fan message to reply</div>
          </div>
        )}
        <div style={{ marginTop: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
          <SectionTitle style={{ marginTop: 0 }}>Fan Tiers</SectionTitle>
          {[{ tier: "VIP", count: 4200, perks: "Direct DMs, Meet & Greet" }, { tier: "Gold", count: 18400, perks: "Early access, Q&A" }, { tier: "Silver", count: 96000, perks: "Exclusive content" }].map(t => (
            <div key={t.tier} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <span style={{ fontWeight: 700, color: t.tier === "VIP" ? "#c9a84c" : t.tier === "Gold" ? "#ffd700" : "#aaa" }}>{t.tier}</span>
                <span style={{ fontSize: 12, color: "#666", marginLeft: 10 }}>{t.perks}</span>
              </div>
              <span style={{ color: "#ccc", fontSize: 14 }}>{t.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Events() {
  return (
    <div>
      <SectionTitle>Tour & Events Calendar</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {EVENTS.map((e, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${e.status === "confirmed" ? "rgba(126,184,160,0.25)" : "rgba(201,168,76,0.2)"}`,
            borderRadius: 14,
            padding: "20px 22px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: e.status === "confirmed" ? "#7eb8a0" : "#c9a84c" }} />
            <div style={{ fontSize: 22, fontFamily: "'Cormorant Garamond', serif", fontWeight: 800, color: "#c9a84c", marginBottom: 6 }}>{e.date}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#f0ead6", marginBottom: 4 }}>{e.city}</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>{e.venue}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#777", background: "rgba(255,255,255,0.05)", padding: "3px 10px", borderRadius: 20 }}>{e.type}</span>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: e.status === "confirmed" ? "#7eb8a0" : "#c9a84c" }}>{e.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 24 }}>
          <SectionTitle style={{ marginTop: 0 }}>Revenue Forecast</SectionTitle>
          {[{ label: "Q1 2026", val: "$4.2M", bar: 70 }, { label: "Q2 2026", val: "$7.8M", bar: 100 }, { label: "Q3 2026", val: "$3.1M", bar: 45 }].map(r => (
            <div key={r.label} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#aaa" }}>{r.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#c9a84c" }}>{r.val}</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 10 }}>
                <div style={{ height: "100%", width: `${r.bar}%`, background: "linear-gradient(90deg, #c9a84c, #7eb8a0)", borderRadius: 10, transition: "width 1s" }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 24 }}>
          <SectionTitle style={{ marginTop: 0 }}>Team & Crew</SectionTitle>
          {[{ role: "Tour Manager", name: "Marcus L.", status: "online" }, { role: "Publicist", name: "Dana R.", status: "online" }, { role: "Stylist", name: "Yuki M.", status: "away" }, { role: "Security Lead", name: "Rico J.", status: "offline" }].map(t => (
            <div key={t.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <div style={{ fontSize: 14, color: "#ddd", fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{t.role}</div>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.status === "online" ? "#7eb8a0" : t.status === "away" ? "#c9a84c" : "#555" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PRStudio() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [celebType, setCelebType] = useState("Music Artist");

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are an elite celebrity PR strategist working for a ${celebType}. Write polished, professional, on-brand content. Be strategic, authentic, and compelling.`,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      setOutput(data.content[0].text);
    } catch {
      setOutput("Error generating content. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>
        <SectionTitle>AI PR Studio</SectionTitle>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Celebrity Type</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CELEB_TYPES.map(t => (
              <button key={t} onClick={() => setCelebType(t)} style={{
                padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                background: celebType === t ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${celebType === t ? "rgba(201,168,76,0.6)" : "rgba(255,255,255,0.1)"}`,
                color: celebType === t ? "#c9a84c" : "#888",
                fontWeight: celebType === t ? 700 : 400,
                transition: "all 0.2s",
              }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Quick Templates</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PR_TEMPLATES.map(t => (
              <button key={t.label} onClick={() => setPrompt(t.prompt)} style={{
                padding: "12px 16px", textAlign: "left", borderRadius: 10,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                color: "#bbb", fontSize: 13, cursor: "pointer",
                transition: "all 0.2s",
              }}>
                <span style={{ color: "#c9a84c", marginRight: 10 }}>◆</span>{t.label}
              </button>
            ))}
          </div>
        </div>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
          placeholder="Describe what you need — press release, statement, caption, speech draft..."
          style={{
            width: "100%", minHeight: 130, background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
            color: "#f0ead6", fontSize: 14, padding: 16, resize: "vertical",
            fontFamily: "inherit", outline: "none", boxSizing: "border-box",
          }} />
        <button onClick={generate} disabled={loading || !prompt.trim()} style={{
          marginTop: 12, width: "100%", padding: "14px",
          background: loading ? "rgba(201,168,76,0.2)" : "linear-gradient(135deg, #c9a84c, #a07830)",
          border: "none", borderRadius: 12, color: loading ? "#c9a84c" : "#1a1108",
          fontWeight: 900, fontSize: 14, letterSpacing: 1.5,
          cursor: loading ? "wait" : "pointer", textTransform: "uppercase",
          transition: "all 0.3s",
        }}>
          {loading ? "⬡ Generating..." : "⬡ Generate with AI"}
        </button>
      </div>
      <div>
        <SectionTitle>Output</SectionTitle>
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 14, padding: 24, minHeight: 400, position: "relative",
        }}>
          {output ? (
            <>
              <div style={{ fontSize: 14, color: "#ddd", lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{output}</div>
              <button onClick={() => navigator.clipboard?.writeText(output)} style={{
                marginTop: 20, padding: "8px 20px",
                background: "rgba(126,184,160,0.1)", border: "1px solid rgba(126,184,160,0.3)",
                borderRadius: 8, color: "#7eb8a0", fontSize: 12, cursor: "pointer", fontWeight: 700,
              }}>Copy to Clipboard ✓</button>
            </>
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#444" }}>
              <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.3 }}>⬡</div>
              <div style={{ fontSize: 14 }}>Your AI-generated content appears here</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children, style }) {
  return (
    <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#666", marginTop: 8, marginBottom: 18, ...style }}>
      {children}
    </div>
  );
}

export default function App() {
  const [module, setModule] = useState("dashboard");
  const [celebType, setCelebType] = useState("Music Artist");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0e",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      color: "#f0ead6",
      display: "flex",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;700;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        textarea:focus, input:focus { border-color: rgba(201,168,76,0.4) !important; }
      `}</style>

      {/* Sidebar */}
      <div style={{
        width: 240,
        background: "rgba(255,255,255,0.02)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        padding: "32px 0",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: "0 28px 32px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase", marginBottom: 6 }}>✦ Command Center</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 800, color: "#c9a84c", lineHeight: 1 }}>STARCORE</div>
        </div>

        {/* Celebrity Type */}
        <div style={{ padding: "24px 28px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#555", textTransform: "uppercase", marginBottom: 12 }}>Profile Type</div>
          {CELEB_TYPES.map(t => (
            <div key={t} onClick={() => setCelebType(t)} style={{
              padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13,
              color: celebType === t ? "#c9a84c" : "#666",
              background: celebType === t ? "rgba(201,168,76,0.1)" : "transparent",
              fontWeight: celebType === t ? 700 : 400,
              transition: "all 0.2s",
              marginBottom: 2,
            }}>{t}</div>
          ))}
        </div>

        {/* Navigation */}
        <nav style={{ padding: "24px 20px", flex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 16, paddingLeft: 8 }}>Modules</div>
          {MODULES.map(m => (
            <div key={m.id} onClick={() => setModule(m.id)} style={{
              padding: "12px 16px",
              borderRadius: 10,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 4,
              background: module === m.id ? "rgba(201,168,76,0.12)" : "transparent",
              border: `1px solid ${module === m.id ? "rgba(201,168,76,0.25)" : "transparent"}`,
              transition: "all 0.25s",
            }}>
              <span style={{ fontSize: 18, color: module === m.id ? "#c9a84c" : "#555" }}>{m.icon}</span>
              <span style={{ fontSize: 13, fontWeight: module === m.id ? 700 : 400, color: module === m.id ? "#f0ead6" : "#666" }}>{m.label}</span>
            </div>
          ))}
        </nav>

        {/* Profile */}
        <div style={{ padding: "20px 28px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #c9a84c, #7eb8a0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: "#0d0d0e" }}>A</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#ddd" }}>Aria Voss</div>
              <div style={{ fontSize: 11, color: "#555" }}>{celebType}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "40px 48px",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.6s",
      }}>
        {/* Header */}
        <div style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#555", textTransform: "uppercase", marginBottom: 8 }}>
              {MODULES.find(m => m.id === module)?.icon} {celebType}
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 800, color: "#f0ead6", margin: 0, lineHeight: 1.1 }}>
              {MODULES.find(m => m.id === module)?.label}
            </h1>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ padding: "8px 16px", background: "rgba(126,184,160,0.1)", border: "1px solid rgba(126,184,160,0.3)", borderRadius: 8, fontSize: 12, color: "#7eb8a0", fontWeight: 700 }}>
              ● Live
            </div>
            <div style={{ padding: "8px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12, color: "#888" }}>
              Mar 18, 2026
            </div>
          </div>
        </div>

        {/* Module Content */}
        {module === "dashboard" && <Dashboard />}
        {module === "fans" && <FanHub />}
        {module === "events" && <Events />}
        {module === "pr" && <PRStudio />}
      </div>
    </div>
  );
}
