import { errorMessage } from './consts'
import { DocumentDefinition, PortableTextBlock, TypedObject } from 'sanity'

const articleDefinition: DocumentDefinition = {
  name: 'article',
  type: 'document',
  title: 'Article',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required().max(50).error(errorMessage('title')),
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: Rule => Rule.max(100).error(errorMessage('description')),
    },
    {
      name: 'password',
      type: 'string',
      title: 'Password',
      validation: Rule =>
        Rule.required().max(20).error(errorMessage('password')),
      hidden: true,
      readOnly: true,
    },
    {
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }, { type: 'code' }],
      title: 'Content',
    },
    {
      name: 'category',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Category',
      validation: Rule => Rule.required(),
    },
  ],
}

export default articleDefinition
