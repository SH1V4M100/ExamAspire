'use client'
import type { BeforeListTableClientProps } from 'payload'
import React from 'react'
import { Button } from '@payloadcms/ui'

const EvaluateButton = (props: BeforeListTableClientProps) => (
  <Button
      buttonStyle="secondary"
      el="anchor"
      url="/evaluate"
      tooltip="Go to Evaluate Page"
    >
      Evaluate
    </Button>
)

export default EvaluateButton
