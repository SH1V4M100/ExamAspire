// src/types/payload-plugin-form-builder.d.ts
declare module '@payloadcms/plugin-form-builder/types' {
  export type FormFieldBlock = {
    name: string
    label?: string
    defaultValue?: any
    blockType?: string
    required?: boolean
    width?: number | string
  }

  export type CheckboxField = FormFieldBlock
  export type Form = any
}
