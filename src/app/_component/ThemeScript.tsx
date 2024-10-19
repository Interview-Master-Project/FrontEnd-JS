type Theme = "light" | "dark";

// 전역 객체 window에 커스텀 변수 정의
declare global {
  interface Window {
    __theme: Theme; // 현재 테마
    __onThemeChange: (theme: Theme) => void; // 테마가 바뀔 때 호출되는 함수 => 토글에 활용
    __setPreferredTheme: (theme: Theme) => void; // localStorage에 테마 저장하는 함수
  }
}

function code() {
  window.__onThemeChange = () => {};

  function setTheme(newTheme: Theme) {
    document.documentElement.classList.remove(window.__theme); // 기존 테마 제거
    window.__theme = newTheme; // 전역 변수에 새 테마 설정
    document.documentElement.dataset.theme = newTheme; // <html>에 data-theme 속성을 새 테마 설정
    document.documentElement.classList.add(newTheme); // 새 테마 클래스 추가

    window.__onThemeChange(newTheme); // 테마 변경 함수 호출
  }

  let preferredTheme: Theme | null = localStorage.getItem("theme") as Theme;

  window.__setPreferredTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  darkQuery.addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light";
    window.__setPreferredTheme(newTheme);
  });

  setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"));
}

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: `(${code})();` }} />;
}
