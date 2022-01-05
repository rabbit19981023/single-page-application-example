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

const main = function () {
  const router = buildRouter(Routes)
  registerRouting(router)
}()

function buildRouter (routes) {
  function router(event) {
    preventReloadPage()
    updateHistory()
    render()

    function preventReloadPage() {
      event.preventDefault()
    }

    function updateHistory() {
      const url = event.target.href
      window.history.pushState(null, 'view changed', url)
    }

    function render() {
      const currentRoute = routes.find(route => route.path === window.location.pathname)
      const title = getTitle()
      const view = getView()

      setTitle(title)
      renderView(view)

      function getTitle() {
        return currentRoute.view.title
      }

      function setTitle(title) {
        document.title = title
      }

      function getView() {
        const identifier = currentRoute.view.identifier
        let cachedView = cachedViews[identifier]

        if (!cachedView) {
          cachedViews[identifier] = currentRoute.view.getView()
          cachedView = cachedViews[identifier]
        }

        return cachedView
      }

      function renderView(view) {
        const viewContainer = document.querySelector('.view')

        viewContainer.empty = function () {
          while (viewContainer.firstChild) {
            viewContainer.removeChild(viewContainer.firstChild)
          }
        }

        viewContainer.empty()
        viewContainer.appendChild(view)
      }
    }
  }

  return router
}

function registerRouting(router) {
  const links = document.querySelectorAll('a')
  links.forEach(link => {
    link.addEventListener('click', router)
  })
}
