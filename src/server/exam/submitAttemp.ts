'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

interface SubmitAttemptParams {
  examId: number;
  userId: number;
  responses: Array<{
    questionId: number;
    selectedOptionIndices: number[];
  }>;
  startedAt: string;
  completedAt: string;
}

interface SubmitAttemptResult {
  attemptId: number;
  score: number;
  maxScore: number;
  percentage: number;
  isPassed: boolean;
  timeSpent: number;
}

export async function submitAttempt({
  examId,
  userId,
  responses,
  startedAt,
  completedAt,
}: SubmitAttemptParams): Promise<SubmitAttemptResult> {
  const payload = await getPayload({ config })

  // Fetch the exam document
  const exam = await payload.findByID({
    collection: 'exams',
    id: examId,
    depth: 2,
  })
  if (!exam) throw new Error('Exam not found')

  // Prepare for scoring
  let totalScore = 0
  let maxScore = 0
  const attemptResponses = []

  for (const resp of responses) {
    // Fetch question
    const question = await payload.findByID({
      collection: 'questions',
      id: resp.questionId,
      depth: 1,
    })
    if (!question) continue
    maxScore += question.marks || 1

    // Find correct option indices
    const correctOptionIndices = (question.options || [])
      .map((opt: any, idx: number) => opt.isCorrect ? idx : null)
      .filter((idx: number | null) => idx !== null)

    // Compare selected vs correct
    const selected = resp.selectedOptionIndices.sort()
    const correct = (correctOptionIndices as number[]).sort()
    const isCorrect = JSON.stringify(selected) === JSON.stringify(correct)
    let marksAwarded = 0
    if (isCorrect) {
      marksAwarded = question.marks || 1
      totalScore += marksAwarded
    } else if (question.negativeMark && exam.isNegativeMarkingEnabled) {
      marksAwarded = -question.negativeMark
      totalScore -= question.negativeMark
    }
    attemptResponses.push({
      question: resp.questionId,
      selectedOptions: resp.selectedOptionIndices.map(idx => ({ optionIndex: idx })),
      isCorrect,
      marks: marksAwarded,
    })
  }

  totalScore = Math.max(0, totalScore)
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0
  const isPassed = percentage >= (exam.passingPercentage ?? 0)
  const timeSpent = Math.floor((new Date(completedAt).getTime() - new Date(startedAt).getTime()) / 1000)

  // Create the attempt document
  const attemptDoc = await payload.create({
    collection: 'attempts',
    data: {
      user: userId,
      exam: examId,
      startedAt,
      completedAt,
      responses: attemptResponses,
      score: totalScore,
      maxScore,
      percentage,
      isPassed,
      timeSpent,
    },
  })

  return {
    attemptId: attemptDoc.id,
    score: totalScore,
    maxScore,
    percentage,
    isPassed,
    timeSpent,
  }
}
