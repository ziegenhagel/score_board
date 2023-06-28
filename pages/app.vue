<template>
  <div id="app">
    <div class="navbar" style="margin-bottom: -15px;"> Scoreboard Admin</div>
    <div class="buttons">
      <button @click="deleteAll">Alles löschen</button>
      <button @click="createRandom">Demo</button>
    </div>

    <input v-model="filter" placeholder="Filter"/>

    <div class="navbar"> Scores</div>
    <div class="scores" style="margin-top:-25px">
      <div class="score" v-for="score in scoresFiltered" :key="score.id">
        <b class="name" style="font-family: 'Open Sans Bold', sans-serif">{{ score.username }}</b>
        <span class="points">{{ score.score }} Punkte</span>
        <button @click="deleteScore(score._id)">X</button>
      </div>
    </div>
  </div>
</template>
<script setup>
const filter = ref("")
const deleteAll = () => {
  if (!confirm('Wirklich alles löschen?')) return
  fetch('/api/clear').then(() => {
    alert('Alles gelöscht')
    reload()
  })
}

const createRandom = () => {
  if (!confirm('Wirklich Demo-Daten erstellen?')) return
  fetch('/api/dummy').then(() => {
    alert('Demo-Daten erstellt')
    reload()
  })
}

const scores = ref([])
const scoresFiltered = computed(() => {
  return scores.value.filter(s => s.username.toLowerCase().includes(filter.value.toLowerCase()))
})

const reload = () => {
  fetch('/api/scores').then(r => r.json()).then(res => {
    scores.value = res
  })
}

const deleteScore = (id) => {
  if (!confirm('Wirklich löschen?')) return
  fetch('/api/delete/' + id).then(() => {
    alert('Gelöscht')
    reload()
  })
}

onMounted(reload)
</script>
<style scoped>
.navbar {
  background-color: #333;
  color: white;
  padding: 15px;
}

.score {
  display: flex;
  background: #555;
  margin: 10px;
  padding: 15px;
  gap: 20px;
  align-items: center;

}

.score button {
  background: #cb2929;
  aspect-ratio: 1;
  flex: 0;
}

.score .name {
  flex: 1;
}

.buttons {
  padding: 0 10px;
  display: flex;
  gap: 10px;
}

input, button {
  background: #0088ff;
  color: white;
  font-size: 1em;
  flex: 1;
  border: none;
  padding: 10px;
}

input {
  padding: 15px;
  background: white;
  color: black;
  flex: 0;
  margin: 0 10px;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: auto;
  gap: 10px;
  background: #333;

  //font-size: 1.2em;
  font-family: "Open Sans Condensed", sans-serif;
  font-weight: bolder;
  color: white;
}

</style>