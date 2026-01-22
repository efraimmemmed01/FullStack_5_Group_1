document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('playBtn');
    const videoModal = document.getElementById('videoModal');
    const closeVideo = document.querySelector('.close-video');
    const promoVideo = document.getElementById('promoVideo');

    if(playBtn) {
        playBtn.addEventListener('click', () => {
            console.log("Play düyməsi basıldı");
            videoModal.style.display = 'flex';
            
            // Videonu məcburi yenidən yüklə və başlat
            promoVideo.load(); 
            
            const playPromise = promoVideo.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    console.log("Video uğurla başladı");
                }).catch(error => {
                    console.error("Video başlama xətası: ", error);
                    alert("Video yüklənə bilmədi. Fayl yolunu və ya formatını yoxlayın.");
                });
            }
        });
    }

    if(closeVideo) {
        closeVideo.addEventListener('click', () => {
            videoModal.style.display = 'none';
            promoVideo.pause();
            promoVideo.currentTime = 0;
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == videoModal) {
            videoModal.style.display = 'none';
            promoVideo.pause();
        }
    });
});