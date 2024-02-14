import React, { useState, useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { fertilizersColumn, orderColumn } from "../../datatablesource";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {toast} from "react-hot-toast"

const OrderDataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Orders"));
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
      await deleteDoc(doc(db, "Orders", id));
      setData(data.filter((item) => item.id !== id));
      toast.success("Order Deleted Successfully")
    } catch (error) {
      toast.error("Order not Deleted")
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
            <Link to={`/orders/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
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
  console.log(data)
  const rows = [];
  data &&
    data.forEach((item) => {
      rows.push({
        id: item.id,
        name: item.name,
        email: item.email,
        address: item.address,
        phone:item.phone,
        grandTotal:item.grandTotal,
        status:item.paymentIntent.status,
        
        paymentMethodType:item.paymentIntent.paymentMethod.paymentMethodType,
        cartItems:item.id,

      });
    });


  return (
    <div className="dataTable">
      <div className="datatableTitle">
        All Orders
        {/* <Link to="/fertilizers/newfertilizers" style={{ textDecoration: "none" }} className="link">
          Add New
        </Link> */}
      </div>

      

      <DataGrid
        rows={rows}
        columns={[
          // orderColumn.concat(actionColumn),
          // ... (your existing columns)
          {
            field: "status",
            headerName: "Status",
            width: 100,
            renderCell: (params) => {
              const statusClass =
                params.row.status === "Succeeded"
                  ? "succeeded"
                  : params.row.status === "Completed"
                  ? "completed"
                  : "";

              return (
                <div className={`cellWithStatus ${statusClass}`}>
                  {params.row.status}
                </div>
              );
            },
          },
          ...orderColumn.concat(actionColumn),
        ]}
        // columns={orderColumn.concat(actionColumn)}
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

export default OrderDataTable;
