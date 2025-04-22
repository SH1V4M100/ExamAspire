'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

interface StartExamResult {
  exam: any;
  questions: any[];
}

/**
 * Starts an exam by fetching its details and a (possibly randomized) set of questions.
 * @param examId The ID of the exam to start
 * @returns Exam metadata and the list of questions
 */
export async function startExam(examId: string): Promise<StartExamResult> {
  const payload = await getPayload({ config })

  // Fetch the exam document (with relationships)
  const exam = await payload.findByID({
    collection: 'exams',
    id: examId,
    depth: 2, // fetch related questions/topics/subject details
  })

  if (!exam) {
    throw new Error('Exam not found')
  }

  // Get all question IDs from the exam
  let questionDocs: any[] = []
  if (Array.isArray(exam.questions)) {
    questionDocs = exam.questions
  } else if (exam.questions) {
    questionDocs = [exam.questions]
  }

  // Randomize questions if needed
  let selectedQuestions = questionDocs
  const numQuestions = (exam as any).numberOfQuestions ?? questionDocs.length
  const randomize = (exam as any).randomizeQuestions
  
  if (randomize && typeof numQuestions === 'number') {
    selectedQuestions = shuffleArray(questionDocs).slice(0, numQuestions)
  }

  return {
    exam: {
      id: exam.id,
      title: exam.title,
      description: exam.description,
      duration: exam.duration,
      passingPercentage: exam.passingPercentage,
      subject: exam.subject,
      topics: exam.topics,
      randomizeQuestions: exam.randomizeQuestions,
      numberOfQuestions: numQuestions,
      // Add more fields as needed
    },
    questions: selectedQuestions.map(q => ({
      id: q.id,
      questionText: q.questionText,
      options: q.options.map((opt: any) => ({ optionText: opt.optionText })), // Don't send correct answers
      marks: q.marks,
      difficulty: q.difficulty,
      topic: q.topic,
      // Add more fields as needed
    })),
  }
}

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j]!, arr[i]!]
  }
  return arr
}
