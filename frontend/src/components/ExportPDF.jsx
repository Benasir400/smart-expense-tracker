import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

function ExportPDF({ expenses }) {

    const downloadPDF = () => {

        const doc = new jsPDF();

        doc.text(
            "Expense Report",
            14,
            15
        );

        autoTable(doc, {

            startY: 25,

            head: [[
                "Title",
                "Amount",
                "Category",
                "Date"
            ]],

            body: expenses.map((expense) => [

                expense.title,

                expense.amount,

                expense.category,

                expense.date
            ])
        });

        doc.save("expense-report.pdf");
    };

    return (

        <button
            onClick={downloadPDF}
            className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
        >
            Export PDF
        </button>
    );
}

export default ExportPDF;