import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'certificate',
  title: 'Certificates & Licenses',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Certificate Title (e.g., DTI, Mayor\'s Permit)', type: 'string' }),
    defineField({ name: 'description', title: 'Description / Subtitle', type: 'string' }),
    defineField({ name: 'image', title: 'Certificate Image', type: 'image', options: { hotspot: true } }),
    defineField({ 
      name: 'isLandscape', 
      title: 'Is this a landscape (pahalang) image?', 
      type: 'boolean', 
      description: 'I-ON ito kung pahalang ang picture (gaya ng DOT or BIR) para lumapad ang card sa website.',
      initialValue: false 
    }),
  ],
})