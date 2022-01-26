import axios from "axios";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";

export default function Login(){
    const router = useRouter();
    function login(){
        axios.post('/api/login')
        .then(res =>{
            if(res.status === 200) {
                // 로그인 성공
                router.push('/admin')
            }
        })
    }

    return(
        <div style={{padding:'100px 0', textAlign:'center'}}>
            <Form>
                <Form.Field inline>
                    <input placeholder='id'/>
                </Form.Field>
                <Form.Field inline>
                    <input type='password' placeholder='password'/>
                </Form.Field>
                <Button onClick={login}>Login</Button>
            </Form>
        </div>
    )
}