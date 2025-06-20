# MD Contents Maker

초등학생 대상 디지털 학습 콘텐츠 제작 시스템

## 🎯 프로젝트 개요

20~40대 교사들이 **코딩 지식 없이** 직관적인 GUI를 통해 초등학생(1~6학년) 대상의 인터랙티브 학습 콘텐츠를 쉽게 제작할 수 있는 시스템입니다.

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 빌드
```bash
npm run build
```

### 4. 코드 검사 및 포맷팅
```bash
npm run lint
npm run format
npm run typecheck
```

## 🏗️ 기술 스택

- **Frontend Framework**: Vue 3.4+ (Composition API)
- **Type Safety**: TypeScript 5.0+
- **State Management**: Pinia 2.1+
- **UI Framework**: Tailwind CSS 3.4+ + HeadlessUI
- **Build Tool**: Vite 5.0+
- **Icons**: Heroicons
- **Validation**: Zod
- **Date Library**: Day.js

## 📁 프로젝트 구조

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

## 🎨 주요 기능

### 1. 문제 관리 (CRUD)
- ✅ 문제 목록 조회
- ✅ 문제 검색 및 필터링 (학년, 과목, 태그)
- ✅ 문제 생성 및 편집
- ✅ 문제 삭제
- ✅ 미리보기 기능

### 2. 드래그 앤 드롭 편집기
- ✅ 모듈 팔레트에서 캔버스로 드래그
- ✅ 실시간 모듈 위치 조정
- ✅ 모듈 속성 편집
- ✅ 모듈 삭제

### 3. 지원 모듈 타입
- ✅ **답안 입력**: 객관식, 주관식, 서술형
- ✅ **도구**: 각도기, 자, 시계
- ✅ **미디어**: 이미지표시, 동영상, 음성

### 4. 학습자 플레이어
- ✅ 반응형 문제 플레이어
- ✅ 실시간 답안 입력
- ✅ 정답 확인 및 결과 피드백
- ✅ 다시 풀기 기능

## 🎮 사용 방법

### 1. 문제 목록
- 브라우저에서 `http://localhost:3000` 접속
- 기본적으로 3개의 샘플 문제가 로드됩니다
- 검색창에서 문제 제목이나 내용으로 검색 가능
- 학년, 과목별 필터링 지원

### 2. 문제 만들기
1. "새 문제 만들기" 버튼 클릭
2. 문제 정보 입력 (제목, 학년, 과목, 내용)
3. 왼쪽 모듈 팔레트에서 원하는 모듈을 캔버스로 드래그
4. 모듈 클릭하여 속성 편집
5. 이미지표시 모듈의 경우 파일 선택으로 이미지를 업로드
6. "저장" 버튼으로 문제 저장

### 3. 문제 미리보기
- 문제 목록에서 👁️ 아이콘 클릭
- 또는 편집기에서 "미리보기" 버튼 클릭
- 학생 관점에서 문제 확인 및 테스트

## 🔧 개발 가이드

### 새 모듈 타입 추가
1. `src/types/index.ts`에서 `ModuleType` 타입에 추가
2. `src/components/editor/ModuleComponent.vue`에서 편집 UI 구현
3. `src/components/player/PlayerModule.vue`에서 플레이어 UI 구현

### 스타일 커스터마이징
- `tailwind.config.js`에서 색상 팔레트 수정
- `src/style.css`에서 전역 스타일 추가

## 📝 개발 현황

### ✅ 완료된 기능
- [x] 프로젝트 초기 설정
- [x] 기본 UI/UX 구조
- [x] Vue Router 설정
- [x] Pinia 상태 관리
- [x] 문제 CRUD 시스템
- [x] 드래그 앤 드롭 에디터
- [x] 기본 모듈 시스템
- [x] 학습자 플레이어
- [x] 정답 확인 시스템

### 🚧 진행 중인 기능
- [ ] 고급 모듈 (선잇기, 색칠하기, 드래그앤드롭)
- [ ] 수식 에디터 (MathJax/KaTeX)
- [x] 파일 업로드 시스템
- [ ] 실시간 자동 저장
- [ ] 키보드 단축키

### 📋 향후 계획
- [ ] 사용자 인증 시스템
- [ ] 클라우드 저장소 연동
- [ ] 협업 기능
- [ ] 분석 대시보드
- [ ] 모바일 앱

## 🤝 기여 방법

1. 프로젝트 포크
2. 기능 브랜치 생성 (`git checkout -b feature/새기능`)
3. 변경사항 커밋 (`git commit -am '새 기능 추가'`)
4. 브랜치에 푸시 (`git push origin feature/새기능`)
5. Pull Request 생성

## 📄 라이선스

MIT License

## 📞 문의

프로젝트 관련 문의사항이나 버그 리포트는 GitHub Issues를 통해 남겨주세요.