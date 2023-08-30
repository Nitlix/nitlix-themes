const { useContext } = require("react")
const { ThemeContext } = require("./BodyThemeProvider")

const {
    setTheme
} = useContext(ThemeContext)


/**
 * Changes the theme of the page, can ONLY be run on the client side.
 * @param {string} theme The theme to change to. (Must be a valid theme)
 */
function changeTheme(theme){
    
}