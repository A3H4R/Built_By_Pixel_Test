import "antd/dist/antd.css";
import UserList from "./components/UserList";
import {PageDiv,Header,Footer,PageContent } from "./styling/styling"
const App = () => {
  return (
    <div className="App">
      <PageDiv>
        <Header>
      <h1 style ={{color:"white", padding:"0.2em"}}>Built by Pixel Tech Test</h1>
        </Header>
        <PageContent>
      <UserList></UserList>
        </PageContent>
        <Footer></Footer>
      </PageDiv>
    </div>
  );
};

export default App;
