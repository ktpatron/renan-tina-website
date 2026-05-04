import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'travelAdvisory',
  title: 'Travel Advisories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Advisory Title (ex. Visa & Passport Updates)',
      type: 'string',
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text (ex. Notice, Important, Update)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Main Description',
      type: 'text',
    }),
    defineField({
      name: 'bullets',
      title: 'Bullet Points / Reminders',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Advisory Picture',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})