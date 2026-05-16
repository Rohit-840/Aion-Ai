# Aion AI — image assets

The **Use Cases** section uses free-license placeholder photos served
from Lorem Picsum (https://picsum.photos) — free for commercial use.

## Using your own photos

1. Drop image files into this folder, e.g. `client/public/images/research.jpg`
2. Open `client/src/data/landingData.js`
3. Replace each `useCase.image` value with the local path:

   ```js
   image: '/images/research.jpg'
   ```

Files inside `client/public/` are served from the site root, so
`client/public/images/research.jpg` is available at `/images/research.jpg`.

The designed AI avatars are generated in code (`BotAvatar.jsx`) and need
no image files.
