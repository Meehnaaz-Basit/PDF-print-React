import { useQuery, QueryClient } from "@tanstack/react-query";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import domtoimage from "dom-to-image";

function App() {
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

  // const handlePrint = () => {
  //   console.log("printed pdf");

  //   const tableInfoPrint = new jsPDF({ orientation: "landscape" });

  //   tableInfoPrint.autoTable({
  //     html: "#my-table",
  //   });

  //   tableInfoPrint.save("data.pdf");
  // };

  const handlePrint = () => {
    const element = document.getElementById("my-table");

    domtoimage.toPng(element).then((dataUrl) => {
      const pdf = new jsPDF({ orientation: "landscape" });
      pdf.addImage(dataUrl, "PNG", 10, 10, 280, 0); // Adjust positioning as needed
      pdf.save("data.pdf");
    });
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
      <div className="">
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
                    src={product?.images[0] || "https://placehold.co/60x60"}
                    className="w-20 m-auto object-cover"
                    alt={product.title || "No Image"}
                    onError={(e) =>
                      (e.target.src = "https://placehold.co/60x60")
                    }
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
    </div>
  );
}
export default App;
