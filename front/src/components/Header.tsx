import Button from "./Button";
import { useTelegram } from "../hooks/useTelegram";

const Header = () => {
  const { onClose, user } = useTelegram();

  return (
    <header className="flex justify-between w-full p-2 px-4 items-center fixed left-0 top-0">
      <Button onClick={onClose}>Закрыть</Button>
      <span>{user?.username}</span>
    </header>
  );
};

export default Header;
