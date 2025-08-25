
# Healthcare Tips — Big Static Site (No Build)

## Deploy (Netlify)
- Build command: (leave empty)
- Publish directory: `.`

## Add a new post
1. Create an HTML file in `posts/` (e.g. `my-new-post.html`).
2. Add an entry in `posts/posts.json`:
```
{ "title": "My New Post", "date": "2025-08-20", "tags": ["tag1"], "excerpt": "short text", "url": "/posts/my-new-post.html" }
```
3. Commit and deploy.
