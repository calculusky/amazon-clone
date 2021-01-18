import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { userDetailsAction } from '../../store/actions/authAction';

const EditProfileScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //get user details and signedin user states from redux store
    const {
         userDetails: { loading, error, user },
         userSignin: { userInfo } 
        } = props;
    
    //get function to dispatch user details from props
    const { onUserDetails } = props;

    //get user details from the server
    useEffect(() => {
        onUserDetails(userInfo._id)
    }, [onUserDetails, userInfo._id])
    return (  
        <div>
            <form className='form'>
                <div>
                    <h1>Edit Profile</h1>
                </div>
                {
                    loading ? (
                        <LoadingBox/>
                    ): error ? (
                        <MessageBox variant={'danger'}>{error}</MessageBox>
                    ): (
                        <>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input 
                                   type="text" 
                                   id="name" 
                                   placeholder="name"
                                   value={user.name}
                                   onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input 
                                   type="email" 
                                   id="email" 
                                   placeholder="email address" 
                                   value={user.email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input 
                                   type="password" 
                                   id="password" 
                                   placeholder="password" 
                                   onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                   type="password" 
                                   id="confirmPassword" 
                                   placeholder="confirmPassword" 
                                   onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            <div>
                                <label/>
                                <button type="submit" className="primary">Update Profile</button>
                            </div>
                        </>
                    )
                }
                
            </form>
        </div>
    );
}

const mapstateToProps = (state) => {
    return {
        userDetails: state.userDetailsReducer,
        userSignin: state.signInReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onUserDetails: (userId) => dispatch(userDetailsAction(userId))
    }
}
 
export default connect(mapstateToProps, mapDispatchToProps)(EditProfileScreen);