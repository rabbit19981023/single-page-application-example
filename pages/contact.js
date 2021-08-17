import { ContactImg } from '../components/contact-img.js'

class Contact {
  constructor(identifier) {
    this.identifier = identifier
    this.setTitle()
  }

  setTitle() {
    this.title = 'Welcome to Contact!'
  }

  build() {
    const container = document.createElement('div')
    const template = `
      ${ContactImg}
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

export default Contact
