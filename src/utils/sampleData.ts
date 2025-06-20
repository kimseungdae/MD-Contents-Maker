import type { Problem } from '@/types'

export const sampleProblems: Problem[] = [
  {
    id: 'sample_001',
    title: '각도 측정하기',
    question: '아래 각을 보고 각도기를 사용해 크기를 측정하고, 각의 이름을 적으세요.',
    grade: 4,
    subject: '수학',
    difficulty: 'medium',
    tags: ['기하', '각도', '측정'],
    modules: [
      {
        id: 'mod_001',
        type: '이미지표시',
        position: { x: 50, y: 50 },
        size: { width: 300, height: 200 },
        checkAnswer: false,
        properties: {
          src: 'angle001.png',
          alt: '45도 각도 이미지'
        }
      },
      {
        id: 'mod_002',
        type: '각도기',
        position: { x: 50, y: 270 },
        size: { width: 250, height: 150 },
        tool: '각도기',
        checkAnswer: true,
        answer: 45,
        properties: {
          imageRef: 'mod_001'
        }
      },
      {
        id: 'mod_003',
        type: '객관식',
        position: { x: 400, y: 50 },
        size: { width: 280, height: 200 },
        checkAnswer: true,
        answer: '예각',
        properties: {
          question: '이 각의 이름은?',
          options: ['예각', '직각', '둔각', '평각']
        }
      }
    ],
    createdAt: new Date('2025-06-20T10:00:00'),
    updatedAt: new Date('2025-06-20T10:30:00')
  },
  {
    id: 'sample_002',
    title: '분수 계산',
    question: '다음 분수 문제를 계산하세요.',
    grade: 5,
    subject: '수학',
    difficulty: 'easy',
    tags: ['분수', '계산'],
    modules: [
      {
        id: 'mod_004',
        type: '주관식',
        position: { x: 100, y: 100 },
        size: { width: 300, height: 120 },
        checkAnswer: true,
        answer: '3/4',
        properties: {
          question: '1/2 + 1/4 = ?'
        }
      }
    ],
    createdAt: new Date('2025-06-20T09:00:00'),
    updatedAt: new Date('2025-06-20T09:15:00')
  },
  {
    id: 'sample_003',
    title: '동물의 특징',
    question: '다음 동물들의 특징을 알아보세요.',
    grade: 3,
    subject: '과학',
    difficulty: 'easy',
    tags: ['동물', '특징'],
    modules: [
      {
        id: 'mod_005',
        type: '이미지표시',
        position: { x: 50, y: 50 },
        size: { width: 250, height: 200 },
        checkAnswer: false,
        properties: {
          src: 'animals.jpg',
          alt: '여러 동물들의 사진'
        }
      },
      {
        id: 'mod_006',
        type: '객관식',
        position: { x: 320, y: 50 },
        size: { width: 300, height: 200 },
        checkAnswer: true,
        answer: '젖을 먹여 새끼를 기른다',
        properties: {
          question: '포유동물의 특징은 무엇인가요?',
          options: [
            '젖을 먹여 새끼를 기른다',
            '알을 낳아서 번식한다',
            '변온동물이다',
            '아가미로 숨을 쉰다'
          ]
        }
      }
    ],
    createdAt: new Date('2025-06-20T08:00:00'),
    updatedAt: new Date('2025-06-20T08:20:00')
  }
]