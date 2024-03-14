// Função para carregar o player do YouTube
function loadPlayer(elementId, videoId, options) {
    const player = new YT.Player(elementId, {
      videoId,
      ...options,
    });
  
    return player;
  }
  
  // Função para tratar eventos do player
  function handlePlayerEvents(player) {
    player.addEventListener("onReady", onPlayerReady);
    player.addEventListener("onStateChange", onPlayerStateChange);
  
    function onPlayerReady() {
      // ...
    }
  
    function onPlayerStateChange(event) {
      // ...
    }
  }
    
  // Função para ajustar o layout para diferentes dispositivos
  function adjustLayout() {
    const videoContainer = document.getElementById("video-container");
    const videoPlayer = document.getElementById("video-player");
  
    if (window.innerWidth < 768) {
      videoContainer.classList.add("mobile-layout");
      videoPlayer.classList.add("mobile-player");
    } else {
      videoContainer.classList.remove("mobile-layout");
      videoPlayer.classList.remove("mobile-player");
    }
  }
  
  // Inicialização
  const player = loadPlayer("video-player", "cba9xWne06c", {
    autoplay: 0,
    controls: 0,
    rel: 0,
    showinfo: 0,
    enablejsapi: 1,
    playsinline: 1,
    mute: 0,
  });
  
  handlePlayerEvents(player);
  controlElementVisibility(player);
  adjustLayout();
  
  window.addEventListener("resize", adjustLayout);
  
    // Função para controlar a exibição de elementos
    function controlElementVisibility(player) {
        const playButton = document.getElementById("play-button");
        const pauseButton = document.getElementById("pause-button");
      
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
          playButton.classList.add("hidden");
          pauseButton.classList.remove("hidden");
        } else {
          playButton.classList.remove("hidden");
          pauseButton.classList.add("hidden");
        }
      }