import React from "react";
import "./styles.css";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

interface Member {
  id: number;
  name: string;
  stayPeriod: Array<Period>;
  fee: number;
  edit: boolean;
  removed: boolean;
}

interface Period {
  startDate: string;
  endDate: string;
}

const currency: string = "$";
const defaultMembers: Array<Member> = [
  {
    id: 1,
    name: "First member",
    stayPeriod: [{ startDate: "2023-05-01", endDate: "2023-08-01" }],
    fee: 500,
    edit: false,
    removed: false,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const memberReducer = (members: any, action: any) => {
  console.log(action.id);
  if (action.type === "Add") {
    return [
      ...members,
      {
        id: action.id,
        name: "New member",
        stayPeriod: [{ startDate: "2023-05-01", endDate: "2023-08-01" }],
        fee: 0,
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
          const updatedFee = (
            document.getElementById(member.id + "memberfee") as HTMLInputElement
          ).value;
          return {
            ...member,
            name: updatedName,
            stayPeriod: [
              { startDate: updatedStartDate, endDate: updatedEndDate },
            ],
            fee: updatedFee,
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
              <td style={{ width: "20%" }}>Member name</td>
              <td style={{ width: "70%" }}>Stay Period</td>
              <td style={{ width: "5%" }}>Fee</td>
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
                      <Grid container spacing={1}>
                        <Grid item xs={2}>
                          From
                        </Grid>
                        <Grid item xs={4}>
                          <span className={member.edit ? "d-none" : "d-block"}>
                            {member.stayPeriod?.[0].startDate}
                          </span>
                          <input
                            className={member.edit ? "d-block" : "d-none"}
                            id={member.id + "member-startdate"}
                            type="date"
                            defaultValue={member.stayPeriod?.[0].startDate}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          to
                        </Grid>
                        <Grid item xs={4}>
                          <span className={member.edit ? "d-none" : "d-block"}>
                            {member.stayPeriod?.[0].endDate}
                          </span>
                          <input
                            className={member.edit ? "d-block" : "d-none"}
                            id={member.id + "member-enddate"}
                            type="date"
                            defaultValue={member.stayPeriod?.[0].endDate}
                          />
                        </Grid>
                      </Grid>
                    </td>
                    <td>
                      <span className={member.edit ? "d-none" : "d-block"}>
                        {currency}
                        {member.fee}
                      </span>
                      <input
                        style={{ width: "3em" }}
                        className={member.edit ? "d-block" : "d-none"}
                        id={member.id + "memberfee"}
                        type="number"
                        defaultValue={member.fee}
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
