// Variáveis globais utilizadas pelo código
var videoDivHeight;
// Armazena a altura do container do vídeo
var videoPaused = false;
// Indica se o vídeo está pausado (true) ou não (false)
var btnSoundClick = false;
// Indica se o vídeo está pausado (true) ou não (false)

$(document).ready(function () {
    // Dispara o evento "player.video.play" para iniciar a reprodução do vídeo
    $(document).trigger('player.video.play');
    
    // Evento de clique no container do vídeo
    $('.wistia-video-container').click(function () {
        // Armazena o elemento clicado (container do vídeo)
        var that = $(this);
        // Chama a função para entrar em modo fullscreen
        fullScreenVideo(that);
    });

    // Evento de clique nos botões de pausa, continue e miniatura
    $(' .continue-text, .yt-thumbnail').on('click', function () {
        // Seleciona o elemento de vídeo
        var video = $('.wistia-video-container video');

        // Desativa o mute do vídeo
        video.prop('muted', false);

        // Verifica se o player externo está definido (provavelmente Wistia)
        if (typeof player !== 'undefined') {
            // Desativa o mute usando o player externo
            player.unMute();

            // Inicia a reprodução usando o player externo
            player.playVideo();
        }
        // Adiciona a classe 'full-body-video' para estilizar elementos em fullscreen
        $('body').addClass('full-body-video');
        countWrapperHeight();
    });

    // Evento disparado quando o vídeo é carregado
    $(document).on("player.video.loaded", function () {
        videoDivHeight = $('.wistia-video-container').height();
        // Avança o vídeo para 0.1 segundos
        player.seekTo(0.1, true);
    });

    // Evento disparado quando o vídeo começa a ser reproduzido
    $(document).on("player.video.started", function () {
        // Remove o background do botão de play
        $('#play-button-video').css('background', 'none');

        // Oculta o texto "Continuar"
        $('.continue-text').hide();
        videoPaused = false;
    });

    // Evento disparado quando o vídeo é pausado
    $(document).on("player.video.paused", function () {
        videoPaused = true;

        // Exibe o botão de play
        $('.video-paused-btn').show();

        // Calcula a posição vertical do vídeo
        var videoOffsetBottom = $('.video-absolute').offset().top + $('.video-absolute').height() - 0;

        // Exibe o texto "Continuar" se o vídeo não estiver na parte superior da tela
        if ($(window).scrollTop() < videoOffsetBottom)
            $('.continue-text').show();

        // Remove a classe 'full-body-video' para sair do modo fullscreen
        $('body').removeClass('full-body-video');

        // Recalcula a altura do wrapper
        countWrapperHeight();
    });

    // Função para entrar e sair do modo fullscreen
    function fullScreenVideo(that) {
        // Se o player de vídeo do YouTube estiver definido
        if (typeof player !== 'undefined') {
            // Coloca o player de vídeo do YouTube em tela cheia
            player.playVideo().then(function () {
                var iframe = that.find('iframe').get(0);
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.mozRequestFullScreen) {
                    iframe.mozRequestFullScreen();
                } else if (iframe.webkitRequestFullscreen) {
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) {
                    iframe.msRequestFullscreen();
                }
            });
        }
    }

    function countWrapperHeight() {
        if ($('body').hasClass('full-body-video')) {
            var videoHei = $('.wistia-video-container').height() - $('#video-box .wrapper').offset().top;
            // Push the content below the video
            $('#video-box .wrapper').height(videoHei);
        } else {
            $('#video-box .wrapper').height('auto');
        }
    }
});



//Meu codigo

$(document).ready(function() {
    var isVideoFullScreen = false;

    // Função para colocar o vídeo em tela cheia ao clicar no botão ou na overlay
    $('#fullscreen-button, #play-button-video').on('click', function() {
        var iframe = $('#video')[0];
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) { /* Firefox */
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { /* IE/Edge */
            iframe.msRequestFullscreen();
        }
        isVideoFullScreen = true; // Marca o vídeo como em tela cheia
    });

    // Função para sair do modo de tela cheia quando o vídeo é pausado
    $(document).on("player.video.paused", function () {
        if (isVideoFullScreen) {
            exitFullScreen();
            isVideoFullScreen = false; // Atualiza o status do vídeo para não estar mais em tela cheia
        }
    });

    function exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
});

  
  