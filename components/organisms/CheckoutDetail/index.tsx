import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';

export default function CheckoutDetail() {
  const [dataTopup, setDataTopup] = useState({
    payment: { type: '' },
    bank: { name: '', bankName: '', noRekening: '' },
    verifyID: '',
    bankAccount: '',
    nominal: { coinName: '', coinQuantity: 0, price: 0 },
  });

  useEffect(() => {
    const dataTopup = localStorage.getItem('data-topup');
    const dataParsingTopup = JSON.parse(dataTopup!);
    setDataTopup(dataParsingTopup);
  }, []);

  const tax = dataTopup.nominal.price * 0.01;
  const total = dataTopup.nominal.price - tax;

  return (
    <>
      <div className='purchase pt-md-50 pt-30'>
        <h2 className='fw-bold text-xl color-palette-1 mb-20'>
          Purchase Details
        </h2>
        <p className='text-lg color-palette-1 mb-20'>
          Your Game ID{' '}
          <span className='purchase-details'>{dataTopup.verifyID}</span>
        </p>
        <p className='text-lg color-palette-1 mb-20'>
          Order ID <span className='purchase-details'>#GG001</span>
        </p>
        <p className='text-lg color-palette-1 mb-20'>
          Item{' '}
          <span className='purchase-details'>
            {dataTopup.nominal.coinQuantity} {dataTopup.nominal.coinName}
          </span>
        </p>
        <p className='text-lg color-palette-1 mb-20'>
          Price{' '}
          <span className='purchase-details'>
            <NumberFormat
              value={dataTopup.nominal.price}
              prefix={'Rp.'}
              displayType='text'
              thousandSeparator='.'
              decimalSeparator=','
            />
          </span>
        </p>
        <p className='text-lg color-palette-1 mb-20'>
          Tax (10%){' '}
          <span className='purchase-details'>
            <NumberFormat
              value={tax}
              prefix={'Rp.'}
              displayType='text'
              thousandSeparator='.'
              decimalSeparator=','
            />
          </span>
        </p>
        <p className='text-lg color-palette-1 mb-20'>
          Total{' '}
          <span className='purchase-details color-palette-4'>
            <NumberFormat
              value={total}
              prefix={'Rp.'}
              displayType='text'
              thousandSeparator='.'
              decimalSeparator=','
            />
          </span>
        </p>
      </div>
      <div className='payment pt-md-50 pb-md-50 pt-10 pb-10'>
        <h2 className='fw-bold text-xl color-palette-1 mb-20'>
          Payment Informations
        </h2>
        <p className='text-lg color-palette-1 mb-20'>
          Your Account Name{' '}
          <span className='purchase-details'>{dataTopup.bankAccount}</span>
        </p>
        <p className='text-lg color-palette-1 mb-20'>
          Type{' '}
          <span className='payment-details'>{dataTopup.payment.type}</span>
        </p>
        <p className='text-lg color-palette-1 mb-20'>
          Bank Name{' '}
          <span className='payment-details'>{dataTopup.bank.name}</span>
        </p>
        <p className='text-lg color-palette-1 mb-20'>
          Bank Account Name{' '}
          <span className='payment-details'>{dataTopup.bank.bankName}</span>
        </p>
        <p className='text-lg color-palette-1 mb-20'>
          Bank Number{' '}
          <span className='payment-details'>{dataTopup.bank.noRekening}</span>
        </p>
      </div>
    </>
  );
}
