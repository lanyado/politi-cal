

// importing data for stories
let data = undefined;
fetch("./fakeData.json")
    .then(response => {
        return response.json();
    })
    .then(([dbData]) => {
        data = dbData;
        console.log(data);
        new SlideStories("slide");
    })


// -------------------------------------------------------------------------------
class SlideStories {
    constructor(id) {
        this.slide = document.querySelector(`[data-slide=${id}]`);
        this.active = 0;
        this.init();
    }

    activeSlide(index) {
        this.active = index;
        this.items.forEach((item) => {
            item.classList.remove("active");
        });
        this.items[index].classList.add("active");
        this.thumbItems.forEach((item) => {
            item.classList.remove("active");
        });
        this.thumbItems[index].classList.add("active");
        this.autoSlide();
        // console.log(this.thumbItems.classList);
    }

    prev() {
        if (this.active > 0) {
            this.activeSlide(this.active - 1);
        } else {
            this.activeSlide(this.items.length - 1);
        }
    }

    next() {
        if (this.active < this.items.length - 1) {
            this.activeSlide(this.active + 1);
        } else {
            this.activeSlide(0);
        }
    }

    addNavigation() {
        const nextBtn = this.slide.querySelector(".slide-next");
        const prevBtn = this.slide.querySelector(".slide-prev");
        nextBtn.addEventListener("click", this.next);
        prevBtn.addEventListener("click", this.prev);
    }

    addThumbItems() {
        this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
        this.thumbItems = Array.from(this.thumb.children);
    }

    autoSlide() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.next, 5000);
    }

    init() {
        //adding new slides elements:
        const HTMLcontent = data.stories.map(story => NewElement("img", [["src", story.img.src || ""], ["alt", story.img.alt || ""]]))
        const slideContainer = document.getElementById("slideContainer");
        slideContainer.append(...HTMLcontent)
        // console.log(HTMLcontent);




        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.items = this.slide.querySelectorAll(".slide-items > *");
        this.thumb = this.slide.querySelector(".slide-thumb");
        this.addThumbItems();
        this.activeSlide(0);
        this.addNavigation();
    }
}


// ------------------------------------------------
// helperFunctions:


function NewElement(type, attributeList = [], cssClassLst = []) {
    const temp = document.createElement(type);

    temp.classList.add(...cssClassLst)

    for (let i = 0; i < attributeList.length; i++) {
        const attribute = attributeList[i];
        temp.setAttribute(...attribute);
    }
    return temp
}

