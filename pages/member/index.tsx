import React from "react";
import { OverviewContent, Sidebar } from "../../components/organisms";

export default function Overview() {
  return (
    <section className="overview overflow-auto">
      <Sidebar activeMenu="overview" />
      <OverviewContent />
    </section>
  );
}
