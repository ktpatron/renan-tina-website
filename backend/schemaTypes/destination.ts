import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Destination Name',
      type: 'string',
      description: 'Pangalan ng lugar (Hal. Boracay, Palawan)',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Travel Guide / Description',
      type: 'text',
      description: 'Maikling impormasyon tungkol sa destination na ito.',
    }),
  ],
})