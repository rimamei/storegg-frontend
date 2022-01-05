import React from "react";
import { Sidebar, TransactionContent } from "../../../components/organisms";

export default function Transactions() {
  return (
    <section className="transactions overflow-auto">
      <Sidebar activeMenu="transaction" />
     <TransactionContent />
    </section>
  );
}
