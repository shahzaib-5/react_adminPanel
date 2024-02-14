export const userColumns = [
  {
    field: "profileImage",
    headerName: "Image",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.profileImage} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
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

export const productColumn = [
  {
    field: "productImages",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      const images = params.row.productImages; 
      const firstImage = images.length > 0 ? images[0] : null; 

      return (
        <div className="cellWithImg">
          {firstImage && (
            <img className="cellImg" src={firstImage} alt="avatar" />
          )}
        </div>
      );
    },
  },

  {
    field: "userId",
    headerName: "User Id",
    width: 100,
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
    field: "productQuantity",
    headerName: "Quantity",
    width: 100,
  },
  {
    field: "productAddress",
    headerName: "Address",
    width: 100,
  },
  {
    field: "productDescription",
    headerName: "Description",
    width: 100,
  },
  {
    field: "productAvailability",
    headerName: "Availability",
    width: 100,
  },
  {
    field: "productCategory",
    headerName: "Category",
    width: 100,
  },
];

export const guideColumn = [
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
    width: 200,
  },
  {
    field: "content",
    headerName: "Content",
    width: 300,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
  },
];

export const marketColumn = [
  {
    field: "image",
    headerName: "Image",
    width: 70,
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
    width: 150,
  },
  {
    field: "address",
    headerName: "Address",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 80,
  },
  {
    field: "longitude",
    headerName: "Longitude",
    width: 70,
  },
  {
    field: "latitude",
    headerName: "Latitude",
    width: 70,
  },
  {
    field: "operatingHours",
    headerName: "Operating Hours",
    width: 200,
  },
  {
    field: "contactInfo",
    headerName: "Contact",
    width: 120,
  },
];

export const fertilizersColumn = [
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
    headerName: "Rs.Price",
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
    field: "productCompany",
    headerName: "Company",
    width: 100,
  },
  {
    field: "productAvailability",
    headerName: "Availability",
    width: 100,
  },
  {
    field: "productQuantity",
    headerName: "Quantity",
    width: 100,
  },
];

export const priceListingColumn = [

  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
  {
    field: "season",
    headerName: "Season",
    width: 100,
  },
  {
    field: "day",
    headerName: "Day",
    width: 100,
  },
  {
    field: "minPrice",
    headerName: "Rs. Minimum Price",
    width: 150,
  },
  {
    field: "maxPrice",
    headerName: "Rs. Maximum Price",
    width: 150,
  },
  {
    field: "avgPrice",
    headerName: "Rs. Avergae Price",
    width: 150,
  },
];

export const orderColumn = [
  {
    field: "name",
    headerName: "Name",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "grandTotal",
    headerName: "Grand Total",
    width: 100,
  },

  {
    field: "paymentMethodType",
    headerName: "Payment Method Type",
    width: 100,
  },
  {
    field: "id",
    headerName: "Order Id",
    width: 200,
  },
  
];

export const transportColumn = [
  {
    field: "image",
    headerName: "Image",
    width: 70,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "userName",
    headerName: "Username",
    width: 80,
  },
  {
    field: "fullName",
    headerName: "Name",
    width: 80,
  },
  {
    field: "email",
    headerName: "Email",
    width: 100,
  },
  {
    field: "licenseNumber",
    headerName: "License Number",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "raastID",
    headerName: "payment Id",
    width: 100,
  },
  {
    field: "registrationNumber",
    headerName: "Reg #",
    width: 100,
  },
  {
    field: "vehicle",
    headerName: "Vehicle",
    width: 70,
  },
  {
    field: "cnic",
    headerName: "CNIC",
    width: 100,
  },
];

