"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Menu from "./menuLateral";
import styles from "../../styles/components/header.module.css";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles["header-container"]}>
          {/* Ícone de Menu para Mobile */}
          <div className={styles.menuIcon} onClick={toggleMenu}>
            <Image src="/menu.png" alt="Menu" width={23} height={20} />
          </div>

          {/* LOGO */}
          <h1 className={styles.logo}>
            <Link href="/">ArmaZen</Link>
          </h1>

          {/* ÍCONE DE LOGOUT */}
          <div className={styles.logoutIcon} onClick={handleLogout}>
            <Image src="/logout.png" alt="Log off" width={30} height={25} />
          </div>
        </div>
      </header>

      {/* Componente de Menu Mobile */}
      <Menu isOpen={menuOpen} toggleMenu={toggleMenu} />
    </>
  );
}
