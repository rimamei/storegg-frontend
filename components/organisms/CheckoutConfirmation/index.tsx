import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { setCheckout } from '../../../services/player';

export default function CheckoutConfirmation() {
  const [checkbox, setCheckbox] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    const dataTopupLocal = localStorage.getItem('data-topup');
    let dataTopup = {
      nominal: { _id: '' },
      payment: { _id: '' },
      bank: { _id: '' },
      bankAccountName: '',
      verifyID: ''
    };
    if (dataTopupLocal) {
      dataTopup = JSON.parse(dataTopupLocal);
    }

    const dataItemLocal = localStorage.getItem('data-detail');
    let dataItem = { _id: '' };
    if (dataItemLocal) {
      dataItem = JSON.parse(dataItemLocal);
    }

    const data = {
      voucher: dataItem._id,
      nominal: dataTopup.nominal._id,
      payment: dataTopup.payment._id,
      bank: dataTopup.bank._id,
      name: dataTopup.bankAccountName,
      accountUser: dataTopup.verifyID,
    };

    const result = await setCheckout(data);

    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success('Checkout Berhasil');
      router.push('/complete-checkout');
      localStorage.removeItem('data-detail');
      localStorage.removeItem('data-topup');
    }
  };

  return (
    <>
      <label className='checkbox-label text-lg color-palette-1'>
        I have transferred the money
        <input
          type='checkbox'
          checked={checkbox}
          onChange={() => setCheckbox(!checkbox)}
        />
        <span className='checkmark'></span>
      </label>
      <div className='d-md-block d-flex flex-column w-100 pt-50'>
        <button
          className='btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg'
          type='button'
          onClick={onSubmit}
        >
          Confirm Payment
        </button>
      </div>
    </>
  );
}
