let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
}

export const lazyLoad = (image: HTMLImageElement) => {
    const loaded = () => image.style.opacity = "1"   
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            if (image.complete)                                 // check if instantly loaded
                loaded()        
            else
                image.addEventListener('load', loaded)          // if the image isn't loaded yet, add an event listener
        }
    }, options)
    observer.observe(image)                                     // intersection observer

    return {
        destroy() {
            image.removeEventListener('load', loaded)           // clean up the event listener
        }
    }
}