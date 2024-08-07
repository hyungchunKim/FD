# 코드 컨벤션 (Code Conventions) 및 파일 컨벤션 (File Conventions)

코드 컨벤션과 파일 컨벤션은 코드 작성 및 파일 구성에 대한 표준을 정의하여 코드의 일관성, 가독성 및 유지 보수성을 향상시키는 데 도움을 줍니다.

## 코드 컨벤션 (Code Conventions)

코드 컨벤션은 프로그래밍 언어 및 프로젝트에서 코드를 작성할 때 따라야 하는 규칙과 가이드라인을 의미합니다. 일반적인 코드 컨벤션 항목은 다음과 같습니다:

1. **들여쓰기 (Indentation)**:

   - 일반적으로 공백 2개 또는 탭 1개를 사용합니다.

2. **네이밍 규칙 (Naming Conventions)**:

   - **변수명**: 카멜 케이스, 예: `userName`
   - **일반 함수명**: 카멜 케이스, 예: `userName`
   - **컴포넌 함수명**: 파스칼 케이스, 예: `UserName`
   - **클래스명**: 파스칼 케이스, 예: `UserName`
   - **상수**: 어퍼 스네이크 케이스, 예: `UPPER_SNAKE_CASE`

3. **주석 (Comments)**:
   -
   // 컴포넌트 주석
   
   /*
   * 어디 컴포넌트
   * 무슨 용도인지
   * 
   */
   
   // 공통 함수 주석
   
   /*
   * 무엇을 위한 함수
   * 어떻게 쓰는지
   * return value
   * 
   */ 

## 파일 컨벤션 (File Conventions)

파일 컨벤션은 프로젝트의 파일 구조와 네이밍에 대한 규칙을 정의합니다. 이는 프로젝트의 구조를 명확하게 하고, 파일을 쉽게 찾고 관리할 수 있도록 도와줍니다.

1. **파일 및 디렉터리 구조**:

   ![image](https://github.com/user-attachments/assets/bfaf96ef-1ca1-4613-b485-857b331ffbdb)


2. **파일 네이밍**:

   - 일반 컴포넌트 파일 이름은 파스칼케이스 사용, 예: `UserInfo.tsx`
   - 폴더 이름은 케밥 케이스 사용, 예: `user-info`
   - 타입 정의는 카멜 케이스 사용, 예: `userInfo.tsx`

## Github Branch naming

### 일반적인 브랜치 네이밍 패턴

1. **기능 브랜치 (Feature Branch)**:

   - 새로운 기능을 개발할 때 사용합니다. 컴포넌트 이름이나 페이지이름을 작성해도 좋습니다.
   - 패턴: `feat/브랜치_설명`
   - 예: `feat/user-authentication`

2. **버그 수정 브랜치 (Bugfix Branch)**:

   - 버그를 수정할 때 사용합니다.
   - 패턴: `bugfix/(jira-number)-브랜치_설명`
   - 예: `bugfix/login-error`

4. **데브 브랜치 (Dev Branch)**:

   - Dev 브랜치는 개발 작업이 이루어지는 메인 브랜치로, 새로운 기능 개발, 버그 수정, 개선 사항 등이 모두 병합되는 브랜치입니다. 릴리즈 브랜치로 머지되기 전 모든 작업이 모이는 중간 단계입니다.
   - 패턴: `dev/버전번호 및 기능이름`
   - 예: `dev/v1.0.0` or `dev/signup`


### 권장 네이밍 예시

feature/이름이니셜-작업하는 컴포넌트 혹은 페이지 로 통일해서 생성하여 작업합니다.

- **기능 추가**: `feature/siri-add-user-profile`
- **버그 수정**: `bugfix/siri-correct-email-validation`
- **핫픽스**: `hotfix/fix-payment-processing`
- **기능 개선**: `dev/update-dashboard-ui`
- **릴리즈 준비**: `release/2.0.0`


## Nextjs14

### Nextjs의 File Convention

Nextjs에서 파일 컨벤션은 다음 링크에서 확인할 수 있습니다.

[Nextjs File Convention](https://nextjs.org/docs/app/api-reference/file-conventions)

### Nextjs의 Code Convention

[Nextjs Code Convention](https://github.com/dwarvesf/nextjs-boilerplate/blob/master/docs/CODE_STYLE.md?plain=1)

# UML

## use case diagram
![유즈케이스 drawio](https://github.com/user-attachments/assets/6a1fa2ea-9eed-47ee-a619-e2ec2b3d5807)

## sequence diagram
![시퀀스다이어그램 drawio](https://github.com/user-attachments/assets/6412ec80-f854-4112-a309-0d84c2fd0d95)

