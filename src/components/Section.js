export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() { //рендерит каждый элемент массива
        this._items.forEach(item => {
            this.addItem(this._renderer(item));
        });
    }

    addItem(element) { //добавляет элемент в контейнер
        this._container.prepend(element);
    }
}

