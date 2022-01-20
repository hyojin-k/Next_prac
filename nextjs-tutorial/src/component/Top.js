import { Header } from "semantic-ui-react";
import Gnb from "./Gnb";

export default function Top() {
  return (
    <div>
      <div style={{ display: "flex", paddingTop: 20}}>
        <div style = {{flex: '100px 0 0'}}>
          {/* public에 있는 이미지 불러오기 */}
          <img 
            src="/images/logo.png" 
            alt="logo" 
            style={{display:'block', width: 80}}
            />
        </div>
        <Header as="h1" style={{margin: 0}}>Next.js</Header>
      </div>
      <Gnb />
    </div>
  );
}
