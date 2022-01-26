import { useRouter } from 'next/router';
import { Menu } from 'semantic-ui-react';

// Link, router - 페이지는 그대로, 내용물만 바뀜
// location, a태그 - 페이지가 새로고침 되면서 속도가 느려짐(SPA의 장점이 사라짐)

export default function Gnb(){
    const router = useRouter();
    let activeItem;

    // router에 내장되어있는 pathname에 따라서 gnb가 active 되도록 설정
    if(router.pathname === '/'){
      activeItem = 'home';
    }else if(router.pathname === '/about'){
      activeItem = 'about';
    }else if(router.pathname === '/admin'){
      activeItem = 'admin';
    }

    function goLink(e, data) { //data는 각 Menu.Item 에 들어있는 정보
      if(data.name === 'home'){
        router.push('/')
      }else if(data.name === 'about'){
        router.push('/about')
      }
    }

    return (
        <Menu inverted>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={goLink}
          />
          <Menu.Item
            name='about'
            active={activeItem === 'about'}
            onClick={goLink}
          />

          <Menu.Item
            name='Contact Us'
            active={activeItem === 'contact'}
            onClick={() =>{
              router.push('/contact')
            }}
          />

          <Menu.Item
            name='Admin'
            active={activeItem === 'admin'}
            onClick={() =>{
              router.push('/admin')
            }}
          />
        </Menu>
      )
}