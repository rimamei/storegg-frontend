import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Image from 'next/image'
import { useRouter } from 'next/router'

import { getGameCategory } from '../services/player'
import { CategoryProps } from '../services/data-types'
import { setSignUp } from '../services/auth'

export default function SignUpPhoto() {
    const { isReady } = useRouter()
    const router = useRouter()
    const [categories, setCategories] = useState([])
    const [favorite, setFavorite] = useState('')
    const [image, setImage] = useState("")
    const [userForm, setUserForm] = useState({ name: '', email: '' })
    const [imagePreview, setImagePreview] = useState('/icon/upload.svg')

    const getGameCategoryAPI = useCallback(async () => {
        const data = await getGameCategory()
        setCategories(data)
    }, [])

    useEffect(() => {
        if (isReady) {
            getGameCategoryAPI()
        }
    }, [])

    useEffect(() => {
        const localForm = localStorage.getItem('user-form')
        const form = JSON.parse(localForm!)
        setUserForm(form)
    }, [])

    const handleChange = (e: any) => {
        const file = e.target.files[0]

        setImagePreview(URL.createObjectURL!(file))
        setImage(file)
    }

    const onSubmit = async () => {
        const userForm = localStorage.getItem('user-form')
        const form = await JSON.parse(userForm!)
       
        const data = new FormData();

        data.append('email', form.email)
        data.append('password', form.password)
        data.append('phoneNumber', '081234567890')
        data.append('username', form.name)
        data.append('name', form.name)
        data.append('role', 'user')
        data.append('status', 'Y')
        data.append('favorite', favorite)
        data.append('image', image)

        const result = await setSignUp(data)

        if (result.error) {
            toast.error(result.message)
        } else {
            toast.success('Register Berhasil')
            router.push('/sign-up-success')
            localStorage.removeItem('user-form')
        }
    }

    return (
        <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
            <div className="container mx-auto">
                <form action="">
                    <div className="form-input d-md-block d-flex flex-column">
                        <div>
                            <div className="mb-20">
                                <div className="image-upload text-center">
                                    <label htmlFor="avatar">
                                        <Image src={imagePreview} width={120} height={120} className="img-upload" alt='upload' />
                                    </label>
                                    <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg" onChange={handleChange} />
                                </div>
                            </div>
                            <h2 className="fw-bold text-xl text-center color-palette-1 m-0">{userForm.name}</h2>
                            <p className="text-lg text-center color-palette-1 m-0">{userForm.email}</p>
                            <div className="pt-50 pb-50">
                                <label htmlFor="category" className="form-label text-lg fw-medium color-palette-1 mb-10">Favorite
                                    Game</label>
                                <select id="category" name="category" className="form-select d-block w-100 rounded-pill text-lg"
                                    aria-label="Favorite Game" value={favorite} onChange={e => setFavorite(e.target.value)}>
                                    <option value="" disabled selected>Select Category</option>
                                    {categories.map((category: CategoryProps) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="button-group d-flex flex-column mx-auto">
                            <button type="button" onClick={onSubmit} className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16" >Create My Account</button>
                            <a className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15" href="#"
                                role="button">Terms &
                                Conditions</a>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
