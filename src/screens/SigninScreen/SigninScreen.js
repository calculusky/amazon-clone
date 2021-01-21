import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInAction } from '../../store/actions/authAction';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';

const SigninScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const { userInfo, error, loading } = props.user;
   
    //renders comp b4 redirecting***bug
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [userInfo, redirect, props.history])

   
    const submitHandler = (e) => {
        e.preventDefault();
        props.onSignIn(email, password)
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                <div>
                   
                    { error && <MessageBox variant={'danger'}>{error}</MessageBox>}
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
                    <label/>
                    <button className="primary block" disabled={loading}>{ loading ? <LoadingBox value={'Signin'}/> : 'Signing' }</button>
                </div>
                <div>
                    <label/>
                    <div>
                       Have no account? <Link to={redirect === 'shipping' ? '/signup?redirect=shipping' : '/signup'}>Create new account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.signInReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (email, password) => dispatch(signInAction(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
