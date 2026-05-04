import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'position',
      title: 'Position / Role (ex. Founder, Marketing Intern)',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Team Category',
      type: 'string',
      options: {
        list: [
          { title: 'Main Team (Original)', value: 'main' },
          { title: 'Interns', value: 'intern' }
        ],
        layout: 'radio' // Para pipindutin na lang kung Main o Intern
      }
    }),
    defineField({
      name: 'image',
      title: 'Profile Picture',
      type: 'image',
      options: { hotspot: true },
    }),
    // Optional: Kung gusto mong may short quote o description
    defineField({
      name: 'bio',
      title: 'Short Bio or Quote (Optional)',
      type: 'text',
    }),
  ],
})