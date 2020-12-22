import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInAction } from '../../store/actions/authAction';

const SigninScreen = (props) => {
    const [email, setEmai] = useState('');
    const [password, setPassword] = useState('');

    //
    const { userInfo, error } = props.user;

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
                    <label htmlFor="email">Email Address</label>
                    <input 
                       type="email" 
                       id="email" 
                       placeholder="Enter email"
                       onChange={(e) => setEmai(e.target.value)}> 
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                       type="passord" 
                       placeholder="Enter password" 
                       id="password"
                       onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label/>
                    <button className="primary block">Signin</button>
                </div>
                <div>
                    <label/>
                    <div>
                       Have no account? <Link to="/signup">Create new account</Link>
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
