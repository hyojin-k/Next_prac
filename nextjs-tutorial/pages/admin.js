import { useEffect, useState } from "react"
import axios from 'axios'
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";

export default function Admin() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);

    function checkLogin() {
        axios.get('/api/isLogin')
        .then(res =>{
            if(res.status === 200 && res.data.name){
                // 로그인 된 상태
                setIsLogin(true);
            }else{
                // 로그인 안 된 상태
                router.push('/login')
            }
        })
    }

    function logout(){
        axios.get('/api/logout').then(res =>{
            if(res.status === 200){
                router.push('/')
            }
        })
    }

    useEffect(() =>{
        checkLogin();
    }, []);

    return (
        <>
        admin
        {/* 로그인 된 상태일 때 로그아웃 버튼 보임 */}
        {isLogin && <Button onClick={logout}>Logout</Button>}
        </>
    )
}