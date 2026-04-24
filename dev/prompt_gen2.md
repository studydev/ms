# PURPOSE
Executive-deck infographic showing how 4 intelligence layers converge into one OS: **Microsoft IQ**.
Style: flat vector, corporate Microsoft look (Segoe-feel sans-serif), subtle gradients + soft glow. No photorealism.
Audience: enterprise IT decision makers. Icon-first: recognizable Microsoft/Azure/GitHub product icons dominate; text is short.

# CANVAS
- 3:2 landscape (1536x1024), white (#FFFFFF) background with faint radial glow at center.
- Thin cross-divider splits the canvas into 4 equal quadrants.
- Luminous circular **core** at center overlapping all quadrants. Four colored ribbons flow from each quadrant's Agent Core into this center ("4 layers → 1 OS").

# QUADRANT COLORS (match Microsoft logo corners — do NOT swap)
- TL  Work IQ     — RED    #F14F21
- TR  Fabric IQ   — GREEN  #7EB900
- BL  Foundry IQ  — BLUE   #00A3EE
- BR  SDLC IQ     — YELLOW #FEB800
Accent color applies to quadrant title, badge borders, soft tint wash. Product icons keep their native brand colors.

# COMMON QUADRANT PATTERN (TL, TR, BL — SDLC is different, see below)
Each quadrant contains:
1. **Agent Core capsule** at quadrant center, labeled "<Name> IQ Agent Core", holding 3 inner nodes linked by short double-headed arrows (specified per quadrant).
2. **Outer ring of 8 labeled product-icon badges** (uniform rounded-square tiles, 1px quadrant-tinted border, product short-name label underneath).
3. **Hub-and-spoke only**: every badge connects ONLY to the Agent Core.
   - Badge → Core: thin **dashed** line (signals in).
   - Core → Badge: thin **solid arrow** (context out).
   - No badge-to-badge lines anywhere.
4. One thick colored ribbon exits the Agent Core toward the canvas center and merges into the Microsoft IQ core.
5. Quadrant text block (top-left of quadrant): Title (bold large), Subtitle, Tagline, Micro caption.

# QUADRANT 1 — Work IQ (TL, RED)
- Agent Core nodes: "Work Data" (DB+waveform) · "Work Memory" (chip+clock) · "Work Inference" (brain+spark).
- 8 badges: Outlook · Teams · Word · Excel · PowerPoint · OneDrive · SharePoint · Microsoft 365 Copilot.
- Text (render exactly):
  - Title: "Work IQ"
  - Subtitle: "사람이 일하는 방식을 이해"
  - Tagline: "역할 · 관계 · 맥락 · 연속 기억"
  - Micro: "Microsoft 365 Signals → Memory → Inference"

# QUADRANT 2 — Fabric IQ (TR, GREEN)
- Agent Core nodes: "Semantic Model" (ontology graph) · "Metric Store" (dashboard+ruler) · "Inference" (spark+swirl).
- Inbound dashed lines carry raw number blocks (0/1/123) that transform into concept blocks (Customer/Revenue/KPI) as they enter the Core.
- 8 badges: Microsoft Fabric · OneLake · Power BI · Synapse · Data Factory · Real-Time Intelligence · Purview · Azure SQL.
- Text:
  - Title: "Fabric IQ"
  - Subtitle: "데이터가 말하는 의미를 이해"
  - Tagline: "시맨틱 · 메트릭 · 온톨로지"
  - Micro: "Numbers → Business Meaning"

# QUADRANT 3 — Foundry IQ (BL, BLUE)
- Agent Core wraps a glowing **knowledge sphere**. Nodes: "Knowledge Index" (vector lattice) · "RAG Memory" (docs+loop) · "Grounded Inference" (spark+shield-check).
- Inbound dashed lines carry PDF/web/wiki/folder glyphs converging into the knowledge sphere.
- 8 badges: Azure AI Foundry · Azure OpenAI · Azure AI Search · Cosmos DB · Microsoft Purview · Entra ID · SharePoint · Bing / Web Connector.
- Text:
  - Title: "Foundry IQ"
  - Subtitle: "진실이 머무는 지식 계층"
  - Tagline: "지식 검색 · 근거(RAG) · 거버넌스"
  - Micro: "Indexed Knowledge → Grounded Answers"

# QUADRANT 4 — SDLC IQ (BR, YELLOW) — PIPELINE layout
Horizontal left-to-right pipeline of **6 stage tiles** (rounded-rect; each tile holds 2–3 real product icons stacked + UPPERCASE stage name + Korean sub-label).

1. **SETUP** — VS Code · GitHub Copilot · gear+doc.   한글: "하네스 · 커스텀 지침"
2. **PLAN** — GitHub · GitHub Issues · Copilot Coding Agent (robot).   한글: "이슈 → 에이전트 할당"
3. **CODE** — Copilot · branch · Pull Request · editor frame.   한글: "에이전틱 코딩 · PR"
4. **SECURE** — GHAS · CodeQL · Dependabot · Secret Scanning.   한글: "GHAS · CodeQL · Dependabot"
5. **SHIP** — GitHub Actions · Docker · 2 Azure service icons (ACR / App Service / Functions).   한글: "CI/CD → Azure 배포"
6. **OPERATE** — Azure · Azure Monitor · Azure SRE Agent · Application Insights.   한글: "SRE Agent · 모니터링"

- **Feedback Loop**: thick YELLOW (#FEB800) dashed arrow curving from stage 6 up and back to stage 2. Label above: "Feedback Loop".
- Above the pipeline, a small **"SDLC IQ Agent Core"** capsule with 3 nodes: "Code Memory" · "DevOps Data" · "Coding Agent". Each of the 6 stage tiles links to this Core by a thin dashed line. From the Core, a yellow ribbon runs to the Microsoft IQ center.
- Stage progression arrows connect stages 1→2→…→6. Do NOT connect individual product icons across stages.
- Text:
  - Title: "SDLC IQ"
  - Subtitle: "아이디어를 실행 가능한 소프트웨어로"
  - Tagline: "Setup · Plan · Code · Secure · Ship · Operate"
  - Micro: "GitHub + Copilot Coding Agent + GHAS + Actions + Azure SRE"

# CENTER CORE — Microsoft IQ
- Luminous circle ~22% canvas width at cross intersection. Faint neural/circuit pattern inside.
- 4 soft ribbons enter from each quadrant's Agent Core only (never from badges), colored by Microsoft logo corner:
  TL RED · TR GREEN · BL BLUE · BR YELLOW.
- Dead center: stylized 2×2 mosaic mark using the 4 Microsoft logo colors in the same corner layout.
- 4 mini chips around the mosaic point outward to their home quadrant: red→"Work IQ", green→"Fabric IQ", blue→"Foundry IQ", yellow→"SDLC IQ".
- Centered stacked text (render exactly):
  - Line 1 (bold, largest): "Microsoft IQ"
  - Line 2 (medium, bold):  "통합 엔터프라이즈 지능 운영체계"
  - Line 3 (xs dot-sep):    "이해 · 의미 · 지식 · 실행"
- No badge overlaps the core circle.

# ICON RULES
- Use recognizable simplified flat-vector form of each product icon with its signature shape and brand color (Microsoft Learn / GitHub docs tile style). Stylized, not pixel-perfect clones.
- Uniform rounded-square badges, same size + corner radius, 1px quadrant-tinted border.
- 1-line English short-name label below each badge in Title Case (e.g., "Outlook", "OneLake", "GHAS", "SRE Agent").
- Consistent stroke/fill weight across all quadrants.
- Layout: 2×4 grid or arc around the Agent Core.

# TYPOGRAPHY & COMPOSITION
- Clean sans-serif (Segoe UI / Inter). Titles bold, subtitles medium, taglines/labels regular. Korean crisp, undistorted.
- Symmetric 2×2 with ~6% padding per quadrant. Title top-left; icon constellation middle; taglines bottom.
- Central core is the strongest anchor with soft ambient glow radiating outward.

# TEXT-IN-IMAGE (critical for gpt-image-2)
- Render all quoted strings EXACTLY. Do not paraphrase Korean.
- Keep official casing for brand/product names: Microsoft IQ, Work IQ, Fabric IQ, Foundry IQ, SDLC IQ, Microsoft 365, Outlook, Teams, Word, Excel, PowerPoint, OneDrive, SharePoint, Microsoft Fabric, OneLake, Power BI, Synapse, Data Factory, Purview, Azure AI Foundry, Azure OpenAI, Azure AI Search, Cosmos DB, Entra ID, GitHub, GitHub Copilot, GHAS, CodeQL, Dependabot, GitHub Actions, Azure, SRE Agent, Application Insights.
- Stage names UPPERCASE: SETUP, PLAN, CODE, SECURE, SHIP, OPERATE.

# MUST KEEP
- 2×2 grid + overlapping center core.
- Microsoft-logo color-to-corner mapping (RED=TL, GREEN=TR, BLUE=BL, YELLOW=BR).
- Hub-and-spoke in all quadrants: badges connect only to the Agent Core; only the Core feeds the Microsoft IQ center.
- SDLC IQ 6-stage pipeline with feedback-loop arrow (6→2).
- All quoted text spelled exactly as provided.

# DO NOT
- No photorealism, 3D render, or photographic textures.
- No paragraphs, marketing copy, watermarks, URLs, emails, phone numbers.
- No humans of any kind (faces, silhouettes, bodies, hands). No flags.
- No direct badge-to-badge lines, no peer-to-peer service graph.
- Do not replace product icons with generic shapes.
