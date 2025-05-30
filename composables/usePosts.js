import { ref } from 'vue';
const API_BASE_URL = 'http://localhost:3001';

export const usePosts = () => {
  const getAllPosts = async (page = 1, limit = 6) => {
    try {
      const allPostsResponse = await globalThis.$fetch.raw(`${API_BASE_URL}/posts?_sort=date&_order=desc`);
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
      const post = await globalThis.$fetch(`${API_BASE_URL}/posts/${id}`);
      return post;
    } catch (e) {
      // Оставим console.error
      console.error(`Failed to fetch post with ID ${id}:`, e);
      return null;
    }
  };

  const createPost = async (postData) => {
    const newPost = await globalThis.$fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      body: postData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return newPost;
  };

  const updatePost = async (id, postData) => {
    const updatedPost = await globalThis.$fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      body: postData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return updatedPost;
  };

  const deletePost = async (id) => {
    await globalThis.$fetch(`${API_BASE_URL}/posts/${id}`, {
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