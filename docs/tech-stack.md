# 기술 스택 선택 배경

이 블로그는 단순한 정적 사이트가 아니라, git에 저장된 MDX 글을 기준으로 작성, 검증, 발행, 배포 흐름을 다루는 작은 퍼블리싱 시스템이다. 그래서 기술 선택은 "글은 파일로 남긴다", "공개 블로그는 안정적으로 빌드한다", "운영 도구는 명령을 실행한다"는 방향을 기준으로 잡았다.

## pnpm workspace

앱과 내부 모듈의 경계를 분리하기 위해 pnpm workspace를 사용한다.

`apps`는 실행되는 표면이고, `packages`는 앱이 조립해서 쓰는 내부 모듈이다. 다만 `packages`는 단순한 공유 코드 저장소가 아니라 우리가 소유하는 변화율의 격자다. 제품별 contract, workflow, adapter, platform capability, base 규약을 물리적으로 분리해 같은 저장소 안에서 함께 개발하고 검증하는 구조를 의도한다.

## Astro

공개 블로그는 Astro가 맡는다.

블로그는 주로 정적 산출물로 배포되는 것이 자연스럽다. Astro는 MDX 기반 글을 빌드 시점에 HTML로 만들기 좋고, RSS, sitemap, robots, LLM-facing text 같은 공개 산출물을 함께 만들기에도 맞다.

공개 렌더링 runtime은 `apps/blog`가 시작하고 조립한다. 글 작성이나 발행 명령 처리, git 작업, 홈서버 배포 orchestration은 맡지 않는다.

## MDX

글 포맷은 MDX를 사용한다.

Markdown의 글쓰기 경험을 유지하면서도, 필요한 경우 글 안에서 컴포넌트를 사용할 수 있기 때문이다. Astro MDX는 빌드 시점에 MDX를 처리하므로, 클라이언트 사이드로 hydrate되는 컴포넌트도 빌드 파이프라인 안에서 다룰 수 있다.

글은 하나의 디렉토리 안에 `index.mdx`와 관련 정적 파일을 함께 두는 bundle 단위로 관리한다.

## React와 MDXEditor

관리자 UI는 React를 사용한다.

MDXEditor는 React 컴포넌트로 제공되며, MDX 작성 UI의 핵심 후보이다. 에디터가 이 앱의 중심 기능이므로 React로 가는 편이 wrapper나 이중 런타임을 줄일 수 있다.

`apps/admin`은 글 작성, 미리보기, 저장, 발행 요청, 배포 상태 확인 같은 운영 UI runtime을 담당한다. 콘텐츠 규칙, workflow 정책, API contract는 product package가 소유한다.

## Hono API

서버 API는 Hono를 사용한다.

이 API는 공개 리소스를 RESTful하게 제공하는 서버가 아니다. 관리자와 에디터가 보내는 command를 처리하는 RPC에 가까운 gateway이다.

`apps/api`는 HTTP 서버 시작, config 읽기, Hono app 생성, global middleware 설치, 내부 모듈 조립, package-owned Hono adapter mount를 맡는다. DTO 검증, command 실행, content 규칙, workflow 정책, git 동작, 배포 구현은 API 앱 내부에 직접 박아두지 않는다.

Hono를 아는 제품별 route adapter는 `packages/blog-admin-api-hono` 같은 adapter package에 둔다. 이 adapter가 HTTP 요청을 contract DTO로 변환하고, contract validation을 수행하고, workflow나 command handler를 호출한 뒤 결과를 HTTP response로 바꾼다.

## TypeScript

전체 프로젝트는 TypeScript를 기준으로 한다.

frontmatter, workflow command, API DTO, content bundle 같은 개념이 여러 앱을 지나가기 때문에 타입으로 경계를 드러내는 것이 중요하다. 다만 모든 타입을 무작정 공유하지 않는다. API와 클라이언트, 공개 renderer와 content loader처럼 실제 관계가 있는 지점에만 제품별 contract package를 둔다.

`@my-blog/blog-contract`는 blog 제품 경계의 명시적 계약이지 전역 `common`이나 generic `schema` 패키지가 아니다. 다른 제품 cell이 생기면 이 계약을 직접 재사용하기보다 자기 contract를 만들고 필요한 데이터를 번역한다.

## 홈서버 배포

최종 배포 대상은 개인 홈서버이다.

공개 블로그는 빌드된 정적 산출물을 홈서버에서 서빙하고, API는 작성과 운영 command 요청을 받는 별도 서버 프로세스로 둔다. 배포 구현은 나중에 `packages/blog-deploy-home-server` 같은 제품 adapter 또는 피벗 후에도 남을 능력이라면 `packages/platform-deployment` 같은 platform package로 분리해, 앱은 조립만 하도록 만든다.
