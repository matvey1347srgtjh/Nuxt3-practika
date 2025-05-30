
import { ref } from 'vue';

const API_BASE_URL = 'http://localhost:3001';

export const useComments = () => {
  const getCommentsByPostId = async (postId) => {

    const comments = await globalThis.$fetch(`${API_BASE_URL}/comments`, {
      query: { postId: postId },
    });
    return comments;
  };

  return {
    getCommentsByPostId,
  };
};