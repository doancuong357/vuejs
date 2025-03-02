<script setup>
import { ref, onMounted } from 'vue';
import { fetchAPI, getIDPokemon } from '@/utils';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const pokemon = ref(null);
const flavourText = ref('');
const evolutionChain = ref([]);
const loading = ref(true);

async function getPokemonDetail() {
  loading.value = true;
  
  // Lấy dữ liệu từ API theo name trong URL
  const data = await fetchAPI(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`);
  const species = await fetchAPI(data.species.url);
  const evolutionData = await fetchAPI(species.evolution_chain.url);

  pokemon.value = data;
  flavourText.value = getFlavourText(species.flavor_text_entries);
  evolutionChain.value = parseEvolutionChain(evolutionData.chain);
  
  loading.value = false;
}
const statAbbreviations = {
  'hp': 'HP',
  'attack': 'ATK',
  'defense': 'DEF',
  'special-attack': 'SPA',
  'special-defense': 'SPD',
  'speed': 'SPE'
};
function formatAbilityName(name) {
  return name
    .split('-')    
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
function getFlavourText(entries) {
  const entry = entries.find(e => e.language.name === 'en');
  return entry ? entry.flavor_text.replace(/\n/g, ' ') : 'No description available.';
}

function parseEvolutionChain(chain) {
  const chainArray = [];
  let currentChain = chain;
  while (currentChain) {
    chainArray.push({
      id: getIDPokemon(currentChain.species.url),
      name: currentChain.species.name
    });
    currentChain = currentChain.evolves_to[0];
  }
  return chainArray;
}

onMounted(getPokemonDetail);
</script>

<template>
  <div v-if="loading" class="loading">Getting data from PoKéDex...</div>
  
  <div v-else class="pokemon-detail">
    <div>
      <button @click="router.push('/')" class="back-button">&lt; Back</button>
    </div>
    <!-- Pokémon Info -->
    <div class="pokemon-header">
      <img :src="pokemon.sprites.front_default" alt="Pokemon Sprite" />
      <div class="pokemon-types">
        <span v-for="type in pokemon.types" :key="type.type.name" 
              :class="`pokemon-type ${type.type.name}`">
          {{ type.type.name }}
        </span>
      </div>
      <h1>{{ pokemon.name }}</h1>
      <p class="pokemon-description">{{ flavourText }}</p>
    </div>

    <div class="pokemon-info-grid">
      <div class="pkm-height">
        <h3>Height</h3>
        <p>{{ pokemon.height }}</p>
      </div>
      <div class="pkm-weight">
        <h3>Weight</h3>
        <p>{{ pokemon.weight }}</p>
      </div>
    </div>
    <div class="pkm-abilities">
      <h3>Abilities</h3>
      <div class="abilities-list">
        <p v-for="ability in pokemon.abilities" :key="ability.ability.name">
          {{ formatAbilityName(ability.ability.name) }}
        </p>
      </div>
    </div>
    <!-- Pokémon Stats -->
    <div class="pokemon-stats">
      <h3>Stats</h3>
      <div class="stats-grid">
        <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="stat-item">
        <span :class="`stat-label-${stat.stat.name}`">
          {{ statAbbreviations[stat.stat.name] || stat.stat.name.toUpperCase() }}
        </span>
        <span class="stat-value">{{ stat.base_stat }}</span>
      </div>
      </div>
    </div>

    <!-- Evolution Chain -->
    <div class="pokemon-evolution">
      <h3>Evolution</h3>
      <div class="evolution-chain">
        <div v-for="poke in evolutionChain" :key="poke.id" class="evolution-item">
          <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`" alt="Evolution Sprite" />
          <p>{{ poke.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
/* BASE STYLES */
body {
  background-color: #ffffff;
  font-family: 'Arial', sans-serif;
}
.loading{
  font-size: 26px;
  display:flex;
  justify-content: center;
}
/* MAIN CONTAINER */
.pokemon-detail {
  width:100%;
  padding: 10px;
  background: #ffffff;
  display:flex;
  flex-direction: column;
  justify-content: center;
}

/* BACK BUTTON */
.back-button {
  display: flex;
  justify-content: left;
  padding: 8px 7px;
  border: none;
  border-radius: 20px;
  background-color: #f1f1f1;
  color: #2a2a2a;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 25px;
}

.back-button:hover {
  background-color: #ddd;
  transform: translateY(-1px);
}

/* HEADER SECTION */
.pokemon-header {
  text-align: center;
  margin-bottom: 10px;
}

.pokemon-header img {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.pokemon-header h1 {
  font-size: 36px;
  text-transform: capitalize;
  margin: 5px 0;
  color: #222222;
}
.pokemon-description{
  width:80%;
  margin:auto;
}


/* INFO GRID */
.pokemon-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0;
}
.pokemon-info-grid .pkm-height{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.pokemon-info-grid p{
  background-color: #f0f4f8;
  padding:3px 30px;
  border-radius: 99px;
}
.pokemon-detail h3{
  color:#232323;
  font-weight: bold;
}
.pokemon-info-grid .pkm-weight{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.pkm-abilities{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.abilities-list{
  display:flex;
  gap:100px;
  font-size: 16px;
  font-style: normal;
}
.abilities-list p{
  background-color: #eef3f5;
  padding:3px 30px;
  border-radius: 99px;
}


/* STATS GRID */
.pokemon-stats{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
}
.stats-grid {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 20px 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f7fb;
  padding: 8px 10px;
  border-radius: 100px;
  width: 40px;
  height: 70px;
  justify-content: center;
  font-size: 10px ;
  
}

.stat-value {
  color: #1f1f1f;
  font-size: 14px;
}

/* EVOLUTION */
.pokemon-evolution{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.evolution-chain {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 25px;
}

.evolution-item {
  color:#000000;
  text-align: center;
  position: relative;
  padding: 15px;
}

.evolution-item img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.evolution-item:not(:last-child)::after {
  content: ">";
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 22px;
  color: #2a2a2a;
}
.stat-label-hp { color: rgb(253, 253, 253); background-color: rgb(221, 36, 36) ; padding:5px 6px;border-radius: 999px; }
.stat-label-attack { color: rgb(253, 253, 253); background-color: rgb(231, 159, 25) ;padding:5px 3px;border-radius: 999px; }
.stat-label-defense { color: rgb(253, 253, 253); background-color: rgb(227, 227, 26) ;padding:5px 3px;border-radius: 999px; }
.stat-label-special-attack { color: rgb(253, 253, 253); background-color: rgb(22, 141, 232) ;padding:5px 3px;border-radius: 999px; }
.stat-label-special-defense { color: rgb(253, 253, 253); background-color: rgb(71, 155, 50) ; padding:5px 3px;border-radius: 999px;}
.stat-label-speed { color: rgb(253, 253, 253); background-color: rgb(230, 63, 146) ; padding:5px 3px;border-radius: 999px;}

/* RESPONSIVE DESIGN */
@media (min-width: 1024px) {
    #app {
        display: grid;
        grid-template-columns: 1fr;
        padding: 0 2rem;
    }
}
</style>