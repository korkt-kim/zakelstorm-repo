'use server'

import { revalidateTag } from 'next/cache'

import { env } from '@/env'
import { sanityFetch } from '@/sanity'
import { client } from '@/sanity/client'
import {
  allArticlesQuery,
  allArticleTotalCount,
  articleQuery,
  paginatedArticleByCategoryQuery,
  paginatedArticleQuery,
} from '@/sanity/queries/article'
import { Article, ArticleBody, ArticleResponse } from '@/types/article'

export async function getAllArticles(category?: string[]) {
  return sanityFetch<ArticleResponse>(client, {
    query: allArticlesQuery({ category }),
    params: {},
    tags: articleQueryKeys.all,
  })
}

export async function getArticleTotalCount() {
  return sanityFetch<number>(client, {
    query: allArticleTotalCount(),
    params: {},
    tags: articleQueryKeys.all,
  })
}

export async function getArticle(id: string) {
  return sanityFetch<Article[]>(client, {
    query: articleQuery,
    params: {
      id,
    },
    tags: articleQueryKeys.all,
  }).then(res => res[0])
}

export async function getPaginatedArticles(lastId: string) {
  return sanityFetch(client, {
    query: paginatedArticleQuery,
    params: {
      lastId,
    },
    tags: articleQueryKeys.all,
  })
}

export async function getPaginatedArticlesByCategoryId(
  categoryId: string,
  lastId: string
) {
  return sanityFetch(client, {
    query: paginatedArticleByCategoryQuery,
    params: {
      categoryId,
      lastId,
    },
    tags: articleQueryKeys.all,
  })
}

export async function createArticle({
  title,
  content,
  category,
}: Pick<ArticleBody, 'title' | 'content' | 'category'>) {
  const res = await client.create(
    {
      _type: 'article',
      title,
      content,
      password: 'rnrn0808!!',
      category: [category],
    },
    {
      token: env('NEXT_PUBLIC_SANITY_ADMIN_TOKEN'),
    }
  )

  return JSON.stringify(res)
}

const articleQueryKeys = {
  all: ['article'],
}
