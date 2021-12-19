import React, {useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import Like from "./components/Like";

function App() {
  const [likes, setLikes] = useState(0);
  return (
    <div className="App">
      <header>
        <nav
          style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(30, 60, 90, 0.1)',
    borderBottom: '1px solid #eaecef',
    padding: '15px 20px'}}
        >
          <img src={logo} alt="logo-leactures" />
          <button>Login/Cadastro</button>
        </nav>
      </header>
      <h2>Feed</h2>
      <div style={{display: 'flex', justifyContent: 'start', flexWrap: 'wrap'}}>
        <div style={{display: 'flex', flexDirection: 'column', width: '33%', alignItems: 'center', justifyContent: 'center'}}>
          <span style="display: flex; align-items: center;  flex-direction: column;">
            <h4 style="margin: 0;">A Sombra do vento</h4>
            <h5 style="margin: 0;">Carlos Ruiz Zafon</h5>
          </span>
          <p> 5 ⭐</p>
          <img
            src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTd9phqpvquhTp-xSLmbGelx6iWiS78XcMVLcr_IT9umnFe8LfAKXPoy1AJ95t77j98VsJ2bzR0SBebjoCyx--GV_iBf2dt-pYYobUWtsXq-kEjuPL7VtqN&usqp=CAE"
            width="100px"
            height="150px"
            alt="a-sombra-do-vento"
          />
          <h5>Postado por: Almir </h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt,
            quaerat perferendis modi commodi nostrum deserunt, quibusdam sed
            odio asperiores sunt eaque sint quod. Repudiandae expedita nam
            voluptas optio nesciunt deleniti....
          </p>
          <span>
            <Like likes={likes} setLikes={setLikes}>Curtir</Like> <button>Comentar</button>
          </span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', width: '33%', alignItems: 'center', justifyContent: 'center'}}>
          <span style="display: flex; align-items: center;  flex-direction: column;">
            <h4 style="margin: 0;">Harry Potter e a Pedra Filosofal</h4>
            <h5 style="margin: 0;">J.K Rowling</h5>
          </span>
          <p> 4 ⭐</p>
          <img
            src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTmpryfPm6BHstXH-PbCD5Ay3-wI5A_mn2bvgJrqHV9u2GcfVy1k4PJkznIhSx3mWdEvUYxSu88ok86ZKXYaizBeu9zdmksmZSsHIZWLwSy63nhjWY5Z2qOjQ&usqp=CAE"
            width="100px"
            height="150px"
            alt="HP"
          />
          <h5>Postado por: Gustavo </h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt,
            quaerat perferendis modi commodi nostrum deserunt, quibusdam sed
            odio asperiores sunt eaque sint quod. Repudiandae expedita nam
            voluptas optio nesciunt deleniti....
          </p>
          <span>
            <Like likes={likes} setLikes={setLikes}>Curtir</Like> <button>Comentar</button>
          </span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', width: '33%', alignItems: 'center', justifyContent: 'center'}}>
          <span style="display: flex; align-items: center;  flex-direction: column;">
            <h4 style="margin: 0;">O Iluminado</h4>
            <h5 style="margin: 0;">Stephen King</h5>
          </span>
          <p> 5 ⭐</p>
          <img
            src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQJvELLlIJwuiDUh5PuGrhLK1y_j5MVIK76lH0E-MUQFXdJvvR3TpSdKBB7uFxc9ONp31gQlTVHeDaeaTAMWG5iqrkQ8MXOXQTHhxcN_hp5&usqp=CAE"
            width="100px"
            height="150px"
            alt="the-shining"
          />
          <h5>Postado por: Eduardo </h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt,
            quaerat perferendis modi commodi nostrum deserunt, quibusdam sed
            odio asperiores sunt eaque sint quod. Repudiandae expedita nam
            voluptas optio nesciunt deleniti....
          </p>
          <span>
            <Like likes={likes} setLikes={setLikes}>Curtir</Like> <button>Comentar</button>
          </span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', width: '33%', alignItems: 'center', justifyContent: 'center'}}>
          <span style="display: flex; align-items: center;  flex-direction: column;">
            <h4 style="margin: 0;">O Hobbit</h4>
            <h5 style="margin: 0;">J.R.R. Tolkien</h5>
          </span>
          <p> 5 ⭐</p>
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/511+-lOOtsL._SX319_BO1,204,203,200_.jpg"
            width="100px"
            height="150px"
          />
          <h5>Postado por: João </h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt,
            quaerat perferendis modi commodi nostrum deserunt, quibusdam sed
            odio asperiores sunt eaque sint quod. Repudiandae expedita nam
            voluptas optio nesciunt deleniti....
          </p>
          <span>
            <Like likes={likes} setLikes={setLikes}>Curtir</Like> <button>Comentar</button>
          </span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', width: '33%', alignItems: 'center', justifyContent: 'center'}}>
          <span style="display: flex; align-items: center;  flex-direction: column;">
            <h4 style="margin: 0;">Breves respostas para grandes questões</h4>
            <h5 style="margin: 0;">Stephen Hawking</h5>
          </span>
          <p> 3 ⭐</p>
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/514qyZzgdjS._SX328_BO1,204,203,200_.jpg"
            width="100px"
            height="150px"
            alt="stephen"
          />
          <h5>Postado por: Luana </h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt,
            quaerat perferendis modi commodi nostrum deserunt, quibusdam sed
            odio asperiores sunt eaque sint quod. Repudiandae expedita nam
            voluptas optio nesciunt deleniti....
          </p>
          <span>
            <Like likes={likes} setLikes={setLikes}>Curtir</Like> <button>Comentar</button>
          </span>
        </div>
      </div>
      <footer
        style={{background: '#013896',
  color: 'white',
  padding: '5px',
  textAlign: 'center'}}
      >
        Lectures @2021
      </footer>
    </div>
  );
}

export default App;
