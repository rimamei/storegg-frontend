import React, { useCallback, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { getMemberTransactions } from '../../../services/member';
import { HistoryTransactionTypes } from '../../../services/data-types';
import TableRow from '../TransactionContent/TableRow';
import ButtonTab from './ButtonTab';

export default function TransactionContent() {
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [tab, setTab] = useState('all');

  const tabList = [
    { title: 'All Trx', value: 'all' },
    { title: 'Success', value: 'success' },
    { title: 'Pending', value: 'pending' },
    { title: 'Failed', value: 'failed' },
  ];

  const getMemberTransactionAPI = useCallback(async (val) => {
    const response = await getMemberTransactions(val);

    if (response.error) {
      toast.error(response.message);
    } else {
      setTotal(response.data.total);
      setTransactions(response.data.data);
    }
  }, []);

  useEffect(() => {
    getMemberTransactionAPI('all');
  }, []);

  const onTabClick = async (val: string) => {
    setTab(val);
    getMemberTransactionAPI(val);
  };

  const IMG = process.env.NEXT_PUBLIC_IMAGE;

  return (
    <main className='main-wrapper'>
      <div className='ps-lg-0'>
        <h2 className='text-4xl fw-bold color-palette-1 mb-30'>
          My Transactions
        </h2>
        <div className='mb-30'>
          <p className='text-lg color-palette-2 mb-12'>You’ve spent</p>
          <h3 className='text-5xl fw-medium color-palette-1'>
            <NumberFormat
              value={total}
              prefix='Rp. '
              displayType='text'
              thousandSeparator='.'
              decimalSeparator=','
            />
          </h3>
        </div>
        <div className='row mt-30 mb-20'>
          <div className='col-lg-12 col-12 main-content'>
            <div id='list_status_title'>
              {tabList.map((item, idx) => (
                <ButtonTab
                  key={idx}
                  title={item.title}
                  dataFilter={item.value}
                  onClick={() => onTabClick(item.value)}
                  active={tab === item.value}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='latest-transaction'>
          <p className='text-lg fw-medium color-palette-1 mb-14'>
            Latest Transactions
          </p>
          <div className='main-content main-content-table overflow-auto'>
            <table className='table table-borderless'>
              <thead>
                <tr className='color-palette-1'>
                  <th className='' scope='col'>
                    Game
                  </th>
                  <th scope='col'>Item</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody id='list_status_item'>
                {transactions.map((transaction: HistoryTransactionTypes) => (
                  <TableRow
                    key={transaction._id}
                    id={transaction._id}
                    image={`${IMG}/${transaction.historyVoucherTopup.thumbnail}`}
                    title={transaction.historyVoucherTopup.gameName}
                    category={transaction.historyVoucherTopup.category}
                    item={`${transaction.historyVoucherTopup.coinQuantity} ${transaction.historyVoucherTopup.coinName}`}
                    price={transaction.value}
                    status={transaction.status}
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
