# React Table PDF

## Packages Used:

1. [jspdf](https://www.npmjs.com/package/jspdf)
2. [jspdf-autotable](https://www.npmjs.com/package/jspdf-autotable)

## Steps

1. **Import both packages**

   ```javascript
   import { jsPDF } from "jspdf";
   import "jspdf-autotable";
   ```

2. **Add an ID to the table**

   - Example: `<table id="my-table">`

3. **Add a "Print" or any other button outside the table**

   - In the button’s `onClick` handler function, add the following code:

   ```javascript
   const handlePrint = () => {
     const tableInfoPrint = new jsPDF({ orientation: "landscape" });

     tableInfoPrint.autoTable({
       html: "#my-table",
     });

     tableInfoPrint.save("data.pdf");
   };
   ```

4. **Explanation**

   - `orientation: "landscape"`: Sets the PDF orientation to landscape, which is helpful for wide tables.
   - `html: "#my-table"`: Specifies the ID of the HTML table you want to print.
   - `tableInfoPrint.save("data.pdf")`: Saves the generated PDF with a given name, in this case, `data.pdf`. You can replace `"data.pdf"` with any other file name as needed.
