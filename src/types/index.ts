export type Grade = 1 | 2 | 3 | 4 | 5 | 6
export type Subject = '수학' | '국어' | '과학' | '사회'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type ModuleType = 
  | '객관식' | '주관식' | '서술형'
  | '각도기' | '자' | '시계'
  | '선잇기' | '색칠하기' | '드래그앤드롭'
  | '블록놀이' | '퍼즐' | '수식입력'
  | '이미지표시' | '동영상' | '음성'

export type ToolType = 
  | '각도기' | '자' | '컴퍼스' | '시계'
  | '계산기' | '키보드' | '터치'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Module {
  id: string
  type: ModuleType
  position: Position
  size: Size
  tool?: ToolType
  checkAnswer: boolean
  answer?: any
  properties: Record<string, any>
}

export interface Problem {
  id: string
  title: string
  question: string
  grade: Grade
  subject: Subject
  modules: Module[]
  createdAt: Date
  updatedAt: Date
  tags: string[]
  difficulty: Difficulty
}