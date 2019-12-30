import React from 'react'

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        registerEmail: '',
        registerPassword: ''
      }
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }    

    onSubmitSignIn = () => {        
        if(this.state.registerEmail.length <= 5 || this.state.registerEmail.length <= 0 ){
            return alert("Please enter a valid email and password combination");
        }
        fetch('http://localhost:3001/register', {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response.RegisterStatus === true){
                console.log("register success")
                this.props.loadUser({
                    email: this.state.registerEmail
                })
                this.props.onRouteChange("shop");
            }
            else{
                console.log("register failed")
                alert("Registration failed, email already in use");
            }

        })
    }

    render() {
        let {onRouteChange} = this.props;
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div>
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                                </div>                                
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                                </div>
                                
                            </fieldset>
                            <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                onClick={this.onSubmitSignIn} type="submit" value="Sign in"/>
                            </div>
                            <div className="lh-copy mt3">

                            </div>
                        </div>
                    </main>
                </div>
            </article>
        )
    }
}
export default Register;