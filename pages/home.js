import { HomeImg } from '../components/home-img.js'

class Home {
  constructor(identifier) {
    this.identifier = identifier
    this.setTitle()
  }

  setTitle() {
    this.title = 'Welcome to Home!'
  }

  build() {
    const container = document.createElement('div')
    const template = `
      ${HomeImg}
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

export default Home
