'use strict'

/**
 * all music information
 */

const musicData = [
  {
    backgroundImage: './assets/images/poster-1.jpg',
    posterUrl: './assets/images/poster-1.jpg',
    title: 'Happy Moments (Master)',
    album: 'No Spirit',
    year: 2022,
    artist: 'No Spirit x Tonion',
    musicPath: './assets/music/music-1.mp3',
  },
  {
    backgroundImage: './assets/images/poster-2.jpg',
    posterUrl: './assets/images/poster-2.jpg',
    title: 'We Are Going To Be Ok (Master)',
    album: 'No Spirit',
    year: 2022,
    artist: 'No Spirit x Jhove',
    musicPath: './assets/music/music-2.mp3',
  },
  {
    backgroundImage: './assets/images/poster-3.jpg',
    posterUrl: './assets/images/poster-3.jpg',
    title: 'Winter Meadow',
    album: 'No Spirit',
    year: 2022,
    artist: 'No Spirit x  juniorodeo',
    musicPath: './assets/music/music-3.mp3',
  },
  {
    backgroundImage: './assets/images/poster-4.jpg',
    posterUrl: './assets/images/poster-4.jpg',
    title: 'From Where We Started',
    album: 'No Spirit',
    year: 2022,
    artist: 'No Spirit',
    musicPath: './assets/music/music-4.mp3',
  },
  {
    backgroundImage: './assets/images/poster-5.jpg',
    posterUrl: './assets/images/poster-5.jpg',
    title: 'Where I Found You',
    album: 'No Spirit',
    year: 2022,
    artist: 'No Spirit',
    musicPath: './assets/music/music-5.mp3',
  },
]

/**
 * add eventListnere on all elements that are passed
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback)
  }
}

/**
 * PLAYLIST
 *
 * add all music in playlist, from 'musicData'
 */

const playlist = document.querySelector('[data-music-list]')

for (let i = 0, len = musicData.length; i < len; i++) {
  playlist.innerHTML += `
  <li>
    <button class="music-item ${
      i === 0 ? 'playing' : ''
    }" data-playlist-toggler data-playlist-item="${i}">
      <img src="${musicData[i].posterUrl}" width="800" height="800" alt="${
    musicData[i].title
  } Album Poster"
        class="img-cover">
      <div class="item-icon">
        <span class="material-symbols-rounded">equalizer</span>
      </div>
    </button>
  </li>
  `
}

/**
 * PLAYLIST MODAL SIDEBAR TOGGLE
 *
 * show 'playlist' modal sidebar when click on playlist button in top app bar
 * and hide when click on overlay or any playlist-item
 */

const playlistSideModal = document.querySelector('[data-playlist]')
const playlistTogglers = document.querySelectorAll('[data-playlist-toggler]')
const overlay = document.querySelector('[data-overlay]')

const togglePlaylist = function () {
  playlistSideModal.classList.toggle('active')
  overlay.classList.toggle('active')
  document.body.classList.toggle('modalActive')
}

addEventOnElements(playlistTogglers, 'click', togglePlaylist)

/**
 * PLAYLIST ITEM
 *
 * remove active state from last time played music
 * and add active state in clicked music
 */

const playlistItems = document.querySelectorAll('[data-playlist-item]')

let currentMusic = 0
let lastPlayedMusic = 0

const changePlaylistItem = function () {
  playlistItems[lastPlayedMusic].classList.remove('playing')
  playlistItems[currentMusic].classList.add('playing')
}

addEventOnElements(playlistItems, 'click', function () {
  lastPlayedMusic = currentMusic
  currentMusic = Number(this.dataset.playlistItem)
  changePlaylistItem()
})

/**
 * PLAYER
 *
 * change all visual information on player, based on current music
 */

const playerBanner = document.querySelector('[data-player-banner]')
const playerTitle = document.querySelector('[data-title]')
const playerAlbum = document.querySelector('[data-album]')
const playerYear = document.querySelector('[data-year]')
const playerArtist = document.querySelector('[data-artist]')

const audioSource = new Audio(musicData[currentMusic].musicPath)

const changePlayerInfo = function () {
  playerBanner.src = musicData[currentMusic].posterUrl
  playerBanner.setAttribute(
    'alt',
    `${musicData[currentMusic].title} Album Poster`
  )
  document.body.style.backgroundImage = `url(${musicData[currentMusic].backgroundImage})`
  playerTitle.textContent = musicData[currentMusic].title
  playerAlbum.textContent = musicData[currentMusic].album
  playerYear.textContent = musicData[currentMusic].year
  playerArtist.textContent = musicData[currentMusic].artist

  audioSource.src = musicData[currentMusic].musicPath

  audioSource.addEventListener('loadeddata', updateDuration)
  playMusic()
}

addEventOnElements(playlistItems, 'click', changePlayerInfo)

/** update player duration */

const playerDuration = document.querySelector('[data-duration]')
const playerSeekRange = document.querySelector('[data-seek]')

/** pass seconds and get timcode formate */
const getTimecode = function (duration) {
  const minutes = Math.floor(duration / 60)
  const seconds = Math.ceil(duration - minutes * 60)
  const timecode = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  return timecode
}

const updateDuration = function () {
  playerSeekRange.max = Math.ceil(audioSource.duration)
  playerDuration.textContent = getTimecode(Number(playerSeekRange.max))
}

audioSource.addEventListener('loadeddata', updateDuration)

/**
 * PLAY MUSIC
 *
 * play and pause music when click on play button
 */

const playBtn = document.querySelector('[data-play-btn]')

let playInterval

const playMusic = function () {
  if (audioSource.paused) {
    audioSource.play()
    playBtn.classList.add('active')
    playInterval = setInterval(updateRunningTime, 500)
  } else {
    audioSource.pause()
    playBtn.classList.remove('active')
    clearInterval(playInterval)
  }
}

playBtn.addEventListener('click', playMusic)

/** update running time while playing music */

const playerRunningTime = document.querySelector('[data-running-time')

const updateRunningTime = function () {
  playerSeekRange.value = audioSource.currentTime
  playerRunningTime.textContent = getTimecode(audioSource.currentTime)

  updateRangeFill()
  isMusicEnd()
}
