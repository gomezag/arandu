import { ReactNode } from 'react';
import BurgerMenu from './BurgerMenu';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: ReactNode;
  background?: string;
}

const Layout = ({ children, background }: LayoutProps) => {
  const { t } = useTranslation();

  return (
      <div
        className={ background ? 'min-h-screen flex flex-col bg-fixed bg-center bg-cover' : ' min-h-screen flex flex-col bg-stone-0' }
        style={background ? { backgroundImage: `url(${background})`, backgroundSize: 'cover' } : {}}
      >
      <div className="fixed top-0 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
        <BurgerMenu />
      </div>
      <div className="flex-grow relative z-10">
        {children}
      </div>
      {/* Footer */}
      <footer className="z-20 py-6 text-center text-gray-600 text-sm bg-stone-100">
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  );
};

export default Layout;
