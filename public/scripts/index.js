window.onload = () => {
    /* Класс выбора города */
    class ChooseCity {
        constructor(citiesContainer) {
            this.citiesContainer = this.#getBlock(`.${citiesContainer}`)

            this.#eventsHandler()
        }
        #getBlock(selector) {
            return document.querySelector(`${selector}`)
        }
        #getAllBlocks(selector) {
            return document.querySelectorAll(`${selector}`)
        }
        #eventsHandler() {
            this.citiesContainer.addEventListener('click', (event) => this.#toggleVisible(event))
            this.citiesContainer.addEventListener('click', (event) => this.#chooseCity(event))
        }
        #toggleVisible(event) {
            event.stopPropagation()
            const target = event.target

            if (!target.classList.contains('selectedCity')) {
                return false
            }

            const citiesBlock = this.#getBlock('.other-cities')
            citiesBlock.classList.toggle('hidden')
            this.citiesContainer.classList.toggle('cities_open')
        }
        #chooseCity(event) {
            const target = event.target

            if (!target.classList.contains('avalCity')) {
                return false
            }

            const selectedCity = this.#getBlock('.selectedCity')
            const allCities = [...this.#getAllBlocks('.avalCity')]

            selectedCity.textContent = target.textContent
            selectedCity.dataset.selectedId = target.dataset.id

            allCities.forEach(city => {
                if (+city.dataset.id === +selectedCity.dataset.selectedId) {
                    city.classList.add('city__choosen')
                } else {
                    city.classList.remove('city__choosen')
                }
            })
        }
    }
    const chooseUserCity = new ChooseCity('user-city')

    /* Родительский класс для кнопок, иконок и категорий */
    class ClickElem {
        constructor(elemClass, toggleClass) {
            this.elemClass = elemClass
            this.toggleClass = toggleClass
        }
        getNode(elemClass) {
            return document.querySelector(`.${elemClass}`)
        }
        getAllNodes(elemClass) {
            return document.querySelectorAll(`.${elemClass}`)
        }
    }
    /* Класс нажатия на иконки. При нажании меняется путь к картинке */
    class ClickIcons extends ClickElem {
        constructor(elemClass, toggleClass) {
            super(elemClass, toggleClass)
            this.allElems = [...super.getAllNodes(elemClass)]

            this.#eventsHandler()
        }

        #eventsHandler() {
            this.allElems.forEach(el => {
                el.addEventListener('click', () => this.click(el))
            })
        }
        click(el) {
            const img = el.querySelector('IMG')

            if (!el.classList.contains('clicked')) {
                img.setAttribute('src', `images/icons/clickedHeart.svg`)
                el.classList.toggle('clicked')
            } else {
                img.setAttribute('src', `images/icons/${img.dataset.img}.svg`)
                el.classList.toggle('clicked')
            }
        }
    }
    /* Класс нажания на кнопку. При нажатии меняется класс */
    class ClickButtons extends ClickElem {
        constructor(elemClass, toggleClass) {
            super(elemClass, toggleClass)
            this.allButtons = [...super.getAllNodes(elemClass)]

            this.#eventsHandler()
        }
        #eventsHandler() {
            this.allButtons.forEach(btn => {
                btn.addEventListener('mousedown', event => {
                    if (btn.classList.contains('disabled')) {
                        return false
                    }
                    btn.classList.add(`${this.toggleClass}`)
                })
                btn.addEventListener('mouseup', event => {
                    if (btn.classList.contains('disabled')) {
                        return false
                    }
                    btn.classList.remove(`${this.toggleClass}`)
                })
            })
        }
    }
    /* Класс смены страницы в навигации, смена категории товара в "Распродажа" смена цвета в "Товар дня" и т.д. Можно
       еще что-нибудь прикрутить. */
    class ChangeCategories extends ClickElem {
        constructor(elemClass, toggleClass) {
            super(elemClass, toggleClass);
            this.allItems = [...super.getAllNodes(elemClass)]

            this.#eventsHandler()
        }
        #eventsHandler() {
            this.allItems.forEach(el => {
                if (el.classList.contains('disabled')) {
                    return false
                }

                el.addEventListener('click', () => this.#click(el))
            })
        }
        #click(el) {
            this.allItems.forEach(el => {
                el.classList.remove(`${this.toggleClass}`)
            })

            el.classList.add(`${this.toggleClass}`)
        }
    }
    const clickButtons = new ClickButtons('press', 'pressed')
    const sliderButtons = new ClickButtons('owl-nav button', 'pressed')
    const clickIcons = new ClickIcons('clicked_item', 'clicked')
    const navButtons = new ChangeCategories('header__nav_a', 'active')
    const saleButtons = new ChangeCategories('sale__category', 'active')
    const dailySizes = new ChangeCategories('daily__size_span', 'active')
    const color = new ChangeCategories('daily__color_unit', 'active')


    /* Для рендера элементов каталога */
    class PopularCategories {
        constructor(elem) {
            this.text = elem.text
            this.img = elem.img
            this.alt = elem.alt
        }
        getHtml() {
            return `
                <div class="category__item">
                    <div class="category__imgContainer">
                        <img src="images/categories/${this.img}" alt="${this.alt}" class="category__img">

                    </div>
                    
                    <h3 class="category__name">${this.text}</h3>
                </div>
            `
        }
    }

    /* Класс распродажи */
    class SaleItems {
        constructor(elem) {
            this.img = elem.img
            this.price = elem.price
            this.oldPrice = elem.oldPrice
            this.sale = elem.sale
            this.text = elem.text
            this.bubbles = elem.bubbles
            this.clickIcons = clickIcons
        }

        getHtml() {
            return `
                <div class="sale__block">
                    <div class="sale__icons ${this.bubbles ? '' : 'sale__icons_noSale'}">
                        ${this.bubbles ? this.#renderBubbles(this.bubbles) : ''}
    
                        <div>
                            <a href="#" class="clicked_item">
                                <img src="images/icons/heartIcon.svg" alt="heartIcon"
                                     class="heart__icon " data-img="heartIcon">
                            </a>
                            <a href="#">
                                <img src="images/icons/eyeIcon.svg" alt="eyeIcon" class="eye__icon">
                            </a>
                        </div>
                    </div>
    
                    <div class="sale__img_container">
                        <img src="images/sale/${this.img}" alt="ring" class="sale__img">
    
                        <div class="slider__dots slider__dots_sale">
                            <span class="slider__dot slider__dot_active"></span>
                            <span class="slider__dot"></span>
                            <span class="slider__dot"></span>
                        </div>
                    </div>
    
                    <div class="sale__price discount">
                        <div class="sale__price_flex">
                            <span class="sale__price_new">${this.price} Р</span>
                            ${this.oldPrice ? `<span class="sale__price_old">${this.oldPrice} Р</span>` : ''}
                        </div>
    
                        ${this.sale ? `<span class="sale__price_discount">-${this.sale}%</span>` : ''}
                    </div>
    
                    <p class="sale__description">Стильное кольцо из белого золота c бриллиантами</p>
                </div>    
            `
        }
        #renderBubbles(bubbles) {
            let line = '<div></div>'
            for (const bubble of bubbles) {
                line += this.#getBubbleHtml(bubble)
            }

            return `
                <div>
                    ${line}
                </div>
            `
        }
        #getBubbleHtml(bubble) {
            return `
                <span class="bubble ${bubble.class}">${bubble.text}</span>
            `
        }
        static setListeners(elemClass, func, containerClass) {
            const container = document.querySelector(`.${containerClass}`)
            const allItems = container.querySelectorAll(`.${elemClass}`)

            allItems.forEach(el => {
                el.addEventListener('click', () => func(el))
            })
        }
    }

    /* Класс выпадающих элементов при клике */
    class OutElem {
        constructor(elemClass, elemOpenButton, toggleClass) {
            this.authClass = elemClass
            this.btn = elemOpenButton
            this.toggleClass = toggleClass

            this.#eventsHandler()
        }
        #eventsHandler() {
            document.querySelector(`.${this.btn}`)
                .addEventListener('click', () => this.#open())
        }
        #open() {
            const authContainer = document.querySelector(`.${this.authClass}`)
            authContainer.classList.toggle(`${this.toggleClass}`)
        }
    }

    /* Класс рендера элементов на странице*/
    class RenderPage {
        constructor() {
            this.API = '../api/'

            this.rawArr = []
            this.objPopular = []
            this.objSale = []

            this.PopularCategories = PopularCategories
            this.SaleItems = SaleItems
            this.OutElem = OutElem

            this.#init()
        }
        #init() {
            this.render(this.PopularCategories,
                'categories__container',
                'popular.php',
                this.objPopular)
            this.render(this.SaleItems,
                'sale__container',
                'sale.php',
                this.objSale)
                .then(() => {
                    this.SaleItems.setListeners('clicked_item', clickIcons.click, 'sale__container')

                    document.querySelectorAll('A').forEach(el => {
                        el.addEventListener('click', (event) => {
                            event.preventDefault()
                        })
                    })
                })

            const auth = new this.OutElem('header__auth', 'header__auth_burg', 'header__auth_hidden')
            const search = new this.OutElem('search__form', 'loop_open', 'hidden')
            const headerNav = new this.OutElem('header__nav', 'header__nav_burger', 'hidden')
        }
        #fetchItems(api = '') {
            if (api === '') {
                console.log('api not specified!')
                return false
            }

            return fetch(api)
                .then(result => result.json())
                .then(data => {
                    this.rawArr = []

                    for (const elem of data) {
                        this.rawArr.push(elem)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        render(classGenerator, containerClass, api, objArr) {
            return this.#fetchItems(`${this.API}${api}`)
                .then(() => {
                    for (const elem of this.rawArr) {
                        const newObj = new classGenerator(elem)
                        objArr.push(newObj)

                        document.querySelector(`.${containerClass}`)
                            .insertAdjacentHTML('beforeend', newObj.getHtml(elem))
                    }
                })
        }
    }
    const page = new RenderPage()

    document.querySelectorAll('A').forEach(el => {
        el.addEventListener('click', (event) => {
            event.preventDefault()
        })
    })
}