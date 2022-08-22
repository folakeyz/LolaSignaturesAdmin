import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  forgotPasswordReducer,
  resetPasswordReducer,
  userLoginReducer,
} from "./reducers/userReducers";
import { getInventoryReducer } from "./reducers/inventoryReducers";
import {
  deleteProductReducer,
  updateProductReducer,
  uploadProductReducer,
} from "./reducers/productReducers";
import {
  createCategoryReducer,
  deleteCategoryReducer,
  getCategoryReducer,
  updateCategoryReducer,
} from "./reducers/categoryReducers";
import {
  createAdminReducer,
  deleteAdminReducer,
  getAdminReducer,
  updateAdminReducer,
} from "./reducers/adminReducers";
import {
  createDeliveryReducer,
  deleteDeliveryReducer,
  getDeliveryReducer,
  updateDeliveryReducer,
} from "./reducers/deliveryReducers";
import {
  createTestimonyReducer,
  deleteTestimonyReducer,
  getTestimonyReducer,
  updateTestimonyReducer,
} from "./reducers/testimonyReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userForget: forgotPasswordReducer,
  userReset: resetPasswordReducer,
  lolaInventory: getInventoryReducer,
  removeProducts: deleteProductReducer,
  updateProduct: updateProductReducer,
  getCat: getCategoryReducer,
  deleteCat: deleteCategoryReducer,
  updateCat: updateCategoryReducer,
  createCat: createCategoryReducer,
  getAdmin: getAdminReducer,
  deleteAdmin: deleteAdminReducer,
  updateAdmin: updateAdminReducer,
  createAdmin: createAdminReducer,
  uploadP: uploadProductReducer,
  getDel: getDeliveryReducer,
  deleteDel: deleteDeliveryReducer,
  updateDel: updateDeliveryReducer,
  createDel: createDeliveryReducer,
  getTest: getTestimonyReducer,
  deleteTest: deleteTestimonyReducer,
  updateTest: updateTestimonyReducer,
  createTest: createTestimonyReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
