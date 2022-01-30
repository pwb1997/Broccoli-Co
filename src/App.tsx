import Footer from './Footer';
import Header from './Header';
import Main from './Main/index';

function App() {
    return (
        <div className="flex flex-col w-screen h-screen">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
