import React from "react";
import {
  Sidebar,
  TransactionDetailContent,
} from "../../../components/organisms";

export default function DetailTransaction() {
  return (
    <section className="transactions-detail overflow-auto">
      <Sidebar activeMenu="transaction" />
      <TransactionDetailContent />
    </section>
  );
}
