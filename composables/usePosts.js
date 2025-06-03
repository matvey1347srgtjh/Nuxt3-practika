import { useNuxtApp } from '#app';

export const usePosts = () => {
  const { $api } = useNuxtApp();

  const getAllPosts = async (page = 1, limit = 6) => {
    try {
      const allPostsResponse = await $api.raw(`/posts?_sort=date&_order=desc`);
      const allPosts = allPostsResponse._data;
      const totalCount = allPosts.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const postsForCurrentPage = allPosts.slice(startIndex, endIndex);

      return { posts: postsForCurrentPage, totalCount };
    } catch (e) {
      console.error('Ошибка в getAllPosts:', e);
      return { posts: [], totalCount: 0 };
    }
  };

  const getPostById = async (id) => {
    try {
      const post = await $api(`/posts/${id}`);
      return post;
    } catch (e) {
      console.error(`Не удалось получить пост с ID ${id}:`, e);
      return null;
    }
  };

  const createPost = async (postData) => {
    const newPost = await $api('/posts', {
      method: 'POST',
      body: postData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return newPost;
  };

  const updatePost = async (id, postData) => {
    const updatedPost = await $api(`/posts/${id}`, {
      method: 'PUT',
      body: postData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return updatedPost;
  };

  const deletePost = async (id) => {
    await $api(`/posts/${id}`, {
      method: 'DELETE'
    });
  };

  return {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
  };
};
