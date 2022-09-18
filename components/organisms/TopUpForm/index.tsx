import React, { useState } from "react";
import { toast } from 'react-toastify';
import { BanksTypes, NominalsTypes, PaymentTypes } from '../../../services/data-types';
import NominalItem from './NominalItem';
import PaymentItem from './PaymentItem';

interface TopUpFormProps {
  nominals: NominalsTypes[];
  payments: PaymentTypes[];
}

export default function TopUpForm(props: TopUpFormProps) {
  const { nominals, payments } = props

  const [payment, setPayment] = useState({})
  const [nominal, setNominal] = useState({})
  const [bank, setBank] = useState({})
  const [verifyID, setVerifyID] = useState('')
  const [bankAccount, setBankAccount] = useState('')

  const onNominalItemChange = (data: any) => {
    setNominal(data)
  }

  const onPaymentItemChange = (payment: PaymentTypes, bank: BanksTypes) => {
    setPayment(payment)
    setBank(bank)
  }

  const onSubmit = () => {
    const data = {
      verifyID, bank, payment, nominal, bankAccount
    }

    if (verifyID || bank || payment || nominal || bankAccount) {
      localStorage.setItem('data-topup', JSON.stringify(data!));
    } else {
      toast.error('Silahkan isi semua field!')
    }
  }

  return (
    <form action="./checkout.html" method="POST">
      <div className="pt-md-50 pt-30">
        <div className="">
          <label
            htmlFor="ID"
            className="form-label text-lg fw-medium color-palette-1 mb-10"
          >
            Verify ID
          </label>
          <input
            type="text"
            className="form-control rounded-pill text-lg"
            id="ID"
            name="ID"
            aria-describedby="verifyID"
            placeholder="Enter your ID"
            onChange={(e) => setVerifyID(e.target.value)}
            value={verifyID}
          />
        </div>
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Nominal Top Up
        </p>
        <div className="row justify-content-between">
          {nominals.map((nominal: NominalsTypes) => (
            <NominalItem
              key={nominal._id}
              _id={nominal._id}
              coinQuantity={nominal.coinQuantity}
              coinName={nominal.coinName}
              price={nominal.price}
              onChange={() => onNominalItemChange(nominal)}
            />
          ))}
          <div className="col-lg-4 col-sm-6"></div>
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Payment Method
        </p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {payments.map((payment: PaymentTypes) => (
              payment.banks.map((bank: BanksTypes) => (
                <PaymentItem
                  bankId={bank._id}
                  type={payment.type}
                  name={bank.name}
                  onChange={() => onPaymentItemChange(payment, bank)}
                />
              ))
            ))}
            <div className="col-lg-4 col-sm-6"></div>
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label
          htmlFor="bankAccount"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Bank Account Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="bankAccount"
          name="bankAccount"
          aria-describedby="bankAccount"
          placeholder="Enter your Bank Account Name"
          onChange={(e) => setBankAccount(e.target.value)}
          value={bankAccount}
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <a
          onClick={onSubmit}
          href="/checkout"
          type="submit"
          className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
        >
          Continue
        </a>
      </div>
    </form>
  );
}
