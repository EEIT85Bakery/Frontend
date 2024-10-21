<!-- <template>
  <div>
    <div class="sendok" :style="{ opacity: sendokOpacity, letterSpacing: sendokLetterSpacing }">
      <span class="bigok">{{ "紀念日提醒" }}</span><br><br>
      <span class="typing-text">{{ displayText }}</span>
    </div>
    <div class="linemail" :style="lineMailStyle">
      <div class="lineinner" :style="{ top: lineInnerTop }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const fullText = "記得到信箱看看你的紀念日哦～";
const displayText = ref('');
const currentIndex = ref(0);

const tosayOpacity = ref(1);
const sendokOpacity = ref(0);
const sendokLetterSpacing = ref('2px');
const lineInnerTop = ref('-160px');

const lineMailStyle = ref({
  opacity: 0,
  bottom: '150px',
  left: '30%',
  transform: 'rotateZ(0deg)'
});

const typeText = () => {
  const timer = setInterval(() => {
    if (currentIndex.value < fullText.length) {
      displayText.value += fullText[currentIndex.value];
      currentIndex.value++;
    } else {
      clearInterval(timer);
    }
  }, 250);
};

const sendMail = () => {
  tosayOpacity.value = 0;
  lineMailStyle.value.opacity = 1;
  lineMailStyle.value.transform = 'rotateZ(360deg)';

  setTimeout(() => { lineInnerTop.value = '-80px'; }, 1000);
  setTimeout(() => { lineMailStyle.value.left = '45%'; }, 800);
  setTimeout(() => {
    lineMailStyle.value.bottom = '20%';
    document.body.style.backgroundColor = '#c64029';
  }, 500);
  setTimeout(() => {
    lineMailStyle.value.bottom = '110%';
    lineMailStyle.value.scale = '200%';
    sendokOpacity.value = 1;
    sendokLetterSpacing.value = '5px';
    // 開始打字效果
    typeText();
  }, 1500);

  setTimeout(() => {
    window.location="http://127.0.0.1:5173"
  }, 6000);
};

onMounted(() => {
  sendMail();
});
</script>

<style>
@charset "UTF-8";
body {
  transition-duration: 0.6s;
  width: 100%;
  height: 500px;
  text-align: center;
  font-family: 微軟正黑體;
  padding: 0px;
  margin: 0px;
  background-color: #222;
}

.hlogo {
  width: 170px;
  height: auto;
  padding-top: 7px;
  left: 30px;
  position: absolute;
}

.headbar {
  width: 100%;
  height: 57px;
  background-color: #222;
  position: relative;
  z-index: 200;
}

.mail {
  left: 50%;
  transform: translateX(-50%);
  width: 75%;
  height: 300px;
  background-color: black;
  position: fixed;
  bottom: 0px;
  text-align: left;
  padding: 30px;
  letter-spacing: 3px;
  box-shadow: 0px 0px 29px 0px rgba(51, 51, 102, 0.5);
  transition-duration: 0.5s;
  background-size: cover;
}

.totext {
  padding-bottom: 30px;
}

h4.mainfield {
  font-size: 14px;
  font-weight: 200;
  line-height: 10px;
}

.inline {
  display: inline;
}

.lineinput {
  background-color: rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 14px;
  padding-left: 10px;
  letter-spacing: 2px;
  width: 200px;
  transition-duration: 0.7s;
}

.lineinput:hover {
  background-color: rgba(255, 255, 255, 0);
}

.maininput {
  width: 95%;
  height: 400px;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 1px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  transition-duration: 1s;
}

.maininput:hover {
  background-color: rgba(255, 255, 255, 0);
}

.sendmail {
  width: 100px;
  height: 20px;
  padding-top: 10px;
  background-color: transparent;
  border-width: 1px;
  border-style: solid;
  border-color: #282120;
  border-radius: 4px;
  text-align: center;
  color: 282120;
  transition-duration: 0.5s;
  display: block;
  position: absolute;
  right: 20px;
  top: 200px;
  cursor: pointer;
}

.sendmail:hover {
  background-color: #282120;
  color: white;
}

.linemail {
  z-index: 500;
  width: 105px;
  height: 67px;
  opacity: 0;
  position: fixed;
  border-style: solid;
  border-color: #eee;
  border-width: 4px;
  bottom: 150px;
  left: 30%;
  z-index: 300;
  transition-duration: 0.9s;
  transition-delay: 0.3s;
  transform: rotateZ(0deg);
  overflow: hidden;
  position: fixed;
}

.lineinner {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 0px;
  top: -160px;
  border-style: solid;
  border-color: #eee;
  border-width: 4px;
  transition-duration: 0.5s;
  transform: rotateZ(45deg);
}

.tosay {
  transform: translateX(-50%);
  letter-spacing: 10px;
  position: fixed;
  font-size: 18px;
  color: white;
  top: 20%;
  letter-spacing: 5px;
  transition-duration: 0.5s;
  transition-delay: 0.5s;
  left: 50%;
  transform: translateX(-50%);
}

.sendok {
  left: 47%;
  position: fixed;
  font-size: 18px;
  color: white;
  top: 35%;
  left: 50%;
  letter-spacing: 2px;
  opacity: 0;
  transition-duration: 0.5s;
  transition-delay: 0.5s;
  transform: translateX(-50%);
}

.bigok {
  font-size: 88px;
  letter-spacing: 2px;
}

.typing-text {
  display: inline-block;
  min-width: 1em;
  font-size: 25px;
}
</style> -->