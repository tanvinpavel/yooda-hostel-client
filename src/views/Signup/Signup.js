import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import './Signup.css'
import axios from "../../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    }, []);

    //userName
    useEffect(()=>{
        setValidName(USER_REGEX.test(user));
    }, [user]);

    //password & confirm password
    useEffect(()=>{
        setValidPwd(PWD_REGEX.test(pwd));
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(()=>{
        setErrMsg('');
    }, []);

    const formHandler = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd)

        if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const payload = {user, pwd};
            const response = await axios.post('/auth/signup', payload, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })
            console.log(response.data);
            setSuccess(true);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <section>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8 col-sm-10">
            <div
              className="card mt-5 border-0 shadow"
              style={{ background: "#f2f2f2" }}
            >
            {
                success ? <h2>Login Success</h2> :
              <div className="card-body">
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                <h4 className="card-title mb-3 text-center">Signup</h4>

                <form onSubmit={formHandler}>
                  <div className="mb-3">
                    <label htmlFor="inputName1" className="form-label">
                      Username
                    </label>
                    <span className={validName ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    <input
                      type="text"
                      id="inputName1"
                      ref={userRef}
                      autoComplete='off'
                      onChange={(e)=>setUser(e.target.value)}
                      className="form-control"
                      placeholder="Student Name"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      required
                    />
                    <p className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        4 to 24 character. <br/>Must begin with a letter<br/> Letters, Numbers, Underscores, hyphens allowed.
                    </p>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="inputPass2" className="form-label">
                      Password
                      <span className={validPwd  ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e)=>setPwd(e.target.value)}
                      id="inputPass2"
                      placeholder="Password"
                      onFocus={()=>setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      required
                    />
                    <p className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        8 to 24 characters. <br/>Must include uppercase and lowercase letters, a number and a special character<br/> Allowed special characters: !@#$%.
                    </p>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="inputConPass3" className="form-label">
                      Confirm Password
                      <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputConPass3"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      placeholder="Reenter Password"
                      onFocus={()=>setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                      required
                    />
                    <p className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        Must match the first password input field.
                    </p>
                  </div>
                  <button type="submit" disabled={!validName || !validPwd || !validMatch ? true : false} className="btn btn-primary">
                    Signup
                  </button>
                </form>
              </div>
}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
