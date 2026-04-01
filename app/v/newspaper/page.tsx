"use client"

import { useState, useMemo } from "react"
import { companies, filterOptions } from "@/lib/data"
import { CompanyLogo } from "@/components/company-logo"

export default function NewspaperPage() {
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

  const hotCompanies = companies.filter((c) => ["humain", "atam", "lucidya"].includes(c.slug))
  const todayStr = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FDF5E6",
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
        color: "#1a1a1a",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .newspaper-select {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 13px;
          background: #FDF5E6;
          border: 1px solid #8B7355;
          padding: 5px 10px;
          color: #1a1a1a;
          cursor: pointer;
          outline: none;
        }
        .newspaper-card {
          border: 1px solid #8B735580;
          background: #FDF5E6;
          transition: all 0.2s;
        }
        .newspaper-card:hover {
          border-color: #8B7355;
          box-shadow: 2px 2px 0 #8B735530;
        }
        .stamp-badge {
          display: inline-block;
          border: 2px solid;
          padding: 2px 8px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: bold;
          font-family: Georgia, serif;
          border-radius: 0;
        }
        .stamp-red {
          border-color: #8B0000;
          color: #8B0000;
          transform: rotate(-2deg);
        }
        .stamp-blue {
          border-color: #00008B;
          color: #00008B;
          transform: rotate(1deg);
        }
        .ornate-border {
          border: 3px double #3B2414;
          padding: 4px;
        }
        .ornate-border-inner {
          border: 1px solid #3B2414;
        }
      `}} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        {/* Masthead */}
        <div style={{ textAlign: "center", marginBottom: 0 }}>
          <div style={{ borderTop: "4px double #1a1a1a", borderBottom: "4px double #1a1a1a", padding: "16px 0" }}>
            <h1
              style={{
                fontSize: "clamp(28px, 6vw, 56px)",
                fontWeight: "bold",
                letterSpacing: "0.08em",
                lineHeight: 1,
                margin: 0,
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              THE BUILDSAUDI TIMES
            </h1>
            <div
              style={{
                fontSize: 12,
                color: "#5a4a3a",
                marginTop: 8,
                fontStyle: "italic",
                letterSpacing: "0.05em",
              }}
            >
              Vol. 1, No. 1 &mdash; {todayStr} &mdash; Riyadh, Kingdom of Saudi Arabia
            </div>
          </div>
        </div>

        {/* Thin rule */}
        <div style={{ borderBottom: "1px solid #1a1a1a", margin: "8px 0" }} />

        {/* Breaking News banner */}
        <div
          style={{
            background: "#8B0000",
            color: "#FDF5E6",
            padding: "8px 16px",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          <span style={{ fontWeight: "bold", letterSpacing: "0.15em", fontSize: 13, textTransform: "uppercase" }}>
            *** BREAKING NEWS ***
          </span>
        </div>

        {/* Hot Companies section */}
        <div style={{ marginBottom: 20, border: "2px solid #8B0000", padding: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: "bold", color: "#8B0000", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Hot Companies
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {hotCompanies.map((c) => (
              <div key={c.slug} style={{ flex: "1 1 200px" }}>
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: "bold", color: "#8B0000", textDecoration: "none", fontSize: 15 }}
                >
                  {c.name}
                </a>
                <span style={{ fontSize: 12, color: "#5a4a3a", marginLeft: 6 }}>
                  &mdash; {c.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait Gallery */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 20 }}>
          {["/portraits/2.jpg", "/portraits/3.jpg", "/portraits/1.jpg"].map((src) => (
            <div key={src} className="ornate-border" style={{ width: 80, height: 100 }}>
              <div className="ornate-border-inner" style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Search bar */}
        <div style={{ borderTop: "1px solid #8B7355", borderBottom: "1px solid #8B7355", padding: "10px 0", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontStyle: "italic", color: "#5a4a3a" }}>Search the classifieds:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="company name, sector, keyword..."
              style={{
                flex: 1,
                minWidth: 200,
                background: "transparent",
                border: "1px solid #8B7355",
                padding: "6px 10px",
                fontFamily: "Georgia, serif",
                fontSize: 13,
                color: "#1a1a1a",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 12, fontStyle: "italic", color: "#5a4a3a" }}>Refine by:</span>
          <select className="newspaper-select" value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)}>
            <option value="">All Sectors</option>
            {filterOptions.sector.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="newspaper-select" value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}>
            <option value="">All Stages</option>
            {filterOptions.companyStage.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {(sectorFilter || stageFilter || search) && (
            <button
              onClick={clearFilters}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 12,
                background: "transparent",
                border: "1px solid #8B0000",
                color: "#8B0000",
                padding: "4px 10px",
                cursor: "pointer",
              }}
            >
              Clear All
            </button>
          )}
          <span style={{ fontSize: 12, color: "#5a4a3a", fontStyle: "italic", marginLeft: "auto" }}>
            {filteredCompanies.length} listings
          </span>
        </div>

        {/* Section header */}
        <div style={{ borderTop: "2px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "4px 0", marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0 }}>
            Classified Listings
          </h2>
        </div>

        {/* Company listings */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {filteredCompanies.map((company) => {
            const isExpanded = expandedCards.has(company.slug)
            return (
              <div key={company.slug} className="newspaper-card">
                <div
                  onClick={() => toggleCard(company.slug)}
                  style={{ padding: "10px 14px", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    {/* Logo */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        flexShrink: 0,
                        border: "1px solid #8B735580",
                        overflow: "hidden",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CompanyLogo company={company} />
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            color: "#1a1a1a",
                            textDecoration: "none",
                          }}
                        >
                          {company.name}
                        </a>
                        <span className="stamp-badge stamp-blue">{company.sector[0]}</span>
                        <span className="stamp-badge stamp-red">{company.stage}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "#5a4a3a", margin: "3px 0 0", lineHeight: 1.4 }}>
                        {company.description}
                        {company.city && <span style={{ fontStyle: "italic" }}> &mdash; {company.city}</span>}
                      </p>
                    </div>

                    {/* Expand */}
                    <span style={{ color: "#8B7355", fontSize: 16, flexShrink: 0, fontWeight: "bold" }}>
                      {isExpanded ? "\u25B2" : "\u25BC"}
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
                      borderTop: "1px dashed #8B735580",
                      padding: "12px 14px",
                      background: "#F5E6C8",
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 20px" }}>
                      <div>
                        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7355", fontWeight: "bold" }}>Founders</div>
                        <div style={{ fontSize: 13 }}>{company.founders || "\u2014"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7355", fontWeight: "bold" }}>Total Raised</div>
                        <div style={{ fontSize: 13 }}>{company.total_raised || "\u2014"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7355", fontWeight: "bold" }}>HQ City</div>
                        <div style={{ fontSize: 13 }}>{company.city}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7355", fontWeight: "bold" }}>Employees</div>
                        <div style={{ fontSize: 13 }}>{company.team_size || "\u2014"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7355", fontWeight: "bold" }}>Founded</div>
                        <div style={{ fontSize: 13 }}>{company.founded_year || "\u2014"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8B7355", fontWeight: "bold" }}>Last Round</div>
                        <div style={{ fontSize: 13 }}>{company.last_round_date || "\u2014"}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 16, marginTop: 10, paddingTop: 8, borderTop: "1px dashed #8B735580" }}>
                      <a
                        href={company.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: "#00008B", fontSize: 12, fontStyle: "italic" }}
                      >
                        LinkedIn
                      </a>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: "#00008B", fontSize: 12, fontStyle: "italic" }}
                      >
                        Website
                      </a>
                      <a
                        href={company.careers_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: "#8B0000", fontSize: 12, fontWeight: "bold", fontStyle: "italic" }}
                      >
                        View Careers
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {filteredCompanies.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 16px", fontStyle: "italic", color: "#8B7355" }}>
              <p style={{ fontSize: 16, marginBottom: 8 }}>No listings match your criteria.</p>
              <button
                onClick={clearFilters}
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 13,
                  background: "transparent",
                  border: "1px solid #8B0000",
                  color: "#8B0000",
                  padding: "4px 12px",
                  cursor: "pointer",
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
            marginTop: 32,
            borderTop: "2px double #1a1a1a",
            fontSize: 12,
            color: "#8B7355",
            fontStyle: "italic",
          }}
        >
          Published by Abdulla &mdash; The BuildSaudi Times &mdash; All rights reserved
        </div>
      </div>
    </div>
  )
}
