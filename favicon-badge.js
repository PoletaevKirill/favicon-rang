let instance;

// Private methods
/**
 *
 * @returns {Promise<any>}
 */
const createFaviconWithBadge = function() {
    const canvas = document.createElement('canvas');
    canvas.width = this.faviconSize;
    canvas.height = this.faviconSize;
    const context = canvas.getContext('2d');

    const img = document.createElement('img');

    img.src = this.favicon.href;

    return new Promise((resolve, reject) => {
        img.onload = () => {
            // Отрисовываем оригинал favicon в качестве фона
            context.drawImage(img, 0, 0, this.faviconSize, this.faviconSize);
            // Рисуем кружок нотфиикации
            context.beginPath();
            context.arc(canvas.width - this.faviconSize / 3.6, this.faviconSize / 3.6, this.faviconSize / 4, 0, 2 * Math.PI);
            context.fillStyle = '#ed2e52';
            context.fill();
            // Заменяем favicon
            resolve(canvas.toDataURL('image/png'))
        }
    })
}

/**
 *
 * @returns {*}
 * @constructor
 */
const Constructor = function() {
    if(instance) {
        return instance
    }
    instance = this

    this.favicon = document.getElementById('favicon') || null
    this.faviconOriginHref = this.favicon && this.favicon.href || ''
    this.faviconSize = 16
    this.state = false
}

// Public methods
/**
 *
 */
Constructor.prototype.setBadge = function() {
    if(this.state) return;
    this.state = true;
    createFaviconWithBadge.call(this).then(favicon => {
        this.favicon.href = favicon;
    })
}
/**
 *
 */
Constructor.prototype.removeBadge = function() {
    // возвращаем старый favicon
    this.favicon.href = this.faviconOriginHref
    this.state = false;
}

export default Constructor;