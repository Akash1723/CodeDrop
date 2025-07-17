const Session_key="userSession";
const exp_time=30;

export const setUserSession = (userdata) => {
    const expiresAt=Date.now() + exp_time * 60 * 1000;
    const session={
        data:userdata,
        expiresAt
    };
    localStorage.setItem(Session_key,JSON.stringify(session));
}

export const clearCurrentSession = () => {
  localStorage.removeItem(Session_key);
};

export const getCurrentSession = () => {
    const session_raw=localStorage.getItem(Session_key);
    if(session_raw===null) return null;
    
    const session_det=JSON.parse(session_raw);
    if(Date.now()>session_det.expiresAt){
        clearCurrentSession();
        return null;
    }
    return session_det.data;
};