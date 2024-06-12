import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import apiInstance from '../../utils/axios'



function CreatePassword() {
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[searchParam] = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const otp = searchParam.get("otp")
    const uidb64 = searchParam.get("uidb64")
    const navigate = useNavigate()

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (password !== confirmPassword) {
            alert("Password does not match!");
            setError(true)
            setIsLoading(false)

        } else {
            const formdata = new FormData()
            formdata.append('password', password)
            formdata.append('otp', otp)
            formdata.append('uidb64', uidb64)

            try{
                await apiInstance.post(`user/password-change/`, formdata).then((res) => {
                    console.log(res.data)
                    alert("Password Changed Successfully")
                    navigate('/')
                    setIsLoading(false)
                  
                })
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 200 range
                
                    alert(`Error: ${error.response.data.message || 'An error occurred while trying to change the password'}`);
                    setIsLoading(false)
                } else if (error.request) {
                    // Request was made but no response received
                    
                    alert('Error: No response from server. Please try again later.');
                    setIsLoading(false)
                } else {
                    // Something else happened
    
                    alert(`Error: ${error.message}`);
                    setIsLoading(false)
                }
            }
        }
    }

  return (
    <>
        <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    {/* Section: Login form */}
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">Create New Password</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <form onSubmit={handlePasswordSubmit}>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="Full Name">
                                                            Enter New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            required
                                                            name="password"
                                                            className="form-control"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="Full Name">
                                                            Confirm New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            required
                                                            name="confirmPassword"
                                                            className="form-control"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                        />
                                                        {error !== null &&
                                                            <p className={`fw-bold mt-2 ${error ? 'text-danger' : 'text-success'}`}>
                                                                {error ? 'Password Does Not Match' : 'Password Matched'}
                                                            </p>
                                                        }
                                                    </div>
                                                    <div className="text-center">
                                                    {isLoading===true
                                                    ?<button disabled className='btn btn-primary w-100'>Processing</button>
                                                    :<button type='submit' className='btn btn-primary w-100'>Reset Password</button>
                                                    }
                                                   
                                                        
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
    </>
  )
}

export default CreatePassword
