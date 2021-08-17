import Home from './pages/home.js'
import Store from './pages/store.js'
import Contact from './pages/contact.js'

// Routes Context
const Routes = [
  { path: '/', view: new Home('home') },
  { path: '/store', view: new Store('store') },
  { path: '/contact', view: new Contact('contact') }
]

// Cached View Content
const cachedViews = { }

const buildRouter = function () {
  const router = function (event) {
    const preventReloadPage = function () {
      event.preventDefault()
    }

    const updateHistory = function () {
      const url = event.target.href
      window.history.pushState(null, 'view changed', url)
    }

    const render = function () {
      const currentRoute = Routes.find(route => route.path === window.location.pathname)

      const getTitle = function () {
        return currentRoute.view.title
      }

      const setTitle = function (title) {
        document.title = title
      }

      const getView = function () {
        const identifier = currentRoute.view.identifier
        let cachedView = cachedViews[identifier]

        if (!cachedView) {
          cachedView = currentRoute.view.getView()
          cachedViews[identifier] = cachedView
        }

        return cachedView
      }

      const renderView = function (view) {
        const viewContainer = document.querySelector('.view')

        viewContainer.empty = function () {
          while (viewContainer.firstChild) {
            viewContainer.removeChild(viewContainer.firstChild)
          }
        }

        viewContainer.empty()
        viewContainer.appendChild(view)
      }

      const title = getTitle()
      setTitle(title)

      const view = getView()
      renderView(view)
    }

    preventReloadPage()
    updateHistory()
    render()
  }

  return router
}

const registerRouting = function (router) {
  const links = document.querySelectorAll('a')
  links.forEach(link => {
    link.addEventListener('click', router)
  })
}

const router = buildRouter()
registerRouting(router)
