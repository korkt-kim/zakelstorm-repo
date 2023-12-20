import { PortableText } from '@portabletext/react'
import { Flex, List, Typo } from '@zakelstorm/ui'
import { isEmpty } from 'lodash-es'

import { Article } from '@/apis/schemas/article'
import { formatDate } from '@/app/util/dayjs'
import Calendar from '@/public/calendar.svg'
import Folder from '@/public/folder.svg'

export interface ArticleListProps {
  articles: Article[]
}

export const ArticleList = ({ articles }: ArticleListProps) => {
  if (isEmpty(articles)) {
    return (
      <Flex direction='v' align='center' className='p-[200px]'>
        <Typo.Title>No Resource Found</Typo.Title>
        <Typo.Text>Could not find requested resource</Typo.Text>
      </Flex>
    )
  }

  return (
    <List>
      {articles.map(article => {
        return (
          <List.Item
            className='border flex-col items-center gap-[16px] !px-[100px]'
            key={article._id}>
            <Flex gap={0} direction='v' align='center'>
              <Typo.Title level={1}>{article.title}</Typo.Title>
              <div
                className={`[&>*]:text-gray-400 [&>*]:text-sm [&_svg]:stroke-gray-500 [&>*]:inline-flex [&>*]:items-center`}>
                <Typo.Text>
                  <Calendar className='text-transparent inline mx-[6px]' />
                  Posted On {formatDate(article._createdAt)} |
                </Typo.Text>
                <Typo.Link
                  href={`/category/${article.category.join(
                    '/'
                  )}`.toLowerCase()}>
                  <Folder className='text-transparent inline mx-[6px]' /> In{' '}
                  {article.category.join('/')}
                </Typo.Link>
              </div>
            </Flex>
            <span className='w-full text-center [&>p]:truncate'>
              <PortableText value={[article.content?.[0]]} />
            </span>
            {/*@TODO: link 수정 */}
            <Typo.Link
              href='/'
              className='bg-black p-[10px] rounded text-white'>
              Read More
            </Typo.Link>
          </List.Item>
        )
      })}
    </List>
  )
}