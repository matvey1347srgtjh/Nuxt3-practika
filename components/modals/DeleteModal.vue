<template>
  <div class="modal-content-inner">
    <h3 class="modal-title">{{ title }}</h3>
    <p class="modal-message" v-html="message"></p>
    <div class="modal-actions">
      <button class="button button--danger" @click="handleConfirm">
        {{ confirmText }}
      </button>
      <button class="button button--secondary" @click="handleCancel">
        {{ cancelText }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Подтвердите действие'
  },
  message: {
    type: String,
    default: 'Вы уверены, что хотите продолжить?'
  },
  confirmText: {
    type: String,
    default: 'Подтвердить'
  },
  cancelText: {
    type: String,
    default: 'Отмена'
  },

  onConfirm: {
    type: Function,
    required: true
  }
});

const emit = defineEmits(['close']);

const handleConfirm = () => {
  props.onConfirm();
  emit('close');
};

const handleCancel = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
.modal-content-inner {
  text-align: center;
}

.modal-title {
  font-size: $font-size-h3;
  color: $danger-color;
  margin-bottom: $spacing-md;
}

.modal-message {
  font-size: $font-size-base;
  margin-bottom: $spacing-xl;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: $spacing-md;

  .button {
    padding: $spacing-sm $spacing-lg;
    border-radius: 6px;
    font-size: $font-size-md;
    font-weight: bold;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease;

    &--danger {
      background-color: $danger-color;
      color: $white-color;
      &:hover {
        background-color: darken($danger-color, 10%);
      }
    }

    &--secondary {
      background-color: $secondary-color;
      color: $white-color;
      &:hover {
        background-color: darken($secondary-color, 10%);
      }
    }
  }
}
</style>
