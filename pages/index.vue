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

const eyesOpen = ref(true)

// randomly blink every 5 to 15 seconds (blinking means closeing eyes twice for 0.1 seconds)
const blink = () => {
  eyesOpen.value = false
  setTimeout(() => {
    eyesOpen.value = true
    setTimeout(() => {
      eyesOpen.value = false
      setTimeout(() => {
        eyesOpen.value = true

        // schedule next blink
        setTimeout(blink, Math.random() * 10000 + 5000)
      }, 100)
    }, 100)
  }, 100)
}
blink()


// website should reload every 15 min
setInterval(() => {
  window.location.reload()
}, 20 * 60 * 1000)

let timeoutScrolling = 0
onMounted(() => {
  refreshScores()
  setInterval(refreshScores, 5000)

  function scrollStep() {
    if (!scrollElement.value) return;

    // Scroll the element
    if (timeoutScrolling > 1) {
      timeoutScrolling = 0
      scrollElement.value.scrollTop += scrollDirection * scrollSpeed;
    } else {
      timeoutScrolling += 1
    }

    // Check if we've reached the top or bottom of the scroll area
    if (scrollElement.value.scrollTop + scrollElement.value.clientHeight >= (scrollElement.value.scrollHeight - 10)) {
      // We've reached the bottom, so start scrolling up
      scrollDirection = -1;
    } else if (scrollElement.value.scrollTop === 0) {
      // We've reached the top, so start scrolling down
      scrollDirection = 1;
    }

    // Request the next frame
    window.requestAnimationFrame(scrollStep);
  }

  scrollStep();
})

const otherScores = computed(() => {
  return scores.value.slice(10)
})

// autoscrolling
let scrollDirection = 1;
let scrollSpeed = 1;  // pixels per second
const scrollElement = ref(null);
</script>
<template>
  <div class="presentation">
    <img src="/score_board_empty.png" alt="score_board_empty" id="score_board_empty">
    <main>
      <div class="col" id="left">
        <div class="triangle" id="first" style="margin:auto;margin-top:25vh;justify-content: center;">
          1. PLATZ<br/>
          <h2>{{ scores?.[0]?.username }}</h2>
          {{ scores?.[0]?.score }}
        </div>
        <div class="row" style="justify-content: center;">
          <div class="triangle" id="second">
            2. PLATZ<br/>
            <h2>{{ scores?.[1]?.username }}</h2>
            {{ scores?.[1]?.score }}
          </div>
          <div class="triangle" id="third">
            3. PLATZ<br/>
            <h2>{{ scores?.[2]?.username }}</h2>
            {{ scores?.[2]?.score }}
          </div>
        </div>
        <div class="other-places">
          <div class="row" v-for="i in 7" :key="i">
            <div class="place">{{ i + 3 }}.</div>
            <div class="name">{{ scores?.[i + 2]?.username }}</div>
            <div class="score">{{ scores?.[i + 2]?.score }}</div>
          </div>
        </div>
      </div>
      <div class="col" id="right" ref="scrollElement">
        <div class="row" v-for="(score, index) in otherScores" :key="score">
          <div class="place">{{ index + 10 }}.</div>
          <div class="name">{{ score.username }}</div>
          <div class="score">{{ score.score }}</div>
        </div>
      </div>
    </main>

    <img src="/score_board_empty_overlay.png" alt="score_board_empty" id="score_board_empty">
    <img src="/eyes_open.png" v-if="eyesOpen" alt="eyes_open" class="eyes">
    <img src="/eyes_close.png" v-else alt="eyes_closed" class="eyes">
  </div>
</template>
<style>
.eyes {
  position: absolute;
  top: 21vh;
  left: 39vw;
  width: 4.3vw;
}

.triangle {
  width: 7.7vw;
  height: 13.2vh;
  padding: 1vw;
  /*border: 1px solid black;*/
  font-size: 1.3em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.triangle h2 {
  margin: 0;
  letter-spacing: 1px;
  font-family: "Open Sans Bold", sans-serif;
  font-size: .7em;
  padding: 0;
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
  width: 53vw;
  margin-top: 31vh;
//margin-top: 59vh; padding: 1em; padding-top: 29vh;
  /*transition: all 1s;*/
  box-sizing: border-box;
  right: 1vw;
  height: 70vh;
  line-height: 1.1em;
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

* {
  transition: .1s;
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
  margin-top: 11.4vh;
  line-height: 1.15em;
}

.row .name {
  font-family: "Open Sans Bold", sans-serif;
}

@font-face {
  font-family: "Open Sans Condensed";
  src: url("/OpenSansCondensed-Light.ttf");
}


@font-face {
  font-family: "Open Sans Bold";
  src: url("/OpenSans-CondBold.ttf");
}

body, html {
  font-size: 1.2em;
  font-family: "Open Sans Condensed", sans-serif;
  font-weight: bolder;
  color: white;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.presentation, .presentation * {
  user-select: none;
  pointer-events: none;
  cursor: none;
}
</style>