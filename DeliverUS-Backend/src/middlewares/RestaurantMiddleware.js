import { Restaurant, Order, RestaurantCategory } from '../models/models.js'

const checkNewCategory = async (req, res, next) => {
  try {
    const numberOfCategoriesWithName = await RestaurantCategory.count({
      where: { name: req.body.name }
    })
    if (numberOfCategoriesWithName === 0) {
      return next()
    }
    return res.status(409).send('That category already exists.')
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const checkRestaurantOwnership = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId)
    if (req.user.id === restaurant.userId) {
      return next()
    }
    return res.status(403).send('Not enough privileges. This entity does not belong to you')
  } catch (err) {
    return res.status(500).send(err)
  }
}
const restaurantHasNoOrders = async (req, res, next) => {
  try {
    const numberOfRestaurantOrders = await Order.count({
      where: { restaurantId: req.params.restaurantId }
    })
    if (numberOfRestaurantOrders === 0) {
      return next()
    }
    return res.status(409).send('Some orders belong to this restaurant.')
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export { checkRestaurantOwnership, restaurantHasNoOrders, checkNewCategory }
