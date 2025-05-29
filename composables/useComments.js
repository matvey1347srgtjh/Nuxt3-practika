
import { ref } from 'vue';


import commentsData from '~/data/comments.json';

export const useComments = () => {
  const getCommentsByPostId = (postId) => {


    return new Promise(resolve => {
      setTimeout(() => {
        const filteredComments = commentsData.filter(comment => comment.postId === postId);
        resolve(filteredComments);
      }, 500); //500 мс
    });
  };

  return {
    getCommentsByPostId,
  };
};