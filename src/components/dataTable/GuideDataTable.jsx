import React, { useState, useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { guideColumn } from "../../datatablesource";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const GuideDataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "guide"));
        const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "guide", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/guide/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  

  return (
    <div className="dataTable">
      <div className="datatableTitle">
        Add New Cultivation Guide
        <Link to="/guide/newguide" style={{ textDecoration: "none" }} className="link">
          Add New
        </Link>
      </div>

      <DataGrid
        rows={data}
        columns={guideColumn.concat(actionColumn)}
        initialState={{
               pagination: {
                       paginationModel: { page: 0, pageSize: 5 },
                     },
                   }}
                   pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default GuideDataTable;






















// import React, { useState, useEffect } from "react";
// import "./datatable.scss";
// import { DataGrid } from "@mui/x-data-grid";
// import { guideColumn } from "../../datatablesource";
// import { Link } from "react-router-dom";
// import { db } from "../../firebase";
// import {
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";
// const GuideDataTable = () => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       let list = [];
//       try {
//         const querySnapshot = await getDocs(collection(db, "guide"));
//         querySnapshot.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setData(list);
//         console.log(list);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);
//   const handleDelete = async (id) => {
//     try {
//       await deleteDoc(doc(db, "guide", id));
//       setData(data.filter((item) => item.id !== id));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="cellAction">
//             <Link to="/guide/test" style={{ textDecoration: "none" }}>
//               <div className="viewButton">Update</div>
//             </Link>
//             <div
//               className="deleteButton"
//               onClick={() => handleDelete(params.row.id)}
//             >
//               Delete
//             </div>
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="dataTable">
//       <div className="datatableTitle">
//         Add New Cultivation Guide
//         <Link
//           to="/guide/newguide"
//           style={{ textDecoration: "none" }}
//           className="link"
//         >
//           Add New
//         </Link>
//       </div>

//       <DataGrid
//         rows={data}
//         columns={guideColumn.concat(actionColumn)}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         // checkboxSelection
//       />
//     </div>
//   );
// };

// export default GuideDataTable;
