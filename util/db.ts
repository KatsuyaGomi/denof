import * as postgres from 'postgres';
import 'dotenv/load.ts';

export type Article = {
    id: string;
    created_at: Date;
    title: string;
    content: string;
}

console.log(Deno.env.get('DB_URL'));
const encode = encodeURIComponent(Deno.env.get('DB_PASSWORD')!);
const uri = Deno.env.get('DB_URL')!.replace('[YOUR-PASSWORD]', encode);
console.log(uri);
const pool = new postgres.Pool(uri, 3, true);
const connection = await pool.connect();

// const client = new Client({
//     user: Deno.env.get('DB_USER'),
//     database: Deno.env.get('POSTGRES_DB'),
//     hostname: Deno.env.get('DB_HOST'),
//     password: Deno.env.get('DB_PASSWORD'),
//     port: Deno.env.get('DB_PORT')
// });

// await client.connect();

export const findAllArticles = async () => {
    try {
      const result = await connection.queryObject<Article>(
        "SELECT * FROM articles ORDER BY created_at DESC"
      );
      return result.rows;
    } catch (e) {
      console.error(e);
      return [];
    } finally {
      connection.release();
    }
  }
  
  // export const findArticleById = async (id: string) => {
  //   try {
  //     const result = await client.queryObject<Article>(
  //       "SELECT * FROM articles WHERE id = $1",
  //       [id]
  //     );
  //     if (result.rowCount === 0) {
  //       return null
  //     }
  //     return result.rows[0];
  //   } catch (e) {
  //     console.error(e);
  //     return null;
  //   }
  // }
  

  // export const createArticle = async (article: Pick<Article, 'title' | 'content'>) => {
  //   try {
  //     const result = await client.queryObject<Article>(
  //       "INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *",
  //       [article.title, article.content]
  //     );
  //     return result.rows[0];
  //   } catch (e) {
  //     console.error(e);
  //     return null;
  //   }
  // }