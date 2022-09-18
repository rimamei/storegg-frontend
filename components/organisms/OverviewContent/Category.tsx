import React, { Children, ReactNode } from 'react';
import Image from 'next/image';
import NumberFormat from 'react-number-format';

interface CategoryProps {
  icon: string;
  nominal: number;
  children: ReactNode;
}

export default function Category(props: CategoryProps) {
  const { icon, children, nominal } = props;
  return (
    <div className='col-lg-4 ps-15 pe-15 pb-lg-0 pb-4'>
      <div className='categories-card'>
        <div className='d-flex align-items-center mb-24'>
          <Image src={`/icon/ic-${icon}.svg`} width={60} height={60} />
          {children}
        </div>
        <div>
          <p className='text-sm color-palette-2 mb-1'>Total Spent</p>
          <p className='text-2xl color-palette-1 fw-medium m-0'>
            <NumberFormat
              value={nominal}
              prefix='Rp. '
              displayType='text'
              thousandSeparator='.'
              decimalSeparator=','
            />
          </p>
        </div>
      </div>
    </div>
  );
}
