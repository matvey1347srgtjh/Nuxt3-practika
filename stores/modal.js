export const useModalStore = defineStore('modal', () => {
  const component = shallowRef(null);
  const props = shallowRef({});
  const isOpen = ref(false);
  const title = ref('');

  const openModal = (modalComponent, modalProps = {}, modalTitle = '') => {
    component.value = modalComponent;
    props.value = modalProps;
    title.value = modalTitle;
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
    setTimeout(() => {
      component.value = null;
      props.value = {};
      title.value = '';
    }, 50);
  };

  return {
    component,
    props,
    isOpen,
    title,
    openModal,
    closeModal
  };
});
