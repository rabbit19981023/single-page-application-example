import { StoreImg } from '../components/store-img.js'

class Store {
  constructor(identifier) {
    this.identifier = identifier
    this.setTitle()
  }

  setTitle() {
    this.title = 'Welcome to Store!'
  }

  build() {
    const container = document.createElement('div')
    const template = `
      ${StoreImg}
    `

    container.innerHTML = template
    this.content = container
  }

  // only be called once while cachedView not yet exist.
  getView() {
    this.build()
    return this.content
  }
}

export default Store
