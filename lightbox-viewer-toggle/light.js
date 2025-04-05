//  This project will create a lightbox gallery that displays 
// full-size images when a thumbnail is clicked
const gallery = document.querySelector(".gallery");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const closeBt = document.getElementById("close");
const lightboxImage = document.getElementById('lightbox-image');

function closeLightbox() {
    lightbox.style.display = "none";
}

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const fullSizeSrc = item.src.replace('-thumbnail', '');
        lightboxImage.src = fullSizeSrc;
        lightbox.style.display = 'flex';
    });
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
})

closeBt.addEventListener("click", closeLightbox);