/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'

export {default as AdminPage} from './admin'
export {default as AllProducts} from './allProducts'
export {default as Category} from './categoryPage'
export {default as ProductSummary} from './productSummary'
export {default as SingleProductPage} from './singleProductPage'
export {default as ProductEdit} from './productEdit'
export {default as AddProduct} from './addProduct'

export {default as AllOrders} from './allOrders'
export {default as OrderSummary} from './orderSummary'
export {default as OrderEdit} from './orderEdit'

export {default as AllUsers} from './allUsers'
export {default as UserSummary} from './userSummary'
export {default as UserEdit} from './userEdit'
export {default as UserSettings} from './userSettings'
export {default as UpdateUserSettings} from './updateUserSettings'

export {default as SOSForm} from './sos-form'
export {default as CartPage} from './cartPage'
export {default as CheckoutPage} from './checkoutPage'
export {default as PastOrderPage} from './pastOrders'



