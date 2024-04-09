import styled from "styled-components";
import Menu from "./components/menu";
import Pages from "./components/pages";

const Container = styled.div`
  background: #f8f9fb;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;

  `

function App() {
  return (
    <Container>
      <Menu/>
      <Pages/>
    </Container>

  );
}

export default App;
