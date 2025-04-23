'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPublishedExams() {
  const payload = await getPayload({ config })

  // Fetch all published exams
  const exams = await payload.find({
    collection: 'exams',
    where: {
      _status: { equals: 'published' },
    },
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  })

  return exams.docs
}
