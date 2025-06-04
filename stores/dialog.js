<<<<<<< HEAD
=======
import { defineStore } from 'pinia';

>>>>>>> 4e0fe6ecfbe5ab5e53649948347a81fe1ae6a67c
export const useDialogStore = defineStore('dialog', () => {
  const componentName = ref(null);
  const modalData = shallowRef({});
  const modalTitle = ref('');
  const isOpen = ref(false);

  let resolvePromise = null;
  let rejectPromise = null;

  const openDialog = (name, data = {}, title = '') => {
    return new Promise((resolve, reject) => {
      componentName.value = name;
      modalData.value = data;
      modalTitle.value = title;
      isOpen.value = true;
      resolvePromise = resolve;
      rejectPromise = reject;
    });
  };

  const confirmDialog = (result = true) => {
    if (resolvePromise) {
      resolvePromise(result);
    }
    closeDialog();
  };

  const cancelDialog = (reason = false) => {
    if (rejectPromise) {
      rejectPromise(reason);
    } else if (resolvePromise) {
      resolvePromise(reason);
    }
    closeDialog();
  };

  const closeDialog = () => {
    isOpen.value = false;
    setTimeout(() => {
      componentName.value = null;
      modalData.value = {};
      modalTitle.value = '';
      resolvePromise = null;
      rejectPromise = null;
    }, 300);
  };

  return {
    componentName,
    modalData,
    modalTitle,
    isOpen,
    openDialog,
    confirmDialog,
    cancelDialog,
    closeDialog
  };
});
