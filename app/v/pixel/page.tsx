"use client"

import { useState, useMemo } from "react"
import { companies, filterOptions } from "@/lib/data"
import { CompanyLogo } from "@/components/company-logo"

export default function PixelSaudiPage() {
  const [search, setSearch] = useState("")
  const [sectorFilter, setSectorFilter] = useState("")
  const [stageFilter, setStageFilter] = useState("")
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const toggleCard = (slug: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        company.name.toLowerCase().includes(q) ||
        company.description.toLowerCase().includes(q) ||
        company.sector.some((s) => s.toLowerCase().includes(q))
      const matchesSector = !sectorFilter || company.sector.some((s) => s === sectorFilter)
      const matchesStage = !stageFilter || company.stage === stageFilter
      return matchesSearch && matchesSector && matchesStage
    }).sort((a, b) => (b.founded_year || 0) - (a.founded_year || 0))
  }, [search, sectorFilter, stageFilter])

  const clearFilters = () => {
    setSectorFilter("")
    setStageFilter("")
    setSearch("")
  }

  const tickerText = `\u26A1 ${companies.length} COMPANIES \u26A1 $2B+ RAISED \u26A1 BUILDING THE FUTURE \u26A1 RIYADH, SAUDI ARABIA \u26A1 ${companies.length} COMPANIES \u26A1 $2B+ RAISED \u26A1 BUILDING THE FUTURE \u26A1`

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a2e",
        color: "#e0e0e0",
        fontFamily: "'Press Start 2P', 'Courier New', monospace",
        position: "relative",
        backgroundImage: "linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

      {/* CRT scanline + glitch CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes glitch {
          0% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          5% { clip-path: inset(40% 0 20% 0); transform: translate(-4px, -2px); }
          10% { clip-path: inset(80% 0 0% 0); transform: translate(4px, 2px); }
          15% { clip-path: inset(10% 0 60% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
        }
        @keyframes neonPulse {
          0%, 100% { text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41; }
          50% { text-shadow: 0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 20px #00ff41; }
        }
        .pixel-select {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          font-size: 8px;
          background: #16213e;
          color: #00ff41;
          border: 2px solid #00ff41;
          padding: 6px 8px;
          outline: none;
          cursor: pointer;
        }
        .pixel-select option {
          background: #1a1a2e;
          color: #00ff41;
        }
        .pixel-card {
          background: #16213e;
          border: 2px solid #0f3460;
          box-shadow: 4px 4px 0 #00ff41;
          transition: all 0.2s;
        }
        .pixel-card:hover {
          border-color: #00ff41;
          box-shadow: 4px 4px 0 #00ff41, 0 0 15px rgba(0,255,65,0.2);
        }
        .pixel-badge {
          display: inline-block;
          padding: 3px 8px;
          font-family: 'Press Start 2P', monospace;
          font-size: 7px;
          text-transform: uppercase;
          border: 2px solid;
          letter-spacing: 0.05em;
        }
        .scanline-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 50;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 3px
          );
          animation: scanlines 0.5s linear infinite;
        }
      `}} />

      {/* Scanline overlay */}
      <div className="scanline-overlay" />

      {/* Marquee ticker */}
      <div
        style={{
          overflow: "hidden",
          background: "#0f3460",
          borderBottom: "2px solid #00ff41",
          padding: "8px 0",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "inline-block",
            animation: "marquee 20s linear infinite",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "clamp(8px, 1.5vw, 11px)",
            color: "#00ff41",
            letterSpacing: "0.05em",
          }}
        >
          {tickerText}
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
        {/* Logo with glitch effect */}
        <div style={{ textAlign: "center", marginBottom: 24, position: "relative" }}>
          <h1
            style={{
              fontSize: "clamp(16px, 4vw, 36px)",
              fontFamily: "'Press Start 2P', monospace",
              color: "#00ff41",
              textShadow: "0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41",
              animation: "neonPulse 3s ease-in-out infinite",
              margin: 0,
              lineHeight: 1.4,
              letterSpacing: "0.05em",
            }}
          >
            BUILDSAUDI
          </h1>
          {/* Glitch layer */}
          <h1
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              fontSize: "clamp(16px, 4vw, 36px)",
              fontFamily: "'Press Start 2P', monospace",
              color: "#ff0040",
              textShadow: "0 0 10px #ff0040",
              animation: "glitch 4s ease-in-out infinite",
              margin: 0,
              lineHeight: 1.4,
              letterSpacing: "0.05em",
              pointerEvents: "none",
            }}
          >
            BUILDSAUDI
          </h1>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(6px, 1.2vw, 9px)",
              color: "#4ade80",
              marginTop: 8,
              letterSpacing: "0.1em",
            }}
          >
            SAUDI STARTUP DIRECTORY
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "2px solid #0f3460",
              background: "#16213e",
              padding: "8px 12px",
              boxShadow: "4px 4px 0 #00ff4140",
            }}
          >
            <span style={{ color: "#00ff41", fontSize: 14 }}>{"\u25B6"}</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: "#00ff41",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(8px, 1.5vw, 11px)",
                outline: "none",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ff0040",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 10,
                  cursor: "pointer",
                }}
              >
                X
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <select className="pixel-select" value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)}>
            <option value="">ALL SECTORS</option>
            {filterOptions.sector.map((s) => <option key={s} value={s}>{s.toUpperCase()}</option>)}
          </select>
          <select className="pixel-select" value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}>
            <option value="">ALL STAGES</option>
            {filterOptions.companyStage.map((s) => <option key={s} value={s}>{s.toUpperCase()}</option>)}
          </select>
          {(sectorFilter || stageFilter || search) && (
            <button
              onClick={clearFilters}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 8,
                background: "#ff0040",
                border: "2px solid #ff0040",
                color: "#fff",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              CLEAR
            </button>
          )}
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 8,
              color: "#4ade80",
              marginLeft: "auto",
            }}
          >
            {filteredCompanies.length} FOUND
          </span>
        </div>

        {/* Company cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredCompanies.map((company) => {
            const isExpanded = expandedCards.has(company.slug)
            return (
              <div key={company.slug} className="pixel-card">
                <div
                  onClick={() => toggleCard(company.slug)}
                  style={{ padding: "12px 14px", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Logo */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        flexShrink: 0,
                        border: "2px solid #0f3460",
                        overflow: "hidden",
                        background: "#1a1a2e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        imageRendering: "pixelated",
                      }}
                    >
                      <CompanyLogo company={company} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: "clamp(9px, 1.5vw, 12px)",
                            color: "#00ff41",
                            textDecoration: "none",
                            textShadow: "0 0 5px #00ff4180",
                          }}
                        >
                          {company.name}
                        </a>
                        {company.sector.map((s) => (
                          <span
                            key={s}
                            className="pixel-badge"
                            style={{
                              borderColor: "#0ea5e9",
                              color: "#0ea5e9",
                              background: "#0ea5e910",
                            }}
                          >
                            {s.toUpperCase()}
                          </span>
                        ))}
                        <span
                          className="pixel-badge"
                          style={{
                            borderColor: "#f59e0b",
                            color: "#f59e0b",
                            background: "#f59e0b10",
                          }}
                        >
                          {company.stage.toUpperCase()}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: "clamp(8px, 1.2vw, 10px)",
                          color: "#8892b0",
                          marginTop: 6,
                          fontFamily: "'Courier New', monospace",
                          lineHeight: 1.5,
                        }}
                      >
                        {company.description}
                      </p>
                    </div>

                    {/* Expand */}
                    <span
                      style={{
                        color: "#00ff41",
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: 12,
                        flexShrink: 0,
                      }}
                    >
                      {isExpanded ? "-" : "+"}
                    </span>
                  </div>
                </div>

                {/* Expanded details */}
                <div
                  style={{
                    maxHeight: isExpanded ? 400 : 0,
                    opacity: isExpanded ? 1 : 0,
                    overflow: "hidden",
                    transition: "all 0.3s ease-out",
                  }}
                >
                  <div
                    style={{
                      borderTop: "2px solid #0f3460",
                      padding: "12px 14px",
                      background: "#0f3460",
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
                      {[
                        { label: "FOUNDERS", value: company.founders },
                        { label: "RAISED", value: company.total_raised },
                        { label: "CITY", value: company.city },
                        { label: "TEAM", value: company.team_size },
                        { label: "FOUNDED", value: company.founded_year?.toString() },
                        { label: "LAST ROUND", value: company.last_round_date },
                      ].map((item) => (
                        <div key={item.label}>
                          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: "#4ade8080", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 3 }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: 10, fontFamily: "'Courier New', monospace", color: "#e0e0e0" }}>
                            {item.value || "---"}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 12, paddingTop: 10, borderTop: "2px solid #1a1a2e" }}>
                      {[
                        { label: "LINKEDIN", href: company.linkedin, color: "#0ea5e9" },
                        { label: "WEBSITE", href: company.website, color: "#4ade80" },
                        { label: "CAREERS", href: company.careers_url, color: "#f59e0b" },
                      ].map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: 7,
                            color: link.color,
                            textDecoration: "none",
                            textShadow: `0 0 5px ${link.color}40`,
                          }}
                        >
                          [{link.label}]
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {filteredCompanies.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 16px" }}>
              <p
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 10,
                  color: "#ff0040",
                  textShadow: "0 0 10px #ff004080",
                  marginBottom: 12,
                }}
              >
                GAME OVER - NO RESULTS
              </p>
              <button
                onClick={clearFilters}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 8,
                  background: "#00ff41",
                  border: "none",
                  color: "#1a1a2e",
                  padding: "8px 16px",
                  cursor: "pointer",
                  boxShadow: "4px 4px 0 #0f3460",
                }}
              >
                CONTINUE?
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            padding: "24px 0",
            marginTop: 32,
            borderTop: "2px solid #0f3460",
          }}
        >
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              color: "#4ade8060",
              letterSpacing: "0.1em",
            }}
          >
            BUILT BY ABDULLA // PIXEL SAUDI 2026
          </p>
        </div>
      </div>
    </div>
  )
}
