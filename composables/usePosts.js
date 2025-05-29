// composables/usePosts.js

import { ref } from 'vue';

const postsData = ref([
  {
    id: 'post-1',
    title: 'Моя первая запись в блоге',
    date: '2025-05-27',
    excerpt: 'Краткое описание первой записи. Здесь мы обсуждаем основы Nuxt 3 и как начать разработку.',
    content: `
      <h2>Введение в Nuxt 3</h2>
      <p>Nuxt 3 - это мощный фреймворк для Vue.js, который позволяет создавать универсальные приложения (SSR, SSG, SPA). Он значительно упрощает разработку, предоставляя множество готовых решений для маршрутизации, управления состоянием, мета-тегов и многого другого.</p>
      <p>Одной из ключевых особенностей Nuxt 3 является файловая система маршрутизации, которая автоматически генерирует маршруты на основе структуры вашей папки <code>pages</code>.</p>
      <h3>Преимущества использования Nuxt</h3>
      <ul>
        <li>Универсальный рендеринг (SSR) для лучшей производительности и SEO.</li>
        <li>Автоматическая маршрутизация.</li>
        <li>Поддержка TypeScript из коробки.</li>
        <li>Композиты (Composables) для переиспользуемой логики.</li>
        <li>Мощная экосистема модулей.</li>
      </ul>
      <p>Начните свой проект с <code>npx nuxi init <project-name></code> и исследуйте возможности Nuxt 3!</p>
    `,
    image: 'https://i.pinimg.com/originals/bc/12/07/bc1207a9d92b22c569777d9733ea2d4c.webp'
  },
  {
    id: 'post-2',
    title: 'Основы компонентов во Vue 3',
    date: '2025-05-25',
    excerpt: 'Погружаемся в мир компонентов Vue 3: props, emits, slots и composition API.',
    content: `
      <h2>Vue 3 Components Deep Dive</h2>
      <p>Компоненты являются строительными блоками любого Vue.js приложения. В Vue 3 с появлением Composition API и улучшенным синтаксисом Single File Components (SFC) разработка стала еще более гибкой и производительной.</p>
      <h3>Props</h3>
      <p><code>Props</code> - это способ передачи данных от родительского компонента к дочернему. Они должны быть явно объявлены в дочернем компоненте.</p>
      <pre><code>// ChildComponent.vue
&lt;script setup&gt;
const props = defineProps({
  message: String,
  count: {
    type: Number,
    default: 0
  }
})
&lt;/script&gt;
</code></pre>
      <h3>Emits</h3>
      <p><code>Emits</code> позволяют дочерним компонентам взаимодействовать с родительскими, отправляя события. Это обеспечивает однонаправленный поток данных.</p>
      <pre><code>// ChildComponent.vue
&lt;script setup&gt;
const emit = defineEmits(['update:count', 'item-selected'])

const increment = () => {
  emit('update:count', props.count + 1)
}
&lt;/script&gt;
</code></pre>
      <h3>Slots</h3>
      <p><code>Slots</code> позволяют передавать HTML-содержимое из родительского компонента в дочерний. Это делает компоненты более гибкими и переиспользуемыми.</p>
      <pre><code>// ParentComponent.vue
&lt;ChildComponent&gt;
  &lt;p&gt;Это контент, переданный через слот.&lt;/p&gt;
&lt;/ChildComponent&gt;
</code></pre>
      <p>Изучение этих основ позволит вам создавать сложные и хорошо структурированные Vue.js приложения.</p>
    `,
    image: 'https://avatars.mds.yandex.net/i?id=1722ba5983b1f936a4537a80385cb025_l-5174967-images-thumbs&n=13'
  },
  {
    id: 'post-3',
    title: 'CSS-переменные: мощный инструмент для стилизации',
    date: '2025-05-20',
    excerpt: 'Как использовать CSS-переменные (Custom Properties) для создания гибких и легко поддерживаемых стилей.',
    content: `
      <h2>CSS Custom Properties (CSS Variables)</h2>
      <p>CSS-переменные, или пользовательские свойства, предоставляют мощный способ определения переиспользуемых значений в CSS. В отличие от переменных в препроцессорах (вроде Sass, которые компилируются в статический CSS), CSS-переменные являются динамическими и могут быть изменены во время выполнения с помощью JavaScript.</p>
      <h3>Объявление и использование</h3>
      <p>Переменные объявляются с префиксом <code>--</code> и областью видимости. Обычно их объявляют на уровне <code>:root</code> для глобальной доступности:</p>
      <pre><code>:root {
  --primary-color: #3498db;
  --spacing-unit: 1rem;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
}
</code></pre>
      <h3>Преимущества</h3>
      <ul>
        <li>Динамическое изменение значений с JavaScript.</li>
        <li>Наследование: переменные доступны дочерним элементам.</li>
        <li>Упрощение тем: легко переключать темы, изменяя несколько переменных.</li>
        <li>Читаемость и поддерживаемость кода.</li>
      </ul>
      <p>Использование CSS-переменных в сочетании с препроцессорами (например, Sass) может дать вам еще большую гибкость в стилизации.</p>
    `,
    image: 'https://postcss.github.io/postcss-custom-properties/image.jpg'
  },
  {
    id: 'post-4',
    title: 'Использование Nuxt Content для статических блогов',
    date: '2025-05-18',
    excerpt: 'Создание блогов на основе Markdown с Nuxt Content: быстро и удобно.',
    content: `
      <h2>Nuxt Content Module</h2>
      <p>Модуль Nuxt Content позволяет легко создавать блоги и документацию на основе файлов Markdown, CSV, YAML, JSON и XML. Он предоставляет API для доступа к содержимому, рендеринга в HTML и даже создания таблиц данных.</p>
      <h3>Ключевые особенности:</h3>
      <ul>
        <li>Поддержка Markdown (и других форматов).</li>
        <li>Автоматическая генерация API для содержимого.</li>
        <li>Возможность запрашивать содержимое с помощью запросов, похожих на базу данных.</li>
        <li>Синтаксическая подсветка кода.</li>
        <li>Интеграция с Vue Components внутри Markdown.</li>
      </ul>
      <p>Это отличный выбор для блогов, где содержимое в основном статично и хранится в файлах.</p>
    `,
    image: 'https://static9.tgcnt.ru/posts/_0/ff/ff65a5fe18d0aacfd88349925222d681.jpg'
  },
  {
    id: 'post-5',
    title: 'Работа с API в Nuxt 3',
    date: '2025-05-15',
    excerpt: 'Как эффективно получать и отправлять данные с внешними API в Nuxt 3.',
    content: `
      <h2>Fetching Data in Nuxt 3</h2>
      <p>Nuxt 3 предоставляет несколько удобных способов для работы с асинхронными данными, включая встроенный <code>useFetch</code> и <code>useAsyncData</code>.</p>
      <h3>useFetch</h3>
      <p><code>useFetch</code> - это мощный композит, который упрощает получение данных из API. Он автоматически управляет состоянием загрузки, ошибками и кешированием, а также поддерживает SSR.</p>
      <pre><code>&lt;script setup&gt;
const { data: posts, pending, error, refresh } = await useFetch('/api/posts')
&lt;/script&gt;
</code></pre>
      <h3>useAsyncData</h3>
      <p><code>useAsyncData</code> дает больше контроля над тем, как и когда данные загружаются, позволяя вам вручную управлять запросом и возвращать данные из любой асинхронной функции.</p>
      <pre><code>&lt;script setup&gt;
const { data: userData } = await useAsyncData('my-data', () => $fetch('/api/user'))
&lt;/script&gt;
</code></pre>
      <p>Выбор между <code>useFetch</code> и <code>useAsyncData</code> зависит от конкретных потребностей вашего приложения.</p>
    `,
    image: 'https://i.ytimg.com/vi/yk80g6QS30Y/maxresdefault.jpg'
  }
]);

export const usePosts = () => {
  const getAllPosts = () => {
    return postsData.value.sort((a, b) => new Date(b.date) - new Date(a.date)); 
  };

  const getPostById = (id) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(postsData.value.find(post => post.id === id));
        }, 300); //300 мс
      });
    };

  return {
    getAllPosts,
    getPostById,
  };
};
