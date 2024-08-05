# 코드 컨벤션 (Code Conventions) 및 파일 컨벤션 (File Conventions)

코드 컨벤션과 파일 컨벤션은 코드 작성 및 파일 구성에 대한 표준을 정의하여 코드의 일관성, 가독성 및 유지 보수성을 향상시키는 데 도움을 줍니다.

## 코드 컨벤션 (Code Conventions)

코드 컨벤션은 프로그래밍 언어 및 프로젝트에서 코드를 작성할 때 따라야 하는 규칙과 가이드라인을 의미합니다. 일반적인 코드 컨벤션 항목은 다음과 같습니다:

1. **들여쓰기 (Indentation)**:

   - 일반적으로 공백 4개 또는 탭 1개를 사용합니다.
   - Python에서는 PEP 8에서 공백 4개를 권장합니다.

2. **네이밍 규칙 (Naming Conventions)**:

   - **변수명**: 소문자와 밑줄을 사용 (`snake_case`), 예: `user_name`
   - **함수명**: 소문자와 밑줄을 사용 (`snake_case`), 예: `get_user_info`
   - **클래스명**: 대문자와 단어별 대문자 (`CamelCase`), 예: `UserInfo`

3. **주석 (Comments)**:

   - 필요한 곳에 주석을 추가하여 코드의 의도를 설명합니다.
   - 블록 주석과 라인 주석을 적절히 사용합니다.
   - 주석은 최신 상태를 유지해야 하며, 코드와 함께 업데이트해야 합니다.

4. **코드 길이 (Line Length)**:

   - 한 줄의 길이는 보통 80자 또는 100자를 넘지 않도록 합니다.
   - PEP 8에서는 79자를 권장합니다.

5. **공백 (Whitespace)**:

   - 연산자와 괄호 주변에 적절한 공백을 사용하여 가독성을 높입니다.
   - 불필요한 공백은 피합니다.

6. **중괄호 (Braces)**:
   - 함수나 제어 구조의 시작과 끝에 중괄호를 사용합니다.
   - 중괄호 위치에 대한 일관된 스타일을 유지합니다. (예: 한 줄 내에 { } 사용 또는 새로운 줄에 { } 사용)

## 파일 컨벤션 (File Conventions)

파일 컨벤션은 프로젝트의 파일 구조와 네이밍에 대한 규칙을 정의합니다. 이는 프로젝트의 구조를 명확하게 하고, 파일을 쉽게 찾고 관리할 수 있도록 도와줍니다.

1. **파일 및 디렉터리 구조**:

   - 프로젝트의 루트 디렉토리에 README.md, LICENSE, .gitignore 파일을 포함합니다.
   - 소스 코드는 `src/` 또는 `lib/` 디렉토리에 배치합니다.
   - 테스트 코드는 `tests/` 또는 `__test__/` 디렉토리에 배치합니다.
   - 구성 파일은 `config/` 또는 설정 파일 형식별로 나눕니다 (예: `.env`, `settings.py`).

2. **파일 네이밍**:

   - 파일 이름은 파스칼케이스 사용, 예: `UserInfo.tsx`
   - 구성 파일이나 설정 파일은 명확한 이름을 사용, 예: `config.yaml`, `settings.py`
   - 디렉토리 이름 케밥케이스 사용, 예: ''

3. **모듈 및 패키지 구조**:

   - Python 모듈은 각 디렉토리에 `__init__.py` 파일을 포함하여 패키지로 만듭니다.
   - 각 기능별로 디렉토리를 나누어 코드를 구조화합니다.

4. **파일 길이**:
   - 한 파일에 너무 많은 코드를 작성하지 않도록 합니다. 한 파일이 너무 길어지면 적절하게 나눕니다.

이러한 코드 및 파일 컨벤션을 따르면 프로젝트가 커질수록 유지보수가 쉬워지고, 팀원 간의 협업이 원활해지며, 버그를 줄이는 데 큰 도움이 됩니다. 프로젝트 시작 시 팀원들과 함께 이러한 컨벤션을 정하고 준수하는 것이 중요합니다.

## Github Branch naming

![Github branch model](https://github.com/monocsp/for_sniperfactory_mentoring/blob/main/Code%20Convention/git_branching_model.png?raw=true)

GitHub에서 브랜치 이름을 짓는 방법과 권장 사항은 프로젝트의 일관성을 유지하고, 브랜치의 목적을 명확히 하며, 협업을 원활하게 하기 위해 중요합니다. 다음은 브랜치 이름 짓는 방법과 몇 가지 권장 사항입니다.

### 일반적인 브랜치 네이밍 패턴

1. **기능 브랜치 (Feature Branch)**:

   - 새로운 기능을 개발할 때 사용합니다. 컴포넌트 이름이나 페이지이름을 작성해도 좋습니다.
   - 패턴: `feature/브랜치_설명`
   - 예: `feature/user-authentication`

2. **버그 수정 브랜치 (Bugfix Branch)**:

   - 버그를 수정할 때 사용합니다.
   - 패턴: `bugfix/브랜치_설명`
   - 예: `bugfix/login-error`

3. **핫픽스 브랜치 (Hotfix Branch)**:

   - 긴급한 버그 수정을 위해 사용합니다.
   - 패턴: `hotfix/브랜치_설명`
   - 예: `hotfix/critical-security-issue`

4. **릴리즈 브랜치 (Release Branch)**:

   - Dev 브랜치는 개발 작업이 이루어지는 메인 브랜치로, 새로운 기능 개발, 버그 수정, 개선 사항 등이 모두 병합되는 브랜치입니다. 릴리즈 브랜치로 머지되기 전 모든 작업이 모이는 중간 단계입니다.
   - 패턴: `dev/버전번호 및 기능이름`
   - 예: `dev/v1.0.0` or `dev/signup`

5. **릴리즈 브랜치 (Release Branch)**:
   - 릴리즈 준비를 위해 사용합니다.
   - 패턴: `release/버전번호`
   - 예: `release/1.0.0`

### 추가적인 네이밍 팁

- **짧고 명확하게**: 브랜치 이름은 짧고 명확하게 작성합니다. 너무 길면 불편하고, 너무 짧으면 브랜치의 목적이 명확하지 않을 수 있습니다.
- **소문자 사용**: 일관성을 위해 모든 브랜치 이름을 소문자로 작성합니다.
- **단어 구분**: 단어는 하이픈(-) 또는 슬래시(/)로 구분합니다. 예: `feature/new-login-page` 또는 `bugfix/fix-header-issue`
- **일관성 유지**: 팀 내에서 정한 네이밍 규칙을 일관되게 따릅니다.

### 권장 네이밍 예시

feature/이름이니셜-작업하는 컴포넌트 혹은 페이지 로 통일해서 생성하여 작업합니다.

- **기능 추가**: `feature/siri-add-user-profile`
- **버그 수정**: `bugfix/siri-correct-email-validation`
- **핫픽스**: `hotfix/fix-payment-processing`
- **기능 개선**: `dev/update-dashboard-ui`
- **릴리즈 준비**: `release/2.0.0`

### 브랜치 네이밍의 중요성

- **명확성**: 브랜치 이름만 보고도 해당 브랜치의 목적을 쉽게 이해할 수 있습니다.
- **협업 효율성**: 일관된 네이밍 규칙은 팀원들 간의 커뮤니케이션을 원활하게 합니다.
- **자동화 도구 통합**: CI/CD 파이프라인 등 자동화 도구와의 통합 시 일관된 네이밍 규칙은 필수적입니다.

## Nextjs14

### Nextjs의 File Convention

Nextjs에서 파일 컨벤션은 다음 링크에서 확인할 수 있습니다.

[Nextjs File Convention](https://nextjs.org/docs/app/api-reference/file-conventions)

### Nextjs의 Code Convention

[Nextjs Code Convention](https://github.com/dwarvesf/nextjs-boilerplate/blob/master/docs/CODE_STYLE.md?plain=1)
