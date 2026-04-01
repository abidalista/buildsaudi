"use client"

import { useState, useMemo } from "react"
import { companies, filterOptions } from "@/lib/data"
import { CompanyLogo } from "@/components/company-logo"

export default function RetroTerminalPage() {
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

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#00ff41",
        fontFamily: "'Courier New', 'Lucida Console', monospace",
        position: "relative",
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 50,
          background: "repeating-linear-gradient(0deg, rgba(0,255,65,0.03) 0px, rgba(0,255,65,0.03) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Blinking cursor animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .terminal-cursor::after {
          content: '█';
          animation: blink 1s infinite;
          color: #00ff41;
        }
        .retro-select {
          background-color: #111;
          color: #00ff41;
          border: 1px solid #00ff41;
          padding: 4px 8px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          outline: none;
          cursor: pointer;
        }
        .retro-select option {
          background: #0a0a0a;
          color: #00ff41;
        }
        .retro-card {
          border: 1px solid #00ff4140;
          background: #0d0d0d;
          transition: all 0.2s;
        }
        .retro-card:hover {
          border-color: #00ff41;
          box-shadow: 0 0 10px rgba(0,255,65,0.15);
        }
      `}} />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
        {/* ASCII Logo */}
        <pre
          style={{
            color: "#00ff41",
            fontSize: "clamp(6px, 1.8vw, 14px)",
            lineHeight: 1.2,
            textAlign: "center",
            marginBottom: 8,
            overflow: "hidden",
          }}
        >
{`
 ██████  ██    ██ ██ ██      ██████  ███████  █████  ██    ██ ██████  ██
 ██   ██ ██    ██ ██ ██      ██   ██ ██      ██   ██ ██    ██ ██   ██ ██
 ██████  ██    ██ ██ ██      ██   ██ ███████ ███████ ██    ██ ██   ██ ██
 ██   ██ ██    ██ ██ ██      ██   ██      ██ ██   ██ ██    ██ ██   ██ ██
 ██████   ██████  ██ ███████ ██████  ███████ ██   ██  ██████  ██████  ██
`}
        </pre>

        {/* Stats bar */}
        <div
          style={{
            textAlign: "center",
            padding: "8px 0",
            borderTop: "1px solid #00ff4140",
            borderBottom: "1px solid #00ff4140",
            marginBottom: 24,
            fontSize: 13,
            letterSpacing: "0.1em",
            color: "#4ade80",
          }}
        >
          {companies.length} COMPANIES | $2B+ RAISED | RIYADH, SA
        </div>

        {/* Terminal prompt search */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#4ade80", fontSize: 14, whiteSpace: "nowrap" }}>
              abdulla@buildsaudi:~$
            </span>
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder=""
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid #00ff4140",
                  color: "#00ff41",
                  fontFamily: "'Courier New', monospace",
                  fontSize: 14,
                  padding: "4px 0",
                  outline: "none",
                }}
              />
              {!search && (
                <span
                  className="terminal-cursor"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#4ade80",
                    fontSize: 14,
                    pointerEvents: "none",
                  }}
                >
                  search companies
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: "#4ade80", fontSize: 12 }}>FILTER:</span>
          <select
            className="retro-select"
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
          >
            <option value="">ALL SECTORS</option>
            {filterOptions.sector.map((s) => (
              <option key={s} value={s}>{s.toUpperCase()}</option>
            ))}
          </select>
          <select
            className="retro-select"
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
          >
            <option value="">ALL STAGES</option>
            {filterOptions.companyStage.map((s) => (
              <option key={s} value={s}>{s.toUpperCase()}</option>
            ))}
          </select>
          {(sectorFilter || stageFilter || search) && (
            <button
              onClick={clearFilters}
              style={{
                background: "transparent",
                border: "1px solid #ff4444",
                color: "#ff4444",
                fontFamily: "'Courier New', monospace",
                fontSize: 12,
                padding: "4px 10px",
                cursor: "pointer",
              }}
            >
              CLEAR
            </button>
          )}
          <span style={{ color: "#4ade80", fontSize: 12, marginLeft: "auto" }}>
            [{filteredCompanies.length} results]
          </span>
        </div>

        {/* Company cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredCompanies.map((company) => {
            const isExpanded = expandedCards.has(company.slug)
            return (
              <div key={company.slug} className="retro-card" style={{ borderRadius: 0 }}>
                <div
                  onClick={() => toggleCard(company.slug)}
                  style={{ padding: "12px 16px", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Logo */}
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        border: "1px solid #00ff4140",
                        borderRadius: 0,
                        overflow: "hidden",
                        background: "#111",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                            color: "#00ff41",
                            fontWeight: "bold",
                            fontSize: 15,
                            textDecoration: "none",
                          }}
                        >
                          {company.name}
                        </a>
                        {company.sector.map((s) => (
                          <span
                            key={s}
                            style={{
                              color: "#4ade80",
                              fontSize: 11,
                              border: "1px solid #00ff4140",
                              padding: "1px 6px",
                              letterSpacing: "0.05em",
                            }}
                          >
                            [{s.toUpperCase()}]
                          </span>
                        ))}
                        <span
                          style={{
                            color: "#22c55e",
                            fontSize: 11,
                            border: "1px solid #22c55e40",
                            padding: "1px 6px",
                          }}
                        >
                          {company.stage.toUpperCase()}
                        </span>
                      </div>
                      <p style={{ color: "#4ade80", fontSize: 13, marginTop: 2, opacity: 0.8 }}>
                        {company.description}
                      </p>
                    </div>

                    {/* Expand indicator */}
                    <span style={{ color: "#00ff41", fontSize: 18, flexShrink: 0 }}>
                      {isExpanded ? "[-]" : "[+]"}
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
                      borderTop: "1px solid #00ff4120",
                      padding: "12px 16px",
                      background: "#080808",
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
                      <div>
                        <div style={{ fontSize: 10, color: "#4ade8080", textTransform: "uppercase", letterSpacing: "0.1em" }}>FOUNDERS</div>
                        <div style={{ fontSize: 13, color: "#4ade80" }}>{company.founders || "---"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#4ade8080", textTransform: "uppercase", letterSpacing: "0.1em" }}>TOTAL RAISED</div>
                        <div style={{ fontSize: 13, color: "#4ade80" }}>{company.total_raised || "---"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#4ade8080", textTransform: "uppercase", letterSpacing: "0.1em" }}>HQ CITY</div>
                        <div style={{ fontSize: 13, color: "#4ade80" }}>{company.city}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#4ade8080", textTransform: "uppercase", letterSpacing: "0.1em" }}>EMPLOYEES</div>
                        <div style={{ fontSize: 13, color: "#4ade80" }}>{company.team_size || "---"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#4ade8080", textTransform: "uppercase", letterSpacing: "0.1em" }}>FOUNDED</div>
                        <div style={{ fontSize: 13, color: "#4ade80" }}>{company.founded_year || "---"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#4ade8080", textTransform: "uppercase", letterSpacing: "0.1em" }}>LAST ROUND</div>
                        <div style={{ fontSize: 13, color: "#4ade80" }}>{company.last_round_date || "---"}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 16, marginTop: 12, paddingTop: 8, borderTop: "1px solid #00ff4120" }}>
                      <a
                        href={company.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: "#4ade80", fontSize: 12, textDecoration: "underline" }}
                      >
                        [LINKEDIN]
                      </a>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: "#4ade80", fontSize: 12, textDecoration: "underline" }}
                      >
                        [WEBSITE]
                      </a>
                      <a
                        href={company.careers_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: "#00ff41", fontSize: 12, textDecoration: "underline", fontWeight: "bold" }}
                      >
                        [CAREERS]
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {filteredCompanies.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 16px", color: "#4ade80" }}>
              <pre style={{ fontSize: 14, marginBottom: 8 }}>ERROR 404: NO RESULTS FOUND</pre>
              <button
                onClick={clearFilters}
                style={{
                  background: "transparent",
                  border: "1px solid #00ff41",
                  color: "#00ff41",
                  fontFamily: "'Courier New', monospace",
                  fontSize: 12,
                  padding: "4px 12px",
                  cursor: "pointer",
                }}
              >
                CLEAR FILTERS
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
            borderTop: "1px solid #00ff4120",
            color: "#4ade8060",
            fontSize: 12,
          }}
        >
          abdulla@buildsaudi:~$ echo &quot;Built by Abdulla&quot;
        </div>
      </div>
    </div>
  )
}
