import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "twind";
import { Article, findAllArticles } from '@db';

export const handler: Handlers<Article[]> = {
  async GET(_, ctx) {
    const articles: Article[] = await findAllArticles();
    return await ctx.render(articles);
  },
};

export default function Home({ data }: PageProps<Article[]>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div
        class={tw(
          "max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col",
        )}
      >
        <h1 class={tw("font-extrabold text-5xl text-gray-800")}>Fresh App</h1>
        <section>
          <h2 class={tw("text-4xl font-bold text-gray-800 py-4")}>Posts</h2>
          <ul>
            {data.map((article) => (
              <li
                id={article.id}
                class={tw("bg-white p-6 rounded-lg shadow-lg mb-4")}
              >
                <a href={`articles/${article.id}`}>
                  <h3
                    class={tw(
                      "text-2xl font-bold mb-2 text-gray-800 hover:text-gray-600 hover:text-underline",
                    )}
                  >
                    {article.title}
                  </h3>
                  <time
                    dateTime={article.created_at.toLocaleString(new Intl.Locale('jp'))}
                    class={tw("text-gray-500 text-sm")}
                  >
                    {article.created_at.toLocaleString(new Intl.Locale('jp'))}
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
