import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { userDetailsAction } from '../../store/actions/authAction';
import { updateUserProfileAction } from '../../store/actions/userAction';

const EditProfileScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //get states: userDetails, userSignin, updateUserProfile from redux store through props
    const {
         userDetails: { loading, error, user },
         userSignin: { userInfo },
         updateUserProfile: { loading: loadingUpdate, user: updatedUser, error: errorUpdate} 
        } = props;
    
    //get functions to dispatch user details & update user from props
    const { onUserDetails, onUpdateUserProfile } = props;

    //get user details from the server and initialize form values
    useEffect(() => {
        if(!user){
            return onUserDetails(userInfo._id)
        }
        setName(user.name);
        setEmail(user.email);
    }, [onUserDetails, userInfo._id, user])

    //submit form
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            return alert('Password do not match')
        }
        //dispatch the update action
        onUpdateUserProfile({ 
            userId: user._id, 
            name: name, 
            email: email, 
            password: password 
        })
    }

    return (  
        <div>
            <form className="form" onSubmit={submitHandler}>
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
                            { loadingUpdate && <LoadingBox/> }
                            { errorUpdate && <MessageBox variant={'danger'}>{errorUpdate}</MessageBox> }
                            { updatedUser && <MessageBox variant={'success'}>Profile successfully updated</MessageBox> }
                            
                            <div>
                                <label htmlFor="name">Name</label>
                                <input 
                                   type="text" 
                                   id="name" 
                                   placeholder="name"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input 
                                   type="email" 
                                   id="email" 
                                   placeholder="email address" 
                                   value={email}
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
        userSignin: state.signInReducer,
        updateUserProfile: state.updateUserProfileReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onUserDetails: (userId) => dispatch(userDetailsAction(userId)),
        onUpdateUserProfile: (user) => dispatch(updateUserProfileAction(user))
    }
}
 
export default connect(mapstateToProps, mapDispatchToProps)(EditProfileScreen);