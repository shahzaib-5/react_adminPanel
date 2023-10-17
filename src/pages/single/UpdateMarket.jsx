import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import Sidebar from "../../components/sidebar/Sidebar";
import "../new/new.scss";
import Navbar from "../../components/navbar/Navbar";
import NearMeDataTable from "../../components/dataTable/NearMeDataTable";

const UpdateMarket = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [percentage, setPercentage] = useState(null);
  const { nearmeId } = useParams(); // Get the guide ID from the URL
  const [marketData, setMarketData] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    operatingHours: "",
  });

  useEffect(() => {
    const uploadFile = () => {
      // ... (your file upload logic remains the same)
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const guideDoc = await getDoc(doc(db, "marketNearMe", nearmeId));
        if (guideDoc.exists()) {
          // Set the guideData state with the fetched data
          const data = guideDoc.data();
          setMarketData(data); // Populate the form fields with the data from the database
        } else {
          console.log("Guide not found.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMarketData(); // Fetch data when the component is mounted and 'id' changes
  }, [nearmeId]);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "marketNearMe", nearmeId), marketData);
      console.log("Guide updated successfully!");
    } catch (error) {
      console.log("Error updating guide:", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update Markets Near Me</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                <label>Name</label>
                <input
                  type="text"
                  value={marketData.name}
                  onChange={(e) =>
                    setMarketData({ ...marketData, name: e.target.value })
                  }
                  placeholder="Title"
                />
                <label>Address</label>
                <input
                  type="text"
                  value={marketData.address}
                  onChange={(e) =>
                    setMarketData({ ...marketData, address: e.target.value })
                  }
                  placeholder="Content"
                />
                <label>Latitude</label>
                <input
                  type="text"
                  value={marketData.latitude}
                  onChange={(e) =>
                    setMarketData({ ...marketData, latitude: e.target.value })
                  }
                  placeholder="Category"
                />
                <label>Longitude</label>
                <input
                  type="text"
                  value={marketData.longitude}
                  onChange={(e) =>
                    setMarketData({ ...marketData, longitude: e.target.value })
                  }
                  placeholder="Category"
                />
                <label>Operating Hours</label>
                <input
                  type="text"
                  value={marketData.operatingHours}
                  onChange={(e) =>
                    setMarketData({ ...marketData, operatingHours: e.target.value })
                  }
                  placeholder="Category"
                />
                
                <button disabled={percentage !== null && percentage < 100} type="button" onClick={handleUpdate}>
                  Update Guide
                </button>
              </div>
            </form>
          </div>
          
        </div>
        <NearMeDataTable />
      </div>
    </div>

  );
};

export default UpdateMarket;
