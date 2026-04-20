# ms.studydev.com — Copilot 작성 지침

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
