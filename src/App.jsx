import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

const queryClient = new QueryClient();

function App() {
  // const queryClient = useQueryClient();

  // Fetch function for products
  const getProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    console.log(data);
    return data.products;
  };

  // Queries
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const handlePrint = () => {
    console.log("printed pdf");

    const tableInfoPrint = new jsPDF({ orientation: "landscape" });

    tableInfoPrint.autoTable({
      html: "#my-table",
    });

    tableInfoPrint.save("data.pdf");
  };

  // Loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  return (
    <div>
      <h1 className="font-bold text-2xl text-center">PDF Print</h1>
      <div className="flex justify-end pb-5">
        <button onClick={handlePrint} className="btn btn-secondary">
          Print PDF
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table text-center" id="my-table">
          <thead className="bg-blue-300 text-black ">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Stock</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={product.images}
                    className="w-20 m-auto object-cover"
                    alt=""
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.rating}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: "New Product",
            price: 20.0,
            category: "General",
          });
        }}
      >
        Add Product
      </button> */}
    </div>
  );
}
export default App;
