import { createArticle } from './action'
import { getAllArticles } from './lib/action'

export default async function Page() {
  const res = await getAllArticles()

  return (
    <form action={createArticle}>
      {JSON.stringify(res)}
      <button type='submit'>asdfasfsadf</button>
    </form>
  )
}
