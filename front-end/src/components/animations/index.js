import gsap from "gsap";

// Единственная анимация, которая реально используется на сайте, — заставка.
// Раньше здесь же лежали таймлайны с repeat: -1 для декоративных фигур
// (.shapes, .main-circle), которых в вёрстке нет: они запускались сразу при
// загрузке и крутились бесконечно вхолостую, отъедая кадры.

let preloaderPlayed = false;

export const preLoaderAnim = () => {
    // React в режиме разработки вызывает эффекты дважды. Раньше это добавляло
    // всю последовательность в общий таймлайн второй раз — и секунд через
    // десять, уже посреди страницы, прокрутка снова блокировалась.
    if (preloaderPlayed) return;
    preloaderPlayed = true;

    const root = document.documentElement;
    root.classList.add("is-loading");

    // заставка обязана уйти в любом случае: если анимация почему-то
    // не отработала (вкладка была свёрнута, gsap не успел), страница
    // не должна остаться под чёрным экраном
    const finish = () => {
        root.classList.remove("is-loading");
        const preloader = document.querySelector(".preloader");
        if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.display = "none";
        }
    };

    gsap.timeline({ onComplete: finish })
        .set(".texts-container", { opacity: 1 })
        .from(".texts-container span", {
            duration: 1.1,
            delay: 0.3,
            y: 70,
            skewY: 10,
            stagger: 0.3,
            ease: "Power3.easeOut",
        })
        .to(".texts-container span", {
            duration: 0.7,
            y: 70,
            skewY: -20,
            stagger: 0.15,
            ease: "Power3.easeOut",
        })
        // не шторка, уходящая вниз, а простое растворение за полсекунды
        .to(".preloader", {
            duration: 0.5,
            opacity: 0,
            ease: "power2.out",
        }, "-=0.3")
        .set(".preloader", { display: "none" });

    // страховка на случай зависшей анимации
    setTimeout(finish, 8000);
};
