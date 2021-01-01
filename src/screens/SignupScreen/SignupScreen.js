import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUpAction } from '../../store/actions/authAction';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';

const SignupScreen = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const { userInfo } = props.userSignin;
    const { loading, error } = props.userSignup
    console.log(props.userSignup, 'state-signup')

//renders comp b4 redirecting***bug
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [userInfo, redirect, props.history])

    //submit form
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
           return alert('password do not match')
        }
        props.onSignUp(name, email, password);
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign up</h1>
                </div>
                <div>
                    { loading && <LoadingBox/> }
                    { error && <MessageBox variant={'danger'}>{error}</MessageBox>}
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                       type="text" 
                       id="name" 
                       placeholder="Enter name"
                       onChange={(e) => setName(e.target.value)}> 
                    </input>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input 
                       type="email" 
                       id="email" 
                       placeholder="Enter email"
                       onChange={(e) => setEmail(e.target.value)}> 
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                       type="password" 
                       placeholder="Enter password" 
                       id="password"
                       onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                       type="password" 
                       placeholder="re-enter password" 
                       id="confirmPassword"
                       onChange={(e) => setConfirmPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label/>
                    <button className="primary block" type="submit">Sign Up</button>
                </div>
                <div>
                    <label/>
                    <div>
                       Already have an account? <Link to={redirect === 'shipping' ? '/signin?redirect=shipping' : '/signin'}>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userSignin: state.signInReducer,
        userSignup: state.signUpReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUp: (name, email, password) => dispatch(signUpAction(name, email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
