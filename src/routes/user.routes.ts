import {Router} from 'express'
import {getUsers ,newUser , getUser ,deleteUser, updateUser}  from "../controllers/userController";
import {createCategory,getCategories , getCategory ,updateCategory , deleteCategory}  from "../controllers/categoryController";
import {createCompany,getCompanies , getCompany ,updateCompany , deleteCompany}  from "../controllers/companyController";
import {createLocation,getLocations , getLocation , updateLocation, deleteLocation}  from "../controllers/locationController";
import {createProduct,getProducts , getProduct , updateProduct, deleteProduct}  from "../controllers/productController";
import {index} from "../controllers/homeController";
import {searchCity} from "../controllers/genericController";

const router = Router();

//Routes with the view.
router.get('/',index);

//Users
router.get('/users',getUsers);
router.post('/createUser',newUser);
router.get('/user/:id',getUser);
router.delete('/deleteUser/:id',deleteUser);
router.put('/updateUser/:id', updateUser);

//Categories
router.post('/createCategory',createCategory);
router.get('/categories', getCategories);
router.get('/getCategory/:id', getCategory);
router.put('/updateCategory/:id', updateCategory);
router.delete('/deleteCategory/:id', deleteCategory);

//Companies
router.post('/createCompany',createCompany);
router.get('/companies', getCompanies);
router.get('/getCompany/:id', getCompany);
router.put('/updateCompany/:id', updateCompany);
router.delete('/deleteCompany/:id', deleteCompany);

//Locations
router.post('/createLocation',createLocation);
router.get('/locations', getLocations);
router.get('/getLocation/:id', getLocation);
router.put('/updateLocation/:id', updateLocation);
router.delete('/deleteLocation/:id', deleteLocation);

//Products
router.post('/createProduct',createProduct);
router.get('/products', getProducts);
router.get('/getProduct/:id', getProduct);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

//Miscellaneous Routes
router.post('/searchCity',searchCity);

export default router;