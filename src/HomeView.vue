<script setup>
import { computed, ref, onMounted } from 'vue';
import { fetchAPI } from '@/utils';
import PokemonCard from '@/components/PokemonCard.vue';

const pokemon = ref([]);
const filteredPokemon = ref([]);
const offset = ref(0);
const NUMBER_OF_RENDER = 18;

const renderPokemon = computed(() => {
  return filteredPokemon.value.length ? filteredPokemon.value.slice(0, offset.value + NUMBER_OF_RENDER) : [];
});

async function getPokemon() {
  const data = await fetchAPI('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898');
  
  if (data.results) {
    // Lấy chi tiết từng Pokémon để lấy loại
    const pokemonData = await Promise.all(
      data.results.map(async (poke) => {
        const details = await fetchAPI(poke.url);
        return {
          ...poke,
          types: details.types.map(t => t.type.name), // Lấy danh sách types
        };
      })
    );

    pokemon.value = pokemonData;
    filteredPokemon.value = pokemonData;
  } else {
    console.error('No Pokémon data received');
  }
}

onMounted(getPokemon);

function handleLoadMore() {
  offset.value += NUMBER_OF_RENDER;
}

function handleSearch(event) {
  filteredPokemon.value = pokemon.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
  offset.value = 0;
}
</script>

<template>
  <div class="container">
    <h1>Pokemon API</h1>
    <div class="search-container">
      <input type="text" id="search" placeholder="Search Pokemon..." @input="handleSearch" />
    </div>
    <div class="pokemon-list">
      <PokemonCard v-for="item in renderPokemon" :key="item.url" :pokemon="item" />
    </div>
    <button v-show="filteredPokemon.length > NUMBER_OF_RENDER" class="load-more" @click="handleLoadMore">
      Load More
    </button>
  </div>
</template>