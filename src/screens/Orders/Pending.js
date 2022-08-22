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
import { deleteProduct } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { Center, CircularProgress, useToast } from "@chakra-ui/react";
import axios from "axios";
import { DELETE_PRODUCT_RESET } from "../../redux/constants/productConstants";

const Orders = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const lolaInventory = useSelector((state) => state.lolaInventory);
  const { products = [], category: categories = [] } = lolaInventory;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const removeProducts = useSelector((state) => state.removeProducts);
  const { error, success } = removeProducts;

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

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [photo, setPhoto] = useState([]);

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
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/product/", formData, config);
      if (data) {
        toast({
          title: "Success",
          description: "Product Uploaded Successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: error.response.message.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const uploadFileHandler = (e) => {
    e.preventDefault();
    let files = e.target.files[0];
    setImages([...images, e.target.files[0]]);
    setPhoto([...photo, URL.createObjectURL(files)]);
  };

  const removeProduct = (item, i) => {
    const index = photo.indexOf(i);
    const index2 = images.indexOf(item);
    console.log(images);
    if (index > -1) {
      photo.splice(index, 1);
      images.splice(index2, 1);
      console.log(images);
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this Product")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="app">
      <Navigation />
      <div className="contentsRight">
        <Header title="Product" />
        <div className="minimizeBtn">
          <Button
            type="button"
            onClick={() => setOpen(!open)}
            title="Add Product"
          />
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
                // setOpen(true)
                // setEdit(true)
                // setBankCode(rowData.bankCode)
                // setBankName(rowData.bankName)
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
          title="Add Product"
          size="xl"
          content={
            <div className="nmfb__InputFlex">
              {loading ? (
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
                    type="text"
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
                  <div className="uploadPhotoFlex">
                    {images &&
                      images.map((item, i) => (
                        <div key={i} className="uploadPhoto">
                          <img src={photo[i]} alt="product" />
                          <Button
                            type="button"
                            onClick={() => removeProduct(item, photo[i])}
                            title="Remove"
                          />
                        </div>
                      ))}
                  </div>

                  <Button
                    title="Add Product"
                    onClick={submitHandler}
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

export default Orders;
