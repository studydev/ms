# ms.studydev.com

> **Microsoft 기술 문서 허브** — Azure · Microsoft 365 · GitHub 관련 한국어 학습 자료를 한곳에서.

[![Live Site](https://img.shields.io/badge/site-ms.studydev.com-0078D4?logo=microsoft-azure&logoColor=white)](https://ms.studydev.com)
[![GitHub Pages](https://img.shields.io/badge/hosting-GitHub%20Pages-24292E?logo=github&logoColor=white)](https://pages.github.com)

이 저장소(`studydev/ms`)는 Microsoft 기술 전반에 대한 한국어 학습 자료와 실전 가이드를 정적 웹사이트로 공개하는 프로젝트입니다. GitHub Pages로 서빙되며 커스텀 도메인 **[ms.studydev.com](https://ms.studydev.com)** 으로 접근할 수 있습니다.

---

## 🧭 구성

| 카테고리 | 경로 | 대상 주제 |
|---------|------|-----------|
| ☁️ **Azure** | [`docs/azure/`](docs/azure/) | Azure Foundry, AI Agent, Cosmos DB, App Service, Functions, AKS 등 |
| 🟧 **Microsoft 365** | [`docs/m365/`](docs/m365/) | Copilot, Graph API, Teams, SharePoint, Power Platform 등 |
| 🐙 **GitHub** | [`docs/github/`](docs/github/) | Actions, Copilot, Codespaces, Advanced Security 등 |

각 카테고리 하위에는 주제별 폴더(snake_case)가 있고, 폴더마다 진입점 `index.html`이 있습니다.

예: [`docs/azure/hosted_agent/`](docs/azure/hosted_agent/) — Microsoft Foundry의 에이전트 유형 비교 + Hosted Agent 실전 실습.

---

## 📁 저장소 구조

```
docs/                          # GitHub Pages 루트 (https://ms.studydev.com/)
├── index.html                 # 카테고리 카드 메인 랜딩
├── manifest.json              # 문서 메타데이터 (자동 생성)
├── CNAME                      # ms.studydev.com
├── css/site.css               # 공용 스타일
├── js/site.js                 # 공용 스크립트
├── azure/      ├── index.html + <slug>/index.html ...
├── m365/       ├── index.html + <slug>/index.html ...
└── github/     ├── index.html + <slug>/index.html ...

scripts/
└── generate_manifest.py       # docs/ 스캔 → manifest.json 재생성

.github/
├── copilot-instructions.md    # Copilot 작성 규약
└── workflows/
    └── generate-manifest.yml  # push 시 manifest 자동 생성
```

---

## 🚀 로컬 미리보기

```bash
# docs/ 를 정적 서버로 실행
python3 -m http.server 8000 --directory docs
# → http://localhost:8000
```

---

## ✍️ 새 문서 추가

1. 카테고리 결정: **Azure / M365 / GitHub** 중 하나
2. 폴더 생성: `docs/<category>/<slug>/index.html` (slug는 snake_case)
3. **공용 CSS/JS 참조**: 인라인 `<style>`·`<script>` 금지, 항상 `css/site.css`와 `js/site.js`를 상대 경로로 연결
4. 커밋 & 푸시 — GitHub Actions가 `docs/manifest.json`을 자동 재생성하여 랜딩 페이지의 네비게이션에 반영

자세한 규약은 [`.github/copilot-instructions.md`](.github/copilot-instructions.md)를 참고하세요.

---

## 🛠 manifest.json 수동 재생성

```bash
python3 scripts/generate_manifest.py
```

또는 GitHub Actions의 **Generate docs/manifest.json** 워크플로를 `workflow_dispatch`로 실행.

---

## 📝 라이선스 & 출처

- 이 사이트의 콘텐츠는 **Microsoft Learn 공식 문서** 및 공개된 자료를 기반으로 작성된 학습용 콘텐츠입니다.
- 각 문서에 원문 링크를 포함하며, Microsoft의 상표 및 저작권은 Microsoft에 귀속됩니다.
- 한국어 번역·요약·실습 구성 부분은 저장소 소유자가 작성했습니다.

---

<p align="center">
    <sub>Made with ☕ for learners exploring the Microsoft ecosystem.</sub>
</p>
