import React from "react";
import "./styles.css";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Member {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  cost: number;
  edit: boolean;
  removed: boolean;
}

const currency: string = "$";
const defaultMembers: Array<Member> = [
  {
    id: 1,
    name: "First member",
    startDate: "2023-05-01",
    endDate: "2023-08-01",
    cost: 500,
    edit: false,
    removed: false,
  },
];

const memberReducer = (members: any, action: any) => {
  console.log(action.id);
  if (action.type === "Add") {
    let defaultDate = new Date().toISOString().substring(0, 10);
    return [
      ...members,
      {
        id: action.id,
        name: "New member",
        startDate: defaultDate,
        endDate: defaultDate,
        cost: 0,
        edit: true,
        removed: false,
      },
    ];
  }
  return members.map((member: Member) => {
    if (member.id === action.id) {
      switch (action.type) {
        case "edit":
          return { ...member, edit: true };
        case "delete":
          return { ...member, removed: true };
        case "save":
          const updatedName = (
            document.getElementById(
              member.id + "membername"
            ) as HTMLInputElement
          ).value;
          const updatedStartDate = (
            document.getElementById(
              member.id + "member-startdate"
            ) as HTMLInputElement
          ).value;
          const updatedEndDate = (
            document.getElementById(
              member.id + "member-enddate"
            ) as HTMLInputElement
          ).value;
          const updatedCost = (
            document.getElementById(
              member.id + "membercost"
            ) as HTMLInputElement
          ).value;
          return {
            ...member,
            name: updatedName,
            startDate: updatedStartDate,
            endDate: updatedEndDate,
            cost: updatedCost,
            edit: false,
          };
        default:
          return member;
      }
    } else {
      return member;
    }
  });
};

export default function Members() {
  const [members, memberDispatch] = React.useReducer(
    memberReducer,
    defaultMembers
  );

  const onEditMember = (memberId: number) => {
    console.log("edit " + memberId);
    memberDispatch({ type: "edit", id: memberId });
  };

  const onSaveMember = (memberId: number) => {
    console.log("save " + memberId);
    memberDispatch({ type: "save", id: memberId });
  };

  const onDeleteMember = (memberId: number) => {
    console.log("delete " + memberId);
    memberDispatch({ type: "delete", id: memberId });
  };

  const onAddMember = () => {
    const newId = Math.max(...members.map((member: Member) => member.id)) + 1;
    console.log(newId);
    memberDispatch({ type: "Add", id: newId });
  };

  return (
    <div>
      <div className="my-3 mx-2">
        <h6>Fill your members</h6>
        <table className="responsive-table" width="100%">
          <thead>
            <tr>
              <td style={{ width: "30%" }}>Member name</td>
              <td style={{ width: "25%" }}>Start date</td>
              <td style={{ width: "25%" }}>End date</td>
              <td style={{ width: "10%" }}>Cost</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {members.map(
              (member: Member) =>
                !member.removed && (
                  <tr key={member.id}>
                    <td>
                      <span className={member.edit ? "d-none" : "d-block"}>
                        {member.name}
                      </span>
                      <input
                        className={member.edit ? "d-block" : "d-none"}
                        id={member.id + "membername"}
                        type="text"
                        defaultValue={member.name}
                      />
                    </td>
                    <td>
                      <span className={member.edit ? "d-none" : "d-block"}>
                        {member.startDate}
                      </span>
                      <input
                        className={member.edit ? "d-block" : "d-none"}
                        id={member.id + "member-startdate"}
                        type="date"
                        defaultValue={member.startDate}
                      />
                    </td>
                    <td>
                      <span className={member.edit ? "d-none" : "d-block"}>
                        {member.endDate}
                      </span>
                      <input
                        className={member.edit ? "d-block" : "d-none"}
                        id={member.id + "member-enddate"}
                        type="date"
                        defaultValue={member.endDate}
                      />
                    </td>
                    <td>
                      <span className={member.edit ? "d-none" : "d-block"}>
                        {currency}
                        {member.cost}
                      </span>
                      <input
                        className={member.edit ? "d-block" : "d-none"}
                        id={member.id + "membercost"}
                        type="number"
                        defaultValue={member.cost}
                      />
                    </td>
                    <td>
                      <IconButton
                        className={member.edit ? "d-none" : "d-block"}
                        size="small"
                        onClick={() => onEditMember(member.id)}
                      >
                        <EditRoundedIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        className={member.edit ? "d-block" : "d-none"}
                        size="small"
                        onClick={() => onSaveMember(member.id)}
                      >
                        <SaveRoundedIcon fontSize="small" />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton
                        className={member.edit ? "d-none" : "d-block"}
                        size="small"
                        onClick={() => onDeleteMember(member.id)}
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
            members.some((member: Member) => member.edit)
              ? "d-none"
              : "d-block text-center"
          }
        >
          <IconButton aria-label="Add member" onClick={onAddMember}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
