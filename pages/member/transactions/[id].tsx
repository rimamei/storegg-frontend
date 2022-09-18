import jwtDecode from 'jwt-decode';
import React from "react";
import {
  Sidebar,
  TransactionDetailContent,
} from "../../../components/organisms";
import { HistoryTransactionTypes, JWTPayloadTypes, UserTypes } from '../../../services/data-types';
import { getTransactionDetail } from '../../../services/member';


interface TransactionDetailProps {
  transactionDetail: HistoryTransactionTypes
}
export default function DetailTransaction(props: TransactionDetailProps) {
  return (
    <section className="transactions-detail overflow-auto">
      <Sidebar activeMenu="transaction" />
      <TransactionDetailContent data={props.transactionDetail} />
    </section>
  );
}

interface GetServerSideProps {
  req: { cookies: { token: string } };
  params: { id: string };
}

export async function getServerSideProps({ req, params }: GetServerSideProps) {
  const { token } = req.cookies;
  const { id } = params;
  if (!token) {
    return {
      redirect: { destination: '/sign-in', permanent: false }
    };
  }

  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: JWTPayloadTypes = jwtDecode(jwtToken)
  const userFromPayload: UserTypes = payload.player

  const IMG = process.env.NEXT_PUBLIC_IMAGE
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`
  const response = await getTransactionDetail(id, jwtToken)

  return {
    props: {
      transactionDetail: response.data,
    }
  }
}
