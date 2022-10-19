import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "twind";

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
        title: 'First',
        created_at: new Date()
      },
      {
        id: '2',
        title: 'Second',
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
      <div
      class={tw(
        "max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col"
      )}>
        <h1 class={tw("font-extrabold text-5xl text-gray-800")}>Fresh App</h1>
        <section>
          <h2 class={tw("text-4xl font-bold text-gray-800 py-4")}>Posts</h2>
          <ul>
            {data.map(article => (
              <li id={article.id} class={tw("bg-white p-6 rounded-lg shadow-lg mb-4")}>
                <a href={`articles/${article.id}`}>
                  <h3
                  class={tw(
                    "text-2xl font-bold mb-2 text-gray-800 hover:text-gray-600 hover:text-underline"
                  )}
                  >{article.title}</h3>
                  <time 
                    dateTime={article.created_at.toLocaleString()}
                    class={tw("text-gray-500 text-sm")}
                  >
                    {article.created_at.toLocaleString()}
                  </time>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
