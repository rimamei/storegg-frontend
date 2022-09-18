import React, { useEffect, useState } from 'react'

export default function CheckoutItem() {

    const [dataDetail, setDataDetail] = useState({ name: '', thumbnail: '', category: { name: '' } })

    useEffect(() => {
        const data = localStorage.getItem('data-detail')
        const dataParsing = JSON.parse(data!)
        setDataDetail(dataParsing)
    }, [])

    const IMG_URL = process.env.NEXT_PUBLIC_IMAGE

    return (
        <div className="game-checkout d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
            <div className="pe-4">
                <div className="cropped">
                    <img src={`${IMG_URL}/${dataDetail.thumbnail}`} className="img-fluid" alt="thumbnail" />
                </div>
            </div>
            <div>
                <p className="fw-bold text-xl color-palette-1 mb-10">{dataDetail?.name}</p>
                <p className="color-palette-2 m-0">Category: {dataDetail?.category?.name}</p>
            </div>
        </div>
    )
}
