
export default {
  children: [
    {
      path: '/',
      async action({ page, uapp }) {
        console.log(uapp);
        const posts = new uapp.modules.posts.stores.Posts();
        const Posts = uapp.modules.posts.components.Posts;
        await posts.fetchPosts(20);
        return page
          .meta({
            title: 'Посты',
            description: 'Посты созданные тобой',
            url: '/cabinet/posts',
          })
          .component(Posts, { posts });
      },
    },
    {
      path: '/create',
      async action({ page, uapp }) {
        const PostCreate = uapp.modules.posts.components.PostCreate;
        return page
          .meta({
            title: 'Создание поста',
            description: 'Da!',
            url: '/cabinet/posts/create',
          })
          .component(PostCreate, {});
      },
    },
    {
      path: '/:id',
      async action({ page, uapp }, { id }) {
        const post = await uapp.modules.posts.stores.Post.getById(id);
        const Post = uapp.modules.posts.components.Post;
        return page
          .meta({
            title: 'Отдельный пост',
            description: 'Da!',
            url: `/cabinet/posts/${id}`,
          })
          .component(Post, { post });
      },
    },
    {
      path: '/:id/edit',
      async action({ page, uapp }, { id }) {
        const post = await uapp.modules.posts.stores.Post.getById(id);
        const PostEdit = uapp.modules.posts.components.PostEdit;
        return page
          .meta({
            title: 'Редактирование поста',
            description: 'Мемы!',
            url: `/cabinet/posts/${id}/edit`,
          })
          .component(PostEdit, { post });
      },
    },
  ],
};
