'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

interface GetResultsParams {
  userId: string;
  examId?: string;
}

export async function getResults({ userId, examId }: GetResultsParams) {
  const payload = await getPayload({ config })

  // Build the where clause
  const where: any = {
    user: { equals: userId },
  }
  if (examId) {
    where.exam = { equals: examId }
  }

  // Fetch results documents
  const results = await payload.find({
    collection: 'results',
    where,
    depth: 1,
    limit: 10,
    sort: '-createdAt',
  })

  // If you want to return all attempts for detailed history, you can also fetch attempts
  // const attempts = await payload.find({
  //   collection: 'attempts',
  //   where,
  //   depth: 1,
  //   limit: 50,
  //   sort: '-createdAt',
  // })

  return {
    results: results.docs,
    total: results.totalDocs,
    // attempts: attempts.docs, // Uncomment if you want to include attempts
  }
}
