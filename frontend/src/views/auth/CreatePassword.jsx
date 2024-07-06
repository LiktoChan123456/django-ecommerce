import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiInstance from '../../utils/axios';

function CreatePassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const otp = searchParams.get("otp");
    const uidb64 = searchParams.get("uidb64");
    const navigate = useNavigate();

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('password', password);
        formData.append('otp', otp);
        formData.append('uidb64', uidb64);

        try {
            const response = await apiInstance.post(`user/password-change/`, formData);
            console.log(response.data);
            alert("Password Changed Successfully");
            navigate('/');
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message || 'An error occurred while trying to change the password'}`);
            } else if (error.request) {
                alert('Error: No response from server. Please try again later.');
            } else {
                alert(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main style={{ marginBottom: 100, marginTop: 50 }}>
            <div className="container">
                <section>
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-5 col-md-8">
                            <div className="card rounded-5">
                                <div className="card-body p-4">
                                    <h3 className="text-center">Create New Password</h3>
                                    <br />
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active">
                                            <form onSubmit={handlePasswordSubmit}>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="password">
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
                                                    <label className="form-label" htmlFor="confirmPassword">
                                                        Confirm New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="confirmPassword"
                                                        required
                                                        name="confirmPassword"
                                                        className="form-control"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                    {error && (
                                                        <p className={`fw-bold mt-2 text-danger`}>
                                                            {error}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-center">
                                                    <button type='submit' className='btn btn-primary w-100' disabled={isLoading}>
                                                        {isLoading ? 'Processing' : 'Reset Password'}
                                                    </button>
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
    );
}

export default CreatePassword;
