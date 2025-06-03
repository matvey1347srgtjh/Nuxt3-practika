export const useComments = () => {
  const { $api } = useNuxtApp();

  const getCommentsByPostId = async (postId) => {
    try {
      const comments = await $api('/comments', {
        query: { postId: postId }
      });
      return comments;
    } catch (e) {
      console.error(`Ошибка при получении комментариев для поста ${postId}:`, e);
      return [];
    }
  };

  const createComment = async (commentData) => {
    try {
      const newComment = {
        ...commentData,
        date: new Date().toISOString()
      };

      const createdComment = await $api('/comments', {
        method: 'POST',
        body: newComment,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return createdComment;
    } catch (e) {
      console.error('Ошибка при создании комментария:', e);
      throw e;
    }
  };

  return {
    getCommentsByPostId,
    createComment
  };
};
