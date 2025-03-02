<script setup>
import { getIDPokemon } from '@/utils';
import { useRouter } from 'vue-router';

const props = defineProps({ pokemon: Object });
const router = useRouter();

function goToDetail() {
  router.push(`/pokemon/${props.pokemon.name}`);
}
</script>

<template>
  <div class="pokemon-item" @click="goToDetail">
    <div class="pokemon-id">#{{ getIDPokemon(props.pokemon.url) }}</div>
    <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(props.pokemon.url)}.png`" alt="Pokemon Sprite" class="pokemon-image" />
    <div class="pokemon-name">{{ props.pokemon.name }}</div>
    <div class="pokemon-types">
        <span v-for="type in props.pokemon.types" 
            :key="type" 
            :class="['pokemon-type', type]">
            {{ type }}
        </span>
    </div>
  </div>
</template>
<style>
.container {
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
}
h1 {
    text-align: center;
    font-size: 40px;
    font-weight: normal;
}
.search-container {
    text-align: center;
    margin-bottom: 50px;
}

#search {
    padding: 15px;
    font-size: 16px;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    border-radius: 50px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.pokemon-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;
    margin-top: 15px;
    justify-content: center;
    padding: 0 10px;
}

.pokemon-id {
    color: #2c3e50;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
}

.pokemon-image {
    width: 150px;
    height: 150px;
    margin: 0 auto;
}
img{
    width: 100%;
    height: auto;
    border-radius: 10px;
}

.pokemon-name {
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    font-weight: bold;
    text-transform: capitalize;
}
.pokemon-types {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
}

.pokemon-type {
    font-size: 13px;
    border-radius: 5px;
    font-weight: 500;
    line-height: 20px;
    margin: 0px 2px;
    padding: 2px 5px;
    text-transform: capitalize;
    font-weight: bold;
}

.pokemon-item {
    border-radius: 15px;
    padding: 10px;
    text-align: center;
    height: 250px;
    transition: transform 0.2s ease;
    border: 1px solid rgb(230, 230, 230);
    cursor: pointer;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-item:hover {
    box-shadow: 0 8px 16px rgba(74, 74, 74, 0.3);
    transform: translateY(-5px);
}

.load-more {
    background-color: #ff4d4f;
    border: 1px solid red;
    border-radius: 10px;
    color: #fff;
    padding: 15px 25px;
    text-align: center;
    cursor: pointer;
    margin: 30px auto;
    display: block;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
}

.load-more:hover {
    background-color: #e03e3e;
}
.fire {
    background-color: #f08030;
}

.water {
    background-color: #6890f0;
}

.grass {
    background-color: #78c850;
}

.electric {
    background-color: #f8d030;
}

.ice {
    background-color: #98d8d8;
}

.rock {
    background-color: #b8a038;
}

.ground {
    background-color: #e0c068;
}

.flying {
    background-color: #a890f0;
}

.poison {
    background-color: #a040a0;
}

.bug {
    background-color: #a8b820;
}

.normal {
    background-color: #a8a878;
}

.psychic {
    background-color: #f85888;
}

.fighting {
    background-color: #c03028;
}

.ghost {
    background-color: #705898;
}

.dragon {
    background-color: #7038f8;
}

.dark {
    background-color: #705848;
}

.steel {
    background-color: #b8b8d0;
}

.fairy {
    background-color: #ee99ac;
}

@media screen and (max-width: 1200px) {
    .pokemon-list {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media screen and (max-width: 960px) {
    .pokemon-list {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media screen and (max-width: 768px) {
    .pokemon-list {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 480px) {
    .pokemon-list {
        grid-template-columns: 1fr;
    }
}
</style>