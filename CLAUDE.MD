# 초등학생 대상 디지털 학습 콘텐츠 제작 시스템

## 🎯 프로젝트 목표
20~40대 교사들이 **코딩 지식 없이** 직관적인 GUI를 통해 초등학생(1~6학년) 대상의 인터랙티브 학습 콘텐츠를 쉽게 제작할 수 있는 시스템 개발

## 🏗️ 시스템 아키텍처

### 1. 교사용 콘텐츠 작성기 (Teacher Content Creator)
- **대상 사용자**: 20~40대 교사 (IT 숙련도 중급 이하)
- **핵심 원칙**: 직관적, 시각적, 간편함
- **기술 스택**: Vue 3 + Composition API + TypeScript + Tailwind CSS + Pinia

### 2. 학습자용 콘텐츠 플레이어 (Student Content Player)
- **대상 사용자**: 초등학생 1~6학년
- **핵심 원칙**: 반응형, 터치 친화적, 고성능
- **기술 스택**: Vue 3 + Canvas API + MathJax/KaTeX

## 📋 핵심 기능 요구사항

### A. 교사 친화적 UI/UX 필수 요소
1. **직관적 드래그 앤 드롭 인터페이스**
   - 왼쪽 모듈 팔레트에서 오른쪽 문제 캔버스로 드래그
   - 시각적 피드백 (드롭존 하이라이트, 애니메이션)
   - 실시간 미리보기

2. **사용자 친화적 네비게이션**
   - 문제 목록 → 문제 편집 → 미리보기 → 저장의 직관적 플로우
   - 브레드크럼 네비게이션
   - 저장되지 않은 변경사항 경고

3. **수려한 모던 UI 디자인**
   - Material Design 3 또는 Apple Human Interface Guidelines 스타일
   - 일관된 색상 팔레트 (교육용 친화적 색상)
   - 적절한 여백과 타이포그래피
   - 다크모드 지원

### B. 문제 관리 시스템 (CRUD)
```typescript
interface Problem {
  id: string;
  title: string;
  question: string;
  grade: 1 | 2 | 3 | 4 | 5 | 6;
  subject: '수학' | '국어' | '과학' | '사회';
  modules: Module[];
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}
```

**필수 기능:**
1. **문제 목록 화면** (카드 또는 테이블 뷰)
   - 검색 및 필터링 (학년, 과목, 태그, 난이도)
   - 정렬 (생성일, 수정일, 제목)
   - 벌크 삭제 및 복사
   - 페이지네이션

2. **문제 편집기**
   - 실시간 저장 (auto-save)
   - 버전 히스토리
   - 실행 취소/다시 실행
   - 복사/붙여넣기

3. **미리보기 및 테스트**
   - 학생 뷰 실시간 미리보기
   - 정답 검증 테스트
   - 반응형 디바이스 시뮬레이션

### C. 모듈 시스템 설계

```typescript
interface Module {
  id: string;
  type: ModuleType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  tool?: ToolType;
  checkAnswer: boolean;
  answer?: any;
  properties: Record<string, any>;
}

type ModuleType = 
  | '객관식' | '주관식' | '서술형'
  | '각도기' | '자' | '시계'
  | '선잇기' | '색칠하기' | '드래그앤드롭'
  | '블록놀이' | '퍼즐' | '수식입력'
  | '이미지표시' | '동영상' | '음성';

type ToolType = 
  | '각도기' | '자' | '컴퍼스' | '시계'
  | '계산기' | '키보드' | '터치';
```

### D. 수식 에디터 요구사항
1. **직관적 수식 입력**
   - 팔레트 기반 수식 기호 선택
   - 자연어 입력 → LaTeX 자동 변환
   - 실시간 미리보기

2. **수식 템플릿 제공**
   - 분수, 제곱근, 지수, 적분 등 자주 사용하는 형태
   - 학년별 맞춤 템플릿

## 🎨 UI/UX 디자인 가이드라인

### 색상 팔레트
```css
:root {
  --primary: #3B82F6;     /* Blue-500 */
  --secondary: #10B981;   /* Emerald-500 */
  --accent: #F59E0B;      /* Amber-500 */
  --danger: #EF4444;      /* Red-500 */
  --warning: #F97316;     /* Orange-500 */
  --success: #10B981;     /* Emerald-500 */
  
  --background: #FFFFFF;
  --surface: #F8FAFC;     /* Slate-50 */
  --surface-2: #F1F5F9;   /* Slate-100 */
  
  --text-primary: #0F172A;   /* Slate-900 */
  --text-secondary: #475569; /* Slate-600 */
  --text-muted: #94A3B8;     /* Slate-400 */
}
```

### 레이아웃 구조
```
┌─────────────────────────────────────────────────────────┐
│ Header (Logo, User Menu, Save Status)                   │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────────────────────────────┐ │
│ │   Module    │ │           Work Canvas               │ │
│ │  Palette    │ │                                     │ │
│ │             │ │  ┌─────────────────────────────┐    │ │
│ │ - 객관식    │ │  │       Problem Card          │    │ │
│ │ - 주관식    │ │  │                             │    │ │
│ │ - 각도기    │ │  │  [Question Text Area]       │    │ │
│ │ - 선잇기    │ │  │                             │    │ │
│ │ - 수식      │ │  │  [Module Drop Zone]         │    │ │
│ │ ...         │ │  │                             │    │ │
│ └─────────────┘ │  └─────────────────────────────┘    │ │
│                 └─────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ Footer (Preview, Save, Properties Panel)                │
└─────────────────────────────────────────────────────────┘
```

## 🛠️ 개발 환경 설정

### 기술 스택
- **Frontend Framework**: Vue 3.4+ (Composition API)
- **Type Safety**: TypeScript 5.0+
- **State Management**: Pinia 2.1+
- **UI Framework**: Tailwind CSS 3.4+ + HeadlessUI
- **Build Tool**: Vite 5.0+
- **Math Rendering**: MathJax 3.2+ 또는 KaTeX 0.16+
- **Canvas Library**: Fabric.js 5.3+ (드래그앤드롭, 도형 조작)
- **Icon Library**: Heroicons 또는 Lucide Icons
- **Date Library**: Day.js
- **Validation**: Zod

### 프로젝트 구조
```
src/
├── components/
│   ├── ui/                    # 재사용 UI 컴포넌트
│   ├── modules/               # 모듈별 컴포넌트
│   ├── editor/                # 에디터 관련 컴포넌트
│   └── player/                # 플레이어 관련 컴포넌트
├── views/
│   ├── ProblemList.vue        # 문제 목록
│   ├── ProblemEditor.vue      # 문제 편집기
│   └── ProblemPlayer.vue      # 문제 실행기
├── stores/                    # Pinia 스토어
├── composables/               # Vue 컴포저블
├── utils/                     # 유틸리티 함수
├── types/                     # TypeScript 타입 정의
└── assets/                    # 정적 자산
```

## 📝 개발 순서 및 마일스톤

### Phase 1: 기본 인프라 (Week 1-2)
1. 프로젝트 초기 설정 (Vite + Vue 3 + TypeScript)
2. 기본 UI 컴포넌트 라이브러리 구축
3. 라우팅 및 상태 관리 설정
4. 기본 레이아웃 및 네비게이션

### Phase 2: 핵심 편집기 (Week 3-4)
1. 드래그 앤 드롭 시스템 구현
2. 문제 데이터 모델 및 스토어 설계
3. 모듈 팔레트 및 속성 패널
4. 실시간 미리보기 시스템

### Phase 3: 모듈 시스템 (Week 5-6)
1. 기본 모듈 구현 (객관식, 주관식, 이미지)
2. 수식 에디터 및 렌더러
3. 고급 모듈 (각도기, 선잇기, 색칠하기)
4. 모듈 검증 시스템

### Phase 4: 데이터 관리 (Week 7-8)
1. 문제 CRUD 시스템
2. 검색 및 필터링
3. Import/Export 기능
4. 백업 및 복원

### Phase 5: 최적화 및 테스트 (Week 9-10)
1. 성능 최적화
2. 접근성 개선
3. 크로스 브라우저 테스트
4. 사용자 테스트 및 피드백 반영

## 🔧 코드 품질 및 개발 표준

### 1. 코딩 규칙
- **ESLint + Prettier** 설정 필수
- **Vue 3 Composition API** 스타일 가이드 준수
- **TypeScript Strict Mode** 활성화
- **Component Naming**: PascalCase
- **Composable Naming**: use + 기능명 (예: useModuleManager)

### 2. 성능 고려사항
- **Code Splitting**: 모듈별 lazy loading
- **Virtual Scrolling**: 대량 문제 목록 처리
- **Debouncing**: 실시간 저장 및 검색
- **Memoization**: 복잡한 계산 결과 캐싱

### 3. 접근성 (a11y)
- **ARIA Labels**: 스크린 리더 지원
- **Keyboard Navigation**: 모든 기능 키보드 접근 가능
- **Color Contrast**: WCAG 2.1 AA 레벨 준수
- **Focus Management**: 적절한 포커스 플로우

## 📋 예시 데이터 구조

### 문제 JSON 스키마
```json
{
  "id": "prob_001",
  "title": "각도 측정하기",
  "question": "아래 각을 보고 각도기를 사용해 크기를 측정하고, 각의 이름을 적으세요.",
  "grade": 4,
  "subject": "수학",
  "difficulty": "medium",
  "tags": ["기하", "각도", "측정"],
  "modules": [
    {
      "id": "mod_001",
      "type": "이미지표시",
      "position": { "x": 50, "y": 100 },
      "properties": {
        "src": "angle001.png",
        "alt": "45도 각도 이미지"
      }
    },
    {
      "id": "mod_002", 
      "type": "각도기",
      "position": { "x": 50, "y": 300 },
      "tool": "각도기",
      "checkAnswer": true,
      "answer": 45,
      "properties": {
        "imageRef": "mod_001"
      }
    },
    {
      "id": "mod_003",
      "type": "객관식",
      "position": { "x": 50, "y": 500 },
      "checkAnswer": true,
      "answer": "예각",
      "properties": {
        "question": "이 각의 이름은?",
        "options": ["예각", "직각", "둔각", "평각"]
      }
    }
  ],
  "createdAt": "2025-06-20T00:00:00.000Z",
  "updatedAt": "2025-06-20T00:00:00.000Z"
}
```

## 🎯 사용자 경험 개선 포인트

### 1. 교사의 학습 곡선 최소화
- **온보딩 튜토리얼**: 첫 방문시 가이드 투어
- **템플릿 제공**: 자주 사용하는 문제 유형별 템플릿
- **도움말 시스템**: 컨텍스트 기반 도움말
- **에러 가이드**: 친화적인 에러 메시지 및 해결책 제시

### 2. 작업 효율성 극대화
- **키보드 단축키**: 자주 사용하는 기능 단축키 지원
- **일괄 작업**: 여러 문제 동시 편집/삭제/태그 등
- **자동 완성**: 문제 제목, 태그 등 입력시 자동 완성
- **스마트 복사**: 유사한 문제 구조 복사 및 수정

### 3. 오류 방지 시스템
- **실시간 검증**: 입력 즉시 유효성 검사
- **자동 저장**: 일정 간격 자동 저장 + 변경사항 감지
- **복구 시스템**: 브라우저 crash 등 상황 대비 복구
- **미리보기 모드**: 학생 시점에서 문제 검토

## 💡 추가 고려사항

### 1. 확장성
- **플러그인 시스템**: 새로운 모듈 타입 추가 가능한 구조
- **다국어 지원**: i18n 구조 설계
- **테마 시스템**: 다양한 UI 테마 지원
- **API 설계**: RESTful API 또는 GraphQL 고려

### 2. 협업 기능 (미래 확장)
- **팀 작업공간**: 교사간 문제 공유
- **버전 관리**: Git 기반 문제 버전 관리
- **댓글 시스템**: 문제별 피드백 및 토론
- **승인 워크플로우**: 문제 검토 및 승인 프로세스

### 3. 분석 및 인사이트
- **사용 통계**: 모듈별 사용 빈도 분석
- **학습자 피드백**: 문제 난이도 및 만족도 수집
- **성능 지표**: 문제 완성률, 소요 시간 등
- **개선 제안**: AI 기반 문제 개선 제안

이 프롬프트는 교사 사용자의 실제 요구사항과 개발 실무를 고려하여 작성되었으며, 바로 개발에 착수할 수 있도록 구체적인 기술 스택과 구현 방향을 제시합니다.