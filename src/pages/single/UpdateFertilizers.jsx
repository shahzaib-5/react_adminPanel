import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import Sidebar from "../../components/sidebar/Sidebar";
import "../new/new.scss";
import Navbar from "../../components/navbar/Navbar";
import FertilizersDataTable from "../../components/dataTable/FertilizersDataTable";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdateFertilizers = () => {
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [percentage, setPercentage] = useState(null);
  const { fertilizersId } = useParams();
  const [fertilizersData, setFertilizersData] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    productCompany: "",
    productPrice: 0,
    productQuantity: 0,
    productAvailability: "",
    img: "",
  });

  useEffect(() => {
    const uploadFile = () => {
      if (file) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name); // Use a new name for the image
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setPercentage(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setData({ img: downloadURL }); // Update the data with the new image URL
              toast.success("Image Uploaded Successfully");
            });
          }
        );
      }
    };

    uploadFile();
  }, [file]);

  useEffect(() => {
    const fetchFertilizersData = async () => {
      try {
        const guideDoc = await getDoc(doc(db, "fertilizers", fertilizersId));
        if (guideDoc.exists()) {
          // Set the guideData state with the fetched data
          const data = guideDoc.data();
          setFertilizersData(data); // Populate the form fields with the data from the database
        } else {
          console.log("Guide not found.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFertilizersData(); // Fetch data when the component is mounted and 'id' changes
  }, [fertilizersId]);

  const handleUpdate = async () => {
    try {
      if (data.img) {
        fertilizersData.img = data.img;
      }
      await updateDoc(doc(db, "fertilizers", fertilizersId), fertilizersData);
      toast.success("Fertilizer Updated Successfully");
      navigate(-1)
    } catch (error) {
      toast.error("Fertilizer not Updated");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update Fertilizers</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                data.img ||
                fertilizersData.img ||
                "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image:
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Product Name</label>
                <input
                  type="text"
                  value={fertilizersData.productName}
                  onChange={(e) =>
                    setFertilizersData({
                      ...fertilizersData,
                      productName: e.target.value,
                    })
                  }
                  placeholder="Title"
                />
              </div>
              <div className="formInput">
                <label>Product Category</label>
                <input
                  type="text"
                  value={fertilizersData.productCategory}
                  onChange={(e) =>
                    setFertilizersData({
                      ...fertilizersData,
                      productCategory: e.target.value,
                    })
                  }
                  placeholder="Content"
                />
              </div>
              <div className="formInput">
                <label>Product Description</label>
                <input
                  type="text"
                  value={fertilizersData.productDescription}
                  onChange={(e) =>
                    setFertilizersData({
                      ...fertilizersData,
                      productDescription: e.target.value,
                    })
                  }
                  placeholder="Category"
                />
              </div>

              <div className="formInput">
                <label>Product Company</label>
                <input
                  type="text"
                  value={fertilizersData.productCompany}
                  onChange={(e) =>
                    setFertilizersData({
                      ...fertilizersData,
                      productCompany: e.target.value,
                    })
                  }
                  placeholder="Category"
                />
              </div>
              <div className="formInput">
                <label>Product Price</label>
                <input
                  type="number"
                  value={fertilizersData.productPrice}
                  onChange={(e) =>
                    setFertilizersData({
                      ...fertilizersData,
                      productPrice: e.target.value,
                    })
                  }
                  placeholder="Category"
                  min="0"
                />
              </div>
              <div className="formInput">
                <label>Product Quantity</label>
                <input
                  type="number"
                  value={fertilizersData.productQuantity}
                  onChange={(e) =>
                    setFertilizersData({
                      ...fertilizersData,
                      productQuantity: e.target.value,
                    })
                  }
                  placeholder="Category"
                  min="0"
                />
              </div>
              <div className="formInput">
                <label>Product Availability</label>
                <select
                  value={fertilizersData.productAvailability}
                  onChange={(e) =>
                    setFertilizersData({
                      ...fertilizersData,
                      productAvailability: e.target.value,
                    })
                  }
                >
                  <option value="instock">In Stock</option>
                  <option value="outofstock">Out of Stock</option>
                </select>
              </div>
              <button
                disabled={percentage !== null && percentage < 100}
                type="button"
                onClick={handleUpdate}
              >
                Update Guide
              </button>
            </form>
          </div>
        </div>
        <FertilizersDataTable />
      </div>
    </div>
  );
};

export default UpdateFertilizers;
