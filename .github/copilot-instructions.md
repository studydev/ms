# Copilot coding guidelines

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

# ms.studydev.com/docs Copilot Guidelines

이 저장소(`studydev/ms`)는 **Microsoft 기술 전반(Azure · M365 · GitHub)**에 대한 한국어 학습 자료를 정적 웹사이트로 공개하는 프로젝트입니다.
사이트는 `docs/` 디렉토리를 루트로 하여 **https://ms.studydev.com** 으로 서비스됩니다 (GitHub Pages + CNAME + HTTPS).

Copilot이 콘텐츠를 생성하거나 편집할 때 아래 규칙을 **반드시** 따릅니다.

---

## 1. 저장소 구조

```
docs/                          # GitHub Pages 루트
├── index.html                 # 메인 랜딩 (카테고리 카드)
├── manifest.json              # 전체 문서 메타데이터 (자동 생성 대상)
├── CNAME                      # ms.studydev.com
├── css/site.css               # 공용 스타일 (모든 페이지 공유)
├── js/site.js                 # 공용 스크립트 (모든 페이지 공유)
├── azure/                     # Azure 카테고리
│   ├── index.html             # 카테고리 랜딩 (manifest 기반 자동 목록)
│   └── <slug>/                # 개별 문서 폴더
│       ├── index.html
│       └── (그 외 관련 파일)
├── m365/                      # Microsoft 365 카테고리 (구조 동일)
└── github/                    # GitHub 카테고리 (구조 동일)
```

### 카테고리 분류 — 3가지만 사용

| 카테고리 | 폴더 | 대상 주제 |
|---------|------|-----------|
| Azure | `docs/azure/` | Azure Foundry, AI, Cosmos DB, App Service, Functions, AKS 등 모든 Azure 리소스 |
| Microsoft 365 | `docs/m365/` | Copilot, Graph API, Teams, SharePoint, Outlook, Power Platform 등 |
| GitHub | `docs/github/` | GitHub Actions, Copilot, Codespaces, Advanced Security 등 |

> 새 문서 생성 요청이 들어오면 **반드시 위 3개 중 하나**를 선택해 하위에 배치합니다.
> 예: "Hosted Agent 가이드" → `docs/azure/hosted_agent/`
> 분류가 모호하면 사용자에게 어느 카테고리인지 질문합니다.

### 폴더/파일 네이밍

- 문서 폴더 slug: **snake_case** (예: `hosted_agent`, `cosmos_db_intro`).
- 문서 진입점은 항상 `index.html`.
- 추가 페이지가 있으면 `lab.html`, `quickstart.html` 등 목적이 드러나는 이름 사용.
- Python이나 YAML 예제 등 부속 리소스는 같은 폴더 내에 `samples/`, `images/` 하위로.

---

## 2. 페이지 작성 규칙

### 공용 CSS/JS 필수 참조

모든 HTML 페이지는 다음을 **인라인이 아닌 공용 파일로** 로드합니다:

```html
<!-- 외부 CDN -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">

<!-- 공용 사이트 스타일/스크립트 -->
<link rel="stylesheet" href="../../css/site.css">   <!-- 깊이에 맞춰 상대 경로 -->
...
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="../../js/site.js"></script>
```

**절대 하지 말 것:**
- `<style>` 블록 인라인 삽입 (→ `docs/css/site.css`에 클래스를 추가하고 참조).
- `<script>` 블록 인라인 삽입 (특정 페이지 전용 초기화는 `site.js`에 null-guard로 확장).
- 색상, 폰트, 라운드 반경 등을 하드코딩 → 대신 `site.css`의 CSS 변수 사용 (`--azure-primary`, `--hosted-color`, `--radius` 등).

### 레이아웃 요소

- **사이드바가 있는 페이지**는 `<body class="has-sidebar ...">` 필수.
- **메인 랜딩(카테고리 카드형)**에는 사이드바 없음 → `.has-sidebar` 붙이지 않음.
- **상단 네비**는 `top-nav` + `nav-brand` + `breadcrumb` 동일 구조 유지.
- **`nav-brand` (좌측 상단 브랜드)는 모든 페이지에서 고정 규칙을 따른다 — UX 일관성을 위해 절대 변경하지 않는다:**
    - 텍스트: **`MS Tech`** (다른 값 금지 — 제품명/서비스명으로 바꾸지 말 것)
    - 아이콘: `<i class="bi bi-microsoft"></i>`
    - 링크: **항상 사이트 루트(Home)**. 파일 깊이에 맞춘 상대 경로만 사용.
        - `docs/index.html` → `href="./"`
        - `docs/<category>/index.html` → `href="../"`
        - `docs/<category>/<slug>/index.html` → `href="../../"`
    - `target="_blank"` 금지. 같은 탭에서 Home으로 이동해야 한다.
    - 외부 사이트(예: ai.azure.com, microsoft.com)로 연결하지 않는다. 외부 링크가 필요하면 breadcrumb나 본문 내 참조 섹션에서 처리한다.
- **히어로**는 `section.hero-section` (페이지 성격별로 `.page-lab` 등 modifier 클래스로 색상 변경).

### 한국어 & 용어

- 본문 텍스트는 **한국어**. 기술 용어(예: "Agent Service", "Cosmos DB")는 영문 그대로 둠.
- 코드 주석도 한국어 선호 (단 공식 API명은 영문 유지).
- MS Learn 등 원문 링크는 `target="_blank" rel="noopener"` 로 새 탭.

### 코드 블록 규칙

- 코드는 반드시 `.code-block` 클래스 사용.
- 라벨이 필요한 경우 바로 위에 `.code-label` (`.bash`, `.python`, `.yaml`, `.http`, `.json` 중 선택).
- 복사 버튼 필요 시 `<button class="copy-btn" onclick="copyCode(this)">…</button>` 를 코드 블록 내부에 배치.
- 토큰 하이라이트 클래스: `.keyword`, `.string`, `.comment`, `.func`, `.cmd`, `.flag`, `.prompt`.

### 아이콘 & 에셋

- **M365/Microsoft 제품 아이콘**은 Bootstrap Icons(`bi-file-earmark-word` 등)가 아니라 **`docs/icons/`의 공식 SVG**(`word.svg`, `powerpoint.svg`, `teams.svg`, `outlook.svg`, `onenote.svg`, `Globe.svg` 등)를 사용한다.
- 적용 클래스: 카드/플로우 노드 중앙 정렬은 `.app-icon`, 텍스트 옆 인라인은 `.app-icon-inline` (둘 다 `site.css`에 정의).
- 범용 UI 아이콘(`bi-chat-dots`, `bi-lightbulb`, `bi-clock` 등)과 `nav-brand`의 `bi-microsoft`는 그대로 Bootstrap Icons 사용.

### 플로우 다이어그램

- 인라인 SVG 다이어그램의 노드는 **원(circle) 금지, 사각형(rect)으로 일관**. 화살표는 공통 `<marker id="arrow">` 패턴 재사용.
- 사람(동료·고객 등)을 표현할 때도 사각형 + 이름 라벨을 사용한다.

### 타깃 오디언스 & 점진적 공개

- **비개발자(현업) 대상 가이드**는 웹 UI 조작(클릭·드래그&드롭)을 메인 경로로 제시하고, 단계 수를 **최소화**한다 (3~4 단계 권장).
- **개발자 전용 내용**(Git CLI, Actions 워크플로, 커스텀 도메인 DNS 등)은 본문에 노출하지 말고 `.detail-accordion` 안에 접어 둔다.
- 제한·사실 정보는 공식 MS Learn / GitHub Docs 기준으로 검증하고, 해당 문서를 참고 링크로 남긴다.

### 사이드바 · Breadcrumb · 네비게이션 일관성

**모든 `<category>/<slug>/index.html` 페이지는 아래 패턴을 동일하게 따른다 (`meeting_in_30min` 기준 템플릿):**

1. **Breadcrumb** — `Home → <카테고리> → <현재 페이지 줄임>` 3단계. 모두 사이트 내부 상대 경로(`../../`, `../`)로만 연결. 외부 링크는 breadcrumb에 넣지 않는다. `lab.html` 등 하위 페이지는 4단계(`Home → 카테고리 → 부모 문서 → 현재`).
2. **Sidebar `back-link`** — 사이드바 최상단에 `<a class="back-link" href="../"><i class="bi bi-arrow-left"></i> <카테고리명> 카테고리로</a>` 필수. 다른 페이지 목록이나 nav-heading보다 위에 배치.
3. **Sidebar 목차 순서** — `back-link` → `nav-heading` + `nav-link` 블록 → (해당 시) `step-timeline` 블록 → 추가 `nav-heading` + `nav-link` 블록.
4. **`step-timeline`** — 단계별 프로세스가 있는 페이지에서 사용. 반드시 **사이드바 안**에 배치(본문 `col-lg-*` 분할 금지). `data-past-anchor`로 이후 섹션을 지정해 스크롤 시 전체 완료 상태로 전환. site.js의 scroll-spy가 자동 연동.
5. **`step-card`** — 본문에서 각 단계를 표현하는 카드.
   - `<div class="step-number">N</div>` + `<h3>제목</h3>` 방식 (meeting_in_30min 스타일), 또는
   - `<div class="step-header"><span class="step-num">N</span><h4>제목</h4></div>` 방식 (인라인 flex — 숫자와 제목이 한 줄로 정렬됨).
   - 두 패턴 모두 `site.css`에 스타일이 정의되어 있으므로 혼용 가능하나, **같은 문서 내에서는 하나만** 사용.

---

## 3. manifest.json & 네비게이션

- `docs/manifest.json`은 메인/카테고리 랜딩 페이지가 fetch해서 문서 목록을 그리는 **단일 진실 공급원**입니다.
- **manifest.json은 로컬에서 수동 생성 후 커밋하는 것을 기본 흐름으로 합니다.** (GitHub Actions 자동 커밋은 현재 비활성화됨 — 로컬 편집과의 충돌을 피하기 위함)
- 새 문서 폴더를 만들면 `manifest.json`의 해당 카테고리 `docs` 배열에 반영되어야 합니다. 두 가지 방법 중 하나:
    1. **스크립트로 재생성 (권장)** — 저장소 루트에서:
        ```bash
        python3 scripts/generate_manifest.py
        ```
       이 스크립트가 `docs/` 구조를 스캔해 `docs/manifest.json`을 갱신합니다. 생성된 결과를 **같은 커밋에 포함**해서 push.
    2. **직접 편집** — 항목 예시:
        ```json
        {
            "slug": "cosmos_db_intro",
            "title": "Azure Cosmos DB 입문 가이드",
            "description": "NoSQL 기본 개념 + 실습",
            "path": "azure/cosmos_db_intro/"
        }
        ```
- `path`는 항상 `docs/`를 루트로 하는 상대 경로 + 슬래시(`/`) 종료.
- **Copilot 작업 규칙**: 새 문서를 추가하거나 기존 문서의 제목/설명/경로가 바뀌면, **같은 변경 세트 안에서 `scripts/generate_manifest.py`를 실행**해 `docs/manifest.json`을 갱신한 뒤 함께 커밋합니다. `manifest.json`만 따로 다음 푸시로 미루지 않습니다.
- **GitHub Actions 워크플로 `.github/workflows/generate-manifest.yml`**은 현재 `workflow_dispatch` 수동 실행 전용이며, 결과를 artifact로만 업로드합니다 (저장소에 커밋하지 않음). 나중에 자동 커밋으로 되돌리려면 이 파일에 `push` 트리거와 commit 스텝을 다시 추가하면 됩니다.

---

## 4. Git & 배포

- 기본 브랜치: `main` (= GitHub Pages 소스).
- Pages 서빙 경로: `/docs`.
- 커스텀 도메인: `ms.studydev.com` (CNAME: `docs/CNAME`).
- `.DS_Store`, `.vscode/`, `.idea/` 등은 `.gitignore`로 제외됨 — 절대 커밋하지 말 것.

커밋 메시지: Conventional Commits 권장 (`feat: …`, `docs: …`, `chore: …`).

---

## 5. 요청 대응 가이드

### 사용자가 "○○에 대한 글/가이드 만들어줘" 라고 하면

1. **카테고리 결정**: Azure / M365 / GitHub 중 어디에 속하는지 확인 (애매하면 질문).
2. **slug 결정**: snake_case, 의미가 명확한 짧은 이름.
3. **폴더 생성**: `docs/<category>/<slug>/index.html`.
4. **공용 CSS/JS 링크**만 사용 (상대 경로 `../../css/site.css`).
5. **카테고리 상단 링크**: 각 페이지 사이드바 또는 breadcrumb에 "← ○○ 카테고리로" 제공.
6. **manifest.json 업데이트**: 해당 카테고리 `docs` 배열에 새 엔트리 추가.

### 사용자가 "스타일 바꿔줘" 라고 하면

- 페이지 하나에만 영향이 있어도 **`docs/css/site.css` 수정**으로 통일.
- 하드코딩된 색/크기 대신 CSS 변수 활용.
- 새 컴포넌트는 BEM-ish 단어 조합(예: `.step-tl-circle`)으로 추가.

### 사용자가 "네비게이션 업데이트" 또는 "목차 고쳐" 라고 하면

- 자동 목록은 `manifest.json` 기반이므로 해당 파일을 편집.
- 하드코딩된 사이드바 `nav-link`는 각 문서 내부 목차 용도 (그 파일 안에서만 편집).

---

## 6. 보안 & 품질

- OWASP Top 10 준수. 사용자 입력 처리 시 이스케이프 필수.
- 외부 리소스는 신뢰 가능한 CDN만 사용 (jsdelivr / Google Fonts / MS Learn).
- 민감 정보(토큰, 키, 엔드포인트)는 예제 코드에서 플레이스홀더로만 표기.
- 새 의존성 추가 전에 사용자에게 확인.

---

이 문서는 이 저장소에서 Copilot이 따라야 하는 **유일한 규약**입니다. 규약과 사용자의 요청이 충돌하면 사용자에게 확인하세요.
