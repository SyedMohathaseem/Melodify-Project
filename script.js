console.log("welcome to Melodify")

// initialize varibles
let songIndex =0;
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myprogressbar')
let gif = document.getElementById('gif')
let mastersongname = document.getElementById('mastersongname')

let songs =[
    {songName:"SAIYAARA",filePath:"songs/1.mp3",coverPath:"C:\Users\syed mohathaseem\Documents\Melodify Project/Saiyaara (2025).jpeg"},
    {songName:"EHSAAS",filePath:"songs/2.mp3",coverPath:"C:\Users\syed mohathaseem\Documents\Melodify Project/ehsaas.jpeg"},
    {songName:"EK DEEWANIYATH",filePath:"songs/3.mp3",coverPath:"C:\Users\syed mohathaseem\Documents\Melodify Project/deewaniyath.jpg"},
    {songName:"SAJDE",filePath:"songs/4.mp3",coverPath:"C:\Users\syed mohathaseem\Documents\Melodify Project/sajde.jpg"},
    {songName:"KABI MAI KABI TUM",filePath:"songs/5.mp3",coverPath:"C:\Users\syed mohathaseem\Documents\Melodify Project/kabi mai kabi tum.jpeg"},
    {songName:"PAL PAL JEENA",filePath:"songs/6.mp3",coverPath:"C:\Users\syed mohathaseem\Documents\Melodify Project/Pal.jpeg"},
    // {songName:"saiyaara",filePath:"song/7.mp3",coverPath:"cover/1.jpg"},
    // {songName:"saiyaara",filePath:"song/8.mp3",coverPath:"cover/1.jpg"},
    // {songName:"saiyaara",filePath:"song/9.mp3",coverPath:"cover/1.jpg"},
    // {songName:"saiyaara",filePath:"song/10.mp3",coverPath:"cover/1.jpg"},
    

]


audioElement.addEventListener('timeupdate', ()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;

})
myProgressBar.addEventListener('change',()=>{ 
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
    

// ====== ELEMENTS ======
let playButtons = Array.from(document.getElementsByClassName('songItemPlay'));

// ====== HELPERS ======
function makeAllPlays() {
  playButtons.forEach((el) => {
    el.classList.remove('fa-circle-pause');
    el.classList.add('fa-circle-play');
  });
}

function updateMasterButton(isPlaying) {
  if (isPlaying) {
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  } else {
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
  }
}

function playSong(index) {
  songIndex = index;
  audioElement.src = songs[songIndex].filePath;
  mastersongname.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  makeAllPlays();
  playButtons[songIndex].classList.remove('fa-circle-play');
  playButtons[songIndex].classList.add('fa-circle-pause');
  updateMasterButton(true);
}

function pauseSong() {
  audioElement.pause();
  makeAllPlays();
  playButtons[songIndex].classList.remove('fa-circle-pause');
  playButtons[songIndex].classList.add('fa-circle-play');
  updateMasterButton(false);
}

// ====== SMALL PLAY BUTTONS ======
playButtons.forEach((button, i) => {
  button.addEventListener('click', (e) => {
    // If same song clicked, toggle play/pause
    if (songIndex === i && !audioElement.paused) {
      pauseSong();
    } else if (songIndex === i && audioElement.paused) {
      audioElement.play();
      playButtons[i].classList.remove('fa-circle-play');
      playButtons[i].classList.add('fa-circle-pause');
      updateMasterButton(true);
    } else {
      playSong(i);
    }
  });
});

// ====== MASTER PLAY BUTTON ======
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    playButtons[songIndex].classList.remove('fa-circle-play');
    playButtons[songIndex].classList.add('fa-circle-pause');
    updateMasterButton(true);
  } else {
    pauseSong();
  }
});

// ====== AUDIO EVENT HANDLERS ======
audioElement.addEventListener('play', () => {
  updateMasterButton(true);
  makeAllPlays();
  playButtons[songIndex].classList.remove('fa-circle-play');
  playButtons[songIndex].classList.add('fa-circle-pause');
});

audioElement.addEventListener('pause', () => {
  updateMasterButton(false);
  makeAllPlays();
  playButtons[songIndex].classList.remove('fa-circle-pause');
  playButtons[songIndex].classList.add('fa-circle-play');
});

// ====== AUTO NEXT SONG ======
audioElement.addEventListener('ended', () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex=0
    }
    else{
        songIndex += 1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    mastersongname.innerText=songs[songIndex].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    mastersongname.innerText=songs[songIndex].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
