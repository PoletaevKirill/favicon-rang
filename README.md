# Favicon range

Добавьте "значек" к favicon. Вы можете настроить: размер, цвет значка, задать цвет и размер шрифта.

## Установка

```
# install dependencies
$npm i https://github.com/PoletaevKirill/favicon-rang.git
```

### Использование

#### А-ля нативный вариант

```vue

<template>
  <div id="app">
    <!-- ... -->
  </div>
</template>

<script>
import FaviconRange from "favicon-range";

export default {
  //...
  mounted() {
    const faviconBadge = new FaviconRange({
      faviconSize: 16,
      bg: '#ed2e52',
      font: '8px "helvetica", sans-serif',
      color: '#fff'
    })
    faviconBadge.setBadge('∞')
  }
}
</script>
```

#### Добавление ввиде плагина Vue

Создайте файл плагина, например `/plugins/faviconBadge.js`

```js
import FaviconRange from "favicon-range";

const FaviconRangePlugin = {
  install(Vue) {
    if (this.installed) {
      return
    }

    this.installed = true

    const faviconBadge = new FaviconRange({
      faviconSize: 16,
      bg: '#ed2e52',
      font: '8px "helvetica", sans-serif',
      color: '#fff'
    })

    Vue.prototype['$faviconBadge'] = faviconBadge
  }
}

export default FaviconRangePlugin
```

В `main.js` зарегестрируйте плагин

```js

import Vue from 'vue'
import FaviconRangePlugin from '~/plugins/faviconBadge.js'

Vue.use(FaviconRangePlugin)

```

Использование в компонентах

```vue
//...
this.$faviconBadge.setBadge(1)
//...
```

### Настройки

Свойство | Тип | Описание |
------------ | ------------- | ------------- 
faviconSize | Number | Размер значка в favicon **default: 16**
bg          | String | Цфет фона значка **default: #ed2e52**
font        | String | Рамзер текста значка и семество шрифтов **default: '8px "helvetica", sans-serif**
color       | String | Цвет текста значка **default: #fff**

### Доступные методы

**setBadge** - установка значка
```js
/**
 * @param {String|Number} count - Число или символ, 
 * который надо отобразить в кружочке
 */
setBadge(count = null) {
  //...
}
```

**removeBadge** - Удаление значка (красный кружочек). 
Вернет favicon в первоначльный вид

**hasBadge** - Проверка на наличие значка. Вернет `true` или `false`
