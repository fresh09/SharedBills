import React from "react";
import "./styles.css";
import Bills from "./Bills";
import Members from "./Members";
import Result from "./Result";
import { Bill, Member, Period } from "./Interface";

export default function App() {
  const [members, setMembers] = React.useState<Member[]>([]);
  const [bills, setBills] = React.useState<Bill[]>([]);

  const onBillsChange = (updatedBills: Array<Bill>) => {
    setBills(updatedBills);
    setMembers(calculateSharedAmount(updatedBills, members));
  };

  const onMembersChange = (updatedMembers: Array<Member>) => {
    setMembers(calculateSharedAmount(bills, updatedMembers));
  };

  const calculateSharedAmount = (
    bills: Array<Bill>,
    members: Array<Member>
  ) => {
    let totalCost: number = bills
      .map((b: Bill) => {
        if (!b.removed) return b.cost;
        else return 0;
      })
      .reduce((totalCost: number, current: number) => totalCost + current, 0);

    let totalMember: number = members.filter((m: Member) => !m.removed).length;
    for (let i = 0; i < members.length; i++) {
      members[i].fee = Math.round((totalCost / totalMember) * 100) / 100;
    }

    return members;
  };

  return (
    <React.Fragment>
      <div className="text-center">
        <h1>Shared Bills Calculator</h1>
      </div>
      <Bills handleBillsChange={onBillsChange} />
      <Members handleMembersChange={onMembersChange} />
      <Result members={members} bills={bills} />
    </React.Fragment>
  );
}
