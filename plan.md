  
## Plan: MS Foundry 에이전트 유형 비교 HTML 문서 생성

Microsoft Azure Foundry의 3가지 에이전트 유형(Prompt Agent, Workflow Agent, Hosted Agent)을 비교·설명하는 교육 스타일 HTML 문서를 `hosted_agent` 폴더 에 생성합니다. Aduca 테마의 깔끔한 카드 기반 레이아웃을 적용하고, Bootstrap 5 CDN + Azure 브랜드 컬러(#0078D4)로 스타일링합니다.

---

### 리서치 결과 — 3가지 에이전트 유형 (MS 공식 문서 기반)

| 항목 | Prompt Agent | Workflow Agent (Preview) | Hosted Agent (Preview) |
|------|-------------|------------------------|----------------------|
| 코드 필요 | No | No (YAML 선택) | Yes |
| 호스팅 | 완전 관리형 | 완전 관리형 | 컨테이너 기반, 관리형 |
| 오케스트레이션 | 단일 에이전트 | 멀티 에이전트, 분기 | 커스텀 로직 |
| 적합 용도 | 프로토타이핑, 간단 작업 | 멀티스텝 자동화, 승인 워크플로 | 완전 제어, 커스텀 프레임워크 |
| 구현 위치 | Foundry Portal / SDK / REST API | Foundry Portal 비주얼 빌더 / VS Code YAML | VS Code + Docker + ACR |
| 프레임워크 | N/A | Power Fx 표현식 | Agent Framework, LangGraph, Custom |
| VNet 격리 | 지원 | 지원 | 미지원 (Preview 중) |

---

### Steps

**Phase 1 — 폴더 및 파일 구조**
1. `hosted_agent/` 디렉토리 생성
2. `index.html` 단일 파일 생성 (CSS/JS 인라인 내장, 외부 에셋 없음)

**Phase 2 — HTML 문서 구성** (한국어)
3. **헤더/네비바**: 로고 영역 + "Azure Foundry > Agent Service > 에이전트 비교" 브레드크럼
4. **히어로 섹션**: 제목 "Microsoft Foundry Agent Service — 에이전트 유형 비교 가이드", 부제목, 업데이트 날짜
5. **개요 섹션**: 에이전트란? (Model + Instructions + Tools 3대 구성요소 다이어그램 설명)
6. **3종 에이전트 카드**: 각 유형을 카드 UI로 표현 — 아이콘, 핵심 요약, 장/단점, 적합 사례
7. **상세 비교 테이블**: 코드 필요 여부, 호스팅, 오케스트레이션, 프레임워크, 네트워크, 가용 리전 등 한눈에 비교
8. **의사결정 가이드 섹션**: "어떤 에이전트를 선택할까?" — 시나리오별 추천 (플로우차트 스타일)
9. **각 유형 상세 섹션** (아코디언/탭):
   - Prompt Agent — 포탈에서 바로 생성, SDK 코드 예시 링크
   - Workflow Agent — 비주얼 빌더 소개, 패턴(Sequential / Group Chat / Human-in-the-loop)
   - Hosted Agent — 컨테이너 기반 배포 흐름, 지원 프레임워크, 로컬 테스트 방법
10. **참고 자료 링크 모음**: MS Learn 공식 문서 링크
11. **푸터**: 저작권, 참고 출처

**Phase 3 — 스타일링**
12. Aduca 테마 참고, Bootstrap 5 CDN + Google Fonts (Noto Sans KR) 적용
    - 카드 그림자/둥근 모서리, Azure 컬러 뱃지, 반응형 레이아웃
    - 사이드바(목차 네비게이션) + 메인 콘텐츠 2단 구성
    - SVG 인라인 아이콘 또는 Bootstrap Icons 사용 (외부 이미지 의존 없음)

---

### 생성 파일
- `hosted_agent/index.html` — 단일 HTML (CSS/JS 내장, 독립 실행 가능)

### 참고 소스
- [Agent Service Overview](https://learn.microsoft.com/en-us/azure/foundry/agents/overview) — 에이전트 유형 비교표
- [Workflow Agents](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow) — 워크플로 에이전트 상세
- [Hosted Agents](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents) — 호스트드 에이전트 상세
- [Prompt Agent Quickstart](https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code) — 프롬프트 에이전트 퀵스타트
- [Aduca Theme](https://techydevs.com/demos/themes/html/aduca-demo/aduca/course-details.html) — 디자인 레퍼런스

### Verification
1. `index.html`을 브라우저에서 열어 레이아웃/스타일 정상 렌더링 확인
2. Chrome DevTools로 모바일 반응형 확인
3. 모든 외부 링크(MS Learn) 동작 확인
4. 한국어 텍스트 정상 표시 확인

### Decisions
- **단일 HTML 파일** — 별도 CSS/JS/이미지 파일 없이 독립 실행 가능
- **한국어** 작성
- **Bootstrap 5 CDN** 활용 (반응형 + 최소 외부 의존)
- **이미지 없음** — SVG 인라인 아이콘 또는 Bootstrap Icons CDN 사용
- **Azure 브랜드 컬러** (#0078D4) 기반 테마

### Further Considerations
1. **추가 페이지 분리?** — 각 에이전트 유형별로 별도 HTML 페이지를 만들지, 단일 페이지 내 앵커 이동으로 할지. → **추천: 단일 페이지** (관리 용이, 콘텐츠량이 적정)
2. **영문/한국어 병기?** — 기술 용어는 영문 유지, 설명은 한국어. 괜찮으시면 이대로 진행
3. **인쇄용 스타일?** — `@media print` 스타일 추가 필요 여부