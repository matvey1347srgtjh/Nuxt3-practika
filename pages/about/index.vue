<template>
  <div class="container page-about">
    <h1 class="page-title">О нас</h1>

    <section class="about-section">
      <h2>Наша миссия</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi laudantium voluptatum ab
        quibusdam numquam cupiditate vero soluta facere. Modi culpa nostrum quisquam vitae animi,
        doloribus soluta harum quae eaque asperiores.
      </p>
    </section>

    <section class="about-section">
      <h2>Наша история</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et, voluptas maxime autem fugiat
        dicta libero amet omnis, assumenda quo veritatis a, explicabo ullam placeat odio id delectus
        obcaecati. Sint, amet.
      </p>
    </section>

    <section class="about-section">
      <h2>Что мы предлагаем</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto maxime, culpa qui,
        repellendus mollitia eum quo, dignissimos non odit vel nesciunt nostrum adipisci? Sequi sed
        ad ipsum doloremque omnis soluta.
      </p>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'О нас - Тест Блог',
  meta: [{ name: 'description', content: 'все о нашей компании' }]
});
</script>

<style lang="scss" scoped>
.page-about {
  padding-top: $spacing-xl;
  font-family: $font-stack;
}

.page-title {
  color: $success-color;
  text-align: $center;
  margin-bottom: 30px;
  font-size: $font-size-h1;
}

.about-section {
  margin-bottom: 40px;

  h2 {
    font-size: 1.8em;
    color: $text-color;
    margin-bottom: 15px;
    border-bottom: 2px solid $success-color;
    padding-bottom: 5px;
  }

  p {
    font-size: 1.1em;
    line-height: 1.6;
    color: $text-color;
  }
}
</style>
