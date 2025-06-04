export const useDialog = () => {
  const dialogStore = useDialogStore();

  const componentMap = {
    DeleteModal: () => import('~/components/modals/DeleteModal.vue'),
    CommentFormModal: () => import('~/components/modals/CommentFormModal.vue')
  };

  const open = (name, data = {}, title = '') => {
    if (!componentMap[name]) {
      console.error(`модальное окно с именем "${name}" не найдено.`);
      return Promise.reject(new Error(`Компонент "${name}" не найден.`));
    }

    return dialogStore.openDialog(name, data, title);
  };

  return {
    open
  };
};
