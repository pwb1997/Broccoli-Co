import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Main from './layouts/Main';

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
