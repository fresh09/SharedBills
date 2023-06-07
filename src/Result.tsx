import React from "react";
import "./styles.css";
import { Member } from "./Interface";

const currency: string = "$";

export default function Result(props: any) {
  return (
    <div>
      <div className="my-3 mx-2">
        <h6>Result</h6>
        <table className="responsive-table" width="100%">
          <thead>
            <tr>
              <td style={{ width: "20%" }}>Member name</td>
              <td style={{ width: "60%" }}>Stay Period</td>
              <td>Shared Amount</td>
            </tr>
          </thead>
          <tbody>
            {props.members.map(
              (member: Member) =>
                !member.removed && (
                  <tr key={member.id}>
                    <td>
                      <span className={member.edit ? "d-none" : "d-block"}>
                        {member.name}
                      </span>
                    </td>
                    <td>
                      {"From " +
                        member.stayPeriod[0]?.startDate +
                        " to " +
                        member.stayPeriod[0]?.endDate}
                    </td>
                    <td>{currency + member.fee}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
