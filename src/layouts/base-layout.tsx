import { Outlet } from '@tanstack/react-router';

export const BaseLayout = () => {
  const handleLogin = async () => {
    const redirectUrl = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('https://vercel.com/');
      }, 2000);
    });

    globalThis.location.href = redirectUrl;
  };

  return (
    <div>
      <header>Main Header</header>
      <h1>Main Layout</h1>
      <button onClick={handleLogin}>login</button>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
