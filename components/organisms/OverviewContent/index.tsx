import React, { useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { TopupCategoriesTypes, HistoryTransactionTypes } from '../../../services/data-types';
import { getMemberOverview } from '../../../services/member';
import Category from "./Category";
import TableRow from "./TableRow";

export default function OverviewContent() {
  const [counts, setCounts] = useState([])
  const [data, setData] = useState([])

  const getMemberOverviewAPI = useCallback(async () => {
    const response = await getMemberOverview()

    if (response.error) {
      toast.error(response.message)
    } else {
      setCounts(response.data.count)
      setData(response.data.data)
    }
  }, [])

  useEffect(() => {
    getMemberOverviewAPI()
  }, [])

  const IMG = process.env.NEXT_PUBLIC_IMAGE

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Top Up Categories
          </p>
          <div className="main-content">
            <div className="row">
              {counts.map((count: TopupCategoriesTypes) => (
                <Category key={count._id} icon={count.name} nominal={count.value}>
                  <p className="color-palette-1 mb-0 ms-12">
                    {count.name}
                  </p>
                </Category>
              ))}
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="text-start" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: HistoryTransactionTypes) => (
                  <TableRow
                    key={item._id}
                    image={`${IMG}/${item.historyVoucherTopup.thumbnail}`}
                    title={item.historyVoucherTopup.gameName}
                    category={item.historyVoucherTopup.category}
                    item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`}
                    price={item.value}
                    status={item.status}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
