const { Client } = require('pg');
const marked = require('marked');

// Read DB config from env or defaults
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 5432;
const user = process.env.DB_USER || 'devion';
const password = process.env.DB_PASSWORD || 'strongpassword123';
const database = process.env.DB_NAME || 'my_portal';

const client = new Client({ host, port, user, password, database });

async function run() {
  await client.connect();
  console.log('Connected to DB', { host, port, database });

  // Create about_info if not exists
  const aboutCheck = await client.query("SELECT count(*) FROM about_info");
  if (aboutCheck.rows && parseInt(aboutCheck.rows[0].count) === 0) {
    const fullName = 'Igna Ion Resmana';
    const title = 'Software Engineer';
    const bio = 'Hi — I\'m Igna. I build full-stack apps with Node.js, NestJS, Vue/Nuxt, and love simple, maintainable code.';
    const skills = ['Node.js','NestJS','Vue.js','Nuxt','PostgreSQL','Redis','Docker'];
    const avatarUrl = '';
    await client.query(
      `INSERT INTO about_info (full_name, title, bio, skills, avatar_url) VALUES ($1,$2,$3,$4,$5)`,
      [fullName, title, bio, skills, avatarUrl]
    );
    console.log('Inserted about_info');
  } else {
    console.log('about_info already present; skipping');
  }

  // Create a sample blog post if none exist
  const postsCheck = await client.query("SELECT count(*) FROM blog_posts");
  if (postsCheck.rows && parseInt(postsCheck.rows[0].count) === 0) {
    const title = 'Welcome — My Personal Portal';
    const slug = 'welcome-my-personal-portal';
    const markdown = `# Welcome to my personal portal\n\nHello! I'm **Igna** — a software engineer focused on Node.js, NestJS, and Vue/Nuxt. This blog will contain notes, tutorials, and project updates.\n\n## What to expect\n\n- Technical posts about backend and frontend engineering\n- Short tutorials and code snippets\n- Project updates and notes\n\nThanks for visiting!`;
    const content = marked.parse(markdown);
    const excerpt = 'Short intro: developer notes, tutorials, and project updates.';
    const author = 'Igna';
    const isPublished = true;

    await client.query(
      `INSERT INTO blog_posts (title, slug, content, excerpt, author, is_published) VALUES ($1,$2,$3,$4,$5,$6)`,
      [title, slug, content, excerpt, author, isPublished]
    );
    console.log('Inserted sample blog post');
  } else {
    console.log('blog_posts already present; skipping');
  }

  await client.end();
  console.log('Seed complete');
}

run().catch(err => {
  console.error('Seed error', err);
  process.exit(1);
});
