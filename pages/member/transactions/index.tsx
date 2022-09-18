import jwtDecode from 'jwt-decode';
import React from "react";
import { Sidebar, TransactionContent } from "../../../components/organisms";
import { JWTPayloadTypes, UserTypes } from '../../../services/data-types';

export default function Transactions() {
  return (
    <section className="transactions overflow-auto">
      <Sidebar activeMenu="transaction" />
     <TransactionContent />
    </section>
  );
}

interface GetServerSideProps {
  req: { cookies: { token: string } }
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
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

  return {
    props: {
      user: userFromPayload
    }
  }
}