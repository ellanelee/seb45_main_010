import Header from 'components/Header/Header';
import { Search } from 'components/Menu/Search';
import { Sidebar } from 'components/Menu/Sidebar';
import { useState } from 'react';

const App = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handlerMenu = (): void => setIsMenu(!isMenu);
  const handlerSearch = (): void => setIsSearch(!isSearch);

  return (
    <main className="h-screen ">
      <Header handlerMenu={handlerMenu} handlerSearch={handlerSearch} />
      {isMenu && <Sidebar handlerMenu={handlerMenu} />}
      {isSearch && <Search handlerSearc={handlerSearch} />}
    </main>
  );
};

export default App;
