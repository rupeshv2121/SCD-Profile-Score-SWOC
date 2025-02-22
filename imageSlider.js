let images = [
    "https://media.licdn.com/dms/image/v2/C561BAQEjgt_p2JoIoQ/company-background_10000/company-background_10000/0/1644579387847/resumewriterindia_cover?e=2147483647&v=beta&t=FSrazgDqtN_VSuW0saffYoKAkx-bgC1BoW1xgU14hVw",
    "https://cdn.vectorstock.com/i/500p/20/83/career-conceptual-job-work-vacancy-header-web-vector-54582083.jpg",
    "https://previews.123rf.com/images/alexandraklestova/alexandraklestova2003/alexandraklestova200300153/143270675-banner-de-educaci%C3%B3n-en-l%C3%ADnea-con-tableta-libros-gorra-acad%C3%A9mica-premio-taza-de-caf%C3%A9-port%C3%A1til-y.jpg",
    "https://www.careeraddict.com/uploads/article/58723/job_search_tips-01.jpg"
];

let index = 0;
let mainImage = document.querySelector(".main-image");
let smallImages = document.querySelectorAll(".small-images img");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

function updateSlider() {
    mainImage.src = images[index];
    mainImage.classList.remove("zoom");
    void mainImage.offsetWidth;
    mainImage.classList.add("zoom");
    let tempImages = [...images];
    tempImages.splice(index, 1);
    smallImages.forEach((img, i) => img.src = tempImages[i]);
}

function nextImage() {
    index = (index + 1) % images.length;
    updateSlider();
}

function prevImage() {
    index = (index - 1 + images.length) % images.length;
    updateSlider();
}

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

setInterval(nextImage, 3000);