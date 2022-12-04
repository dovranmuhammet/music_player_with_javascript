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
