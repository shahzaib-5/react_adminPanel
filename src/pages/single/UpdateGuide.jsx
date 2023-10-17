import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import Sidebar from "../../components/sidebar/Sidebar";
import "../new/new.scss";
import Navbar from "../../components/navbar/Navbar";
import GuideDataTable from "../../components/dataTable/GuideDataTable";

const UpdateGuide = (updateGuide, title) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [percentage, setPercentage] = useState(null);
  const { guideId } = useParams(); // Get the guide ID from the URL
  const [guideData, setGuideData] = useState({
    title: "",
    content: "",
    category: "",
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
    const fetchGuideData = async () => {
      try {
        const guideDoc = await getDoc(doc(db, "guide", guideId));
        if (guideDoc.exists()) {
          // Set the guideData state with the fetched data
          const data = guideDoc.data();
          setGuideData(data); // Populate the form fields with the data from the database
        } else {
          console.log("Guide not found.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGuideData(); // Fetch data when the component is mounted and 'id' changes
  }, [guideId]);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "guide", guideId), guideData);
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
          <h1>Update Guide</h1>
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
                <label>Title</label>
                <input
                  type="text"
                  value={guideData.title}
                  onChange={(e) =>
                    setGuideData({ ...guideData, title: e.target.value })
                  }
                  placeholder="Title"
                />
                <label>Content</label>
                <input
                  type="text"
                  value={guideData.content}
                  onChange={(e) =>
                    setGuideData({ ...guideData, content: e.target.value })
                  }
                  placeholder="Content"
                />
                <label>Category</label>
                <input
                  type="text"
                  value={guideData.category}
                  onChange={(e) =>
                    setGuideData({ ...guideData, category: e.target.value })
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
        <GuideDataTable />
      </div>
    </div>

    // <div className="updateForm">
    //   <h2>Update Guide</h2>
    //   <div className="left">
    //     <img
    //       src={
    //         file
    //           ? URL.createObjectURL(file)
    //           : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
    //       }
    //       alt=""
    //     />
    //   </div>
    //   <form>
    //     <div className="formInput">
    //       <label htmlFor="file">Image:</label>
    //       <input
    //         type="file"
    //         id="file"
    //         onChange={(e) => setFile(e.target.files[0])}
    //         style={{ display: "none" }}
    //       />
    //     </div>
    //     <input
    //       type="text"
    //       value={guideData.title}
    //       onChange={(e) =>
    //         setGuideData({ ...guideData, title: e.target.value })
    //       }
    //       placeholder="Title"
    //     />
    //     <input
    //       type="text"
    //       value={guideData.content}
    //       onChange={(e) =>
    //         setGuideData({ ...guideData, content: e.target.value })
    //       }
    //       placeholder="Content"
    //     />
    //     <input
    //       type="text"
    //       value={guideData.category}
    //       onChange={(e) =>
    //         setGuideData({ ...guideData, category: e.target.value })
    //       }
    //       placeholder="Category"
    //     />
    //     <button type="button" onClick={handleUpdate}>
    //       Update Guide
    //     </button>
    //   </form>
    // </div>
  );
};

export default UpdateGuide;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { db, storage } from "../../firebase";

// const UpdateGuide = (updateGuide , title) => {
//   const [file, setFile] = useState("");
//   const [data, setData] = useState({});
//   const [percentage, setPercentage] = useState(null);
//   const { guideId } = useParams(); // Get the guide ID from the URL
//   const [guideData, setGuideData] = useState({
//     title: "",
//     content: "",
//     category: "",
//   });

//   useEffect(() => {
//     const uploadFile = () => {
//       // ... (your file upload logic remains the same)
//       const name = new Date().getTime() + file.name;
//       const storageRef = ref(storage, file.name);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
//           setPercentage(progress);
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//           }
//         },
//         (error) => {
//           console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setData((prev) => ({ ...prev, img: downloadURL }));
//           });
//         }
//       );
//     };
//     file && uploadFile();
//   }, [file]);

//   useEffect(() => {
//     const fetchGuideData = async () => {
//       try {
//         const guideDoc = await getDoc(doc(db, "guide", guideId));
//         if (guideDoc.exists()) {
//           // Set the guideData state with the fetched data
//           const data = guideDoc.data();
//           setGuideData(data); // Populate the form fields with the data from the database

//         } else {
//           console.log("Guide not found.");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchGuideData(); // Fetch data when the component is mounted and 'id' changes
//   }, [guideId]);

//   const handleUpdate = async () => {
//     try {
//       await updateDoc(doc(db, "guide", guideId), guideData);
//       console.log("Guide updated successfully!");
//     } catch (error) {
//       console.log("Error updating guide:", error);
//     }
//   };

//   return (
//     <div className="updateForm">
//       <h2>Update Guide</h2>
//       <div className="left">
//         <img
//           src={
//             file
//               ? URL.createObjectURL(file)
//               : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//           }
//           alt=""
//         />
//       </div>
//       <form>
//         <div className="formInput">
//           <label htmlFor="file">Image:</label>
//           <input
//             type="file"
//             id="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             style={{ display: "none" }}
//           />
//         </div>
//         <input
//           type="text"
//           value={guideData.title}
//           onChange={(e) =>
//             setGuideData({ ...guideData, title: e.target.value })
//           }
//           placeholder="Title"
//         />
//         <input
//           type="text"
//           value={guideData.content}
//           onChange={(e) =>
//             setGuideData({ ...guideData, content: e.target.value })
//           }
//           placeholder="Content"
//         />
//         <input
//           type="text"
//           value={guideData.category}
//           onChange={(e) =>
//             setGuideData({ ...guideData, category: e.target.value })
//           }
//           placeholder="Category"
//         />
//         <button type="button" onClick={handleUpdate}>
//           Update Guide
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateGuide;
