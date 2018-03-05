/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Category} from './categoryPage'
export {default as SingleProductPage} from './singleProductPage'
export {default as ProductSummary} from './productSummary'
export {default as CartPage} from './cartPage'
export {default as CheckoutPage} from './checkoutPage'
export {default as UpdateUserSettings} from './updateUserSettings'
export {default as UserSettings} from './userSettings'
export {default as AllUsers} from './allUsers'
export {default as UserSummary} from './userSummary'
export {default as UserEdit} from './userEdit'
export {default as AdminPage} from './admin'

