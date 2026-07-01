import { collection, config, fields } from '@keystatic/core';

const assetsPath = {
  general: {
    directory: 'src/assets/images/general',
    publicPath: '@assets/images/general/',
  },
  news: {
    directory: 'src/assets/images/news',
    publicPath: '@assets/images/news/',
  },
  faculty: {
    directory: 'src/assets/images/faculty',
    publicPath: '@assets/images/faculty/',
  },
  programs: {
    directory: 'src/assets/images/programs',
    publicPath: '@assets/images/programs/',
  },
};

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: {
      name: 'Harty College CMS',
    },
    navigation: {
      Content: ['pages', 'news', 'events', 'faculty', 'programs', 'research'],
    },
  },
  collections: {
    pages: collection({
      label: 'Pages',
      path: 'src/content/pages/*',
      slugField: 'title',
      entryLayout: 'content',
      format: { contentField: 'content' },
      columns: ['title', 'showInNavigation', 'layoutVariant'],
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
        }),
        summary: fields.text({
          label: 'Summary',
          multiline: true,
          validation: { isRequired: true },
        }),
        heroImage: fields.image({
          label: 'Hero image',
          ...assetsPath.general,
        }),
        heroImageAlt: fields.text({
          label: 'Hero image alt text',
          multiline: true,
        }),
        layoutVariant: fields.text({
          label: 'Layout variant',
          defaultValue: 'standard',
          validation: { isRequired: true },
        }),
        showInNavigation: fields.checkbox({
          label: 'Show in navigation',
          defaultValue: false,
        }),
        navigationLabel: fields.text({
          label: 'Navigation label',
        }),
        seoDescription: fields.text({
          label: 'SEO description',
          multiline: true,
        }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'mdoc',
          options: {
            image: assetsPath.general,
          },
        }),
      },
    }),
    news: collection({
      label: 'News',
      path: 'src/content/news/*',
      slugField: 'title',
      entryLayout: 'content',
      format: { contentField: 'content' },
      columns: ['title', 'date', 'category', 'featured'],
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
        }),
        date: fields.date({
          label: 'Date',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        category: fields.text({
          label: 'Category',
          validation: { isRequired: true },
        }),
        summary: fields.text({
          label: 'Summary',
          multiline: true,
          validation: { isRequired: true },
        }),
        heroImage: fields.image({
          label: 'Hero image',
          ...assetsPath.news,
        }),
        heroImageAlt: fields.text({
          label: 'Hero image alt text',
          multiline: true,
        }),
        featured: fields.checkbox({
          label: 'Featured story',
          defaultValue: false,
        }),
        tags: fields.array(
          fields.text({ label: 'Tag', validation: { isRequired: true } }),
          { label: 'Tags', itemLabel: (props) => props.value || 'Tag' }
        ),
        content: fields.markdoc({
          label: 'Content',
          extension: 'mdoc',
          options: {
            image: assetsPath.news,
          },
        }),
      },
    }),
    events: collection({
      label: 'Events',
      path: 'src/content/events/*',
      slugField: 'title',
      entryLayout: 'content',
      format: { contentField: 'content' },
      columns: ['title', 'date', 'category', 'featured'],
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
        }),
        date: fields.date({
          label: 'Date',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        startTime: fields.text({
          label: 'Start time',
          validation: { isRequired: true },
        }),
        endTime: fields.text({
          label: 'End time',
          validation: { isRequired: true },
        }),
        location: fields.text({
          label: 'Location',
          validation: { isRequired: true },
        }),
        category: fields.text({
          label: 'Category',
          validation: { isRequired: true },
        }),
        summary: fields.text({
          label: 'Summary',
          multiline: true,
          validation: { isRequired: true },
        }),
        registrationHref: fields.url({
          label: 'Registration URL',
        }),
        featured: fields.checkbox({
          label: 'Featured event',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'mdoc',
          options: {
            image: assetsPath.general,
          },
        }),
      },
    }),
    faculty: collection({
      label: 'Faculty',
      path: 'src/content/faculty/*',
      slugField: 'name',
      entryLayout: 'content',
      format: { contentField: 'content' },
      columns: ['name', 'department', 'featured', 'sortOrder'],
      schema: {
        name: fields.slug({
          name: { label: 'Name', validation: { isRequired: true } },
        }),
        title: fields.text({
          label: 'Title',
          validation: { isRequired: true },
        }),
        department: fields.text({
          label: 'Department',
          validation: { isRequired: true },
        }),
        programs: fields.array(
          fields.text({ label: 'Program', validation: { isRequired: true } }),
          { label: 'Programs', itemLabel: (props) => props.value || 'Program' }
        ),
        researchAreas: fields.array(
          fields.text({ label: 'Research area', validation: { isRequired: true } }),
          { label: 'Research areas', itemLabel: (props) => props.value || 'Research area' }
        ),
        shortBio: fields.text({
          label: 'Short bio',
          multiline: true,
          validation: { isRequired: true },
        }),
        portrait: fields.image({
          label: 'Portrait',
          ...assetsPath.faculty,
        }),
        portraitAlt: fields.text({
          label: 'Portrait alt text',
          multiline: true,
        }),
        featured: fields.checkbox({
          label: 'Featured faculty',
          defaultValue: false,
        }),
        sortOrder: fields.integer({
          label: 'Sort order',
          defaultValue: 100,
          validation: { isRequired: true },
        }),
        content: fields.markdoc({
          label: 'Profile content',
          extension: 'mdoc',
          options: {
            image: assetsPath.faculty,
          },
        }),
      },
    }),
    programs: collection({
      label: 'Programs',
      path: 'src/content/programs/*',
      slugField: 'name',
      entryLayout: 'content',
      format: { contentField: 'content' },
      columns: ['name', 'degreeLevel', 'intake', 'featured'],
      schema: {
        name: fields.slug({
          name: { label: 'Program name', validation: { isRequired: true } },
        }),
        degreeLevel: fields.text({
          label: 'Degree level',
          validation: { isRequired: true },
        }),
        area: fields.text({
          label: 'Academic area',
          validation: { isRequired: true },
        }),
        duration: fields.text({
          label: 'Duration',
          validation: { isRequired: true },
        }),
        location: fields.text({
          label: 'Location',
          validation: { isRequired: true },
        }),
        intake: fields.text({
          label: 'Intake',
          validation: { isRequired: true },
        }),
        overview: fields.text({
          label: 'Overview',
          multiline: true,
          validation: { isRequired: true },
        }),
        outcomes: fields.array(
          fields.text({ label: 'Outcome', validation: { isRequired: true } }),
          { label: 'Outcomes', itemLabel: (props) => props.value || 'Outcome' }
        ),
        requirements: fields.array(
          fields.text({ label: 'Requirement', validation: { isRequired: true } }),
          { label: 'Requirements', itemLabel: (props) => props.value || 'Requirement' }
        ),
        curriculumHighlights: fields.array(
          fields.text({ label: 'Curriculum highlight', validation: { isRequired: true } }),
          {
            label: 'Curriculum highlights',
            itemLabel: (props) => props.value || 'Curriculum highlight',
          }
        ),
        featured: fields.checkbox({
          label: 'Featured program',
          defaultValue: false,
        }),
        heroImage: fields.image({
          label: 'Hero image',
          ...assetsPath.programs,
        }),
        heroImageAlt: fields.text({
          label: 'Hero image alt text',
          multiline: true,
        }),
        content: fields.markdoc({
          label: 'Program content',
          extension: 'mdoc',
          options: {
            image: assetsPath.programs,
          },
        }),
      },
    }),
    research: collection({
      label: 'Research',
      path: 'src/content/research/*',
      slugField: 'title',
      entryLayout: 'content',
      format: { contentField: 'content' },
      columns: ['title', 'featured'],
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
        }),
        summary: fields.text({
          label: 'Summary',
          multiline: true,
          validation: { isRequired: true },
        }),
        focusAreas: fields.array(
          fields.text({ label: 'Focus area', validation: { isRequired: true } }),
          { label: 'Focus areas', itemLabel: (props) => props.value || 'Focus area' }
        ),
        impactStatement: fields.text({
          label: 'Impact statement',
          multiline: true,
          validation: { isRequired: true },
        }),
        featured: fields.checkbox({
          label: 'Featured research area',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Research content',
          extension: 'mdoc',
          options: {
            image: assetsPath.general,
          },
        }),
      },
    }),
  },
});
