import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tourPackage',
  title: 'Tour Packages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Package Title (ex. Palawan Island Hopping)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL ID (Pindutin ang Generate button)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    // ETO YUNG BAGONG DAGDAG BE! Lilitaw 'to as options sa dashboard mo.
    defineField({
      name: 'category',
      title: 'Location / Category',
      type: 'string',
      options: {
      list: [
          { title: 'Domestic (Around PH)', value: 'domestic' },
          { title: 'Asia', value: 'asia' },
          { title: 'Europe', value: 'europe' },
          { title: 'Land Tours', value: 'land-tours' }, // <-- PERFECT CODE VALUE
          { title: 'Exclusive Deals', value: 'exclusive-deals' }
        ],
        layout: 'radio' // Para magandang buttons ang lalabas sa dashboard
      }
    }),
    defineField({
      name: 'duration',
      title: 'Duration (ex. 4 Days, 3 Nights)',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Package?',
      type: 'boolean',
      description: 'I-ON ito kung gusto mong lumabas ang package na ito sa "Featured Stays" ng About Page.',
      initialValue: false,
    }),
    defineField({
      name: 'featuredBadge',
      title: 'Featured Badge Text (ex. Premium Tour, Beachfront)',
      type: 'string',
      description: 'Ito yung text na lilitaw sa ibabaw ng picture kapag hinover.',
      // MAGIC: Lilitaw lang itong text box kapag in-ON mo yung isFeatured toggle!
      hidden: ({document}) => !document?.isFeatured, 
    }),
    defineField({
      name: 'availability',
      title: 'Availability (ex. Flexible Dates, Every Weekend)',
      type: 'string',
    }),
    defineField({
      name: 'groupSize',
      title: 'Group Size (ex. Max 15 People, Private Tour)',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Rating / Reviews (ex. 4.8 (Top Rated))',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Package Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery (Multiple Pictures)',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid', // Para naka-grid siya sa dashboard mo, mas maganda tignan!
      }
    }),
    defineField({
      name: 'itinerary',
      title: 'Itinerary / Plan Chart (Isang item per araw)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities (ex. 3 Nights Hotel, Free Breakfast)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})