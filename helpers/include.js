/**
 * 
 *                  Deprecated!!!
 * 
 * This include-html functionality may cause some
 * Race Condition problem that makes other DOM
 * Operations failed!
 * 
 * Please consider use other approach to achieve
 * the same purpose.
 * 
 * You can check `/components/navbar.js` & `/builders/build-navbar.js`,
 * to understand how I re-implement the functionality.
 * 
 * **/

const include = async function () {
  try {
    const div = document.querySelector('[include-html]')
    const html = div.getAttribute('include-html')
    div.removeAttribute('include-html')

    const response = await fetch(html)
    const result = await response.text()
    div.innerHTML = result

    // re-call itself until inclued-html not found
    include()
  } catch (err) {
    // there's no include-html found, exit the function
    return
  }
}

include()
