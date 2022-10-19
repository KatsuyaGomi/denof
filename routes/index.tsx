import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

type Article = {
  id: string;
  title: string;
  created_at: Date;
}


export const handler: Handlers<Article[]> = {
  async GET(_, ctx) {
    const articles: Article[] = [
      {
        id: '1',
        title: '1',
        created_at: new Date()
      },
    ];
    return await ctx.render(articles);
  },
}

export default function Home({ data }: PageProps<Article[]>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div>
        <h1>Fresh App</h1>
        <section>
          <h2>Posts</h2>
          <ul>
            {data.map(article => {
              <li key={article.id}>
                <a href={`articles/${article.id}`}>
                  <h3>{article.title}</h3>
                  <time dateTime={article.created_at.toString()}>{article.created_at}</time>
                </a>
              </li>
            })}
          </ul>
        </section>
      </div>
    </>
  );
}
