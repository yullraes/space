# ADR 0001: MDX 글은 slug 기반 post bundle로 보관한다

## 상태

Accepted

## 날짜

2026-06-21

## 맥락

이 블로그는 git에 저장된 MDX 파일을 기준으로 작성, 수정, 발행, 배포 흐름을 다루는 퍼블리싱 시스템이다.

관리자 앱은 MDX 문서 작성과 수정, 발행 상태 변경이 가장 큰 책임이 될 가능성이 높다. MDXEditor 사용을 고려하면 관리자 UI는 React 방향이 자연스럽지만, 에디터 UI가 어떤 프레임워크를 쓰는지와 글이 물리적으로 어디에 저장되는지는 분리되어야 한다.

글은 본문만으로 완결되지 않는다. 글 본문인 `index.mdx`와 글에서 사용하는 이미지, 다이어그램, 기타 정적 파일이 함께 움직여야 한다. 따라서 글은 단일 파일이 아니라 하나의 bundle로 다루는 편이 자연스럽다.

또한 메타데이터 저장 위치를 결정해야 한다. DB는 목록, 검색, lock, audit, autosave 같은 관리자 기능에 강하다. 반면 frontmatter는 git 기반 MDX라는 전제와 잘 맞고, 파일만 봐도 글의 공개 상태와 빌드에 필요한 정보를 이해할 수 있다.

## 결정

글의 canonical source는 git에 저장된 MDX post bundle이다.

기본 저장 구조는 다음과 같다.

```text
content/
  posts/
    {slug}/
      index.mdx
      assets/
        ...
```

`{slug}`는 글의 안정적인 식별자이며 디렉토리 이름이다. 날짜 기반 디렉토리는 사용하지 않는다. 글 제목은 나중에 바뀔 수 있으므로, 디렉토리 이름은 표시 제목이 아니라 slug로 취급한다.

`index.mdx`의 frontmatter는 공개 블로그 빌드와 글 자체의 의미에 필요한 canonical metadata를 가진다.

예시는 다음과 같다.

```mdx
---
title: "Studying Strategy Pattern"
slug: "studying-strategy-pattern"
status: "draft"
description: "..."
category: "architecture"
tags: ["design-pattern", "typescript"]
createdAt: "2026-06-21"
updatedAt: "2026-06-21"
publishedAt: null
---

본문...
```

DB는 canonical metadata 저장소가 아니라 관리자 경험과 운영을 위한 보조 저장소로 사용한다. 예를 들면 post index/cache, 검색 인덱스, autosave draft, edit lock, audit log는 DB에 둘 수 있다.

물리 저장 규칙인 `content/posts/{slug}/index.mdx`와 asset 위치는 blog 제품 cell의 `packages/blog-content-store`가 소유한다.

`apps/admin`, `apps/api`, `apps/blog`는 이 경로 규칙을 직접 조립하지 않는다. 필요한 경우 package API를 통해 간접적으로 알게 한다.

예를 들면 admin은 다음과 같은 command나 client API만 사용한다.

```ts
saveDraftPost({ slug, body, meta });
publishPost({ slug });
archivePost({ slug });
uploadPostAsset({ slug, file });
```

admin은 다음과 같은 물리 경로를 직접 알지 않는다.

```ts
`content/posts/${slug}/index.mdx`;
`content/posts/${slug}/assets/${fileName}`;
```

`apps/blog`도 가능한 한 publishable post loader를 통해 글을 받는다. Astro 빌드 제약 때문에 glob이나 content collection adapter가 필요하더라도, 저장 규칙은 `packages/blog-content-store`에 제한하고, cross-boundary schema는 `packages/blog-contract`를 통해 명시적으로 사용한다.

## 결과

git clone만으로 글 본문, 공개 metadata, 정적 asset을 복원할 수 있다.

글 단위 변경이 git diff와 review에서 잘 보인다.

정적 블로그 빌드는 DB 없이도 실행될 수 있다.

admin의 목록, 검색, lock, audit, autosave 요구는 DB를 붙여 해결할 수 있지만, DB와 MDX 파일 사이의 split-brain 위험을 줄이기 위해 public metadata는 frontmatter를 기준으로 한다.

저장 구조 변경이 필요해져도 `apps/admin`, `apps/api`, package-owned Hono adapter가 직접 흔들리지 않는다. 변경의 중심은 `packages/blog-content-store`가 된다.

## 대안

날짜 기반 디렉토리를 고려했다.

```text
content/posts/2026/my-post/index.mdx
```

하지만 날짜는 `publishedAt` 같은 metadata로 충분하고, URL이나 저장 경로가 날짜 중심일 필요가 없다. 이 프로젝트에서는 글 slug가 bundle 식별자로 더 적합하다.

DB를 canonical metadata 저장소로 두는 방식도 고려했다. 이 방식은 관리자 화면, 검색, 상태 전이, audit 구현에는 유리하다. 하지만 git 기반 MDX 퍼블리싱이라는 전제에서는 파일과 DB가 서로 다른 진실을 가지는 문제가 생긴다. 따라서 DB는 운영 보조 저장소로 사용하고, public build에 필요한 글 metadata는 frontmatter를 기준으로 한다.
