import Link from 'next/link'
// href 속성은 Link에, style이나 className 등 다른 요소들은 a에 적용
import {useRouter} from 'next/router';
import styles from './NavBar.module.css';

export default function NavBar() {
    const router = useRouter();

    return(
        <nav>
            <Link href="/">
                <a className={router.pathname=== '/' ? 'active' : ''}>Home</a>
            </Link>
            <Link href="/about">
                <a className={router.pathname=== '/about' ? 'active' : ''}>About</a>
            </Link>
            
            {/* styled jsx 사용 */}
            {/* 스타일의 범위가 컴포넌트 내부로 한정, 다른 컴포넌트에 같은 className을 써도 적용되지 않음 */}
            <style jsx> {`
                a {
                    text-decoration: none;
                }
                .active{
                    color: tomato;
                }
            `}
            </style>
        </nav>
    )
}