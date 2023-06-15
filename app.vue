<script setup lang="ts">
const scores = ref([])
const refreshScores = () => {
  const url = "api/scores"
  fetch(url)
      .then(response => response.json())
      .then(data => {
        scores.value = data
      })
      .catch(error => {
        console.error(error)
      })
}

onMounted(() => {
  refreshScores()
  setInterval(refreshScores, 5000)

  function scrollStep() {
    if (!scrollElement.value) return;

    // Scroll the element
    scrollElement.value.scrollTop += scrollDirection * scrollSpeed;

    // Check if we've reached the top or bottom of the scroll area
    if (scrollElement.value.scrollTop + scrollElement.value.clientHeight >= scrollElement.value.scrollHeight) {
      // We've reached the bottom, so start scrolling up
      scrollDirection = -1;
    } else if (scrollElement.value.scrollTop === 0) {
      // We've reached the top, so start scrolling down
      scrollDirection = 1;
    }

    // Request the next frame
    window.requestAnimationFrame(scrollStep);
  }

  // Start the animation
  scrollStep();
})

const otherScores = computed(() => {
  return scores.value.slice(8)
})

// autoscrolling
let scrollDirection = 1;
let scrollSpeed = 1;  // pixels per second
const scrollElement = ref(null);
</script>
<template>
  <div>
    <img src="score_board_empty.png" alt="score_board_empty" id="score_board_empty">
    <main>
      <div class="col" id="left">
        <div class="triangle" id="first" style="margin:auto;margin-top:25vh;justify-content: center;">
          1. PLATZ<br/>
          {{ scores?.[0]?.name }}<br/>
          {{ scores?.[0]?.score }}
        </div>
        <div class="row" style="justify-content: center;">
          <div class="triangle" id="second">
            2. PLATZ<br/>
            {{ scores?.[1]?.name }}<br/>
            {{ scores?.[1]?.score }}
          </div>
          <div class="triangle" id="third">
            3. PLATZ<br/>
            {{ scores?.[2]?.name }}<br/>
            {{ scores?.[2]?.score }}
          </div>
        </div>
        <div class="other-places">
          <div class="row" v-for="i in 5" :key="i">
            <div class="place">{{ i + 3 }}.</div>
            <div class="name">{{ scores?.[i + 3]?.name }}</div>
            <div class="score">{{ scores?.[i + 3]?.score }}</div>
          </div>
        </div>
      </div>
      <div class="col" id="right" ref="scrollElement">
        <div class="row" v-for="(score, index) in otherScores" :key="score">
          <div class="place">{{ index + 8 }}.</div>
          <div class="name">{{ score.name }}</div>
          <div class="score">{{ score.score }}</div>
        </div>
      </div>
    </main>
  </div>
</template>
<style>
.triangle {
  width: 8vw;
  height: 12.5vh;
  padding: 1vw;
  /*border: 1px solid black;*/
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

#left, #right {
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  /*border: 1px solid black;*/
}

#left {
  width: 26vw;
  left: 5.9vw;
}


#right {
  width: 55vw;
  margin-top: 59vh;
  padding: 1em;
  /*transition: all 1s;*/
  box-sizing: border-box;
  right: 0;
  height: 41vh;
  overflow-y: auto;
}

main, #score_board_empty {
  width: 100vw;
  height: 100vh;
  /*object-fit: contain;*/
  inset: 0;
  position: absolute;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: .5em;
}


.row .name {
  flex: 1;
}


#right .row:nth-child(odd) {
  margin-right: 50px;
}

#right .row:nth-child(even) {
  margin-left: 50px;
}

#right {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

.other-places {
  padding: 1em;
  margin-top: 14vh;
}

@font-face {
  font-family: "Open Sans Condensed";
  src: url("OpenSansCondensed-Light.ttf");
}

body, html {
  font-size: 1.6em;
  font-family: "Open Sans Condensed", sans-serif;
  font-weight: bolder;
  color: white;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>