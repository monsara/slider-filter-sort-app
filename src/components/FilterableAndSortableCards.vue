<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const sortOption = ref('checkerboard')
const cards = ref([])

const filteredAndSortedCards = computed(() => {
  let filtered = [...cards.value]

  switch (sortOption.value) {
    case 'image-left':
      filtered = filtered.filter((card) => card.imagePosRight === 0)
      break

    case 'image-right':
      filtered = filtered.filter((card) => card.imagePosRight === 1)
      break

    case 'checkerboard':
      filtered = [...cards.value]
      break

    case 'alphabetical':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break

    default:
      break
  }

  return filtered
})

const fetchMovies = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/discover/movie',
      {
        params: {
          api_key: '3685d3eb8695f087227e0ee980f3ae4d',
          language: 'en-US',
          sort_by: 'popularity.desc',
          include_adult: false,
          include_video: false,
          page: 1,
        },
      }
    )

    const movies = response.data.results.slice(0, 5).map((movie, index) => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      // imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      imageUrl: `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`,
      imagePosRight: index % 2, // 1 for odd, 0 for even
    }))

    cards.value = movies
  } catch (error) {
    console.error('Error fetching movies:', error)
  }
}

onMounted(fetchMovies)
</script>

<template>
  <section>
    <div class="container">
      <div class="sort-filters">
        <form class="form">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radio"
              value="alphabetical"
              id="checkRadio1"
              v-model="sortOption"
            />
            <label class="form-check-label" for="checkRadio1">
              Відсортувати блоки за заголовком відповідно до алфавітного порядку
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radio"
              value="image-left"
              id="checkRadio2"
              v-model="sortOption"
            />
            <label class="form-check-label" for="checkRadio2">
              Вивести всі блоки у форматі "зображення - зліва, текст - справа"
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radio"
              value="image-right"
              id="checkRadio3"
              v-model="sortOption"
            />
            <label class="form-check-label" for="checkRadio3">
              Вивести всі блоки у форматі "зображення - справа, текст - зліва"
            </label>
          </div>

          <div class="form-check mb-0">
            <input
              class="form-check-input"
              type="radio"
              name="radio"
              value="checkerboard"
              id="checkRadio4"
              v-model="sortOption"
            />
            <label class="form-check-label" for="checkRadio4">
              Вивести всі блоки в шахмотному порядку
            </label>
          </div>
        </form>
      </div>

      <div class="cards">
        <transition-group name="fade" tag="div" class="cards-container">
          <div
            v-for="card in filteredAndSortedCards"
            :key="card.id"
            class="card"
            :class="{ 'image-right': card.imagePosRight === 1 }"
          >
            <div class="image">
              <img :src="card.imageUrl" alt="Movie Poster" />
            </div>
            <div class="content">
              <h2 class="title">{{ card.title }}</h2>
              <p class="text">{{ card.description }}</p>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.sort-filters {
  margin-bottom: 60px;

  @media (max-width: 375px) {
    display: none;
    margin-bottom: 40px;
  }
}

.container {
  width: 100%;
  max-width: 1020px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 24px;
  padding-right: 24px;
}

.cards {
  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  display: flex;
  width: 100%;
  margin-bottom: 37px;
  padding: 30px 40px;
  gap: 46px;
  align-items: center;
  background-color: #c4c4c4;

  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    max-width: 375px;
    height: auto;
    flex-direction: column;
    gap: 30px;
  }

  @media (max-width: 375px) {
    gap: 20px;
  }

  &.image-right {
    justify-content: space-between;
  }
}

.card-enter-active,
.card-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.card-enter, .card-leave-to /* .card-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
}

.image {
  width: 185px;
  max-height: 278px;
  background-color: #fff;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 576px) {
    width: auto;
    max-height: 100%;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 278px;
    object-fit: cover;
    object-position: left top;
  }

  .card.image-right & {
    order: 1;

    @media (max-width: 576px) {
      order: 0;
    }
  }
}

.content {
  max-width: 270px;

  @media (max-width: 576px) {
    max-width: 100%;
  }
}

.title {
  margin-bottom: 21px;
  font-size: 30px;
  line-height: 1.3;
}

.text {
  font-size: 14px;
  line-height: 15px;
}

.form {
  width: fit-content;
  margin: auto;
}

.form-check {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
}

.form-check-input {
  position: absolute;
  width: 10px;
  height: 10px;
  margin: 0;
  border: 1px solid #000;
  border-radius: 50%;
  appearance: none;
  background-color: #fff;
  outline: none;
  transition: border-color 0.2s, background-color 0.2s;
  cursor: pointer;

  &:checked {
    background-color: #fff;
  }

  &:checked::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #ff0000;
  }
}

.form-check-label {
  margin-left: 18px;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
