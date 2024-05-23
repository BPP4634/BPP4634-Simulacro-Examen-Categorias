import RestaurantCategoryController from '../controllers/RestaurantCategoryController.js'
import * as RestaurantMiddleware from '../middlewares/RestaurantMiddleware.js'

const loadFileRoutes = function (app) {
  app.route('/restaurantCategories')
    .get(RestaurantCategoryController.index)
    .post(
      RestaurantMiddleware.checkNewCategory,
      RestaurantCategoryController.create)
}
export default loadFileRoutes
