import { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Questions: CollectionConfig = {
  slug: 'questions',
  admin: {
    useAsTitle: 'questionText',
    defaultColumns: ['questionText', 'difficulty', 'topic', 'createdAt'],
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'questionText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'options',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      admin: {
        description: 'Add between 2 and 6 options for this question',
      },
      fields: [
        {
          name: 'optionText',
          type: 'textarea',
          required: true,
        },
        {
          name: 'isCorrect',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'explanation',
          type: 'textarea',
          admin: {
            description: 'Explanation for why this option is correct/incorrect',
          },
        },
      ],
    },
    {
      name: 'explanation',
      type: 'textarea',
      admin: {
        description: 'Overall explanation for the correct answer',
      },
    },
    {
      name: 'difficulty',
      type: 'select',
      options: [
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' },
      ],
      defaultValue: 'medium',
      required: true,
    },
    {
      name: 'marks',
      type: 'number',
      defaultValue: 1,
      required: true,
      admin: {
        description: 'Points awarded for a correct answer',
      },
    },
    {
      name: 'negativeMark',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Points deducted for an incorrect answer (use 0 for no negative marking)',
      },
    },
    {
      name: 'topic',
      type: 'relationship',
      relationTo: 'topics',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
      admin: {
        description: 'Add tags to categorize questions',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data; // Guard clause to prevent errors if data is undefined
  
        // Validate that at least one option is marked as correct
        if (Array.isArray(data.options)) {
          const hasCorrectOption = data.options.some(option => option.isCorrect);
          if (!hasCorrectOption) {
            throw new Error('At least one option must be marked as correct');
          }
        }
        return data;
      }
    ],
  },
}