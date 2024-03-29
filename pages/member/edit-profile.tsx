import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Input } from "../../components/atoms";
import { Sidebar } from "../../components/organisms";
import { JWTPayloadTypes, userStateTypes, UserTypes } from '../../services/data-types';
import { updateProfile } from '../../services/member';

export default function EditProfile() {

  const [user, setUser] = useState<userStateTypes>({ id: '', name: '', email: '', avatar: '' })
  const [imagePreview, setImagePreview] = useState<string>()

  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')

    if (token) {
      const jwtToken = atob(token)
      const payload: JWTPayloadTypes = jwtDecode(jwtToken)
      const userFromPayload: UserTypes = payload.player
      setUser(userFromPayload)
    }
  }, [])

  const IMG = process.env.NEXT_PUBLIC_IMAGE

  const onSubmit = async () => {
    const data = new FormData();
    data.append('image', user.avatar)
    data.append('name', user.name)
    data.append('email', user.email)

    const response = await updateProfile(data)

    if (response.error) {
      toast.error(response.message)
    } else {
      Cookies.remove('token')
      router.push('/sign-in')
    }
  }

  return (
    <section className="edit-profile overflow-auto">
      <Sidebar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                {/* <div className="position-relative me-20">
                  <img
                    src="/img/avatar-1.png"
                    width="90"
                    height="90"
                    className="avatar img-fluid"
                  />
                  <div className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                    <img
                      src="/icon/upload.svg"
                      width="90"
                      height="90"
                      className="avatar img-fluid"
                    />
                  </div>
                </div> */}
                <div className="image-upload">
                  <label htmlFor="avatar">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        width="90"
                        height="90"
                        className="avatar img-fluid"
                        style={{ borderRadius: '100%' }}
                      />
                    ) : (
                      <img
                        src={`${IMG}/${user.avatar}`}
                        width="90"
                        height="90"
                        className="avatar img-fluid"
                        style={{ borderRadius: '100%' }}
                      />
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const img = e.target.files![0];
                      setImagePreview(URL.createObjectURL(img));
                      return setUser({ ...user, avatar: img });
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input
                  label="Full Name"
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e: any) => setUser({ ...user, name: e.target.value })}
                  placeholder="Enter your name"
                  value={user.name}
                />
              </div>
              <div className="pt-30">
                <Input
                  label="Email Address"
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e: any) => setUser({ ...user, email: e.target.value })}
                  placeholder="Enter your email address"
                  disabled
                  value={user.email}
                />
              </div>
              {/* <div className="pt-30">
                <Input
                  label="Phone"
                  type="tel"
                  id="phone"
                  name="phone"
                  aria-describedby="phone"
                  placeholder="Enter your phone number"
                />
              </div> */}
              <div className="button-group d-flex flex-column pt-50">
                <button
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  type="button"
                  onClick={onSubmit}
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
