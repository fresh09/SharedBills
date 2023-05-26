import React from "react";
import "./styles.css";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Bill {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  cost: number;
  edit: boolean;
  removed: boolean;
}

const currency: string = "$";
const defaultBills: Array<Bill> = [
  {
    id: 1,
    name: "First bill",
    startDate: "2023-05-01",
    endDate: "2023-08-01",
    cost: 500,
    edit: false,
    removed: false,
  },
];

const billReducer = (bills: any, action: any) => {
  console.log(action.id);
  if (action.type === "Add") {
    let defaultDate = new Date().toISOString().substring(0, 10);
    return [
      ...bills,
      {
        id: action.id,
        name: "New bill",
        startDate: defaultDate,
        endDate: defaultDate,
        cost: 0,
        edit: true,
        removed: false,
      },
    ];
  }
  return bills.map((bill: Bill) => {
    if (bill.id === action.id) {
      switch (action.type) {
        case "edit":
          return { ...bill, edit: true };
        case "delete":
          return { ...bill, removed: true };
        case "save":
          const updatedName = (
            document.getElementById(bill.id + "billname") as HTMLInputElement
          ).value;
          const updatedStartDate = (
            document.getElementById(bill.id + "startdate") as HTMLInputElement
          ).value;
          const updatedEndDate = (
            document.getElementById(bill.id + "enddate") as HTMLInputElement
          ).value;
          const updatedCost = (
            document.getElementById(bill.id + "billcost") as HTMLInputElement
          ).value;
          return {
            ...bill,
            name: updatedName,
            startDate: updatedStartDate,
            endDate: updatedEndDate,
            cost: updatedCost,
            edit: false,
          };
        default:
          return bill;
      }
    } else {
      return bill;
    }
  });
};

export default function Bills() {
  const [bills, billDispatch] = React.useReducer(billReducer, defaultBills);

  const onEditBill = (billId: number) => {
    console.log("edit " + billId);
    billDispatch({ type: "edit", id: billId });
  };

  const onSaveBill = (billId: number) => {
    console.log("save " + billId);
    billDispatch({ type: "save", id: billId });
  };

  const onDeleteBill = (billId: number) => {
    console.log("delete " + billId);
    billDispatch({ type: "delete", id: billId });
  };

  const onAddBill = () => {
    const newId = Math.max(...bills.map((bill: Bill) => bill.id)) + 1;
    console.log(newId);
    billDispatch({ type: "Add", id: newId });
  };

  return (
    <div>
      <div className="text-center">
        <h1>Hello Anh Tuan</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
      <div className="my-3 mx-2">
        <h6>Fill your bills</h6>
        <table className="responsive-table" width="100%">
          <thead>
            <tr>
              <td style={{ width: "30%" }}>Bill name</td>
              <td style={{ width: "25%" }}>Start date</td>
              <td style={{ width: "25%" }}>End date</td>
              <td style={{ width: "10%" }}>Cost</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {bills.map(
              (bill: Bill) =>
                !bill.removed && (
                  <tr key={bill.id}>
                    <td>
                      <span className={bill.edit ? "d-none" : "d-block"}>
                        {bill.name}
                      </span>
                      <input
                        className={bill.edit ? "d-block" : "d-none"}
                        id={bill.id + "billname"}
                        type="text"
                        defaultValue={bill.name}
                      />
                    </td>
                    <td>
                      <span className={bill.edit ? "d-none" : "d-block"}>
                        {bill.startDate}
                      </span>
                      <input
                        className={bill.edit ? "d-block" : "d-none"}
                        id={bill.id + "startdate"}
                        type="date"
                        defaultValue={bill.startDate}
                      />
                    </td>
                    <td>
                      <span className={bill.edit ? "d-none" : "d-block"}>
                        {bill.endDate}
                      </span>
                      <input
                        className={bill.edit ? "d-block" : "d-none"}
                        id={bill.id + "enddate"}
                        type="date"
                        defaultValue={bill.endDate}
                      />
                    </td>
                    <td>
                      <span className={bill.edit ? "d-none" : "d-block"}>
                        {currency}
                        {bill.cost}
                      </span>
                      <input
                        className={bill.edit ? "d-block" : "d-none"}
                        id={bill.id + "billcost"}
                        type="number"
                        defaultValue={bill.cost}
                      />
                    </td>
                    <td>
                      <IconButton
                        className={bill.edit ? "d-none" : "d-block"}
                        size="small"
                        onClick={() => onEditBill(bill.id)}
                      >
                        <EditRoundedIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        className={bill.edit ? "d-block" : "d-none"}
                        size="small"
                        onClick={() => onSaveBill(bill.id)}
                      >
                        <SaveRoundedIcon fontSize="small" />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton
                        className={bill.edit ? "d-none" : "d-block"}
                        size="small"
                        onClick={() => onDeleteBill(bill.id)}
                      >
                        <DeleteForeverRoundedIcon fontSize="small" />
                      </IconButton>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        <div
          className={
            bills.some((bill: Bill) => bill.edit)
              ? "d-none"
              : "d-block text-center"
          }
        >
          <IconButton aria-label="Add bill" onClick={onAddBill}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
