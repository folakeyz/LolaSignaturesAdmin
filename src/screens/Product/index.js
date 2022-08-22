import React, { useEffect, useState } from "react";
import {
  Navigation,
  Header,
  Button,
  Input,
  Select,
  Textarea,
  Modal,
} from "../../components";
import { getInventory } from "../../redux/actions/inventoryActions";
import {
  deleteProduct,
  updateProducts,
  uploadNewProduct,
} from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import {
  Alert,
  AlertIcon,
  Center,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";

import {
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
  UPLOAD_PRODUCT_RESET,
} from "../../redux/constants/productConstants";

const Product = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const lolaInventory = useSelector((state) => state.lolaInventory);
  const { products = [], category: categories = [] } = lolaInventory;

  const uploadP = useSelector((state) => state.uploadP);
  const { loading, error: eUpload, success: sUpload } = uploadP;

  const removeProducts = useSelector((state) => state.removeProducts);
  const { error, success } = removeProducts;

  const updateProduct = useSelector((state) => state.updateProduct);
  const { error: uError, success: uSuccess, loading: uLoading } = updateProduct;

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    dispatch({ type: DELETE_PRODUCT_RESET });
  }
  if (success) {
    toast({
      title: "Notification",
      description: "Product deleted Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    dispatch(getInventory());
    dispatch({ type: DELETE_PRODUCT_RESET });
  }

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);
  const columns = [
    { title: "Name", field: "name" },
    { title: "brand", field: "brand" },
    { title: "Price", field: "price" },
    { title: "Category", field: "category.name" },
  ];

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [oldPhoto, setOldPhoto] = useState([]);
  const [id, setID] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.map((item) => formData.append("image", item));
    formData.append("name", name);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("countInStock", stock);
    dispatch(uploadNewProduct(formData));
  };

  const editHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.map((item) => formData.append("image", item));
    formData.append("name", name);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("countInStock", stock);
    formData.append("oldPhoto", JSON.stringify(oldPhoto));
    // oldPhoto.map((item) => formData.append("oldPhoto", item));
    dispatch(updateProducts(formData, id));
  };

  const uploadFileHandler = (e) => {
    e.preventDefault();
    setImages([...images, e.target.files[0]]);
    setPhoto([...photo, URL.createObjectURL(e.target.files[0])]);
  };

  const removeProduct = (item, i) => {
    const index = photo.indexOf(i);
    const index2 = images.indexOf(item);
    console.log(images);
    if (index > -1) {
      photo.splice(index, 1);
      images.splice(index2, 1);
    }
  };

  const removeOldPix = (item) => {
    const index = oldPhoto.indexOf(item);
    if (index > -1) {
      oldPhoto.splice(index, 1);
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this Product")) {
      dispatch(deleteProduct(id));
    }
  };

  if (eUpload) {
    setOpen(false);
    toast({
      title: "Error",
      description: eUpload,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    dispatch({ type: UPLOAD_PRODUCT_RESET });
  }

  if (sUpload) {
    toast({
      title: "Notification",
      description: "Product Upload Successful",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    dispatch(getInventory());
    dispatch({ type: UPLOAD_PRODUCT_RESET });
    setOpen(false);
    setImages([]);
    setPhoto([]);
  }

  if (uError) {
    setOpen(false);
    toast({
      title: "Error",
      description: uError,
      status: "error",
      duration: 9000,
      isClosable: true,
    });

    dispatch({ type: UPDATE_PRODUCT_RESET });
  }

  if (uSuccess) {
    toast({
      title: "Success",
      description: "Product Update Successful",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    dispatch(getInventory());
    dispatch({ type: UPDATE_PRODUCT_RESET });
    setOpen(false);
    setImages([]);
    setPhoto([]);
  }

  const openHandler = () => {
    setOpen(!open);
    setEdit(false);
    setName("");
    setPrice("");
    setBrand("");
    setCategory("");
    setDescription("");
    setStock("");
    setImages([]);
    setPhoto([]);
  };

  return (
    <div className="app">
      <Navigation />
      <div className="contentsRight">
        <Header title="Product" />
        <div className="minimizeBtn">
          <Button type="button" onClick={openHandler} title="Add Product" />
        </div>
        <MaterialTable
          title=""
          columns={columns}
          data={products}
          options={{
            exportButton: true,
            actionsCellStyle: {
              backgroundColor: "#fff",
              color: "#FF00dd",
            },
            actionsColumnIndex: -1,

            headerStyle: {
              backgroundColor: "#fff",
              color: "black",
            },
          }}
          style={{ boxShadow: "none", width: "100%" }}
          actions={[
            {
              icon: "launch",
              iconProps: { style: { fontSize: "20px", color: "gold" } },
              tooltip: "Edit",
              onClick: (event, rowData) => {
                setOpen(true);
                setEdit(true);
                setName(rowData.name);
                setPrice(rowData.price);
                setBrand(rowData.brand);
                setCategory(rowData.category._id);
                setDescription(rowData.description);
                setStock(rowData.countInStock);
                setOldPhoto(rowData.image);
                setID(rowData._id);
              },
              title: "Edit",
              color: "black",
            },
            {
              icon: "launch",
              iconProps: { style: { fontSize: "20px", color: "gold" } },
              tooltip: "Delete",
              onClick: (event, rowData) => {
                deleteHandler(rowData._id);
              },
              title: "Delete",
              color: "pink",
            },
          ]}
          components={{
            Action: (props) => (
              <button
                onClick={(event) => props.action.onClick(event, props.data)}
                className={`btn ${props.action.color}`}
              >
                {props.action.title}
              </button>
            ),
          }}
        />
        <Modal
          isVisible={open}
          title={edit ? "Update Product" : "Add Product"}
          size="xl"
          content={
            <div className="nmfb__InputFlex">
              {eUpload && (
                <Alert status="warning">
                  <AlertIcon />
                  {eUpload}
                </Alert>
              )}
              {uLoading || loading ? (
                <Center>
                  <CircularProgress isIndeterminate color="#087E8C" />
                </Center>
              ) : (
                <>
                  <Input
                    title="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  />
                  <Input
                    title="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                  />
                  <Input
                    title="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    type="text"
                  />
                  <Select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    title="Category"
                    options={categories}
                    filter="name"
                    filterValue="_id"
                  />

                  <Input
                    title="Available in Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    type="text"
                  />
                  <Textarea
                    title="Product Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  <Input
                    title="Upload Picture"
                    onChange={uploadFileHandler}
                    type="file"
                  />
                  {edit ? (
                    <div className="uploadPhotoFlex">
                      {oldPhoto.map((item, i) => (
                        <div key={i} className="uploadPhoto">
                          <img src={item} alt="product" />
                          <div className="minimizeBtn">
                            <button
                              type="button"
                              onClick={() => removeOldPix(item)}
                              className="btn pink"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      {images.map((item, i) => (
                        <div key={i} className="uploadPhoto">
                          <img src={photo[i]} alt="product" />
                          <div className="minimizeBtn">
                            <button
                              type="button"
                              onClick={() => removeProduct(item, photo[i])}
                              className="btn pink"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="uploadPhotoFlex">
                      {images.map((item, i) => (
                        <div key={i} className="uploadPhoto">
                          <img src={photo[i]} alt="product" />
                          <div className="minimizeBtn">
                            <button
                              type="button"
                              onClick={() => removeProduct(item, photo[i])}
                              className="btn pink"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button
                    title={edit ? "Update Product" : "Add Product"}
                    onClick={edit ? editHandler : submitHandler}
                    type="button"
                  />
                </>
              )}
            </div>
          }
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default Product;
