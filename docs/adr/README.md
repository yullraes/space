# ADR 운영 규칙

ADR은 아키텍처 결정의 변경 이력을 남기기 위한 문서이다.

개별 ADR 문서는 결정 당시의 기록으로 유지한다. 한 번 작성된 ADR의 본문은 불변으로 취급한다. 오탈자처럼 의미를 바꾸지 않는 수정은 가능하지만, 결정의 의미, 범위, 상태, 근거를 바꾸는 수정은 하지 않는다.

기존 결정을 수정하거나 폐기해야 한다면 새 ADR을 작성한다. 새 ADR에는 어떤 기존 ADR을 대체하거나 보완하는지 명시한다.

기존 ADR 파일은 수정하지 않는다. 현재 상태와 대체 관계는 [ADR Index](./index.md)에서 관리한다.

## 파일 규칙

ADR 파일명은 다음 형식을 사용한다.

```text
0001-short-kebab-title.md
```

파일의 첫 heading은 파일 번호와 일치해야 한다.

```md
# ADR 0001: Title
```

각 ADR은 `## 상태`와 `## 날짜`를 포함한다. ADR 문서 안의 상태는 결정 당시 상태이고, 시간이 지난 뒤의 현재 상태는 `index.md`의 `Current Status`를 기준으로 본다.

## 관계 관리

새 ADR이 기존 ADR을 대체하거나 보완한다면 새 ADR에 `## 관계` 섹션을 둔다.

```md
## 관계

Supersedes [ADR 0001: ...](./0001-example.md).
```

그리고 `index.md`의 테이블에서 기존 ADR과 새 ADR의 현재 관계를 갱신한다.

상태 값은 `Accepted`, `Superseded`, `Deprecated`를 사용한다.

## 자동 검증

ADR 규칙 일부는 `pnpm check:adr`로 검증한다.

현재 검증하는 항목은 다음과 같다.

- ADR 파일명이 `0001-short-kebab-title.md` 형식인지 확인한다.
- 파일 번호와 첫 heading의 `ADR 0001` 번호가 일치하는지 확인한다.
- 각 ADR에 `## 상태`와 `## 날짜`가 있는지 확인한다.
- 날짜가 `YYYY-MM-DD` 형식인지 확인한다.
- `index.md`에 모든 ADR이 한 번씩 등록되어 있는지 확인한다.
- `index.md`의 링크가 실제 ADR 파일을 가리키는지 확인한다.
- `index.md`의 `Current Status`가 허용된 상태 값인지 확인한다.

기존 ADR 본문 불변성은 base branch와 비교해야 정확히 강제할 수 있다. 이 검증은 GitHub Actions 같은 CI 기준점이 생긴 뒤 추가한다.
