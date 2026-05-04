import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'travelerReview',
  title: 'Traveler Reviews',
  type: 'document',
  fields: [
    defineField({
      name: 'reviewerName',
      title: 'Reviewer Name (ex. Sarah & Mike J.)',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location (ex. Manila, Philippines)',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'Profile Picture / Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1 hanggang 5)',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    }),
    defineField({
      name: 'packageBadge',
      title: 'Package Booked (ex. Batanes Honeymoon Package)',
      type: 'string',
    }),
    // ETO YUNG MAGKO-CONNECT SA REVIEW AT SA PACKAGE
    defineField({
      name: 'relatedPackage',
      title: 'Related Tour Package (Para saang package itong review?)',
      type: 'reference',
      to: [{ type: 'tourPackage' }],
    }),
    defineField({
      name: 'reviewTitle',
      title: 'Review Title (ex. "Our Dream Honeymoon Made Effortless!")',
      type: 'string',
    }),
    defineField({
      name: 'reviewText',
      title: 'Full Review Text',
      type: 'text',
    }),
    defineField({
      name: 'gallery',
      title: 'Trip Pictures (Pwede mag-upload ng marami)',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' },
    }),
  ],
})