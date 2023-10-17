export const userColumns = [
  { field: "id", headerName: "ID", width: 200 },
  // {
  //   field: "user",
  //   headerName: "User",
  //   width: 230,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img className="cellImg" src={params.row.img} alt="avatar" />
  //         {params.row.username}
  //       </div>
  //     );
  //   },
  // },
  {
    field: "cnic",
    headerName: "CNIC",
    width: 120,
  },
  {
    field: "email",
    headerName: "Email",
    width: 120,
  },

  {
    field: "fullName",
    headerName: "Full Name",
    width: 120,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
  {
    field: "role",
    headerName: "Role",
    width: 120,
  },
  {
    field: "userName",
    headerName: "Username",
    width: 120,
  },
];

export const guideColumn =[
  { field: "id", headerName: "ID", width: 150 },
   {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          
        </div>
      );
    },
  },

  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "content",
    headerName: "Content",
    width: 250,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
  },
];

export const marketColumn =[
  // { field: "id", headerName: "ID", width: 150 },
   {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          
        </div>
      );
    },
  },

  {
    field: "name",
    headerName: "Name",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "longitude",
    headerName: "Longitude",
    width: 100,
  },
  {
    field: "latitude",
    headerName: "Latitude",
    width: 100,
  },
  {
    field: "operatingHours",
    headerName: "Operating Hours",
    width: 150,
  },
  {
    field: "availableProducts",
    headerName: "Available Products",
    width: 150,
  },
  {
    field: "daysOfOperation",
    headerName: "days of Operation",
    width: 150,
  },
]


export const fertilizersColumn =[
  // { field: "id", headerName: "ID", width: 150 },
   {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          
        </div>
      );
    },
  },

  {
    field: "productName",
    headerName: "Name",
    width: 100,
  },
  {
    field: "productPrice",
    headerName: "Price",
    width: 100,
  },
  {
    field: "productCategory",
    headerName: "Category",
    width: 100,
  },
  {
    field: "productDescription",
    headerName: "Description",
    width: 200,
  },
  {
    field: "productAvailability",
    headerName: "Availability",
    width: 150,
  },
  {
    field: "productQuantity",
    headerName: "Quantity",
    width: 150,
  },
]



