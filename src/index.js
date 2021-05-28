class FaviconRange {
  #defaultConfig = {
    faviconSize: 16,
    bg: '#ed2e52',
    font: '8px "helvetica", sans-serif',
    color: '#fff'
  }

  #isSetBadge = false
  #faviconOriginHref

  constructor(config = {}) {
    if (!this.constructor.instance) {
      this.constructor.instance = this
      this.config = {...this.#defaultConfig, ...config}
      this.favicon = this.#getDOMElementFavicon()
      this.#faviconOriginHref = this.favicon && this.favicon.href
    }
    return this.constructor.instance
  }

  #getDOMElementFavicon = function (){
    const el =  document.querySelector('link[rel="icon"]')
      || document.querySelector('link[rel="shortcut icon"]')
    if(!el){
      throw new Error(`DOMElement "favicon" is nor defined`)
    }
    return el
  }
  #createFaviconWithBadge = function (count) {
    const faviconSize = this.config.faviconSize
    const canvas = document.createElement('canvas')
    canvas.width = this.config.faviconSize
    canvas.height = this.config.faviconSize
    const context = canvas.getContext('2d')

    const img = document.createElement('img')

    img.src = this.favicon.href;

    return new Promise((resolve) => {
      img.onload = () => {

        // Отрисовываем оригинал favicon в качестве фона
        context.drawImage(img, 0, 0, faviconSize, faviconSize)
        // Рисуем кружок нотфиикации
        context.beginPath()
        context.arc(canvas.width - faviconSize / 3, faviconSize / 3, faviconSize / 3, 0, 2 * Math.PI)
        context.fillStyle = this.config.bg
        context.fill()

        if(count){
          context.font = this.config.font
          context.textAlign = "center"
          context.textBaseline = "middle"
          context.fillStyle = this.config.color
          context.fillText(count, canvas.width - faviconSize / 3,  faviconSize / 3)
        }

        // Заменяем favicon
        resolve(canvas.toDataURL('image/png'))
      }
    })
  }

  hasBadge() {
    return this.#isSetBadge
  }

  setBadge(count = null) {
    if(!["string", "number"].includes(typeof count)) throw new Error(`Param count is not a "string" or "number"`)
    this.#createFaviconWithBadge(count)
      .then(favicon => {
        if(this.#isSetBadge){
          this.removeBadge()
        }
        this.favicon.href = favicon
        this.#isSetBadge = true
      })

  }

  removeBadge() {
    this.favicon.href = this.#faviconOriginHref
    this.#isSetBadge = false
  }
}

export default FaviconRange;