import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { marketColumn } from "../../datatablesource";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {toast} from "react-hot-toast"

const NearMeDataTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "marketNearMe"));
        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); 


  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let list = [];
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "marketNearMe"));
  //       querySnapshot.forEach((doc) => {
  //         list.push({ id: doc.id, ...doc.data() });
  //       });
  //       setData(list);
  //       console.log(list);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  console.log(data);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "marketNearMe", id));
      setData(data.filter((item) => item.id !== id));
      toast.success("Market Deleted Successfully")
    } catch (error) {
      toast.error("Market not Deleted Successfully")
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
            <Link
              to={`/marketnearme/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <Link
              to={`/marketnearme/update/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
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
        Add New Market
        <Link
          to="/marketnearme/newmarket"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Add New
        </Link>
      </div>

      <DataGrid
        rows={data.map((row) => ({
          ...row,
          availableProducts: getAvailableProductsString(row.availableProducts),
          daysOfOperation: getDaysOfOperationString(row.daysOfOperation),
        }))}
        columns={marketColumn.concat(actionColumn)}
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

function getAvailableProductsString(availableProducts) {
  const products = [];
  if (availableProducts.fruits) {
    products.push("Fruits");
  }
  if (availableProducts.vegetables) {
    products.push("Vegetables");
  }
  return products.join(", ");
}

function getDaysOfOperationString(daysOfOperation) {
  const days = [];
  for (const day in daysOfOperation) {
    if (daysOfOperation[day]) {
      days.push(day.charAt(0).toUpperCase() + day.slice(1));
    }
  }
  return days.join(", ");
}

export default NearMeDataTable;